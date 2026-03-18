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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("./entity/user.entity");
const Createuser_dto_1 = require("./dto/Createuser.dto");
const Updateuser_dto_1 = require("./dto/Updateuser.dto");
const class_transformer_1 = require("class-transformer");
const uf_service_1 = require("../../Torus/v2/uf/uf.service");
let userController = class userController {
    constructor(userService, ufservice) {
        this.userService = userService;
        this.ufservice = ufservice;
    }
    async findSchema(authHeader, req) {
        const token = req.headers?.authorization?.split(' ')[1];
        return this.userService.findSchema(token);
    }
    async findAllmethod(authHeader, query, body, req) {
        const token = req.headers?.authorization?.split(' ')[1];
        const { limit } = query;
        const { selectColumns } = body;
        return this.userService.findAllmethod(query, +limit, selectColumns, token);
    }
    async findOne(authHeader, user_id, req) {
        const token = req.headers?.authorization?.split(' ')[1];
        const result = this.userService.findOne(+user_id, token);
        return (0, class_transformer_1.plainToInstance)(user_entity_1.userEntity, result);
    }
    async findAll(authHeader, req, trs_created_date, trs_created_by, trs_modified_date, trs_modified_by, trs_next_status, trs_status, trs_process_id, trs_access_profile, trs_org_grp_code, trs_org_code, trs_role_grp_code, trs_role_code, trs_ps_grp_code, trs_ps_code, trs_sub_org_grp_code, trs_sub_org_code, user_id, query) {
        const token = req.headers?.authorization?.split(' ')[1];
        let presentQueryKeys = [
            'user_id',
            "trs_created_date",
            "trs_created_by",
            "trs_modified_date",
            "trs_modified_by",
            "trs_next_status",
            "trs_status",
            "trs_process_id",
            "trs_access_profile",
            "trs_org_grp_code",
            "trs_org_code",
            "trs_role_grp_code",
            "trs_role_code",
            "trs_ps_grp_code",
            "trs_ps_code",
            "trs_sub_org_grp_code",
            "trs_sub_org_code"
        ];
        let comingQueryKeys = Object.keys(query) || [];
        let isComingQuerysAreValid = true;
        if (comingQueryKeys.length == 0) {
            isComingQuerysAreValid = true;
        }
        if (comingQueryKeys.length > presentQueryKeys.length) {
            isComingQuerysAreValid = false;
        }
        for (let i = 0; i < comingQueryKeys.length; i++) {
            if (!presentQueryKeys.includes(comingQueryKeys[i])) {
                isComingQuerysAreValid = false;
            }
        }
        if (req.originalUrl.includes('?') && req.originalUrl.split('?')[1].includes('/') || isComingQuerysAreValid == false) {
            throw new common_1.NotFoundException('Invalid query parameter structure.');
        }
        const result = this.userService.findAll(token, trs_created_date, trs_created_by, trs_modified_date, trs_modified_by, trs_next_status, trs_status, trs_process_id, trs_access_profile, trs_org_grp_code, trs_org_code, trs_role_grp_code, trs_role_code, trs_ps_grp_code, trs_ps_code, trs_sub_org_grp_code, trs_sub_org_code, +user_id);
        return (0, class_transformer_1.plainToInstance)(user_entity_1.userEntity, result);
    }
    async create(mcRole, mcUsername, mcRemarks, mcApprovalStatus, mcApprovalID, authHeader, createuserDto, req) {
        const token = req.headers?.authorization?.split(' ')[1];
        if (mcRole && mcUsername) {
            const makerInfo = { role: mcRole, username: mcUsername, remarks: mcRemarks, approvalStatus: mcApprovalStatus, approvalId: mcApprovalID };
            const result = await this.userService.createMaster(createuserDto, makerInfo, token);
            return result;
        }
        const result = this.userService.create(createuserDto, token);
        return (0, class_transformer_1.plainToInstance)(user_entity_1.userEntity, result);
    }
    async update(mcRole, mcUsername, mcRemarks, mcApprovalStatus, authHeader, user_id, updateuserDto, req) {
        const token = req.headers?.authorization?.split(' ')[1];
        if (mcRole && mcUsername) {
            const makerInfo = { role: mcRole, username: mcUsername, remarks: mcRemarks, approvalStatus: mcApprovalStatus };
            const result = await this.userService.updateMaster(+user_id, updateuserDto, makerInfo, token);
            return result;
        }
        const result = this.userService.update(+user_id, updateuserDto, token);
        return (0, class_transformer_1.plainToInstance)(user_entity_1.userEntity, result);
    }
    async remove(mcRole, mcUsername, mcRemarks, mcApprovalStatus, authHeader, user_id, req) {
        const token = req.headers?.authorization?.split(' ')[1];
        if (mcRole && mcUsername) {
            const makerInfo = { role: mcRole, username: mcUsername, remarks: mcRemarks, approvalStatus: mcApprovalStatus };
            const result = await this.userService.deleteMaster(+user_id, makerInfo, token);
            return result;
        }
        const result = this.userService.remove(+user_id, token);
        return (0, class_transformer_1.plainToInstance)(user_entity_1.userEntity, result);
    }
    async findFirst(authHeader, params, req) {
        const token = req.headers?.authorization?.split(' ')[1];
        const result = this.userService.findFirst(token);
        return (0, class_transformer_1.plainToInstance)(user_entity_1.userEntity, result);
    }
    async findLast(authHeader, params, req) {
        const token = req.headers?.authorization?.split(' ')[1];
        const result = this.userService.findLast(token);
        return (0, class_transformer_1.plainToInstance)(user_entity_1.userEntity, result);
    }
};
exports.userController = userController;
__decorate([
    (0, common_1.Get)("/schema"),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOkResponse)({ type: user_entity_1.userEntity }),
    (0, swagger_1.ApiOperation)({
        summary: 'schema validation',
        description: 'Retrive the datatype of the user table',
    }),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], userController.prototype, "findSchema", null);
__decorate([
    (0, common_1.Get)('/get'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOkResponse)({ type: user_entity_1.userEntity, isArray: true }),
    (0, swagger_1.ApiOperation)({
        summary: 'Filter the records',
        description: 'Filter all the records from the user table',
    }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Number of records to fetch' }),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], userController.prototype, "findAllmethod", null);
__decorate([
    (0, common_1.Get)(':user_id'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiParam)({ name: 'user_id', type: Number }),
    (0, swagger_1.ApiOkResponse)({ type: user_entity_1.userEntity }),
    (0, swagger_1.ApiOperation)({
        summary: 'Fetch the only one record',
        description: 'Read only one records from the user table',
    }),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Param)('user_id')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", Promise)
], userController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiQuery)({ name: 'user_id', required: false, type: Number }),
    (0, swagger_1.ApiOkResponse)({ type: user_entity_1.userEntity, isArray: true }),
    (0, swagger_1.ApiOperation)({
        summary: 'Read all the records',
        description: 'Read all the records from the user table',
    }),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Query)("trs_created_date")),
    __param(3, (0, common_1.Query)("trs_created_by")),
    __param(4, (0, common_1.Query)("trs_modified_date")),
    __param(5, (0, common_1.Query)("trs_modified_by")),
    __param(6, (0, common_1.Query)("trs_next_status")),
    __param(7, (0, common_1.Query)("trs_status")),
    __param(8, (0, common_1.Query)("trs_process_id")),
    __param(9, (0, common_1.Query)("trs_access_profile")),
    __param(10, (0, common_1.Query)("trs_org_grp_code")),
    __param(11, (0, common_1.Query)("trs_org_code")),
    __param(12, (0, common_1.Query)("trs_role_grp_code")),
    __param(13, (0, common_1.Query)("trs_role_code")),
    __param(14, (0, common_1.Query)("trs_ps_grp_code")),
    __param(15, (0, common_1.Query)("trs_ps_code")),
    __param(16, (0, common_1.Query)("trs_sub_org_grp_code")),
    __param(17, (0, common_1.Query)("trs_sub_org_code")),
    __param(18, (0, common_1.Query)('user_id')),
    __param(19, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Date, String, Date, String, String, String, String, String, String, String, String, String, String, String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], userController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiHeader)({ name: 'xCdcaRole', required: false }),
    (0, swagger_1.ApiHeader)({ name: 'xCdcaUsername', required: false }),
    (0, swagger_1.ApiHeader)({ name: 'xCdcaRemarks', required: false }),
    (0, swagger_1.ApiHeader)({ name: 'xCdcaApprovalStatus', required: false }),
    (0, swagger_1.ApiHeader)({ name: 'xCdcaApprovalID', required: false }),
    (0, swagger_1.ApiBody)({ type: Createuser_dto_1.CreateuserDto }),
    (0, swagger_1.ApiCreatedResponse)({ type: user_entity_1.userEntity }),
    (0, swagger_1.ApiOperation)({
        summary: 'Create the record',
        description: 'Create the record for the user table',
    }),
    __param(0, (0, common_1.Headers)('xCdcaRole')),
    __param(1, (0, common_1.Headers)('xCdcaUsername')),
    __param(2, (0, common_1.Headers)('xCdcaRemarks')),
    __param(3, (0, common_1.Headers)('xCdcaApprovalStatus')),
    __param(4, (0, common_1.Headers)('xCdcaApprovalID')),
    __param(5, (0, common_1.Headers)()),
    __param(6, (0, common_1.Body)()),
    __param(7, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], userController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':user_id'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiParam)({ name: 'user_id', type: Number }),
    (0, swagger_1.ApiHeader)({ name: 'xCdcaRole', required: false }),
    (0, swagger_1.ApiHeader)({ name: 'xCdcaUsername', required: false }),
    (0, swagger_1.ApiHeader)({ name: 'xCdcaRemarks', required: false }),
    (0, swagger_1.ApiHeader)({ name: 'xCdcaApprovalStatus', required: false }),
    (0, swagger_1.ApiBody)({ type: Updateuser_dto_1.UpdateuserDto }),
    (0, swagger_1.ApiOkResponse)({ type: user_entity_1.userEntity }),
    (0, swagger_1.ApiOperation)({
        summary: 'Update the record',
        description: 'Update the record for the user table',
    }),
    __param(0, (0, common_1.Headers)('xCdcaRole')),
    __param(1, (0, common_1.Headers)('xCdcaUsername')),
    __param(2, (0, common_1.Headers)('xCdcaRemarks')),
    __param(3, (0, common_1.Headers)('xCdcaApprovalStatus')),
    __param(4, (0, common_1.Headers)()),
    __param(5, (0, common_1.Param)('user_id')),
    __param(6, (0, common_1.Body)()),
    __param(7, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], userController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':user_id'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiParam)({ name: 'user_id', type: Number }),
    (0, swagger_1.ApiHeader)({ name: 'xCdcaRole', required: false }),
    (0, swagger_1.ApiHeader)({ name: 'xCdcaUsername', required: false }),
    (0, swagger_1.ApiHeader)({ name: 'xCdcaRemarks', required: false }),
    (0, swagger_1.ApiHeader)({ name: 'xCdcaApprovalStatus', required: false }),
    (0, swagger_1.ApiOkResponse)({ type: user_entity_1.userEntity }),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete the record',
        description: 'Delete the record for the user table',
    }),
    __param(0, (0, common_1.Headers)('xCdcaRole')),
    __param(1, (0, common_1.Headers)('xCdcaUsername')),
    __param(2, (0, common_1.Headers)('xCdcaRemarks')),
    __param(3, (0, common_1.Headers)('xCdcaApprovalStatus')),
    __param(4, (0, common_1.Headers)()),
    __param(5, (0, common_1.Param)('user_id')),
    __param(6, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, Number, Object]),
    __metadata("design:returntype", Promise)
], userController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('/find/first'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOkResponse)({ type: user_entity_1.userEntity }),
    (0, swagger_1.ApiOperation)({
        summary: 'Fetch the first record',
        description: 'Read first record from the user table',
    }),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], userController.prototype, "findFirst", null);
__decorate([
    (0, common_1.Get)('/find/last'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, swagger_1.ApiOkResponse)({ type: user_entity_1.userEntity }),
    (0, swagger_1.ApiOperation)({
        summary: 'Fetch the last record',
        description: 'Read last record from the user table',
    }),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], userController.prototype, "findLast", null);
exports.userController = userController = __decorate([
    (0, common_1.Controller)('user'),
    (0, swagger_1.ApiTags)('ERD API'),
    __metadata("design:paramtypes", [user_service_1.userService,
        uf_service_1.UfService])
], userController);
//# sourceMappingURL=user.controller.js.map