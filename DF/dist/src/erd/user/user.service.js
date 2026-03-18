"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const v = require("valibot");
const common_Service_1 = require("../../common.Service");
const prisma_error_handler_1 = require("../../prisma-error-handler");
const customException_1 = require("../../customException");
let userService = class userService {
    constructor(prismaService, commonService) {
        this.prismaService = prismaService;
        this.commonService = commonService;
        this.encryptedCols = {
            "user": []
        };
    }
    async encryptData(data, tableName, method) {
        let encryptedData = { ...data };
        const columns = this.encryptedCols[tableName];
        if (!columns)
            return encryptedData;
        for (const table of columns) {
            if (table?.column in data && table.dataType === 'String') {
                const encryptedValue = await this.commonService.encrypt(data[table.column], table.column);
                encryptedData[table.column] = encryptedValue;
            }
            else if (table?.column in data && table.dataType === 'childtable') {
                if (data[table.column][method] &&
                    !Array.isArray(data[table.column][method])) {
                    encryptedData[table.column][method] = await this.encryptData(data[table.column][method], table.column, method);
                }
                else if (data[table.column][method] &&
                    Array.isArray(data[table.column][method])) {
                    let tempArray = [];
                    for (const chlldArray of data[table.column][method]) {
                        tempArray.push(await this.encryptData(chlldArray, table.column, method));
                    }
                    encryptedData[table.column]['create'] = tempArray;
                }
            }
            else if (table?.column in data &&
                table.dataType === 'Object') {
                let encryptedValue;
                if (Object.keys(data[table.column])[0] == "some") {
                    encryptedValue = await this.encryptData(data[table.column].some, table?.interRelation, method);
                    encryptedData[table.column]["some"] = encryptedValue;
                }
                else if (Object.keys(data[table.column])[0] == "is") {
                    encryptedValue = await this.encryptData(data[table.column].is, table?.interRelation, method);
                    encryptedData[table.column]["is"] = encryptedValue;
                }
                else {
                    encryptedValue = await this.encryptData(data[table.column], table?.interRelation, method);
                    encryptedData[table.column] = encryptedValue;
                }
            }
            else if (table?.column in data &&
                table.dataType === 'Array' &&
                table?.interRelation != '') {
                let arrayObject = [];
                let check = data[table.column];
                if (!Array.isArray(check)) {
                    let encryptedValue;
                    if (Object.keys(check)[0] == "some") {
                        encryptedValue = await this.encryptData(check.some, table?.interRelation, method);
                        encryptedData[table.column]["some"] = encryptedValue;
                    }
                    if (Object.keys(check)[0] == "is") {
                        encryptedValue = await this.encryptData(check.is, table?.interRelation, method);
                        encryptedData[table.column]["is"] = encryptedValue;
                    }
                }
                else {
                    for (const eachObject of data[table.column]) {
                        const encryptedValue = await this.encryptData(eachObject, table?.interRelation, method);
                        arrayObject.push(encryptedValue);
                    }
                    encryptedData[table.column] = arrayObject;
                }
            }
        }
        return encryptedData;
    }
    async decryptData(data, tableName) {
        if (typeof data == 'string')
            return data;
        let encryptedData = { ...data };
        const columns = this.encryptedCols[tableName];
        if (!columns)
            return encryptedData;
        for (const table of columns) {
            if (table?.column in data && table.dataType == 'String') {
                if (data[table.column] != null &&
                    data[table?.column] != '' &&
                    data[table.column].startsWith('vault:')) {
                    const encryptedValue = await this.commonService.decrypt(data[table.column], table.column);
                    encryptedData[table.column] = encryptedValue;
                }
            }
        }
        for (const key in encryptedData) {
            if (typeof encryptedData[key] === 'object' &&
                encryptedData[key] !== null) {
                if (Array.isArray(encryptedData[key])) {
                    let arrayDocName = '';
                    this.encryptedCols[tableName].forEach((element) => {
                        if (element.column == key &&
                            element.interRelation != '' &&
                            element.dataType == 'Array') {
                            arrayDocName = element.interRelation;
                        }
                    });
                    if (arrayDocName != '') {
                        let tempArray = [];
                        for (const eachObject of encryptedData[key]) {
                            tempArray.push(await this.decryptData(eachObject, arrayDocName));
                        }
                        encryptedData[key] = tempArray;
                    }
                    else {
                        let tempArray = [];
                        for (const eachObject of encryptedData[key]) {
                            tempArray.push(await this.decryptData(eachObject, key));
                        }
                        encryptedData[key] = tempArray;
                    }
                }
                else if (Object.keys(encryptedData[key]).length > 0) {
                    let docName = '';
                    this.encryptedCols[tableName].forEach((element) => {
                        if (element.column == key &&
                            element.interRelation != '' &&
                            (element.dataType == 'Object' || element.dataType == 'Array')) {
                            docName = element.interRelation;
                        }
                    });
                    if (docName != '') {
                        encryptedData[key] = await this.decryptData(encryptedData[key], docName);
                    }
                    else {
                        encryptedData[key] = await this.decryptData(encryptedData[key], key);
                    }
                }
            }
        }
        return encryptedData;
    }
    async findSchema(token) {
        const data = {
            user_id: "number",
            name: "string",
            email: "string",
            designation: "string",
            trs_created_date: "Date",
            trs_created_by: "string",
            trs_modified_date: "Date",
            trs_modified_by: "string",
            trs_next_status: "string",
            trs_status: "string",
            trs_process_id: "string",
            trs_access_profile: "string",
            trs_org_grp_code: "string",
            trs_org_code: "string",
            trs_role_grp_code: "string",
            trs_role_code: "string",
            trs_ps_grp_code: "string",
            trs_ps_code: "string",
            trs_sub_org_grp_code: "string",
            trs_sub_org_code: "string"
        };
        return data;
    }
    async findAllmethod(queryDto, limit, selectColumns, token) {
        try {
            let queryCondition = {};
            let queryValue = {};
            let columns = {};
            selectColumns.forEach(element => {
                columns[element] = true;
            });
            Object.keys(queryDto).forEach((key) => {
                if (key.includes('-')) {
                    queryCondition[key.split('-')[0]] = key.split('-')[1];
                    queryValue[key.split('-')[0]] = queryDto[key];
                }
            });
            const { page } = queryDto;
            let query = {};
            const { user_id } = queryValue;
            const { name } = queryValue;
            const { email } = queryValue;
            const { designation } = queryValue;
            if (user_id) {
                query.user_id = { [queryCondition['user_id']]: user_id };
            }
            if (name) {
                query.name = { [queryCondition['name']]: name };
            }
            if (email) {
                query.email = { [queryCondition['email']]: email };
            }
            if (designation) {
                query.designation = { [queryCondition['designation']]: designation };
            }
            const skip = (page - 1) * limit;
            if (Object.keys(query).length > 0) {
                const banks = await this.prismaService.user.findMany({
                    select: columns,
                    where: query,
                });
                let decryptedRes = [];
                for (const indiviual of banks) {
                    const decryptedData = await this.decryptData(indiviual, 'user');
                    decryptedRes.push(decryptedData);
                }
                return decryptedRes;
            }
            if (!skip && !limit && Object.keys(query).length == 0) {
                const banks = await this.prismaService.user.findMany({
                    select: columns,
                });
                let decryptedRes = [];
                for (const indiviual of banks) {
                    const decryptedData = await this.decryptData(indiviual, 'user');
                    decryptedRes.push(decryptedData);
                }
                return decryptedRes;
            }
            const banks = await this.prismaService.user.findMany({
                select: columns,
                where: query,
                skip: skip,
                take: limit,
            });
            const totalItems = await this.prismaService.user.count({
                where: query,
            });
            let decryptedRes = [];
            for (const indiviual of banks) {
                const decryptedData = await this.decryptData(indiviual, 'user');
                decryptedRes.push(decryptedData);
            }
            return {
                items: decryptedRes,
                totalPages: Math.ceil(totalItems / limit),
            };
        }
        catch (error) {
            const errorMessage = 'Error in findAllmethod';
            await this.commonService.errorLog("Technical", 'AK', 'Fatal', "TG020", error, "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:RD001:AFGK:RDS001:AFK:Sample_ERD:AFVK:v1", token);
            throw new customException_1.CustomException(errorMessage, error);
        }
    }
    async findOne(user_id, token) {
        try {
            const res = await this.prismaService.user.findUnique({
                where: { user_id },
                select: { user_id: true, name: true, email: true, designation: true, trs_created_date: true,
                    trs_created_by: true,
                    trs_modified_date: true,
                    trs_modified_by: true,
                    trs_next_status: true,
                    trs_status: true,
                    trs_process_id: true,
                    trs_access_profile: true,
                    trs_org_grp_code: true,
                    trs_org_code: true,
                    trs_role_grp_code: true,
                    trs_role_code: true,
                    trs_ps_grp_code: true,
                    trs_ps_code: true,
                    trs_sub_org_code: true,
                    trs_sub_org_grp_code: true
                }
            });
            return await this.decryptData(res, 'user');
        }
        catch (error) {
            const errorMessage = 'Error in findOne';
            await this.commonService.errorLog("Technical", 'AK', 'Fatal', "TG024", error, "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:RD001:AFGK:RDS001:AFK:Sample_ERD:AFVK:v1", token);
            throw new customException_1.CustomException(errorMessage, error);
        }
    }
    async findAll(token, trs_created_date, trs_created_by, trs_modified_date, trs_modified_by, trs_next_status, trs_status, trs_process_id, trs_access_profile, trs_org_grp_code, trs_org_code, trs_role_grp_code, trs_role_code, trs_ps_grp_code, trs_ps_code, trs_sub_org_grp_code, trs_sub_org_code, user_id) {
        try {
            const whereClause = {};
            if (trs_created_date) {
                whereClause.trs_created_date = trs_created_date;
            }
            if (trs_created_by) {
                whereClause.trs_created_by = trs_created_by;
            }
            if (trs_modified_date) {
                whereClause.trs_modified_date = trs_modified_date;
            }
            if (trs_modified_by) {
                whereClause.trs_modified_by = trs_modified_by;
            }
            if (trs_next_status) {
                whereClause.trs_next_status = trs_next_status;
            }
            if (trs_status) {
                whereClause.trs_status = trs_status;
            }
            if (trs_process_id) {
                whereClause.trs_process_id = trs_process_id;
            }
            if (trs_access_profile) {
                whereClause.trs_access_profile = trs_access_profile;
            }
            if (trs_org_grp_code) {
                whereClause.trs_org_grp_code = trs_org_grp_code;
            }
            if (trs_org_code) {
                whereClause.trs_org_code = trs_org_code;
            }
            if (trs_role_grp_code) {
                whereClause.trs_role_grp_code = trs_role_grp_code;
            }
            if (trs_role_code) {
                whereClause.trs_role_code = trs_role_code;
            }
            if (trs_ps_grp_code) {
                whereClause.trs_ps_grp_code = trs_ps_grp_code;
            }
            if (trs_ps_code) {
                whereClause.trs_ps_code = trs_ps_code;
            }
            if (trs_sub_org_grp_code) {
                whereClause.trs_sub_org_grp_code = trs_sub_org_grp_code;
            }
            if (trs_sub_org_code) {
                whereClause.trs_sub_org_code = trs_sub_org_code;
            }
            if (user_id) {
                whereClause.user_id = user_id;
            }
            const res = await this.prismaService.user.findMany({
                where: whereClause,
                select: { user_id: true, name: true, email: true, designation: true, trs_created_date: true,
                    trs_created_by: true,
                    trs_modified_date: true,
                    trs_modified_by: true,
                    trs_next_status: true,
                    trs_status: true,
                    trs_process_id: true,
                    trs_access_profile: true,
                    trs_org_grp_code: true,
                    trs_org_code: true,
                    trs_role_grp_code: true,
                    trs_role_code: true,
                    trs_ps_grp_code: true,
                    trs_ps_code: true,
                    trs_sub_org_code: true,
                    trs_sub_org_grp_code: true
                }
            });
            let decryptedRes = [];
            for (const indiviual of res) {
                const decryptedData = await this.decryptData(indiviual, 'user');
                decryptedRes.push(decryptedData);
            }
            return decryptedRes;
        }
        catch (error) {
            const errorMessage = 'find All Error';
            await this.commonService.errorLog("Technical", 'AK', 'Fatal', "TG023", error, "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:RD001:AFGK:RDS001:AFK:Sample_ERD:AFVK:v1", token);
            throw new customException_1.CustomException(errorMessage, error);
        }
    }
    async create(createuserDto, token) {
        try {
            const dataSchema = v.object({
                name: v.optional(v.string()),
                email: v.optional(v.string()),
                designation: v.optional(v.string()),
            });
            let validate = v.safeParse(dataSchema, createuserDto);
            if (!validate.success) {
                let errorObj = {
                    tname: 'TG',
                    errGrp: 'Data',
                    fabric: 'DF',
                    errType: 'Fatal',
                    errCode: 'TG101',
                };
                const errorMessage = validate.issues[0].message;
                await this.commonService.errorLog("Technical", 'AK', 'Fatal', "TG021", errorMessage, "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:RD001:AFGK:RDS001:AFK:Sample_ERD:AFVK:v1", token);
            }
            const res = await this.prismaService.user.create({
                data: await this.encryptData(createuserDto, 'user', 'create'),
                select: { user_id: true, name: true, email: true, designation: true, trs_created_date: true, trs_created_by: true, trs_modified_date: true, trs_modified_by: true, trs_next_status: true, trs_status: true, trs_process_id: true, trs_access_profile: true, trs_org_grp_code: true, trs_org_code: true, trs_role_grp_code: true, trs_role_code: true, trs_ps_grp_code: true, trs_ps_code: true, trs_sub_org_code: true, trs_sub_org_grp_code: true }
            });
            return await this.decryptData(res, 'user');
        }
        catch (error) {
            const errMsg = (0, prisma_error_handler_1.parsePrismaCreateError)(error);
            const errorMessage = 'Create Error';
            await this.commonService.errorLog("Technical", 'AK', 'Fatal', "TG022", errMsg, "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:RD001:AFGK:RDS001:AFK:Sample_ERD:AFVK:v1", token);
            throw new common_1.InternalServerErrorException(errMsg);
        }
    }
    async createMaster(createuserDto, userInfo, token) {
        try {
            const role = userInfo.role?.toUpperCase();
            const approvalStatus = userInfo.approvalStatus?.toUpperCase();
            if (role === 'CHECKER') {
                const approvalId = userInfo.approvalId;
                if (!approvalId) {
                    throw new common_1.HttpException('approval_id is required for CHECKER role', common_1.HttpStatus.BAD_REQUEST);
                }
                if (approvalStatus === 'APPROVED') {
                    const result = await this.prismaService.$queryRaw `
            SELECT ct006_torus202610.approve_change(
              ${+approvalId},
              ${userInfo.username},
              ${userInfo.remarks || null}
            ) AS success
          `;
                    const success = result[0]?.success;
                    if (success) {
                        return {
                            success: true,
                            message: 'user creation approved and applied successfully',
                            approval_id: approvalId,
                            status: 'APPROVED'
                        };
                    }
                    else {
                        return {
                            success: false,
                            message: 'Approval failed - please check for version conflicts or missing records',
                            approval_id: approvalId,
                            status: 'FAILED'
                        };
                    }
                }
                else if (approvalStatus === 'REJECTED') {
                    const result = await this.prismaService.$queryRaw `
            SELECT ct006_torus202610.reject_change(
              ${+approvalId},
              ${userInfo.username},
              ${userInfo.remarks || null}
            ) AS success
          `;
                    const success = result[0]?.success;
                    if (success) {
                        return {
                            success: true,
                            message: 'user creation rejected',
                            approval_id: approvalId,
                            status: 'REJECTED'
                        };
                    }
                    else {
                        return {
                            success: false,
                            message: 'Approval failed - please check for version conflicts or missing records',
                            approval_id: approvalId,
                            status: 'FAILED'
                        };
                    }
                }
            }
            const dataSchema = v.object({
                name: v.optional(v.string()),
                email: v.optional(v.string()),
                designation: v.optional(v.string()),
            });
            let validate = v.safeParse(dataSchema, createuserDto);
            if (!validate.success) {
                let errorObj = {
                    tname: 'TG',
                    errGrp: 'Data',
                    fabric: 'DF',
                    errType: 'Fatal',
                    errCode: 'TG101',
                };
                const errorMessage = validate.issues[0].message;
                await this.commonService.errorLog("Technical", 'AK', 'Fatal', "TG021", errorMessage, "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:RD001:AFGK:RDS001:AFK:Sample_ERD:AFVK:v1", token);
                throw new common_1.HttpException(errorMessage, common_1.HttpStatus.BAD_REQUEST);
            }
            const encryptedData = await this.encryptData(createuserDto, 'user', 'create');
            encryptedData['trs_modified_date'] = new Date();
            if (role === 'MAKER') {
                const result = await this.prismaService.$queryRaw `
          SELECT ct006_torus202610.request_change(
            p_table_name     := 'user',
            p_operation_type := 'INSERT',
            p_record_id      := NULL,
            p_record_id_column := 'user_id',
            p_changes        := ${encryptedData}::JSONB,
            p_maker_id       := ${userInfo.username},
            p_maker_remarks  := ${userInfo.remarks || null},
            p_schema    := 'ct003_rds001'
          ) AS approval_id
        `;
                const approvalId = result[0]?.approval_id;
                return {
                    success: true,
                    message: 'user creation request submitted for approval',
                    approval_id: approvalId,
                    status: 'CREATED'
                };
            }
        }
        catch (error) {
            const errorMessage = 'Error in createMaster';
            await this.commonService.errorLog("Technical", 'AK', 'Fatal', "TG031", error, "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:RD001:AFGK:RDS001:AFK:Sample_ERD:AFVK:v1", token);
            if (error.message?.includes('Maker and checker cannot be the same')) {
                throw new common_1.HttpException('You cannot approve your own request', common_1.HttpStatus.FORBIDDEN);
            }
            if (error.message?.includes('Cannot approve record with status')) {
                throw new common_1.HttpException('This request has already been processed', common_1.HttpStatus.BAD_REQUEST);
            }
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new customException_1.CustomException(errorMessage, error);
        }
    }
    async update(user_id, updateuserDto, token) {
        try {
            const dataSchema = v.object({
                name: v.optional(v.string()),
                email: v.optional(v.string()),
                designation: v.optional(v.string()),
            });
            let validate = v.safeParse(dataSchema, updateuserDto);
            if (!validate.success) {
                let errorObj = {
                    tname: 'TG',
                    errGrp: 'Data',
                    fabric: 'DF',
                    errType: 'Fatal',
                    errCode: 'TG101',
                };
                const errorMessage = validate.issues[0].message;
                await this.commonService.errorLog("Technical", 'AK', 'Fatal', "TG025", errorMessage, "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:RD001:AFGK:RDS001:AFK:Sample_ERD:AFVK:v1", token);
            }
            const res = await this.prismaService.user.update({
                where: { user_id },
                data: await this.encryptData(updateuserDto, 'user', 'update'),
                select: { user_id: true, name: true, email: true, designation: true, trs_created_date: true, trs_created_by: true, trs_modified_date: true, trs_modified_by: true, trs_next_status: true, trs_status: true, trs_process_id: true, trs_access_profile: true, trs_org_grp_code: true, trs_org_code: true, trs_role_grp_code: true, trs_role_code: true, trs_ps_grp_code: true, trs_ps_code: true, trs_sub_org_code: true, trs_sub_org_grp_code: true }
            });
            return await this.decryptData(res, 'user');
        }
        catch (error) {
            const errorMessage = 'update Error';
            await this.commonService.errorLog("Technical", 'AK', 'Fatal', "TG023", error, "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:RD001:AFGK:RDS001:AFK:Sample_ERD:AFVK:v1", token);
            throw new customException_1.CustomException(errorMessage, error);
        }
    }
    async updateMaster(user_id, updateuserDto, userInfo, token) {
        try {
            const role = userInfo.role?.toUpperCase();
            const updateMaster_id = user_id;
            if (role === 'CHECKER') {
                if (!updateMaster_id) {
                    throw new common_1.HttpException('id is required for CHECKER role', common_1.HttpStatus.BAD_REQUEST);
                }
                if (userInfo.approvalStatus === 'APPROVED') {
                    const result = await this.prismaService.$queryRaw `
          SELECT * FROM ct006_torus202610.approve_change_by_record(
              p_table_name      := 'user',
              p_record_id       := ${updateMaster_id.toString()},
              p_checker_id      := ${userInfo.username},
              p_checker_remarks := ${userInfo.remarks || null}
          );
        `;
                    const success = result[0]?.success;
                    const approvalId = result[0]?.approval_id;
                    if (success) {
                        return {
                            success: true,
                            message: 'user update approved and applied successfully',
                            approvalId: approvalId,
                            record_id: updateMaster_id,
                            status: 'APPROVED'
                        };
                    }
                    else {
                        return {
                            success: false,
                            message: 'Approval failed - please check for version conflicts or missing records',
                            approvalId: approvalId,
                            record_id: updateMaster_id,
                            status: 'FAILED'
                        };
                    }
                }
                else if (userInfo.approvalStatus === 'REJECTED') {
                    const result = await this.prismaService.$queryRaw `
            SELECT * FROM ct006_torus202610.reject_change_by_record(
                p_table_name      := 'user',
                p_record_id       := ${updateMaster_id.toString()},
                p_checker_id      := ${userInfo.username},
                p_checker_remarks := ${userInfo.remarks || null}
            );
          `;
                    const success = result[0]?.success;
                    const approvalId = result[0]?.approval_id;
                    if (success) {
                        return {
                            success: true,
                            message: 'user update rejected',
                            approvalId: approvalId,
                            record_id: updateMaster_id,
                            status: 'REJECTED'
                        };
                    }
                    else {
                        return {
                            success: false,
                            message: 'Approval failed - please check for version conflicts or missing records',
                            approvalId: approvalId,
                            record_id: updateMaster_id,
                            status: 'FAILED'
                        };
                    }
                }
            }
            const dataSchema = v.object({
                name: v.optional(v.string()),
                email: v.optional(v.string()),
                designation: v.optional(v.string()),
            });
            let validate = v.safeParse(dataSchema, updateuserDto);
            if (!validate.success) {
                const errorMessage = validate.issues[0].message;
                await this.commonService.errorLog("Technical", 'AK', 'Fatal', "TG025", errorMessage, "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:RD001:AFGK:RDS001:AFK:Sample_ERD:AFVK:v1", token);
                throw new common_1.HttpException(errorMessage, common_1.HttpStatus.BAD_REQUEST);
            }
            const existingRecord = await this.prismaService.user.findUnique({
                where: { user_id }
            });
            if (!existingRecord) {
                throw new common_1.HttpException('Record not found', common_1.HttpStatus.NOT_FOUND);
            }
            const encryptedData = await this.encryptData(updateuserDto, 'user', 'update');
            const result = await this.prismaService.$queryRaw `
        SELECT ct006_torus202610.request_change(
          p_table_name     := 'user',
          p_operation_type := 'UPDATE',
          p_record_id      := ${updateMaster_id.toString()},
          p_record_id_column := 'user_id',
          p_changes        := ${encryptedData}::JSONB,
          p_maker_id       := ${userInfo.username},
          p_maker_remarks  := ${userInfo.remarks || null},
          p_schema    := 'ct003_rds001'
        ) AS approval_id
      `;
            const approvalId = result[0]?.approval_id;
            return {
                success: true,
                message: 'user update request submitted for approval',
                approval_id: approvalId,
                record_id: updateMaster_id,
                status: 'CREATED'
            };
        }
        catch (error) {
            const errorMessage = 'Error in updateMaster';
            await this.commonService.errorLog("Technical", 'AK', 'Fatal', "TG033", error, "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:RD001:AFGK:RDS001:AFK:Sample_ERD:AFVK:v1", token);
            if (error.message?.includes('Maker and checker cannot be the same')) {
                throw new common_1.HttpException('You cannot approve your own request', common_1.HttpStatus.FORBIDDEN);
            }
            if (error.message?.includes('Cannot approve record with status')) {
                throw new common_1.HttpException('This request has already been processed', common_1.HttpStatus.BAD_REQUEST);
            }
            if (error.message?.includes('pending request already exists')) {
                throw new common_1.HttpException('A pending request already exists for this record', common_1.HttpStatus.CONFLICT);
            }
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new customException_1.CustomException(errorMessage, error);
        }
    }
    async remove(user_id, token) {
        try {
            const res = await this.prismaService.user.delete({
                where: { user_id },
                select: { user_id: true, name: true, email: true, designation: true, trs_created_date: true, trs_created_by: true, trs_modified_date: true, trs_modified_by: true, trs_next_status: true, trs_status: true, trs_process_id: true, trs_access_profile: true, trs_org_grp_code: true, trs_org_code: true, trs_role_grp_code: true, trs_role_code: true, trs_ps_grp_code: true, trs_ps_code: true, trs_sub_org_code: true, trs_sub_org_grp_code: true }
            });
            return res;
        }
        catch (error) {
            const errorMessage = 'Error in remove Data';
            await this.commonService.errorLog("Technical", 'AK', 'Fatal', "TG026", error, "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:RD001:AFGK:RDS001:AFK:Sample_ERD:AFVK:v1", token);
            throw new customException_1.CustomException(errorMessage, error);
        }
    }
    async deleteMaster(user_id, userInfo, token) {
        try {
            const role = userInfo.role?.toUpperCase();
            const deleteMaster_id = user_id;
            if (role === 'CHECKER') {
                if (!deleteMaster_id) {
                    throw new common_1.HttpException('id is required for CHECKER role', common_1.HttpStatus.BAD_REQUEST);
                }
                if (userInfo.approvalStatus === 'APPROVED') {
                    const result = await this.prismaService.$queryRaw `
          SELECT * FROM ct006_torus202610.approve_change_by_record(
              p_table_name      := 'user',
              p_record_id       := ${deleteMaster_id.toString()},
              p_checker_id      := ${userInfo.username},
              p_checker_remarks := ${userInfo.remarks || null}
          );
        `;
                    const success = result[0]?.success;
                    const approvalId = result[0]?.approval_id;
                    if (success) {
                        return {
                            success: true,
                            message: 'user deletion approved and applied successfully',
                            approval_id: approvalId,
                            record_id: deleteMaster_id,
                            status: 'APPROVED'
                        };
                    }
                    else {
                        return {
                            success: false,
                            message: 'Approval failed - please check for version conflicts or missing records',
                            approval_id: approvalId,
                            record_id: deleteMaster_id,
                            status: 'FAILED'
                        };
                    }
                }
                else if (userInfo.approvalStatus === 'REJECTED') {
                    const result = await this.prismaService.$queryRaw `
            SELECT * FROM ct006_torus202610.reject_change_by_record(
                p_table_name      := 'user',
                p_record_id       := ${deleteMaster_id.toString()},
                p_checker_id      := ${userInfo.username},
                p_checker_remarks := ${userInfo.remarks || null}
            );
          `;
                    const success = result[0]?.success;
                    const approvalId = result[0]?.approval_id;
                    if (success) {
                        return {
                            success: true,
                            message: 'user deletion rejected',
                            approval_id: approvalId,
                            record_id: deleteMaster_id,
                            status: 'REJECTED'
                        };
                    }
                    else {
                        return {
                            success: false,
                            message: 'Approval failed - please check for version conflicts or missing records',
                            approval_id: approvalId,
                            record_id: deleteMaster_id,
                            status: 'FAILED'
                        };
                    }
                }
            }
            const existingRecord = await this.prismaService.user.findUnique({
                where: { user_id }
            });
            if (!existingRecord) {
                throw new common_1.HttpException('Record not found', common_1.HttpStatus.NOT_FOUND);
            }
            const result = await this.prismaService.$queryRaw `
        SELECT ct006_torus202610.request_change(
          p_table_name     := 'user',
          p_operation_type := 'DELETE',
          p_record_id      := ${deleteMaster_id.toString()},
          p_record_id_column := 'user_id',
          p_changes        := '{}'::JSONB,
          p_maker_id       := ${userInfo.username},
          p_maker_remarks  := ${userInfo.remarks || null},
          p_schema    := 'ct003_rds001'
        ) AS approval_id
      `;
            const approvalId = result[0]?.approval_id;
            return {
                success: true,
                message: 'user deletion request submitted for approval',
                approval_id: approvalId,
                record_id: deleteMaster_id,
                status: 'CREATED'
            };
        }
        catch (error) {
            const errorMessage = 'Error in deleteMaster';
            await this.commonService.errorLog("Technical", 'AK', 'Fatal', "TG034", error, "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:RD001:AFGK:RDS001:AFK:Sample_ERD:AFVK:v1", token);
            if (error.message?.includes('Maker and checker cannot be the same')) {
                throw new common_1.HttpException('You cannot approve your own request', common_1.HttpStatus.FORBIDDEN);
            }
            if (error.message?.includes('Cannot approve record with status')) {
                throw new common_1.HttpException('This request has already been processed', common_1.HttpStatus.BAD_REQUEST);
            }
            if (error.message?.includes('pending request already exists')) {
                throw new common_1.HttpException('A pending request already exists for this record', common_1.HttpStatus.CONFLICT);
            }
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new customException_1.CustomException(errorMessage, error);
        }
    }
    async findFirst(token) {
        try {
            const res = await this.prismaService.user.findFirst({
                orderBy: { trs_created_date: 'asc' },
            });
            return await this.decryptData(res, 'user');
        }
        catch (error) {
            const errorMessage = 'Error in findFirst';
            await this.commonService.errorLog("Technical", 'AK', 'Fatal', "TG028", error, "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:RD001:AFGK:RDS001:AFK:Sample_ERD:AFVK:v1", token);
            throw new customException_1.CustomException(errorMessage, error);
        }
    }
    async findLast(token) {
        try {
            const res = await this.prismaService.user.findFirst({
                orderBy: { trs_created_date: 'desc' },
            });
            return await this.decryptData(res, 'user');
        }
        catch (error) {
            const errorMessage = 'Error in findLast';
            await this.commonService.errorLog("Technical", 'AK', 'Fatal', "TG028", error, "CK:CT003:FNGK:AF:FNK:API-ERD:CATK:RD001:AFGK:RDS001:AFK:Sample_ERD:AFVK:v1", token);
            throw new customException_1.CustomException(errorMessage, error);
        }
    }
};
exports.userService = userService;
exports.userService = userService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        common_Service_1.CommonService])
], userService);
//# sourceMappingURL=user.service.js.map