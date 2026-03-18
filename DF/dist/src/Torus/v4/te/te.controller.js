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
var TeController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const te_service_1 = require("./te.service");
const common_Service_1 = require("../../../common.Service");
const dto_1 = require("../../../dto");
const lock_service_1 = require("../../../lock.service");
const customException_1 = require("../../../customException");
const redisService_1 = require("../../../redisService");
let TeController = TeController_1 = class TeController {
    constructor(teService, apiService, lockservice, redisService) {
        this.teService = teService;
        this.apiService = apiService;
        this.lockservice = lockservice;
        this.redisService = redisService;
        this.logger = new common_1.Logger(TeController_1.name);
    }
    async pfEventEmitter(pfdto, auth) {
        pfdto.token = auth.split(' ')[1];
        var upidarr = [];
        const eventval = pfdto;
        const { dpdKey, method } = pfdto;
        let currentFabric = await this.apiService.splitcommonkey(pfdto.key, 'FNK');
        let client = process.env.CLIENTCODE;
        if (currentFabric == 'DF-DFD') {
            let result = await this.teService.EventEmitter(pfdto);
            if (dpdKey && method) {
                result["dpdKey"] = dpdKey;
                result["method"] = method;
            }
            return result;
        }
        else {
            let flowSummary = JSON.parse(await this.redisService.getJsonData(pfdto.key + 'PFS', client));
            let TimeInterval, milliseconds;
            if (flowSummary && flowSummary.length > 0) {
                for (let s = 0; s < flowSummary.length; s++) {
                    if (flowSummary[s].nodeType == 'schedulernode' && currentFabric == 'PF-SCDL') {
                        let schedulerNode = JSON.parse(await this.redisService.getJsonDataWithPath(pfdto.key + 'NDP', '.' + flowSummary[s].nodeId, client));
                        if (schedulerNode) {
                            let schInterval = schedulerNode?.data?.pro?.schedulerInfo?.interval;
                            TimeInterval = `${schInterval.seconds} ${schInterval.minutes} ${schInterval.hours} ${schInterval.dayOfmonth} ${schInterval.months} ${schInterval.dayOfweek}`;
                        }
                    }
                    else if (flowSummary[s].nodeType == 'intervalnode' && currentFabric == 'PF-SCDL') {
                        let schedulerNode = JSON.parse(await this.redisService.getJsonDataWithPath(pfdto.key + 'NDP', '.' + flowSummary[s].nodeId, client));
                        if (schedulerNode) {
                            milliseconds = schedulerNode?.data?.pro?.milliseconds?.value;
                        }
                    }
                }
            }
            if (TimeInterval) {
                let keyname = (pfdto?.key).split(':');
                let jobname = ((keyname[1] + keyname[5] + keyname[7] + keyname[9] + keyname[11] + keyname[13]).replace(/[-_]/g, '')).replace(/\s+/g, '');
                if (pfdto.schedulerStatus == 'active') {
                    await this.teService.startCronJob(jobname, TimeInterval, pfdto, client, pfdto.token);
                }
                else if (pfdto.schedulerStatus == 'inactive') {
                    await this.teService.stopCron(jobname);
                    return 'scheduler stopped';
                }
            }
            else if (milliseconds) {
                let keyname = (pfdto?.key).split(':');
                let jobname = ((keyname[1] + keyname[5] + keyname[7] + keyname[9] + keyname[11] + keyname[13]).replace(/[-_]/g, '')).replace(/\s+/g, '');
                if (pfdto.schedulerStatus == 'active') {
                    const result = await this.teService.startInterval(jobname, milliseconds, pfdto, client, pfdto.token);
                    return result;
                }
                else if (pfdto.schedulerStatus == 'inactive') {
                    const result = await this.teService.stopIntervalJob(jobname);
                    return result;
                }
            }
            else {
                if (!pfdto.upId) {
                    let result = await this.teService.EventEmitter(pfdto);
                    if (dpdKey && method) {
                        result["dpdKey"] = dpdKey;
                        result["method"] = method;
                    }
                    return result;
                }
                else {
                    if (pfdto.upId && pfdto.upId.length == 0)
                        throw new customException_1.CustomException('Process Id is empty', 400);
                    var refupid = pfdto.upId;
                    var key = pfdto.key;
                    var nodeId = pfdto.nodeId;
                    var nodeName = pfdto.nodeName;
                    var nodetype = pfdto.nodeType;
                    var data = pfdto.data;
                    var event = pfdto.event;
                    var sourceId = pfdto.sourceId;
                    if (refupid.length > 0 && data.length > 0) {
                        for (var k = 0; k < refupid.length; k++) {
                            const upId = refupid[k];
                            eventval.upId = upId;
                            eventval.key = key;
                            eventval.nodeId = nodeId;
                            eventval.nodeName = nodeName;
                            eventval.nodeType = nodetype;
                            eventval.data = data[k];
                            eventval.event = event;
                            eventval.sourceId = sourceId;
                            var res = await this.teService.EventEmitter(eventval);
                            if (res)
                                upidarr.push(res.upId);
                        }
                        var finalres = {
                            upId: upidarr,
                            message: res.message,
                            event: res.event
                        };
                        if (dpdKey && method) {
                            finalres["dpdKey"] = dpdKey;
                            finalres["method"] = method;
                        }
                        return finalres;
                    }
                    else {
                        throw new customException_1.CustomException('Invalid payload', 422);
                    }
                }
            }
        }
    }
    async getUpdate(input, auth) {
        try {
            this.logger.log('update handler started');
            const { dpdKey, method } = input;
            if (input.primaryKey && input.url && input.tableName && input.data && auth) {
                var token = auth.split(' ')[1];
                var lock;
                if (input.lockDetails && input.lockDetails.ttl) {
                    this.logger.log('lock verified');
                    const resource = [`locks:${input.tableName}:${input.primaryKey}`];
                    const ttl = input.lockDetails.ttl;
                    lock = await this.lockservice.acquireLock(resource, ttl);
                    this.logger.log(`Lock acquired for ${input.primaryKey}`);
                }
                var result = await this.teService.updateHandler(input.data, input.key, input.upId, input.url, input.tableName, input.primaryKey, token);
                if (dpdKey && method) {
                    result["dpdKey"] = dpdKey;
                    result["method"] = method;
                }
                this.logger.log('updated result', result);
                if (result != undefined || result != null) {
                    if (result.statusCode) {
                        if (result.statusCode == 201) {
                            if (input.lockDetails && input.lockDetails.ttl) {
                                await this.lockservice.releaseLock(lock);
                                this.logger.log(`Lock released for ${input.primaryKey}`);
                            }
                            return result;
                        }
                    }
                }
            }
            else {
                throw 'primarykey/tablename/data/token not found';
            }
        }
        catch (error) {
            console.log(error);
            if (input.lockDetails) {
                if (input.lockDetails.ttl && JSON.stringify(error).includes('quorum')) {
                    throw new common_1.BadRequestException('Resource locked by other user');
                }
                if (lock) {
                    await this.lockservice.releaseLock(lock);
                    this.logger.log(`Lock released for ${input.primaryKey}`);
                }
            }
            throw new common_1.BadRequestException(error);
        }
    }
    async save(input, auth) {
        var token = auth.split(' ')[1];
        const { dpdKey, method } = input;
        if (input.data) {
            let result = await this.teService.savehandler(input.data, input.key, input.event, input.nodeId, input.nodeName, input.nodeType, token, input.upId, input.sourceId, input.lock, input.childTables);
            if (dpdKey && method) {
                result["dpdKey"] = dpdKey;
                result["method"] = method;
            }
            return result;
        }
        else {
            return 'data is required';
        }
    }
};
exports.TeController = TeController;
__decorate([
    (0, common_1.Post)('eventEmitter'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.pfDto, Object]),
    __metadata("design:returntype", Promise)
], TeController.prototype, "pfEventEmitter", null);
__decorate([
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TeController.prototype, "getUpdate", null);
__decorate([
    (0, common_1.Post)('save'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TeController.prototype, "save", null);
exports.TeController = TeController = TeController_1 = __decorate([
    (0, swagger_1.ApiTags)('Torus API'),
    (0, common_1.Controller)('te'),
    __metadata("design:paramtypes", [te_service_1.TeService, common_Service_1.CommonService, lock_service_1.LockService,
        redisService_1.RedisService])
], TeController);
//# sourceMappingURL=te.controller.js.map