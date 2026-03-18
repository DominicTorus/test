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
const listener_service_1 = require("./listener.service");
let TeController = TeController_1 = class TeController {
    constructor(teService, apiService, lockservice, redisService, listenerService) {
        this.teService = teService;
        this.apiService = apiService;
        this.lockservice = lockservice;
        this.redisService = redisService;
        this.listenerService = listenerService;
        this.logger = new common_1.Logger(TeController_1.name);
    }
    async pfEventEmitter(pfdto, auth) {
        pfdto.token = auth.split(' ')[1];
        const { dpdKey, method } = pfdto;
        const client = process.env.CLIENTCODE;
        const currentFabric = await this.apiService.splitcommonkey(pfdto.key, 'FNK');
        if (currentFabric == 'DF-DFD') {
            const result = await this.teService.EventEmitter(pfdto);
            if (dpdKey && method) {
                result["dpdKey"] = dpdKey;
                result["method"] = method;
            }
            return result;
        }
        const flowSummary = JSON.parse(await this.redisService.getJsonData(pfdto.key + 'PFS', client));
        let TimeInterval, milliseconds;
        if (flowSummary?.length > 0) {
            const schedulerNodes = flowSummary.filter(f => f.nodeType == 'schedulernode' && currentFabric == 'PF-SCDL');
            const intervalNodes = flowSummary.filter(f => f.nodeType == 'intervalnode' && currentFabric == 'PF-SCDL');
            if (schedulerNodes.length > 0) {
                const schedulerPromises = schedulerNodes.map(node => this.redisService.getJsonDataWithPath(pfdto.key + 'NDP', '.' + node.nodeId, client));
                const schedulerResults = await Promise.all(schedulerPromises);
                for (const result of schedulerResults) {
                    if (result) {
                        const schedulerNode = JSON.parse(result);
                        const schInterval = schedulerNode?.data?.pro?.schedulerInfo?.interval;
                        if (schInterval) {
                            TimeInterval = `${schInterval.seconds} ${schInterval.minutes} ${schInterval.hours} ${schInterval.dayOfmonth} ${schInterval.months} ${schInterval.dayOfweek}`;
                            break;
                        }
                    }
                }
            }
            if (intervalNodes.length > 0 && !TimeInterval) {
                const intervalPromises = intervalNodes.map(node => this.redisService.getJsonDataWithPath(pfdto.key + 'NDP', '.' + node.nodeId, client));
                const intervalResults = await Promise.all(intervalPromises);
                for (const result of intervalResults) {
                    if (result) {
                        const schedulerNode = JSON.parse(result);
                        milliseconds = schedulerNode?.data?.pro?.milliseconds?.value;
                        if (milliseconds)
                            break;
                    }
                }
            }
        }
        const keyname = pfdto?.key.split(':');
        const jobname = ((keyname[1] + keyname[5] + keyname[7] + keyname[9] + keyname[11] + keyname[13]).replace(/[-_]/g, '')).replace(/\s+/g, '');
        if (TimeInterval) {
            if (pfdto.schedulerStatus == 'active') {
                await this.listenerService.startCronJob(jobname, TimeInterval, pfdto, client, pfdto.token);
                return 'scheduler started';
            }
            else if (pfdto.schedulerStatus == 'inactive') {
                await this.listenerService.stopCron(jobname);
                return 'scheduler stopped';
            }
        }
        if (milliseconds) {
            if (pfdto.schedulerStatus == 'active') {
                return await this.listenerService.startInterval(jobname, milliseconds, pfdto, client, pfdto.token);
            }
            else if (pfdto.schedulerStatus == 'inactive') {
                return await this.listenerService.stopIntervalJob(jobname);
            }
        }
        if (!pfdto.upId) {
            const result = await this.teService.EventEmitter(pfdto);
            if (dpdKey && method) {
                result["dpdKey"] = dpdKey;
                result["method"] = method;
            }
            return result;
        }
        if (pfdto.upId && pfdto.upId.length == 0) {
            throw new customException_1.CustomException('Process Id is empty', 400);
        }
        const { upId: refupid, key, nodeId, nodeName, nodeType: nodetype, data, event, sourceId } = pfdto;
        if (!refupid?.length || !data?.length) {
            throw new customException_1.CustomException('Invalid payload', 422);
        }
        const eventPromises = refupid.map((upId, k) => this.teService.EventEmitter({
            ...pfdto,
            upId,
            key,
            nodeId,
            nodeName,
            nodeType: nodetype,
            data: data[k],
            event,
            sourceId
        }));
        const results = await Promise.all(eventPromises);
        const lastResult = results[results.length - 1];
        const finalres = {
            upId: results.map(res => res?.upId).filter(Boolean),
            message: lastResult?.message,
            event: lastResult?.event
        };
        if (dpdKey && method) {
            finalres["dpdKey"] = dpdKey;
            finalres["method"] = method;
        }
        return finalres;
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
    __metadata("design:paramtypes", [te_service_1.TeService, common_Service_1.CommonService,
        lock_service_1.LockService,
        redisService_1.RedisService, listener_service_1.ListenerService])
], TeController);
//# sourceMappingURL=te.controller.js.map