# Maker-Checker System: Enhanced with JSON & Parent-Child Support

## Overview

Enhanced maker-checker system supporting:
- **JSON format** for original/modified data storage
- **Parent-child relationships** (one-to-many)
- **Unified approval** for parent + all children in single transaction
- **Clear differentiation** between parent and child level changes

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                     master_approval_process                          │
│  (One row per approval request - covers parent + all children)       │
├─────────────────────────────────────────────────────────────────────┤
│  approval_id | parent_table | parent_record_id | status | maker... │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ 1:N
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                  master_approval_process_logs                        │
│  (One row per entity - parent OR each child)                         │
├─────────────────────────────────────────────────────────────────────┤
│  log_id | approval_id | entity_type | table_name | operation_type   │
│  original_data (JSONB) | modified_data (JSONB)                       │
└─────────────────────────────────────────────────────────────────────┘

Example for Order with 3 Items:
┌────────────────────────────────────────┐
│ master_approval_process (approval_id=1)│
└────────────────────────────────────────┘
                    │
       ┌────────────┼────────────┬────────────┐
       ▼            ▼            ▼            ▼
   ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐
   │ PARENT │  │ CHILD  │  │ CHILD  │  │ CHILD  │
   │ orders │  │ items  │  │ items  │  │ items  │
   │ log_id │  │ log_id │  │ log_id │  │ log_id │
   │   =1   │  │   =2   │  │   =3   │  │   =4   │
   └────────┘  └────────┘  └────────┘  └────────┘
```

---

## 1. Tables

### 1.1 Master Approval Process (Header)

```sql
CREATE TABLE master_approval_process (
    approval_id         BIGSERIAL PRIMARY KEY,
    
    -- Parent table reference
    parent_table        TEXT NOT NULL,
    parent_record_id    TEXT,
    parent_id_column    TEXT DEFAULT 'id',
    
    -- Overall operation (PRIMARY operation on parent)
    operation_type      TEXT NOT NULL CHECK (operation_type IN ('INSERT', 'UPDATE', 'DELETE')),
    
    -- Version for optimistic locking (parent record)
    record_version      INTEGER,
    
    -- Workflow
    status              TEXT NOT NULL DEFAULT 'CREATED' 
                        CHECK (status IN ('CREATED', 'APPROVED', 'REJECTED', 'ARCHIVED')),
    
    -- Maker audit
    maker_id            TEXT NOT NULL,
    maker_ts            TIMESTAMPTZ DEFAULT NOW(),
    maker_remarks       TEXT,
    
    -- Checker audit
    checker_id          TEXT,
    checker_ts          TIMESTAMPTZ,
    checker_remarks     TEXT,
    
    -- Error tracking
    apply_error         TEXT,
    
    -- Constraints
    CONSTRAINT chk_maker_checker_diff CHECK (maker_id != checker_id OR checker_id IS NULL)
);

-- Indexes
CREATE INDEX idx_map_status ON master_approval_process(status);
CREATE INDEX idx_map_parent_table ON master_approval_process(parent_table);
CREATE INDEX idx_map_parent_record ON master_approval_process(parent_table, parent_record_id);
CREATE INDEX idx_map_pending ON master_approval_process(status) WHERE status = 'CREATED';
CREATE INDEX idx_map_maker ON master_approval_process(maker_id);
CREATE INDEX idx_map_maker_ts ON master_approval_process(maker_ts);
```

### 1.2 Master Approval Process Logs (Detail - JSON Format)

```sql
CREATE TABLE master_approval_process_logs (
    log_id              BIGSERIAL PRIMARY KEY,
    approval_id         BIGINT NOT NULL REFERENCES master_approval_process(approval_id) ON DELETE CASCADE,
    
    -- Entity classification
    entity_type         TEXT NOT NULL DEFAULT 'PARENT' CHECK (entity_type IN ('PARENT', 'CHILD')),
    parent_log_id       BIGINT REFERENCES master_approval_process_logs(log_id), -- Links child to parent log
    
    -- Table reference for this entity
    table_name          TEXT NOT NULL,
    record_id           TEXT,                       -- NULL for INSERT
    record_id_column    TEXT DEFAULT 'id',
    
    -- Foreign key info (for children)
    fk_column           TEXT,                       -- e.g., 'order_id' 
    fk_value            TEXT,                       -- Value linking to parent
    
    -- Operation for THIS specific entity
    operation_type      TEXT NOT NULL CHECK (operation_type IN ('INSERT', 'UPDATE', 'DELETE', 'NO_CHANGE')),
    
    -- JSON data storage
    original_data       JSONB,                      -- Complete record BEFORE change (NULL for INSERT)
    modified_data       JSONB,                      -- Complete record AFTER change (NULL for DELETE)
    
    -- Changed fields tracking (for UPDATE - quick reference)
    changed_fields      TEXT[],
    
    -- Record version at time of request
    record_version      INTEGER,
    
    -- Timestamp
    updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_map_logs_approval ON master_approval_process_logs(approval_id);
CREATE INDEX idx_map_logs_entity_type ON master_approval_process_logs(entity_type);
CREATE INDEX idx_map_logs_parent_log ON master_approval_process_logs(parent_log_id);
CREATE INDEX idx_map_logs_table ON master_approval_process_logs(table_name);
CREATE INDEX idx_map_logs_original ON master_approval_process_logs USING GIN (original_data);
CREATE INDEX idx_map_logs_modified ON master_approval_process_logs USING GIN (modified_data);
```

### 1.3 Archive Tables

```sql
CREATE TABLE master_approval_process_archive (
    approval_id         BIGINT PRIMARY KEY,
    parent_table        TEXT,
    parent_record_id    TEXT,
    parent_id_column    TEXT,
    operation_type      TEXT,
    record_version      INTEGER,
    status              TEXT,
    maker_id            TEXT,
    maker_ts            TIMESTAMPTZ,
    maker_remarks       TEXT,
    checker_id          TEXT,
    checker_ts          TIMESTAMPTZ,
    checker_remarks     TEXT,
    apply_error         TEXT,
    archived_at         TIMESTAMPTZ DEFAULT NOW(),
    archived_by         TEXT DEFAULT 'SYSTEM'
);

CREATE TABLE master_approval_process_logs_archive (
    log_id              BIGINT PRIMARY KEY,
    approval_id         BIGINT,
    entity_type         TEXT,
    parent_log_id       BIGINT,
    table_name          TEXT,
    record_id           TEXT,
    record_id_column    TEXT,
    fk_column           TEXT,
    fk_value            TEXT,
    operation_type      TEXT,
    original_data       JSONB,
    modified_data       JSONB,
    changed_fields      TEXT[],
    record_version      INTEGER,
    updated_at          TIMESTAMPTZ,
    archived_at         TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_map_archive_parent ON master_approval_process_archive(parent_table, parent_record_id);
CREATE INDEX idx_map_logs_archive_approval ON master_approval_process_logs_archive(approval_id);
```

---

## 2. Helper Functions

### 2.1 Get Column Data Type

```sql
CREATE OR REPLACE FUNCTION get_column_type(
    p_table_name    TEXT,
    p_column_name   TEXT,
    p_schema        TEXT DEFAULT 'public'
)
RETURNS TEXT AS $$
DECLARE
    v_type TEXT;
BEGIN
    SELECT data_type INTO v_type
    FROM information_schema.columns
    WHERE table_schema = p_schema
      AND table_name = p_table_name
      AND column_name = p_column_name;
    
    RETURN v_type;
END;
$$ LANGUAGE plpgsql;
```

### 2.2 Fetch Record as JSON

```sql
CREATE OR REPLACE FUNCTION fetch_record_json(
    p_table_name        TEXT,
    p_record_id         TEXT,
    p_record_id_column  TEXT DEFAULT 'id'
)
RETURNS JSONB AS $$
DECLARE
    v_sql       TEXT;
    v_col_type  TEXT;
    v_result    JSONB;
BEGIN
    v_col_type := get_column_type(p_table_name, p_record_id_column);
    
    IF v_col_type IS NULL THEN
        RETURN NULL;
    END IF;
    
    v_sql := format(
        'SELECT row_to_json(t)::JSONB FROM %I t WHERE %I = $1::%s',
        p_table_name, p_record_id_column, v_col_type
    );
    
    EXECUTE v_sql INTO v_result USING p_record_id;
    
    RETURN v_result;
END;
$$ LANGUAGE plpgsql;
```

### 2.3 Get Record Version

```sql
CREATE OR REPLACE FUNCTION get_record_version(
    p_table_name        TEXT,
    p_record_id         TEXT,
    p_record_id_column  TEXT DEFAULT 'id'
)
RETURNS INTEGER AS $$
DECLARE
    v_sql       TEXT;
    v_col_type  TEXT;
    v_version   INTEGER;
BEGIN
    v_col_type := get_column_type(p_table_name, p_record_id_column);
    
    IF v_col_type IS NULL THEN
        RETURN NULL;
    END IF;
    
    BEGIN
        v_sql := format(
            'SELECT COALESCE(v_no, 1) FROM %I WHERE %I = $1::%s',
            p_table_name, p_record_id_column, v_col_type
        );
        EXECUTE v_sql INTO v_version USING p_record_id;
    EXCEPTION WHEN undefined_column THEN
        v_version := 1;
    END;
    
    RETURN v_version;
END;
$$ LANGUAGE plpgsql;
```

### 2.4 Calculate Changed Fields

```sql
CREATE OR REPLACE FUNCTION calculate_changed_fields(
    p_original  JSONB,
    p_modified  JSONB
)
RETURNS TEXT[] AS $$
DECLARE
    v_changed   TEXT[] := '{}';
    v_key       TEXT;
BEGIN
    IF p_original IS NULL OR p_modified IS NULL THEN
        RETURN v_changed;
    END IF;
    
    FOR v_key IN SELECT jsonb_object_keys(p_modified)
    LOOP
        IF (p_original ->> v_key) IS DISTINCT FROM (p_modified ->> v_key) THEN
            v_changed := array_append(v_changed, v_key);
        END IF;
    END LOOP;
    
    RETURN v_changed;
END;
$$ LANGUAGE plpgsql;
```

---

## 3. Core Functions

### 3.1 Request Change with Children

```sql
CREATE OR REPLACE FUNCTION request_change_with_children(
    -- Parent info
    p_parent_table      TEXT,
    p_operation_type    TEXT,
    p_parent_record_id  TEXT DEFAULT NULL,
    p_parent_id_column  TEXT DEFAULT 'id',
    p_parent_changes    JSONB DEFAULT '{}'::JSONB,
    
    -- Children info (array of child change objects)
    p_children          JSONB DEFAULT '[]'::JSONB,
    /*
    p_children format:
    [
        {
            "table_name": "order_items",
            "operation_type": "INSERT|UPDATE|DELETE",
            "record_id": "123",           -- NULL for INSERT
            "record_id_column": "id",
            "fk_column": "order_id",      -- Foreign key column name
            "changes": { "field1": "value1", ... }
        },
        ...
    ]
    */
    
    -- Maker info
    p_maker_id          TEXT DEFAULT NULL,
    p_maker_remarks     TEXT DEFAULT NULL
)
RETURNS BIGINT AS $$
DECLARE
    v_approval_id       BIGINT;
    v_parent_log_id     BIGINT;
    v_parent_original   JSONB;
    v_parent_modified   JSONB;
    v_parent_version    INTEGER;
    v_parent_changed    TEXT[];
    
    v_child             JSONB;
    v_child_original    JSONB;
    v_child_modified    JSONB;
    v_child_version     INTEGER;
    v_child_changed     TEXT[];
    v_child_op          TEXT;
    v_child_table       TEXT;
    v_child_record_id   TEXT;
    v_child_id_col      TEXT;
    v_child_fk_col      TEXT;
    v_child_changes     JSONB;
BEGIN
    -- ========================================
    -- VALIDATION
    -- ========================================
    IF p_operation_type NOT IN ('INSERT', 'UPDATE', 'DELETE') THEN
        RAISE EXCEPTION 'Invalid operation type: %', p_operation_type;
    END IF;
    
    IF p_operation_type IN ('UPDATE', 'DELETE') AND p_parent_record_id IS NULL THEN
        RAISE EXCEPTION 'parent_record_id is required for % operation', p_operation_type;
    END IF;
    
    IF p_operation_type IN ('INSERT', 'UPDATE') AND (p_parent_changes IS NULL OR p_parent_changes = '{}'::JSONB) THEN
        RAISE EXCEPTION 'parent_changes are required for % operation', p_operation_type;
    END IF;
    
    -- Check for existing pending approval on same parent
    IF p_operation_type IN ('UPDATE', 'DELETE') THEN
        IF EXISTS (
            SELECT 1 FROM master_approval_process 
            WHERE parent_table = p_parent_table 
              AND parent_record_id = p_parent_record_id 
              AND status = 'CREATED'
        ) THEN
            RAISE EXCEPTION 'Pending approval already exists for %.%', p_parent_table, p_parent_record_id;
        END IF;
    END IF;
    
    -- ========================================
    -- FETCH PARENT ORIGINAL DATA
    -- ========================================
    IF p_operation_type IN ('UPDATE', 'DELETE') THEN
        v_parent_original := fetch_record_json(p_parent_table, p_parent_record_id, p_parent_id_column);
        
        IF v_parent_original IS NULL THEN
            RAISE EXCEPTION 'Parent record not found: %.% = %', p_parent_table, p_parent_id_column, p_parent_record_id;
        END IF;
        
        v_parent_version := get_record_version(p_parent_table, p_parent_record_id, p_parent_id_column);
    END IF;
    
    -- ========================================
    -- BUILD PARENT MODIFIED DATA
    -- ========================================
    IF p_operation_type = 'INSERT' THEN
        v_parent_modified := p_parent_changes;
        v_parent_original := NULL;
        v_parent_changed := ARRAY(SELECT jsonb_object_keys(p_parent_changes));
        
    ELSIF p_operation_type = 'UPDATE' THEN
        -- Merge changes into original
        v_parent_modified := v_parent_original || p_parent_changes;
        v_parent_changed := calculate_changed_fields(v_parent_original, v_parent_modified);
        
        -- Check if anything actually changed
        IF array_length(v_parent_changed, 1) IS NULL OR array_length(v_parent_changed, 1) = 0 THEN
            -- Check if there are child changes
            IF p_children = '[]'::JSONB THEN
                RAISE NOTICE 'No changes detected';
                RETURN NULL;
            END IF;
        END IF;
        
    ELSIF p_operation_type = 'DELETE' THEN
        v_parent_modified := NULL;
        v_parent_changed := ARRAY(SELECT jsonb_object_keys(v_parent_original));
    END IF;
    
    -- ========================================
    -- CREATE APPROVAL HEADER
    -- ========================================
    INSERT INTO master_approval_process (
        parent_table,
        parent_record_id,
        parent_id_column,
        operation_type,
        record_version,
        status,
        maker_id,
        maker_remarks
    ) VALUES (
        p_parent_table,
        p_parent_record_id,
        p_parent_id_column,
        p_operation_type,
        v_parent_version,
        'CREATED',
        p_maker_id,
        p_maker_remarks
    )
    RETURNING approval_id INTO v_approval_id;
    
    -- ========================================
    -- CREATE PARENT LOG ENTRY
    -- ========================================
    INSERT INTO master_approval_process_logs (
        approval_id,
        entity_type,
        parent_log_id,
        table_name,
        record_id,
        record_id_column,
        fk_column,
        fk_value,
        operation_type,
        original_data,
        modified_data,
        changed_fields,
        record_version
    ) VALUES (
        v_approval_id,
        'PARENT',
        NULL,
        p_parent_table,
        p_parent_record_id,
        p_parent_id_column,
        NULL,
        NULL,
        p_operation_type,
        v_parent_original,
        v_parent_modified,
        v_parent_changed,
        v_parent_version
    )
    RETURNING log_id INTO v_parent_log_id;
    
    -- ========================================
    -- PROCESS CHILDREN
    -- ========================================
    FOR v_child IN SELECT * FROM jsonb_array_elements(p_children)
    LOOP
        v_child_table     := v_child ->> 'table_name';
        v_child_op        := v_child ->> 'operation_type';
        v_child_record_id := v_child ->> 'record_id';
        v_child_id_col    := COALESCE(v_child ->> 'record_id_column', 'id');
        v_child_fk_col    := v_child ->> 'fk_column';
        v_child_changes   := COALESCE(v_child -> 'changes', '{}'::JSONB);
        
        -- Validate child operation
        IF v_child_op NOT IN ('INSERT', 'UPDATE', 'DELETE', 'NO_CHANGE') THEN
            RAISE EXCEPTION 'Invalid child operation type: %', v_child_op;
        END IF;
        
        -- Fetch child original data for UPDATE/DELETE
        IF v_child_op IN ('UPDATE', 'DELETE') THEN
            IF v_child_record_id IS NULL THEN
                RAISE EXCEPTION 'record_id required for child % operation on %', v_child_op, v_child_table;
            END IF;
            
            v_child_original := fetch_record_json(v_child_table, v_child_record_id, v_child_id_col);
            
            IF v_child_original IS NULL THEN
                RAISE EXCEPTION 'Child record not found: %.% = %', v_child_table, v_child_id_col, v_child_record_id;
            END IF;
            
            v_child_version := get_record_version(v_child_table, v_child_record_id, v_child_id_col);
        ELSE
            v_child_original := NULL;
            v_child_version := NULL;
        END IF;
        
        -- Build child modified data
        IF v_child_op = 'INSERT' THEN
            v_child_modified := v_child_changes;
            v_child_changed := ARRAY(SELECT jsonb_object_keys(v_child_changes));
            
        ELSIF v_child_op = 'UPDATE' THEN
            v_child_modified := v_child_original || v_child_changes;
            v_child_changed := calculate_changed_fields(v_child_original, v_child_modified);
            
        ELSIF v_child_op = 'DELETE' THEN
            v_child_modified := NULL;
            v_child_changed := ARRAY(SELECT jsonb_object_keys(v_child_original));
            
        ELSIF v_child_op = 'NO_CHANGE' THEN
            v_child_modified := v_child_original;
            v_child_changed := '{}'::TEXT[];
        END IF;
        
        -- Insert child log
        INSERT INTO master_approval_process_logs (
            approval_id,
            entity_type,
            parent_log_id,
            table_name,
            record_id,
            record_id_column,
            fk_column,
            fk_value,
            operation_type,
            original_data,
            modified_data,
            changed_fields,
            record_version
        ) VALUES (
            v_approval_id,
            'CHILD',
            v_parent_log_id,
            v_child_table,
            v_child_record_id,
            v_child_id_col,
            v_child_fk_col,
            v_child ->> 'fk_value',
            v_child_op,
            v_child_original,
            v_child_modified,
            v_child_changed,
            v_child_version
        );
    END LOOP;
    
    RETURN v_approval_id;
END;
$$ LANGUAGE plpgsql;
```

### 3.2 Simple Request Change (Backward Compatible)

```sql
CREATE OR REPLACE FUNCTION request_change(
    p_table_name        TEXT,
    p_operation_type    TEXT,
    p_record_id         TEXT DEFAULT NULL,
    p_record_id_column  TEXT DEFAULT 'id',
    p_changes           JSONB DEFAULT '{}',
    p_maker_id          TEXT DEFAULT NULL,
    p_maker_remarks     TEXT DEFAULT NULL
)
RETURNS BIGINT AS $$
BEGIN
    -- Delegate to the parent-child function with no children
    RETURN request_change_with_children(
        p_parent_table      := p_table_name,
        p_operation_type    := p_operation_type,
        p_parent_record_id  := p_record_id,
        p_parent_id_column  := p_record_id_column,
        p_parent_changes    := p_changes,
        p_children          := '[]'::JSONB,
        p_maker_id          := p_maker_id,
        p_maker_remarks     := p_maker_remarks
    );
END;
$$ LANGUAGE plpgsql;
```

### 3.3 Approve Change (Handles Parent + Children)

```sql
CREATE OR REPLACE FUNCTION approve_change(
    p_approval_id       BIGINT,
    p_checker_id        TEXT,
    p_checker_remarks   TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    v_header            master_approval_process%ROWTYPE;
    v_log               RECORD;
    v_current_version   INTEGER;
    v_sql               TEXT;
    v_columns           TEXT;
    v_values            TEXT;
    v_updates           TEXT;
    v_new_record_id     TEXT;
    v_col_type          TEXT;
    v_key               TEXT;
    v_value             TEXT;
    v_parent_new_id     TEXT;
BEGIN
    -- ========================================
    -- LOCK AND VALIDATE HEADER
    -- ========================================
    SELECT * INTO v_header 
    FROM master_approval_process 
    WHERE approval_id = p_approval_id 
    FOR UPDATE;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Approval record not found: %', p_approval_id;
    END IF;
    
    IF v_header.status != 'CREATED' THEN
        RAISE EXCEPTION 'Cannot approve record with status: %', v_header.status;
    END IF;
    
    IF v_header.maker_id = p_checker_id THEN
        RAISE EXCEPTION 'Maker and checker cannot be the same person';
    END IF;
    
    -- ========================================
    -- PROCESS EACH LOG ENTRY (PARENT FIRST, THEN CHILDREN)
    -- ========================================
    FOR v_log IN 
        SELECT * FROM master_approval_process_logs 
        WHERE approval_id = p_approval_id 
        ORDER BY entity_type DESC, log_id  -- PARENT first, then CHILD
    LOOP
        -- Skip NO_CHANGE entries
        IF v_log.operation_type = 'NO_CHANGE' THEN
            CONTINUE;
        END IF;
        
        -- Get column type for this entity
        v_col_type := get_column_type(v_log.table_name, v_log.record_id_column);
        
        -- ========================================
        -- OPTIMISTIC LOCKING CHECK (UPDATE/DELETE)
        -- ========================================
        IF v_log.operation_type IN ('UPDATE', 'DELETE') THEN
            v_current_version := get_record_version(v_log.table_name, v_log.record_id, v_log.record_id_column);
            
            IF v_current_version IS NULL THEN
                UPDATE master_approval_process SET
                    status = 'REJECTED',
                    checker_id = 'SYSTEM',
                    checker_ts = NOW(),
                    checker_remarks = format('Record no longer exists: %s.%s', v_log.table_name, v_log.record_id),
                    apply_error = 'RECORD_DELETED'
                WHERE approval_id = p_approval_id;
                RETURN FALSE;
            END IF;
            
            IF v_log.record_version IS NOT NULL AND v_current_version != v_log.record_version THEN
                UPDATE master_approval_process SET
                    status = 'REJECTED',
                    checker_id = 'SYSTEM',
                    checker_ts = NOW(),
                    checker_remarks = format('Concurrent modification on %s.%s', v_log.table_name, v_log.record_id),
                    apply_error = format('VERSION_MISMATCH: expected %s, found %s', v_log.record_version, v_current_version)
                WHERE approval_id = p_approval_id;
                RETURN FALSE;
            END IF;
        END IF;
        
        -- ========================================
        -- APPLY CHANGES BASED ON OPERATION TYPE
        -- ========================================
        CASE v_log.operation_type
            WHEN 'INSERT' THEN
                -- Build column list and values from modified_data JSON
                SELECT 
                    string_agg(quote_ident(key), ', '),
                    string_agg(
                        CASE 
                            WHEN value = 'null' THEN 'NULL'
                            ELSE quote_literal(value)
                        END, ', '
                    )
                INTO v_columns, v_values
                FROM jsonb_each_text(v_log.modified_data);
                
                -- For child INSERT, add FK column if parent was also inserted
                IF v_log.entity_type = 'CHILD' AND v_log.fk_column IS NOT NULL AND v_parent_new_id IS NOT NULL THEN
                    v_columns := v_columns || ', ' || quote_ident(v_log.fk_column);
                    v_values := v_values || ', ' || quote_literal(v_parent_new_id);
                END IF;
                
                v_sql := format(
                    'INSERT INTO %I (%s) VALUES (%s) RETURNING %I::TEXT',
                    v_log.table_name, v_columns, v_values, v_log.record_id_column
                );
                
                EXECUTE v_sql INTO v_new_record_id;
                
                -- Store parent's new ID for children
                IF v_log.entity_type = 'PARENT' THEN
                    v_parent_new_id := v_new_record_id;
                    
                    -- Update header with new parent record_id
                    UPDATE master_approval_process SET parent_record_id = v_new_record_id
                    WHERE approval_id = p_approval_id;
                END IF;
                
                -- Update log with new record_id
                UPDATE master_approval_process_logs SET record_id = v_new_record_id
                WHERE log_id = v_log.log_id;
                
            WHEN 'UPDATE' THEN
                -- Build SET clause from modified_data (only changed fields)
                SELECT string_agg(
                    format('%I = %s', key, 
                        CASE 
                            WHEN value = 'null' THEN 'NULL'
                            ELSE quote_literal(value)
                        END
                    ), ', '
                )
                INTO v_updates
                FROM jsonb_each_text(v_log.modified_data)
                WHERE key = ANY(v_log.changed_fields);
                
                IF v_updates IS NOT NULL AND v_updates != '' THEN
                    -- Add updated_at
                    v_updates := v_updates || ', updated_at = NOW()';
                    
                    -- Try to increment v_no
                    BEGIN
                        v_sql := format(
                            'UPDATE %I SET %s, v_no = COALESCE(v_no, 1) + 1 WHERE %I = $1::%s',
                            v_log.table_name, v_updates, v_log.record_id_column, v_col_type
                        );
                        EXECUTE v_sql USING v_log.record_id;
                    EXCEPTION WHEN undefined_column THEN
                        v_sql := format(
                            'UPDATE %I SET %s WHERE %I = $1::%s',
                            v_log.table_name, v_updates, v_log.record_id_column, v_col_type
                        );
                        EXECUTE v_sql USING v_log.record_id;
                    END;
                END IF;
                
            WHEN 'DELETE' THEN
                -- Soft delete if is_active exists
                BEGIN
                    v_sql := format(
                        'UPDATE %I SET is_active = FALSE, updated_at = NOW() WHERE %I = $1::%s',
                        v_log.table_name, v_log.record_id_column, v_col_type
                    );
                    EXECUTE v_sql USING v_log.record_id;
                EXCEPTION WHEN undefined_column THEN
                    -- Hard delete
                    v_sql := format(
                        'DELETE FROM %I WHERE %I = $1::%s',
                        v_log.table_name, v_log.record_id_column, v_col_type
                    );
                    EXECUTE v_sql USING v_log.record_id;
                END;
        END CASE;
    END LOOP;
    
    -- ========================================
    -- UPDATE APPROVAL STATUS
    -- ========================================
    UPDATE master_approval_process SET
        status = 'APPROVED',
        checker_id = p_checker_id,
        checker_ts = NOW(),
        checker_remarks = p_checker_remarks
    WHERE approval_id = p_approval_id;
    
    RETURN TRUE;
    
EXCEPTION WHEN OTHERS THEN
    UPDATE master_approval_process SET
        apply_error = SQLERRM
    WHERE approval_id = p_approval_id;
    RAISE;
END;
$$ LANGUAGE plpgsql;
```

### 3.4 Reject Change

```sql
CREATE OR REPLACE FUNCTION reject_change(
    p_approval_id       BIGINT,
    p_checker_id        TEXT,
    p_checker_remarks   TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    v_header master_approval_process%ROWTYPE;
BEGIN
    SELECT * INTO v_header 
    FROM master_approval_process 
    WHERE approval_id = p_approval_id 
    FOR UPDATE;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Approval record not found: %', p_approval_id;
    END IF;
    
    IF v_header.status != 'CREATED' THEN
        RAISE EXCEPTION 'Cannot reject record with status: %', v_header.status;
    END IF;
    
    IF v_header.maker_id = p_checker_id THEN
        RAISE EXCEPTION 'Maker and checker cannot be the same person';
    END IF;
    
    UPDATE master_approval_process SET
        status = 'REJECTED',
        checker_id = p_checker_id,
        checker_ts = NOW(),
        checker_remarks = p_checker_remarks
    WHERE approval_id = p_approval_id;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;
```

### 3.5 Cancel Request

```sql
CREATE OR REPLACE FUNCTION cancel_request(
    p_approval_id   BIGINT,
    p_maker_id      TEXT,
    p_remarks       TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    v_header master_approval_process%ROWTYPE;
BEGIN
    SELECT * INTO v_header 
    FROM master_approval_process 
    WHERE approval_id = p_approval_id 
    FOR UPDATE;
    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Approval record not found: %', p_approval_id;
    END IF;
    
    IF v_header.status != 'CREATED' THEN
        RAISE EXCEPTION 'Can only cancel CREATED requests';
    END IF;
    
    IF v_header.maker_id != p_maker_id THEN
        RAISE EXCEPTION 'Only the original maker can cancel';
    END IF;
    
    UPDATE master_approval_process SET
        status = 'REJECTED',
        checker_id = p_maker_id,
        checker_ts = NOW(),
        checker_remarks = COALESCE(p_remarks, 'Cancelled by maker')
    WHERE approval_id = p_approval_id;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;
```

---

## 4. Archival Functions

### 4.1 Archive Old Records

```sql
CREATE OR REPLACE FUNCTION archive_approvals(
    p_days_old      INTEGER DEFAULT 90,
    p_archived_by   TEXT DEFAULT 'SYSTEM'
)
RETURNS INTEGER AS $$
DECLARE
    v_count INTEGER;
BEGIN
    -- Archive logs first
    INSERT INTO master_approval_process_logs_archive
    SELECT 
        l.log_id, l.approval_id, l.entity_type, l.parent_log_id,
        l.table_name, l.record_id, l.record_id_column,
        l.fk_column, l.fk_value, l.operation_type,
        l.original_data, l.modified_data, l.changed_fields,
        l.record_version, l.updated_at, NOW()
    FROM master_approval_process_logs l
    JOIN master_approval_process h ON l.approval_id = h.approval_id
    WHERE h.status IN ('APPROVED', 'REJECTED')
      AND h.checker_ts < NOW() - (p_days_old || ' days')::INTERVAL;
    
    -- Archive headers
    WITH moved AS (
        DELETE FROM master_approval_process
        WHERE status IN ('APPROVED', 'REJECTED')
          AND checker_ts < NOW() - (p_days_old || ' days')::INTERVAL
        RETURNING *
    )
    INSERT INTO master_approval_process_archive
    SELECT 
        approval_id, parent_table, parent_record_id, parent_id_column,
        operation_type, record_version, status,
        maker_id, maker_ts, maker_remarks,
        checker_id, checker_ts, checker_remarks,
        apply_error, NOW(), p_archived_by
    FROM moved;
    
    GET DIAGNOSTICS v_count = ROW_COUNT;
    RETURN v_count;
END;
$$ LANGUAGE plpgsql;
```

### 4.2 Purge Old Archives

```sql
CREATE OR REPLACE FUNCTION purge_archives(
    p_years_old INTEGER DEFAULT 7
)
RETURNS INTEGER AS $$
DECLARE
    v_count INTEGER;
BEGIN
    DELETE FROM master_approval_process_logs_archive
    WHERE approval_id IN (
        SELECT approval_id FROM master_approval_process_archive
        WHERE archived_at < NOW() - (p_years_old || ' years')::INTERVAL
    );
    
    DELETE FROM master_approval_process_archive
    WHERE archived_at < NOW() - (p_years_old || ' years')::INTERVAL;
    
    GET DIAGNOSTICS v_count = ROW_COUNT;
    RETURN v_count;
END;
$$ LANGUAGE plpgsql;
```

---

## 5. Views

### 5.1 Pending Approvals Summary

```sql
CREATE OR REPLACE VIEW vw_pending_approvals AS
SELECT 
    h.approval_id,
    h.parent_table,
    h.parent_record_id,
    h.operation_type,
    h.maker_id,
    h.maker_ts,
    h.maker_remarks,
    NOW() - h.maker_ts AS pending_duration,
    
    -- Parent changes
    (SELECT original_data FROM master_approval_process_logs 
     WHERE approval_id = h.approval_id AND entity_type = 'PARENT') AS parent_original,
    (SELECT modified_data FROM master_approval_process_logs 
     WHERE approval_id = h.approval_id AND entity_type = 'PARENT') AS parent_modified,
    
    -- Child count
    (SELECT COUNT(*) FROM master_approval_process_logs 
     WHERE approval_id = h.approval_id AND entity_type = 'CHILD') AS child_count,
    
    -- Child summary
    (SELECT jsonb_agg(jsonb_build_object(
        'table_name', table_name,
        'record_id', record_id,
        'operation', operation_type
     ))
     FROM master_approval_process_logs 
     WHERE approval_id = h.approval_id AND entity_type = 'CHILD') AS children_summary
     
FROM master_approval_process h
WHERE h.status = 'CREATED'
ORDER BY h.maker_ts;
```

### 5.2 Change Details (Flat View)

```sql
CREATE OR REPLACE VIEW vw_change_details AS
SELECT 
    h.approval_id,
    h.parent_table,
    h.parent_record_id,
    h.status,
    h.maker_id,
    h.maker_ts,
    h.checker_id,
    h.checker_ts,
    l.log_id,
    l.entity_type,
    l.table_name,
    l.record_id,
    l.operation_type AS entity_operation,
    l.original_data,
    l.modified_data,
    l.changed_fields,
    l.fk_column,
    l.fk_value
FROM master_approval_process h
JOIN master_approval_process_logs l ON h.approval_id = l.approval_id
ORDER BY h.approval_id, l.entity_type DESC, l.log_id;
```

### 5.3 Pending by Table

```sql
CREATE OR REPLACE VIEW vw_pending_by_table AS
SELECT 
    parent_table,
    COUNT(*) AS pending_count,
    SUM((SELECT COUNT(*) FROM master_approval_process_logs l 
         WHERE l.approval_id = h.approval_id AND l.entity_type = 'CHILD')) AS total_child_changes,
    MIN(maker_ts) AS oldest_request,
    MAX(maker_ts) AS newest_request
FROM master_approval_process h
WHERE status = 'CREATED'
GROUP BY parent_table
ORDER BY pending_count DESC;
```

### 5.4 Compare Original vs Modified (JSON Diff)

```sql
CREATE OR REPLACE VIEW vw_change_comparison AS
SELECT 
    l.approval_id,
    l.log_id,
    l.entity_type,
    l.table_name,
    l.record_id,
    l.operation_type,
    l.changed_fields,
    jsonb_pretty(l.original_data) AS original_formatted,
    jsonb_pretty(l.modified_data) AS modified_formatted,
    
    -- Side-by-side comparison of changed fields only
    (SELECT jsonb_object_agg(
        field,
        jsonb_build_object(
            'from', l.original_data ->> field,
            'to', l.modified_data ->> field
        )
    )
    FROM unnest(l.changed_fields) AS field) AS changes_comparison
    
FROM master_approval_process_logs l
JOIN master_approval_process h ON l.approval_id = h.approval_id
WHERE h.status = 'CREATED'
ORDER BY l.approval_id, l.entity_type DESC, l.log_id;
```

---

## 6. Audit Trail Function

```sql
CREATE OR REPLACE FUNCTION get_audit_trail(
    p_table_name    TEXT,
    p_record_id     TEXT
)
RETURNS TABLE (
    approval_id     BIGINT,
    log_id          BIGINT,
    entity_type     TEXT,
    operation_type  TEXT,
    status          TEXT,
    original_data   JSONB,
    modified_data   JSONB,
    changed_fields  TEXT[],
    maker_id        TEXT,
    maker_ts        TIMESTAMPTZ,
    checker_id      TEXT,
    checker_ts      TIMESTAMPTZ,
    source          TEXT
) AS $$
BEGIN
    RETURN QUERY
    -- Current
    SELECT 
        h.approval_id,
        l.log_id,
        l.entity_type,
        l.operation_type,
        h.status,
        l.original_data,
        l.modified_data,
        l.changed_fields,
        h.maker_id,
        h.maker_ts,
        h.checker_id,
        h.checker_ts,
        'CURRENT'::TEXT
    FROM master_approval_process h
    JOIN master_approval_process_logs l ON h.approval_id = l.approval_id
    WHERE l.table_name = p_table_name AND l.record_id = p_record_id
    
    UNION ALL
    
    -- Archived
    SELECT 
        ha.approval_id,
        la.log_id,
        la.entity_type,
        la.operation_type,
        ha.status,
        la.original_data,
        la.modified_data,
        la.changed_fields,
        ha.maker_id,
        ha.maker_ts,
        ha.checker_id,
        ha.checker_ts,
        'ARCHIVE'::TEXT
    FROM master_approval_process_archive ha
    JOIN master_approval_process_logs_archive la ON ha.approval_id = la.approval_id
    WHERE la.table_name = p_table_name AND la.record_id = p_record_id
    
    ORDER BY checker_ts DESC NULLS FIRST;
END;
$$ LANGUAGE plpgsql;
```

---

## 7. Example Usage

### 7.1 Sample Tables (Order with Items)

```sql
-- Parent table
CREATE TABLE orders (
    id              BIGSERIAL PRIMARY KEY,
    order_no        TEXT NOT NULL UNIQUE,
    customer_id     BIGINT,
    order_date      DATE DEFAULT CURRENT_DATE,
    total_amount    NUMERIC(15,2) DEFAULT 0,
    status          TEXT DEFAULT 'DRAFT',
    is_active       BOOLEAN DEFAULT TRUE,
    v_no            INTEGER DEFAULT 1,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Child table
CREATE TABLE order_items (
    id              BIGSERIAL PRIMARY KEY,
    order_id        BIGINT REFERENCES orders(id),
    product_id      BIGINT,
    product_name    TEXT,
    quantity        INTEGER DEFAULT 1,
    unit_price      NUMERIC(15,2),
    line_total      NUMERIC(15,2),
    is_active       BOOLEAN DEFAULT TRUE,
    v_no            INTEGER DEFAULT 1,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Insert sample data
INSERT INTO orders (order_no, customer_id, total_amount, status)
VALUES ('ORD-001', 100, 5000, 'CONFIRMED');

INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price, line_total)
VALUES 
    (1, 101, 'Widget A', 10, 100, 1000),
    (1, 102, 'Widget B', 20, 200, 4000);
```

### 7.2 Simple Request (No Children)

```sql
-- Same as before - backward compatible
SELECT request_change(
    p_table_name     := 'orders',
    p_operation_type := 'UPDATE',
    p_record_id      := '1',
    p_changes        := '{"status": "SHIPPED", "total_amount": "5500"}'::JSONB,
    p_maker_id       := 'user_kumar'
);
```

### 7.3 Request with Parent + Children

```sql
SELECT request_change_with_children(
    -- Parent
    p_parent_table      := 'orders',
    p_operation_type    := 'UPDATE',
    p_parent_record_id  := '1',
    p_parent_changes    := '{
        "status": "MODIFIED",
        "total_amount": "7500"
    }'::JSONB,
    
    -- Children
    p_children          := '[
        {
            "table_name": "order_items",
            "operation_type": "UPDATE",
            "record_id": "1",
            "fk_column": "order_id",
            "changes": {
                "quantity": "15",
                "line_total": "1500"
            }
        },
        {
            "table_name": "order_items",
            "operation_type": "UPDATE",
            "record_id": "2",
            "fk_column": "order_id",
            "changes": {
                "quantity": "30",
                "line_total": "6000"
            }
        },
        {
            "table_name": "order_items",
            "operation_type": "INSERT",
            "fk_column": "order_id",
            "fk_value": "1",
            "changes": {
                "product_id": "103",
                "product_name": "Widget C",
                "quantity": "5",
                "unit_price": "50",
                "line_total": "250"
            }
        }
    ]'::JSONB,
    
    -- Maker
    p_maker_id          := 'user_kumar',
    p_maker_remarks     := 'Order modification - added new item'
);
```

### 7.4 Request INSERT Parent with Children

```sql
SELECT request_change_with_children(
    p_parent_table      := 'orders',
    p_operation_type    := 'INSERT',
    p_parent_changes    := '{
        "order_no": "ORD-002",
        "customer_id": "200",
        "total_amount": "3000",
        "status": "DRAFT"
    }'::JSONB,
    
    p_children          := '[
        {
            "table_name": "order_items",
            "operation_type": "INSERT",
            "fk_column": "order_id",
            "changes": {
                "product_id": "201",
                "product_name": "Gadget X",
                "quantity": "10",
                "unit_price": "300",
                "line_total": "3000"
            }
        }
    ]'::JSONB,
    
    p_maker_id          := 'user_kumar',
    p_maker_remarks     := 'New order creation'
);
```

### 7.5 View Pending Approvals

```sql
-- Summary view
SELECT * FROM vw_pending_approvals;

-- Detailed comparison
SELECT * FROM vw_change_comparison WHERE approval_id = 1;

-- All details flat
SELECT * FROM vw_change_details WHERE approval_id = 1;
```

**Sample Output from `vw_change_comparison`:**

| approval_id | entity_type | table_name | operation | changes_comparison |
|-------------|-------------|------------|-----------|-------------------|
| 1 | PARENT | orders | UPDATE | {"status": {"from": "CONFIRMED", "to": "MODIFIED"}, "total_amount": {"from": "5000", "to": "7500"}} |
| 1 | CHILD | order_items | UPDATE | {"quantity": {"from": "10", "to": "15"}, "line_total": {"from": "1000", "to": "1500"}} |
| 1 | CHILD | order_items | UPDATE | {"quantity": {"from": "20", "to": "30"}, "line_total": {"from": "4000", "to": "6000"}} |
| 1 | CHILD | order_items | INSERT | NULL |

### 7.6 Approve

```sql
SELECT approve_change(1, 'user_priya', 'Verified order modifications');
```

### 7.7 View Audit Trail

```sql
SELECT * FROM get_audit_trail('orders', '1');
SELECT * FROM get_audit_trail('order_items', '1');
```

---

## 8. Data Structure Examples

### 8.1 Log Entry for UPDATE

```json
// original_data
{
    "id": 1,
    "order_no": "ORD-001",
    "customer_id": 100,
    "total_amount": 5000,
    "status": "CONFIRMED",
    "v_no": 1
}

// modified_data
{
    "id": 1,
    "order_no": "ORD-001",
    "customer_id": 100,
    "total_amount": 7500,
    "status": "MODIFIED",
    "v_no": 1
}

// changed_fields
["total_amount", "status"]
```

### 8.2 Log Entry for INSERT

```json
// original_data
null

// modified_data
{
    "product_id": 103,
    "product_name": "Widget C",
    "quantity": 5,
    "unit_price": 50,
    "line_total": 250
}

// changed_fields
["product_id", "product_name", "quantity", "unit_price", "line_total"]
```

### 8.3 Log Entry for DELETE

```json
// original_data
{
    "id": 2,
    "order_id": 1,
    "product_id": 102,
    "product_name": "Widget B",
    "quantity": 20,
    "unit_price": 200,
    "line_total": 4000
}

// modified_data
null

// changed_fields
["id", "order_id", "product_id", "product_name", "quantity", "unit_price", "line_total"]
```

---

## 9. Key Features Summary

| Feature | Description |
|---------|-------------|
| **JSON Storage** | `original_data` and `modified_data` as JSONB for complete record state |
| **Parent-Child Support** | Single approval covers parent + all related children |
| **Entity Type** | Clear `PARENT` / `CHILD` differentiation |
| **Changed Fields Tracking** | Array of field names that changed (quick reference) |
| **FK Relationship** | `fk_column` and `fk_value` to track relationships |
| **Optimistic Locking** | Version check for both parent and child records |
| **Backward Compatible** | Simple `request_change()` still works for single-table changes |
| **Easy Comparison** | Views provide side-by-side original vs modified |
| **Scalable** | Same structure works for any parent-child relationship |
