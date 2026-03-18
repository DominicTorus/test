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
exports.UfController = void 0;
const common_1 = require("@nestjs/common");
const uf_service_1 = require("./uf.service");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../../dto");
const mime_types_1 = require("mime-types");
let UfController = class UfController {
    constructor(appService) {
        this.appService = appService;
    }
    async screenRoute(keys, header) {
        const token = header.authorization.split(' ')[1];
        const { dpdKey, method } = keys;
        let result = await this.appService.screenRoute(keys.keys, token, header);
        if (dpdKey && method) {
            result["dpdKey"] = dpdKey;
            result["method"] = method;
        }
        return result;
    }
    async getAccessToken(body, req) {
        const token = req.headers.authorization?.split(' ')[1];
        const { selectedCombination, selectedAccessProfile, dap, dpdKey, method, ufClientType } = body;
        if (!token) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        if (!selectedCombination) {
            throw new common_1.HttpException('Product/service is required', common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            let result = {};
            result["token"] = await this.appService.getAccessToken(token, selectedCombination, selectedAccessProfile, dap, ufClientType);
            if (dpdKey && method) {
                result["dpdKey"] = dpdKey;
                result["method"] = method;
            }
            return result;
        }
        catch (err) {
            return err;
        }
    }
    async getAccessTemplates(req, query) {
        const { dpdKey, method } = query;
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        try {
            let reuslt = await this.appService.getAccessTemplate(token);
            if (dpdKey && method) {
                reuslt["dpdKey"] = dpdKey;
                reuslt["method"] = method;
            }
            return reuslt;
        }
        catch (err) {
            return err;
        }
    }
    async uploadFile(req) {
        if (!req.isMultipart()) {
            throw new Error('Request is not multipart');
        }
        const parts = req.parts();
        const fields = {};
        let fileBuffer;
        let fileMeta;
        for await (const part of parts) {
            if (part.type === 'file') {
                fileBuffer = await part.toBuffer();
                fileMeta = {
                    filename: part.filename,
                    mimetype: part.mimetype,
                    size: fileBuffer.length,
                };
            }
            else {
                fields[part.fieldname] = part.value;
            }
        }
        let { context, dpdKey, method, enableEncryption } = fields;
        const file = {
            ...fileMeta,
            buffer: fileBuffer,
        };
        const result = await this.appService.uploadFile(file, context, enableEncryption);
        let finalresult = { file: result };
        if (dpdKey && method) {
            finalresult["dpdKey"] = dpdKey;
            finalresult["method"] = method;
        }
        return finalresult;
    }
    async getFile(body, res) {
        let { context, id, enableEncryption } = body;
        const file = await this.appService.getFile(id, context, enableEncryption);
        if (!file) {
            throw new common_1.HttpException('File not found', common_1.HttpStatus.NOT_FOUND);
        }
        res
            .header('Content-Type', file.file?.contentType || 'application/octet-stream')
            .header('Content-Disposition', `inline; filename="${file.file?.filename}"`);
        return res.send(file.res);
    }
    async setUpKey(body, req) {
        const token = req?.headers?.authorization?.split(' ')[1];
        const { key, dpdKey, method } = body;
        let result = await this.appService.setUpKey(key, token);
        if (dpdKey && method) {
            result["dpdKey"] = dpdKey;
            result["method"] = method;
        }
        return result;
    }
    async Orchestration(body, req) {
        const token = req.headers.authorization.split(' ')[1];
        const { key, componentId, controlId, isTable, accessProfile, dpdKey, method } = body;
        let result = await this.appService.Orchestration(key, componentId, controlId, token, isTable, accessProfile);
        if (dpdKey && method) {
            result['dpdKey'] = dpdKey;
            result['method'] = method;
        }
        return result;
    }
    async sendMailOTP(input, req) {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        const { email, dpdKey, method } = input;
        if (email) {
            try {
                let result = await this.appService.sendMailOTP(email);
                if (dpdKey && method) {
                    result["dpdKey"] = dpdKey;
                    result["method"] = method;
                }
                return result;
            }
            catch (err) {
                return err;
            }
        }
        else {
            return 'Email is required';
        }
    }
    async getMapperDetails(body, req) {
        const token = req.headers.authorization.split(' ')[1];
        const { ufkey, componentId, controlId, category, bindtranValue, code, dpdKey, method } = body;
        let result = await this.appService.getMapperDetails(ufkey, componentId, controlId, category, bindtranValue, code, token);
        if (dpdKey && method) {
            result["dpdKey"] = dpdKey;
            result["method"] = method;
        }
        return result;
    }
    async codefilter(body, req) {
        const token = req.headers.authorization.split(' ')[1];
        const { key, groupId, controlId, event, dpdKey, method } = body;
        let result = await this.appService.codefilter(key, groupId, controlId, event, token);
        if (dpdKey && method) {
            result["dpdKey"] = dpdKey;
            result["method"] = method;
        }
        return result;
    }
    async getDfkey(ufKey, groupId, req) {
        const token = req.headers.authorization.split(' ')[1];
        const ufkey = ufKey;
        const groupid = groupId;
        return await this.appService.getDfkey(ufkey, groupid, token);
    }
    async paginationDataFilter(body, req) {
        const token = req.headers.authorization.split(' ')[1];
        const { key, data, dfdType, dpdKey, method, primaryKey } = body;
        let result = await this.appService.paginationDataFilter(key, data, token, dfdType, primaryKey);
        if (dpdKey && method) {
            result["dpdKey"] = dpdKey;
            result["method"] = method;
        }
        return result;
    }
    async InitiatePF(body, req) {
        const token = req.headers.authorization.split(' ')[1];
        const { key, sourceId, dpdKey, method } = body;
        let result = await this.appService.InitiatePF(key, sourceId, token);
        if (dpdKey && method) {
            result["dpdKey"] = dpdKey;
            result["method"] = method;
        }
        return result;
    }
    async ifo(body, req) {
        const token = req.headers.authorization.split(' ')[1];
        const { formData, key, controlId, isTable, dpdKey, method } = body;
        let result = await this.appService.ifo(formData, key, controlId, isTable, token);
        if (dpdKey && method) {
            result["dpdKey"] = dpdKey;
            result["method"] = method;
        }
        return result;
    }
    async signinToTorus(body, req) {
        const { username, password, dpdKey, method, ufClientType } = body;
        const { DEFAULT_AUTHENTICATION, FUSIONAUTH_TENANTID, FUSIONAUTH_APPLICATIONID, FUSIONAUTH_APPCLIENTSECRET } = process.env;
        let result;
        if (DEFAULT_AUTHENTICATION == "fusionauth" && FUSIONAUTH_TENANTID && FUSIONAUTH_APPLICATIONID && FUSIONAUTH_APPCLIENTSECRET) {
            result = await this.appService.signInViaIAM(username, password, ufClientType);
        }
        else {
            result = await this.appService.signIntoTorus(username, password, ufClientType);
        }
        if (dpdKey && method) {
            result["dpdKey"] = dpdKey;
            result["method"] = method;
        }
        return result;
    }
    async MyAccountForClient(req, query) {
        const { dpdKey, method, key } = query;
        const { authorization } = req.headers;
        const token = authorization.split(' ')[1];
        let result = await this.appService.MyAccountForClient(token, key, authorization);
        if (dpdKey && method) {
            result["dpdKey"] = dpdKey;
            result["method"] = method;
        }
        return result;
    }
    async logout(header, body, query) {
        const { key } = body;
        const { dpdKey, method } = query;
        const tokens = header.authorization.split(' ')[1];
        let result = await this.appService.logout(header, tokens, key);
        if (dpdKey && method) {
            result["dpdKey"] = dpdKey;
            result["method"] = method;
        }
        return result;
    }
    async introspectToken(header, query) {
        const { dpdKey, method, key } = query;
        const tokens = header.authorization.split(' ')[1];
        let result = await this.appService.introspectToken(header, key, tokens);
        if (dpdKey && method) {
            result["dpdKey"] = dpdKey;
            result["method"] = method;
        }
        return result;
    }
    async getpagination(input, req) {
        const token = req?.headers?.authorization?.split(' ')[1];
        if (!token)
            return 'Authorization token not found';
        const { dpdKey, method } = input;
        if (input.key) {
            let result = await this.appService.getpagination(input.key, input.page, input.count, input.filterDetails, input.searchFilter, token);
            if (dpdKey && method) {
                result["dpdKey"] = dpdKey;
                result["method"] = method;
            }
            return result;
        }
        else {
            return 'MDKey/count shouldnot be empty';
        }
    }
    async dataGet(input, req) {
        const token = req.headers.authorization.split(' ')[1];
        const { dpdKey, method } = input;
        if (input.key) {
            try {
                let allDetails = await this.appService.getpagination(input.key, 1, 10, "", "", token);
                let result = await this.appService.getpagination(input.key, 1, allDetails?.totalRecords, input.filterDetails, input.searchFilter, token);
                if (dpdKey && method) {
                    result["dpdKey"] = dpdKey;
                    result["method"] = method;
                }
                return result;
            }
            catch (err) {
                return err;
            }
        }
        else
            return 'MDKey/count shouldnot be empty';
    }
    async getAppSecurityData() {
        return this.appService.getAppSecurityData();
    }
    async getAPPSecurityTemplateData() {
        return this.appService.getAPPSecurityTemplateData();
    }
    async getAppAccessProfiles() {
        return this.appService.getAppAccessProfiles();
    }
    async postAppUserList(body) {
        const { data } = body;
        return this.appService.postAppUserList(data);
    }
    async appSecurityTemplateData(body) {
        const { data } = body;
        return this.appService.AppSecurityTemplateData(data);
    }
    async setJson(query, body) {
        const key = query.key;
        const data = body.data;
        return await this.appService.setJson(key, data);
    }
    async getDFS(body, res) {
        const { id, enableEncryption } = body;
        const decrypted = await this.appService.getDFS(id, enableEncryption);
        const contentType = (0, mime_types_1.lookup)(id);
        res
            .header('Content-Type', contentType)
            .header('Content-Disposition', `inline; filename="${decodeURIComponent(id.split('/').pop() || 'file')}"`)
            .send(decrypted);
    }
    async post_upload(req) {
        if (!req.isMultipart()) {
            throw new Error('Request is not multipart');
        }
        const parts = req.parts();
        const fields = {};
        let fileBuffer;
        let fileMeta;
        for await (const part of parts) {
            if (part.type === 'file') {
                fileBuffer = await part.toBuffer();
                fileMeta = {
                    filename: part.filename,
                    mimetype: part.mimetype,
                    size: fileBuffer.length,
                };
            }
            else {
                fields[part.fieldname] = part.value;
            }
        }
        const { bucketFolderame, folderPath, enableEncryption, filename = "" } = fields;
        const file = {
            ...fileMeta,
            buffer: fileBuffer,
        };
        const imageUrl = await this.appService.uploadImage(file, bucketFolderame, folderPath, filename, enableEncryption);
        return { imageUrl };
    }
    async readAMDKey(key, req) {
        const token = req.headers.authorization?.split(' ')[1];
        return this.appService.readAMDKey(key, token);
    }
    async getResetPasswordOtp(query) {
        const { email } = query;
        return this.appService.getResetPasswordOtp(email);
    }
    async verifyOtp(query) {
        const { email, otp } = query;
        return this.appService.verifyOtp(email, otp);
    }
    async resetPassword(body) {
        const { email, password } = body;
        return this.appService.resetPassword(email, password);
    }
    async oauthSignIn(body) {
        const { user } = body;
        return this.appService.oauthSignIn(user);
    }
    async getNavbarData(body, req) {
        const { key } = body;
        const token = req.headers.authorization.split(' ')[1];
        const clientCode = process.env.CLIENTCODE;
        return this.appService.getNavbarData(key, clientCode, token);
    }
};
exports.UfController = UfController;
__decorate([
    (0, common_1.Post)('screenRoute'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UfController.prototype, "screenRoute", null);
__decorate([
    (0, common_1.Post)('getAccessToken'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Returns updated token with the orps structure',
        content: {
            'application/json': {
                schema: {
                    type: 'string',
                },
            },
        },
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid Credentials' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UfController.prototype, "getAccessToken", null);
__decorate([
    (0, common_1.Get)('getAccessTemplates'),
    (0, swagger_1.ApiOkResponse)({
        description: 'Returns all possible access template of the loggedin user',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                },
            },
        },
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid Credentials' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UfController.prototype, "getAccessTemplates", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer token for authentication',
        required: true,
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UfController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('downloadFile'),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer token for authentication',
        required: true,
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Download file from MongoDb GridFSBucket',
        description: 'Download file from the stored MongoDb GridFSBucket on specified path',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UfController.prototype, "getFile", null);
__decorate([
    (0, common_1.Post)('setUpKey'),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer token for authentication',
        required: true,
    }),
    (0, swagger_1.ApiBody)({ type: dto_1.setUpKeyDto }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Returns a list of all payments made by users.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                },
            },
        },
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieve setUpKey properties',
        description: 'Retrieve properties for achieve branding,laguage,direction and forts',
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid request parameters' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Returns a list of all payments made by users.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.setUpKeyDto, Object]),
    __metadata("design:returntype", Promise)
], UfController.prototype, "setUpKey", null);
__decorate([
    (0, common_1.Post)('Orchestration'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Common Details Fetched' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error' }),
    (0, swagger_1.ApiBody)({ type: dto_1.OrchestrationDto }),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrive orchestration properties for a artifacts,components and controls',
        description: 'Retrived action,code,rule,events,mapper,dstData,schemaData from the orchestration on level of artifacts,components and controls with the specified key',
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid request parameters' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Returns a list of all payments made by users.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                },
            },
        },
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Returns a list of all payments made by users.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.OrchestrationDto, Object]),
    __metadata("design:returntype", Promise)
], UfController.prototype, "Orchestration", null);
__decorate([
    (0, common_1.Post)('sendMailOTP'),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid Email' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UfController.prototype, "sendMailOTP", null);
__decorate([
    (0, common_1.Post)('getMapperDetails'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Get Mapper Details Completed' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error' }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer token for authentication',
        required: true,
    }),
    (0, swagger_1.ApiBody)({ type: dto_1.getMapperDetailsDto }),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrive dropdown component values',
        description: 'Retrived dropdown component values from the table with mapped orchestraion',
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid request parameters' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Returns a list of all payments made by users.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                },
            },
        },
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Returns a list of all payments made by users.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.getMapperDetailsDto, Object]),
    __metadata("design:returntype", Promise)
], UfController.prototype, "getMapperDetails", null);
__decorate([
    (0, common_1.Post)('code'),
    (0, swagger_1.ApiBody)({ type: dto_1.codefilterDto }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer token for authentication',
        required: true,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.codefilterDto, Object]),
    __metadata("design:returntype", Promise)
], UfController.prototype, "codefilter", null);
__decorate([
    (0, common_1.Get)('dfKey'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Get DFKey Completed' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error' }),
    (0, swagger_1.ApiQuery)({ name: 'ufKey', example: 'TGA:ABKUF:BUILD:ABC:mvp:bank:v2' }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer token for authentication',
        required: true,
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Fetch the DFD key',
        description: 'Fetch the DFD key for the specified ufKey and groupId with the mapped orchestration',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Returns a list of all payments made by users.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                },
            },
        },
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Returns a list of all payments made by users.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                },
            },
        },
    }),
    __param(0, (0, common_1.Query)('ufKey')),
    __param(1, (0, common_1.Query)('groupId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UfController.prototype, "getDfkey", null);
__decorate([
    (0, common_1.Post)('PaginationDataFilter'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Data PaginationDataFilter Completed',
        isArray: true,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal Server Error' }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer token for authentication',
        required: true,
    }),
    (0, swagger_1.ApiBody)({ type: dto_1.paginationDataFilterDto }),
    (0, swagger_1.ApiOperation)({
        summary: 'Fetch the records for the table component',
        description: 'Fetch the records for the table component with the specified DST key',
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid request parameters' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Returns a list of all payments made by users.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                },
            },
        },
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Returns a list of all payments made by users.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.paginationDataFilterDto, Object]),
    __metadata("design:returntype", Promise)
], UfController.prototype, "paginationDataFilter", null);
__decorate([
    (0, common_1.Post)('InitiatePF'),
    (0, swagger_1.ApiBody)({ type: dto_1.InitiatePFDto }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer token for authentication',
        required: true,
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrive node property and event property from the processflow',
        description: 'Retrived node property and event property from the specified PFD key',
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid request parameters' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Returns a list of all payments made by users.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                },
            },
        },
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Returns a list of all payments made by users.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.InitiatePFDto, Object]),
    __metadata("design:returntype", Promise)
], UfController.prototype, "InitiatePF", null);
__decorate([
    (0, common_1.Post)('ifo'),
    (0, swagger_1.ApiBody)({ type: dto_1.ifoDto }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer token for authentication',
        required: true,
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Table records are mapped or not in the orchestration',
        description: 'Check the table records are mapped in the orchestration with the specified UF key',
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid request parameters' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Returns a list of all payments made by users.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                },
            },
        },
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Returns a list of all payments made by users.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ifoDto, Object]),
    __metadata("design:returntype", Promise)
], UfController.prototype, "ifo", null);
__decorate([
    (0, common_1.Post)('signin'),
    (0, swagger_1.ApiBody)({ type: dto_1.signinToTorusDto }),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer token for authentication',
        required: true,
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Token generated for the user',
        description: 'Token generated for the user based on the client, username, password',
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid request parameters' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Returns a list of all payments made by users.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                },
            },
        },
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Returns a list of all payments made by users.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                },
            },
        },
    }),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.signinToTorusDto, Object]),
    __metadata("design:returntype", Promise)
], UfController.prototype, "signinToTorus", null);
__decorate([
    (0, common_1.Get)('myAccount-for-client'),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer token for authentication',
        required: true,
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Provide the template for the user',
        description: 'Provide the template for the user based on the token',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Returns a list of all payments made by users.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                },
            },
        },
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Returns a list of all payments made by users.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                },
            },
        },
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, Object]),
    __metadata("design:returntype", Promise)
], UfController.prototype, "MyAccountForClient", null);
__decorate([
    (0, common_1.Get)('logout'),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer token for authentication',
        required: true,
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Logout the user',
        description: 'Logout the user from the generated app based on the token',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Returns a list of all payments made by users.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                },
            },
        },
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Returns a list of all payments made by users.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                },
            },
        },
    }),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.logoutDto, Object]),
    __metadata("design:returntype", Promise)
], UfController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('introspect'),
    (0, swagger_1.ApiHeader)({
        name: 'Authorization',
        description: 'Bearer token for authentication',
        required: true,
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'Check the expire time of the token',
        description: 'If the token was expired ,It will return authenticate false',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Returns a list of all payments made by users.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                },
            },
        },
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Returns a list of all payments made by users.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                },
            },
        },
    }),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UfController.prototype, "introspectToken", null);
__decorate([
    (0, common_1.Post)('pagination'),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid request parameters' }),
    (0, swagger_1.ApiBody)({ type: dto_1.pageDto }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Returns a list of all payments made by users.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                },
            },
        },
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Returns a list of all payments made by users.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.pageDto, Object]),
    __metadata("design:returntype", Promise)
], UfController.prototype, "getpagination", null);
__decorate([
    (0, common_1.Post)('dataget'),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid request parameters' }),
    (0, swagger_1.ApiBody)({ type: dto_1.pageDto }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Returns a list of all payments made by users.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                },
            },
        },
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Returns a list of all payments made by users.',
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.dataGet, Object]),
    __metadata("design:returntype", Promise)
], UfController.prototype, "dataGet", null);
__decorate([
    (0, common_1.Get)('getAppSecurityData'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UfController.prototype, "getAppSecurityData", null);
__decorate([
    (0, common_1.Get)('getAPPSecurityTemplateData'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UfController.prototype, "getAPPSecurityTemplateData", null);
__decorate([
    (0, common_1.Get)('getAppAccessProfiles'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UfController.prototype, "getAppAccessProfiles", null);
__decorate([
    (0, common_1.Post)('postAppUserList'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UfController.prototype, "postAppUserList", null);
__decorate([
    (0, common_1.Post)('appSecurityTemplateData'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UfController.prototype, "appSecurityTemplateData", null);
__decorate([
    (0, common_1.Post)('setJson'),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UfController.prototype, "setJson", null);
__decorate([
    (0, common_1.Post)('getDFS'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UfController.prototype, "getDFS", null);
__decorate([
    (0, common_1.Post)('uploadimg'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UfController.prototype, "post_upload", null);
__decorate([
    (0, common_1.Get)('readAMDKey'),
    __param(0, (0, common_1.Query)('key')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UfController.prototype, "readAMDKey", null);
__decorate([
    (0, common_1.Get)('getResetPasswordOtp'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UfController.prototype, "getResetPasswordOtp", null);
__decorate([
    (0, common_1.Get)('verifyOtp'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UfController.prototype, "verifyOtp", null);
__decorate([
    (0, common_1.Patch)('resetPassword'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UfController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Post)("oauthSignIn"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UfController.prototype, "oauthSignIn", null);
__decorate([
    (0, common_1.Post)("getNavbarData"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UfController.prototype, "getNavbarData", null);
exports.UfController = UfController = __decorate([
    (0, swagger_1.ApiTags)('TG'),
    (0, common_1.Controller)('UF'),
    __metadata("design:paramtypes", [uf_service_1.UfService])
], UfController);
//# sourceMappingURL=uf.controller.js.map