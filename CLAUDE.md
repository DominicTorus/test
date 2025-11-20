# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application (ct003_cg_tg1_v8_next-ui) built with TypeScript and the Gravity UI component library. It's a low-code platform deployment using Torus, featuring dynamic form rendering, encryption support, and event-driven architecture. The app runs on a custom base path (`/ct003/cg/tg1/v8`) and uses port 4000 for development.

## Development Commands

```bash
# Start development server (runs on port 4000 with Turbopack)
npm run dev

# Build for production (uses Turbo mode)
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

Note: The build configuration ignores TypeScript and ESLint errors during builds (`ignoreBuildErrors: true`, `ignoreDuringBuilds: true`).

## Architecture

### Context Providers Hierarchy

The application uses a nested context provider structure (defined in `app/layout.tsx`):

```
GlobalProvider (GlobalContext.tsx - theming/branding)
  └─ GlobalThemeWrapper (theme wrapper)
      └─ EventBusProvider (EventBusContext.tsx - event bus)
          └─ GlobalContext (globalContext.tsx - component state)
              └─ ToasterClientProvider
```

**Important**: There are two different `GlobalContext` files:
- `context/GlobalContext.tsx`: Manages theme, language, direction, and branding (uses `useGlobal` hook)
- `app/globalContext.tsx`: Manages component states and page-level data (uses `TotalContext`)

### State Management Pattern

The app uses a centralized state management pattern via `TotalContext` in `app/globalContext.tsx`:
- Component states are stored with a pattern like `{componentName}{randomId}` (e.g., `group1d56d`, `ecom231c9`)
- Each component has corresponding Props state (e.g., `group1d56dProps`) containing validation, disabled, hidden, and refetch flags
- Screen-level states follow `{screenName}_v1Props` pattern
- DFD (data) states follow `dfd_{name}_v1Props` pattern

### Dynamic Component Loading

Pages like `app/test_v1/page.tsx` demonstrate the dynamic component pattern:
1. **Security/Authorization Check**: `securityCheck()` function calls `/UF/Orchestration` to verify access
2. **Data Fetching**: Retrieves DFD data via `/te/eventEmitter` with pagination support
3. **Conditional Rendering**: Components render only if user has appropriate access profile
4. **Code Execution**: Server-provided code can be executed via `codeExecution()` utility

### Event Bus System

The `EventBusContext` provides a publish-subscribe event system:
- **Type 1 (Global)**: Events broadcast to all listeners using `subscribeGlobal()`
- **Type 2 (Node-specific)**: Events targeted to specific components using `subscribe()` with `nodeId`
- Use `emit()` to dispatch events with optional `targetNodeId` for targeted delivery

### Encryption Flow

The app supports multiple encryption methods via Axios interceptors (`app/components/axiosService.tsx`):
- Request/response encryption controlled by `dpdKey` and `method` parameters
- Supported methods: `vault`, `AESGCM`
- Encryption context: `ct003_cg_tg1_v8`
- Interceptors automatically encrypt request bodies and decrypt responses when encryption flags are set

### File Naming Conventions

- **Pages**: Use descriptive names with version suffix (e.g., `test_v1`, `samplescreen_v1`)
- **Group Components**: Nested in directories like `app/test_v1/Groupgroup/`, `app/test_v1/Groupecom/`
- **Component Files**: Follow pattern `{ComponentType}{name}.tsx` (e.g., `CompanyCardcompany.tsx`, `Tableecom.tsx`)

## Key Configuration

- **Base Path**: `/ct003/cg/tg1/v8` (configured in `next.config.js`)
- **Output Mode**: `standalone` (for containerized deployments)
- **Dev Port**: 4000
- **API Base URL**: Set via `NEXT_PUBLIC_API_BASE_URL` environment variable
- **Path Aliases**: `@/*` maps to root directory

## Important Implementation Details

### Token Management
- Tokens stored in cookies via `getCookie()` and `deleteAllCookies()` utilities
- Token introspection via `/UF/introspect` endpoint checks authentication status
- Invalid tokens trigger logout and redirect to `/ct003/cg/tg1/v8`

### Theming System
- Uses Gravity UI's theming system with custom CSS variables
- Dynamic theme properties set on `document.documentElement.style`
- CSS variables: `--brand-color`, `--selection-color`, `--hover-color`, `--border-radius`, `--g--font-size`
- Supports light/dark modes and high-contrast variants

### Component Group Security
Pages implement group-level security where `allowedGroup` data from orchestration determines which component groups render. Check flags like `checkgroup`, `checkcgroup`, `checkecom` control visibility.

### Pagination
Pagination is centralized in `TotalContext` via `paginationDetails` state with `page` and `pageSize` properties, typically initialized from orchestration data.

## API Integration Patterns

Most API calls follow this structure:
1. Get token from cookies
2. Add encryption parameters (`dpdKey`, `method`) if `encryptionFlagPage` is true
3. Send request with `Authorization: Bearer ${token}` header
4. Handle errors with toast notifications
5. Update component state with response data

Common endpoints:
- `/UF/Orchestration`: Get page security and configuration
- `/UF/introspect`: Validate token
- `/UF/myAccount-for-client`: Get user account details
- `/te/eventEmitter`: Fetch DFD data with filtering
- `/UF/setUpKey`: Fetch appearance/theme setup

## Testing & Building

The project has TypeScript and ESLint checks disabled during builds. When making changes:
- Ensure code follows existing patterns (component state management, encryption handling)
- Test with encryption enabled/disabled scenarios
- Verify token-based authentication flows
- Check component visibility with different access profiles
