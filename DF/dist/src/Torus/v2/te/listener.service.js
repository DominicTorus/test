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
var ListenerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListenerService = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("../../../dto");
const redisService_1 = require("../../../redisService");
const Xid = require('xid-js');
const common_Service_1 = require("../../../common.Service");
const customException_1 = require("../../../customException");
const jwt_1 = require("@nestjs/jwt");
const cron_1 = require("cron");
const schedule_1 = require("@nestjs/schedule");
const bullmq_1 = require("bullmq");
const event_emitter_processor_1 = require("./event-emitter.processor");
const te_service_1 = require("./te.service");
const ioredis_1 = require("ioredis");
const kafkajs_1 = require("kafkajs");
const pg = require("pg");
const mongodb_1 = require("mongodb");
let ListenerService = ListenerService_1 = class ListenerService {
    constructor(redisService, jwtService, schedulerRegistry, CommonService, teService, processor) {
        this.redisService = redisService;
        this.jwtService = jwtService;
        this.schedulerRegistry = schedulerRegistry;
        this.CommonService = CommonService;
        this.teService = teService;
        this.processor = processor;
        this.isRunning = false;
        this.intervals = new Map();
        this.queues = new Map();
        this.intervalJobs = new Map();
        this.consumers = new Map();
        this.logger = new common_1.Logger(ListenerService_1.name);
        this.kafka = new kafkajs_1.Kafka({
            clientId: process.env.KAFKA_CLIENT_ID,
            brokers: [process.env.KAFKA_BROKER],
        });
    }
    async onModuleInit() {
    }
    async onModuleDestroy() {
    }
    async getProducer() {
        if (!this.producer) {
            this.producer = this.kafka.producer({
                allowAutoTopicCreation: true,
                maxInFlightRequests: 5,
                idempotent: true,
                retry: {
                    retries: 8,
                    initialRetryTime: 100,
                    maxRetryTime: 30000,
                },
            });
            await this.producer.connect();
        }
        return this.producer;
    }
    async getConsumer(groupId) {
        if (!this.consumers.has(groupId)) {
            const consumer = this.kafka.consumer({
                groupId: groupId,
                sessionTimeout: 30000,
                heartbeatInterval: 3000,
                maxWaitTimeInMs: 5000,
                retry: {
                    retries: 0
                },
            });
            await consumer.connect();
            this.consumers.set(groupId, consumer);
        }
        return this.consumers.get(groupId);
    }
    async startListening() {
        let keyarr = [];
        let artifactToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiZ3VydSIsImNsaWVudCI6IkNUMDA1IiwidHlwZSI6ImMiLCJsb2dUeXBlIjoibW9uZ29kYiIsInNpZCI6IjNlMjc0MDhmLTRkNTYtNDM1NC05MjUxLWJlMmRmMzgwNTA3MiIsImlhdCI6MTc2OTQ4NTc2NSwiZXhwIjoxNzY5NDg2OTY1fQ.PgiZCgD2f-KGRRSfvo6-T_QUKux_U2hsxvlgNXj-qLY';
        for (const key of keyarr) {
            this.listenToKey(key, artifactToken);
        }
    }
    async listenToKey(key, artifactToken) {
        const client = process.env.CLIENTCODE;
        this.isRunning = true;
        while (this.isRunning) {
            try {
                let Ndp = JSON.parse(await this.redisService.getJsonData(key + 'NDP', client));
                let pfs = JSON.parse(await this.redisService.getJsonData(key + 'PFS', client));
                let poJson = JSON.parse(await this.redisService.getJsonData(key + 'PO', client));
                let pfo = JSON.parse(await this.redisService.getJsonData(key + 'PFO', client));
                let currentFabric = await this.CommonService.splitcommonkey(key, 'FNK');
                let fngkKey = await this.CommonService.splitcommonkey(key, 'FNGK');
                let keyname = key.split(':');
                let jobname = ((keyname[1] + keyname[5] + keyname[7] + keyname[9] + keyname[11] + keyname[13]).replace(/[-_]/g, '')).replace(/\s+/g, '');
                let processedKey = key;
                if (key.includes(fngkKey)) {
                    processedKey = key.replace(fngkKey, fngkKey + 'P');
                }
                let ponode = poJson?.mappedData?.artifact?.node;
                if (!ponode || ponode.length === 0) {
                    throw new customException_1.CustomException('Nodes not found', 404);
                }
                let sourceStatus = 'N';
                if (ponode[1]?.events?.length > 0) {
                    for (let e of ponode[1].events) {
                        sourceStatus = e.source.status;
                    }
                }
                let pfdto = new dto_1.pfDto();
                pfdto.key = key;
                pfdto.token = artifactToken;
                pfdto.nodeId = ponode[1].nodeId;
                pfdto.nodeName = ponode[1].nodeName;
                pfdto.event = sourceStatus;
                pfdto.nodeType = ponode[1].nodeType;
                pfdto.data = {};
                let pfProcessorResponse = await this.firstProcessor(pfdto, sourceStatus, pfs, poJson, pfo, Ndp, currentFabric, 'N', undefined, undefined, undefined, undefined, undefined, undefined, false);
                if (!pfProcessorResponse?.status || pfProcessorResponse.status !== 200) {
                    throw pfProcessorResponse;
                }
                if (pfProcessorResponse?.data) {
                    let pfResponseData = pfProcessorResponse.data;
                    if (pfResponseData && Object.keys(pfResponseData).length > 0) {
                        pfdto.event = sourceStatus;
                        pfdto.nodeId = ponode[1].nodeId;
                        pfdto.nodeName = ponode[1].nodeName;
                        pfdto.nodeType = ponode[1].nodeType;
                        pfdto.data = pfResponseData;
                        await this.addEventEmitterJob(jobname, pfdto, jobname, processedKey, pfs, currentFabric);
                    }
                }
            }
            catch (err) {
                console.error(`Listener error for key ${key}`, err);
                await this.sleep(3000);
            }
            await this.sleep(1000);
        }
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async stop() {
        this.isRunning = false;
        this.abortController?.abort();
        await this.redisService.quit();
    }
    async startCronJob(name, interval, pfdto, client, token) {
        this.logger.log(`Interval: ${interval}`);
        let temp = pfdto;
        const job = new cron_1.CronJob(interval, async () => {
            try {
                pfdto = temp;
                let artifactKey = pfdto.key;
                let artifactToken = token;
                let sourceStatus, refflag, sourceId, currentFabric, processedKey;
                currentFabric = await this.CommonService.splitcommonkey(pfdto.key, 'FNK');
                let fngkKey = await this.CommonService.splitcommonkey(pfdto.key, 'FNGK');
                if (pfdto.key.includes(fngkKey)) {
                    processedKey = pfdto.key.replace(fngkKey, fngkKey + 'P');
                }
                let client = process.env.CLIENTCODE;
                if (!client)
                    throw new customException_1.CustomException('client not found', 404);
                if (currentFabric == 'PF-PFD' || currentFabric == 'PF-SCDL') {
                    sourceId = pfdto?.sourceId;
                }
                let tokenDecode = this.jwtService.decode(pfdto.token, { json: true });
                if (!tokenDecode || !tokenDecode.loginId)
                    throw new customException_1.CustomException('Invalid token', 401);
                let [afi, pfjson, poJson, pfo, Ndp] = await Promise.all([
                    this.redisService.getJsonData(pfdto.key + 'AFI', client).then(JSON.parse),
                    this.redisService.getJsonData(pfdto.key + 'PFS', client).then(JSON.parse),
                    this.redisService.getJsonData(pfdto.key + 'PO', client).then(JSON.parse),
                    this.redisService.getJsonData(pfdto.key + 'PFO', client).then(JSON.parse),
                    this.redisService.getJsonData(pfdto.key + 'NDP', client).then(JSON.parse)
                ]);
                let logicCenter;
                if (afi && afi.hasOwnProperty('logicCenter')) {
                    if (currentFabric == 'DF-DFD')
                        logicCenter = afi?.logicCenter;
                }
                else {
                    logicCenter = true;
                }
                refflag = 'N';
                let ponode = poJson?.mappedData?.artifact?.node;
                if (!ponode || ponode.length == 0)
                    throw new customException_1.CustomException('Nodes not found', 404);
                if (ponode[1].events.length > 0) {
                    for (let a = 0; a < ponode[1].events.length; a++) {
                        sourceStatus = ponode[1].events[a].source.status;
                    }
                }
                pfdto['key'] = artifactKey;
                pfdto['token'] = artifactToken;
                pfdto['nodeId'] = ponode[1].nodeId;
                pfdto['nodeName'] = ponode[1].nodeName;
                pfdto['nodeType'] = ponode[1].nodeType;
                pfdto['event'] = sourceStatus;
                pfdto['data'] = {};
                let pfProcessorResponse = await this.firstProcessor(pfdto, sourceStatus, pfjson, poJson, pfo, Ndp, currentFabric, refflag, undefined, undefined, undefined, undefined, undefined, logicCenter, false);
                if (!pfProcessorResponse?.status && pfProcessorResponse?.status != 200) {
                    throw pfProcessorResponse;
                }
                if (pfProcessorResponse?.data) {
                    let pfResponseData = pfProcessorResponse.data;
                    if (pfResponseData) {
                        pfdto = {};
                        pfdto['key'] = artifactKey;
                        pfdto['token'] = artifactToken;
                        pfdto['event'] = sourceStatus;
                        pfdto['data'] = pfResponseData;
                        pfdto['nodeId'] = ponode[1].nodeId;
                        pfdto['nodeName'] = ponode[1].nodeName;
                        pfdto['nodeType'] = ponode[1].nodeType;
                        this.logger.log(`Running dynamic job with data: ${JSON.stringify(pfdto)}`);
                        await this.addEventEmitterJob(name, pfdto, name, processedKey, pfjson, currentFabric);
                    }
                }
            }
            catch (error) {
                this.logger.error(`Error in cron job '${JSON.stringify(error)}'`);
                let sourceStatus;
                let ponode = JSON.parse(await this.redisService.getJsonDataWithPath(pfdto.key + 'PO', '.mappedData.artifact.node', client));
                if (ponode[1].events.length > 0) {
                    for (let a = 0; a < ponode[1].events.length; a++) {
                        sourceStatus = ponode[1].events[a].source.status;
                    }
                }
                pfdto['nodeId'] = ponode[1].nodeId;
                pfdto['nodeName'] = ponode[1].nodeName;
                pfdto['nodeType'] = ponode[1].nodeType;
                pfdto['event'] = sourceStatus;
            }
        });
        await this.schedulerRegistry.addCronJob(name, job);
        job.start();
        this.logger.log(`Started job: ${name}`);
    }
    async startInterval(jobname, interval, pfdto, client, token) {
        this.logger.log(`Interval Step`);
        let temp = pfdto;
        const intervalId = setInterval(async () => {
            try {
                pfdto = temp;
                let artifactKey = pfdto.key;
                let artifactToken = token;
                let sourceStatus, refflag, sourceId, currentFabric, processedKey;
                currentFabric = await this.CommonService.splitcommonkey(pfdto.key, 'FNK');
                let fngkKey = await this.CommonService.splitcommonkey(pfdto.key, 'FNGK');
                if (pfdto.key.includes(fngkKey)) {
                    processedKey = pfdto.key.replace(fngkKey, fngkKey + 'P');
                }
                let client = process.env.CLIENTCODE;
                if (!client)
                    throw new customException_1.CustomException('client not found', 404);
                if (currentFabric == 'PF-PFD' || currentFabric == 'PF-SCDL') {
                    sourceId = pfdto?.sourceId;
                }
                let tokenDecode = this.jwtService.decode(pfdto.token, { json: true });
                if (!tokenDecode || !tokenDecode.loginId)
                    throw new customException_1.CustomException('Invalid token', 401);
                let [afi, pfjson, poJson, pfo, Ndp] = await Promise.all([
                    this.redisService.getJsonData(pfdto.key + 'AFI', client).then(JSON.parse),
                    this.redisService.getJsonData(pfdto.key + 'PFS', client).then(JSON.parse),
                    this.redisService.getJsonData(pfdto.key + 'PO', client).then(JSON.parse),
                    this.redisService.getJsonData(pfdto.key + 'PFO', client).then(JSON.parse),
                    this.redisService.getJsonData(pfdto.key + 'NDP', client).then(JSON.parse)
                ]);
                let logicCenter;
                if (afi && afi.hasOwnProperty('logicCenter')) {
                    if (currentFabric == 'DF-DFD')
                        logicCenter = afi?.logicCenter;
                }
                else {
                    logicCenter = true;
                }
                refflag = 'N';
                let ponode = poJson?.mappedData?.artifact?.node;
                if (!ponode || ponode.length == 0)
                    throw new customException_1.CustomException('Nodes not found', 404);
                if (ponode[1].events.length > 0) {
                    for (let a = 0; a < ponode[1].events.length; a++) {
                        sourceStatus = ponode[1].events[a].source.status;
                    }
                }
                pfdto['key'] = artifactKey;
                pfdto['token'] = artifactToken;
                pfdto['nodeId'] = ponode[1].nodeId;
                pfdto['nodeName'] = ponode[1].nodeName;
                pfdto['nodeType'] = ponode[1].nodeType;
                pfdto['event'] = sourceStatus;
                pfdto['data'] = {};
                let preData = 'Y';
                let pfProcessorResponse = await this.firstProcessor(pfdto, sourceStatus, pfjson, poJson, pfo, Ndp, currentFabric, refflag, undefined, undefined, undefined, undefined, undefined, logicCenter, false);
                if (!pfProcessorResponse?.status && pfProcessorResponse?.status != 200) {
                    throw pfProcessorResponse;
                }
                if (pfProcessorResponse?.data) {
                    let pfResponseData = pfProcessorResponse.data;
                    if (pfResponseData && Object.keys(pfResponseData).length > 0) {
                        pfdto = {};
                        pfdto['key'] = artifactKey;
                        pfdto['token'] = artifactToken;
                        pfdto['event'] = sourceStatus;
                        pfdto['data'] = pfResponseData;
                        pfdto['nodeId'] = ponode[1].nodeId;
                        pfdto['nodeName'] = ponode[1].nodeName;
                        pfdto['nodeType'] = ponode[1].nodeType;
                        await this.addEventEmitterJob(jobname, pfdto, jobname, processedKey, pfjson, currentFabric);
                    }
                }
            }
            catch (error) {
                this.logger.error(`Error in cron job '${JSON.stringify(error)}'`);
                let sourceStatus;
                let ponode = JSON.parse(await this.redisService.getJsonDataWithPath(pfdto.key + 'PO', '.mappedData.artifact.node', client));
                if (ponode[1].events.length > 0) {
                    for (let a = 0; a < ponode[1].events.length; a++) {
                        sourceStatus = ponode[1].events[a].source.status;
                    }
                }
                pfdto['nodeId'] = ponode[1].nodeId;
                pfdto['nodeName'] = ponode[1].nodeName;
                pfdto['nodeType'] = ponode[1].nodeType;
                pfdto['event'] = sourceStatus;
            }
        }, interval);
        this.intervalJobs.set(jobname, intervalId);
    }
    async addEventEmitterJob(queueName, pfdto, jobName, processedKey, pfs, currentFabric, options) {
        try {
            const queue = this.getQueue(queueName);
            if (pfdto && (Object.keys(pfdto.data).length > 0 || pfdto.data.length > 0)) {
                let tempData = pfdto.data;
                if (!Array.isArray(tempData))
                    tempData = [tempData];
                const preprocessingTasks = tempData.map(item => {
                    const upId = Xid.next();
                    return { upId, item };
                });
                await Promise.all(preprocessingTasks.map(({ upId }) => this.teService.pfPreProcessor(processedKey, pfs, upId, currentFabric)));
                const preprocessEndTime = performance.now();
                const jobsToAdd = preprocessingTasks.map(({ upId, item }) => ({
                    name: jobName,
                    data: {
                        ...pfdto,
                        upId: upId,
                        data: item
                    },
                    opts: {
                        jobId: upId,
                        ...options,
                        attempts: 3,
                        backoff: {
                            type: 'exponential',
                            delay: 1000,
                        },
                        priority: options?.priority,
                        removeOnComplete: false,
                        removeOnFail: false,
                    }
                }));
                if (jobsToAdd.length > 0) {
                    const jobs = await queue.addBulk(jobsToAdd);
                    jobs.forEach(job => {
                        this.logger.log(`Job ${job.id} added to queue with priority ${job.opts.priority}`);
                    });
                }
            }
        }
        catch (error) {
            this.logger.error(`Failed to add job to queue: ${error.message}`);
            throw error;
        }
    }
    getQueue(queueName) {
        if (this.queues.has(queueName)) {
            return this.queues.get(queueName);
        }
        const queueOptions = {
            connection: {
                host: process.env.HOST,
                port: parseInt(process.env.PORT),
            },
            defaultJobOptions: {
                attempts: 3,
                backoff: {
                    type: 'exponential',
                    delay: 2000,
                },
                removeOnComplete: 100,
                removeOnFail: false,
            },
        };
        const newQueue = new bullmq_1.Queue(queueName, queueOptions);
        this.queues.set(queueName, newQueue);
        this.logger.log(`Created new queue: ${queueName}`);
        this.processor.createWorker(queueName);
        return newQueue;
    }
    async stopCron(jobname) {
        const job = await this.schedulerRegistry.deleteCronJob(jobname);
    }
    async stopInterval(jobname) {
        const intervalId = this.intervals.get(jobname);
        if (!intervalId)
            return 'Not running';
        clearInterval(intervalId);
        this.intervals.delete(jobname);
    }
    stopIntervalJob(jobName) {
        const intervalId = this.intervalJobs.get(jobName);
        if (intervalId) {
            clearInterval(intervalId);
            this.intervalJobs.delete(jobName);
            this.logger.log(`Interval job stopped: ${jobName}`);
            return {
                jobName,
                status: 'stopped',
                message: `Interval job stopped successfully`,
            };
        }
        return {
            jobName,
            status: 'not_found',
            message: `No active interval job found with name: ${jobName}`,
        };
    }
    async firstProcessor(pfdto, event, pfjson, poJson, pfo, ndp, currentFabric, flag, page, count, filterData, lockDetails, childtable, logicCenter, semarc) {
        this.logger.log('firstProcessor started!');
        let upId = pfdto.upId;
        let key = pfdto.key;
        let inputparam = pfdto.data;
        let token = pfdto.token;
        let nodeId = pfdto.nodeId;
        let nodeType = pfdto.nodeType;
        let nodeName = pfdto.nodeName;
        let collectionName = process.env.CLIENTCODE;
        this.logger.log('collectionName', collectionName);
        let offset = (page - 1) * count;
        let fngkKey = await this.CommonService.splitcommonkey(pfdto.key, 'FNGK');
        let processedKey;
        if (pfdto.key.includes(fngkKey)) {
            processedKey = pfdto.key.replace(fngkKey, fngkKey + 'P');
        }
        let dstkey = processedKey.replace('DF-DFD', 'DF-DST');
        let staticQueue = currentFabric == 'DF-DFD' ? 'TDH' : 'TPH';
        let inputCollection = {};
        var poNode = poJson?.mappedData?.artifact?.node;
        var internalEdges = poJson?.internalMappingEdges;
        let statickeyword = ['get', 'post', 'patch', '200', '201', '202', '204', '400', '401', '403', '404', '500', 'requestBody', '*/*', 'responses', 'content', 'application/json', 'application/xml', 'text/plain', 'application/jwt', 'application/json; charset=utf-8', 'schema', 'properties', 'allOf', 'oneOf', 'inputschema', 'outputschema',];
        let numberArr = Array.from({ length: 101 }, (_, i) => i.toString());
        let SessionToken = await this.jwtService.decode(token, { json: true });
        let tokenDecode = await this.CommonService.MyAccountForClient(token);
        let sobj = {}, SessionInfo = {};
        sobj['session.orgGrpCode'] = SessionToken.orgGrpCode || process.env?.ORGGRPCODE;
        sobj['session.orgCode'] = SessionToken.orgCode || process.env?.ORGCODE;
        sobj['session.roleGrpCode'] = SessionToken.roleGrpCode || process.env?.ROLEGRPCODE;
        sobj['session.roleCode'] = SessionToken.roleCode || process.env?.ROLECODE;
        sobj['session.psGrpCode'] = SessionToken.psGrpCode || process.env?.PSGRPCODE;
        sobj['session.psCode'] = SessionToken.psCode || process.env?.PSCODE;
        sobj['session.selectedAccessProfile'] = SessionToken.selectedAccessProfile || process.env?.ACCESSPROFILE;
        sobj['session.loginId'] = SessionToken.loginId || process.env?.LOGINID;
        sobj['session.orgGrpName'] = SessionToken?.orgGrpName || process.env?.ORGGRPNAME;
        sobj['session.orgName'] = SessionToken?.orgName || process.env?.ORGNAME;
        sobj['session.roleGrpName'] = SessionToken?.roleGrpName || process.env?.ROLEGRPNAME;
        sobj['session.roleName'] = SessionToken?.roleName || process.env?.ROLENAME;
        sobj['session.psGrpName'] = SessionToken?.psGrpName || process.env?.PSGRPNAME;
        sobj['session.psName'] = SessionToken?.psName || process.env?.PSNAME;
        sobj['session.trs_process_id'] = upId;
        sobj['session.userCode'] = SessionToken?.userCode;
        sobj['session.subOrgGrpCode'] = SessionToken?.subOrgGrpCode || process.env?.SUBORGGRPCODE;
        sobj['session.subOrgGrpName'] = SessionToken?.subOrgGrpName || process.env?.SUBORGGRPNAME;
        sobj['session.subOrgCode'] = SessionToken?.subOrgCode || process.env?.SUBORGCODE;
        sobj['session.subOrgName'] = SessionToken?.subOrgName || process.env?.SUBORGNAME;
        SessionInfo['loginId'] = SessionToken?.loginId || process.env?.LOGINID || '';
        SessionInfo['accessProfile'] = SessionToken?.selectedAccessProfile || process.env?.ACCESSPROFILE || '';
        SessionInfo['orgGrpName'] = SessionToken?.orgGrpName || process.env?.ORGGRPNAME || '';
        SessionInfo['orgName'] = SessionToken?.orgName || process.env?.ORGNAME || '';
        SessionInfo['roleGrpName'] = SessionToken?.roleGrpName || process.env?.ROLEGRPNAME || '';
        SessionInfo['roleName'] = SessionToken?.roleName || process.env?.ROLENAME || '';
        SessionInfo['psGrpName'] = SessionToken?.psGrpName || process.env?.PSGRPNAME || '';
        SessionInfo['psName'] = SessionToken?.psName || process.env?.PSNAME || '';
        SessionInfo['userCode'] = SessionToken?.userCode || '';
        SessionInfo['subOrgGrpName'] = SessionToken?.subOrgGrpName || process.env?.SUBORGGRPNAME || '';
        SessionInfo['subOrgName'] = SessionToken?.subOrgName || process.env?.SUBORGNAME || '';
        let sourceStatus, srcQueue, targetStatus, targetQueue, failureQueue, failureTargetStatus, suspiciousStatus, suspiciousQueue, errorStatus, errorQueue, dfoSchema;
        for (var j = 0; j < poNode.length; j++) {
            if (poNode[j].nodeId == nodeId) {
                if (currentFabric == 'DF-DFD') {
                    sourceStatus = poNode[j].events.sourceStatus;
                    srcQueue = poNode[j].events.sourceQueue;
                    targetStatus = poNode[j].events.pro.success.targetStatus;
                    targetQueue = poNode[j].events?.pro?.success?.targetQueue;
                    failureQueue = poNode[j].events.pro.failure.targetQueue;
                    failureTargetStatus = poNode[j].events.pro.failure.targetStatus;
                }
                else if (currentFabric == 'PF-PFD' || currentFabric == 'PF-SFD' || currentFabric == 'PF-SCDL') {
                    if (Array.isArray(poNode[j].events) && poNode[j].events.length > 0) {
                        for (let e = 0; e < poNode[j].events.length; e++) {
                            if (event == poNode[j].events[e].source.status) {
                                sourceStatus = poNode[j].events[e].source.status;
                                srcQueue = poNode[j].events[e].source.queue;
                                targetStatus = poNode[j].events[e].success.status;
                                targetQueue = poNode[j].events[e].success.queue;
                                failureQueue = poNode[j].events[e].failure.queue;
                                failureTargetStatus = poNode[j].events[e].failure.status;
                                suspiciousStatus = poNode[j].events[e].suspicious.status;
                                suspiciousQueue = poNode[j].events[e].suspicious.queue;
                                errorStatus = poNode[j].events[e].error.status;
                                errorQueue = poNode[j].events[e].error.queue;
                            }
                        }
                    }
                }
            }
            if (nodeType == 'apinode' && poNode[j].nodeId == nodeId) {
                let lock, rollbackConfig, apichildResult = [];
                try {
                    this.logger.log(`${poNode[j].nodeName} Api first node Started`);
                    if (!failureQueue) {
                        failureQueue = srcQueue;
                    }
                    rollbackConfig = ndp[poNode[j].nodeId];
                    let customConfig = ndp[poNode[j].nodeId];
                    let referenceKey = customConfig?.apiKey;
                    let SessionfilterParams = customConfig?.data?.pro?.filterParams;
                    let filterParams = customConfig?.data?.pro?.request?.filterParams?.items;
                    let requestContentType = customConfig?.data?.pro?.request?.content_type?.value;
                    let responseContentType = customConfig?.data?.pro?.response?.content_type?.value;
                    let nodeVersion = customConfig?.nodeVersion;
                    if (!referenceKey)
                        throw new customException_1.CustomException('Reference key not found', 404);
                    let ApiConfig = JSON.parse(await this.redisService.getJsonData(referenceKey, collectionName));
                    if (!ApiConfig || Object.keys(ApiConfig).length == 0)
                        throw new customException_1.CustomException('Reference key value not found', 404);
                    let apiVal = Object.values(ApiConfig)[0];
                    customConfig = apiVal;
                    let methodName, parameterQuery, parameter, contentType, serverUrl, endPoint, encCredentials, codeObj;
                    if (nodeVersion?.toLowerCase() == 'v1') {
                        let oprname = customConfig?.data?.method;
                        if (!oprname)
                            throw new customException_1.CustomException('Method Name not found', 404);
                        methodName = oprname.toLowerCase();
                        parameterQuery = customConfig.data?.[methodName]?.parameters;
                        parameter = customConfig.data[methodName];
                        if (methodName == 'get') {
                            let responsekey = Object.keys(parameter?.responses)[0];
                            contentType = parameter?.responses[responsekey]?.content ? Object.keys(parameter.responses[responsekey]?.content)[0] : '';
                        }
                        else {
                            contentType = parameter?.requestBody?.content ? Object.keys(parameter.requestBody.content)[0] : '';
                        }
                        serverUrl = customConfig.data?.serverUrl;
                        endPoint = customConfig.data?.endPoint;
                    }
                    let apiResult;
                    if (customConfig) {
                        let apiUrl = serverUrl + endPoint;
                        if (apiUrl && methodName == 'get' && !semarc) {
                            const requestConfig = {
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${token}`
                                }
                            };
                            apiResult = await this.CommonService.getCall(apiUrl, requestConfig);
                            if (apiResult.statusCode == 201 || apiResult.statusCode == 200) {
                                apiResult = apiResult?.result;
                            }
                            else {
                                throw apiResult;
                            }
                        }
                        else if (semarc) {
                            let internalMappingNodes = poJson?.internalMappingNodes;
                            let internalMappedObj = {};
                            for (let n = 0; n < internalMappingNodes.length; n++) {
                                if (internalMappingNodes[n].nodeId == poNode[j].nodeId && internalMappingNodes[n].ifo?.length > 0) {
                                    for (let f = 0; f < internalMappingNodes[n].ifo.length; f++) {
                                        if (internalMappingNodes[n].ifo[f].value) {
                                            internalMappedObj[internalMappingNodes[n].ifo[f].key] = internalMappingNodes[n].ifo[f].value;
                                        }
                                        else {
                                            internalMappedObj[internalMappingNodes[n].ifo[f].key] = '';
                                        }
                                    }
                                }
                            }
                            let RCMresult, customcoderesult, zenresult, codeObj = {};
                            ;
                            if (currentFabric == 'PF-SCDL') {
                                RCMresult = await this.CommonService.getRuleCodeMapper(poNode[j], inputparam, processedKey + upId, currentFabric, SessionInfo);
                                if (RCMresult) {
                                    zenresult = RCMresult.rule;
                                    customcoderesult = RCMresult.code;
                                }
                                if (customcoderesult != undefined) {
                                    if (customcoderesult && Object.keys(customcoderesult).length > 0) {
                                        for (let item in customcoderesult) {
                                            codeObj[item.toLowerCase()] = customcoderesult[item];
                                        }
                                    }
                                    await this.redisService.setJsonData(processedKey + upId + ':NPV:' + poNode[j].nodeName + '.PRO', JSON.stringify(codeObj), collectionName, 'code');
                                }
                            }
                            let ifoObj = {};
                            if (internalMappedObj && Object.keys(internalMappedObj).length > 0) {
                                for (let item in internalMappedObj) {
                                    ifoObj[item.toLowerCase()] = internalMappedObj[item];
                                }
                                if (await this.redisService.exist(processedKey + upId + ':NPV:' + poNode[j].nodeName + '.PRO', collectionName))
                                    await this.redisService.setJsonData(processedKey + upId + ':NPV:' + poNode[j].nodeName + '.PRO', JSON.stringify(ifoObj), collectionName, 'ifo');
                            }
                            if (Array.isArray(inputparam)) {
                                for (let r = 0; r < inputparam.length; r++) {
                                    if (codeObj && Object.keys(codeObj).length > 0)
                                        inputparam[r] = Object.assign(inputparam[r], codeObj);
                                    if (ifoObj && Object.keys(ifoObj).length > 0)
                                        inputparam[r] = Object.assign(inputparam[r], ifoObj);
                                }
                            }
                            else if (typeof inputparam == 'object') {
                                if (codeObj && Object.keys(codeObj).length > 0)
                                    inputparam = Object.assign(inputparam, codeObj);
                                if (ifoObj && Object.keys(ifoObj).length > 0)
                                    inputparam = Object.assign(inputparam, ifoObj);
                            }
                        }
                        else {
                            throw new customException_1.CustomException('API Endpoint does not exist', 404);
                        }
                    }
                    this.logger.log('Api first node completed');
                    if (semarc)
                        return { status: 200, targetStatus: targetStatus, data: { [nodeName]: inputparam } };
                    else
                        return { status: 200, targetStatus: targetStatus, data: apiResult };
                }
                catch (error) {
                    console.log(error);
                    throw error;
                }
            }
            if (nodeType == 'streamnode' && poNode[j].nodeId == nodeId) {
                try {
                    this.logger.log('Stream first node Started');
                    let streamArr = [];
                    let oprname, entryId, streamName, fromStreamid, toStreamid, connectorType, storageType, dpdkey, conncectorName, apikey, responseNodeName, fieldName, isStatic, useAsConsumer, consumerName, consumerGroupName;
                    let childInsertArr, textobj, tempQryVal = [];
                    let customConfig = ndp[poNode[j].nodeId];
                    let nodeVersion = customConfig?.nodeVersion;
                    if (!nodeVersion)
                        throw new customException_1.CustomException('nodeVersion not found', 404);
                    if (nodeVersion.toLowerCase() == 'v1') {
                        connectorType = customConfig?.data?.props?.connector?.value;
                        storageType = customConfig?.data?.props?.connector?._selection?.value;
                        dpdkey = customConfig?.data?.props?.connector?.value;
                        conncectorName = customConfig?.data?.props?.connector?.subSelection?.value;
                        useAsConsumer = customConfig?.data?.props?.useAsConsumer?.value;
                        oprname = customConfig?.data?.props?.operation?.value;
                        if (oprname == 'read') {
                            isStatic = customConfig?.data?.props?.operation?.subSelection[oprname]?.isStatic.value;
                            if (isStatic) {
                                streamName = customConfig?.data?.props?.operation?.subSelection[oprname]?.isStatic?.subSelection?._true?.streamName?.value;
                                fromStreamid = customConfig?.data?.props?.operation?.subSelection[oprname]?.isStatic?.subSelection?._true?.startTime?.value;
                                toStreamid = customConfig?.data?.props?.operation?.subSelection[oprname]?.isStatic?.subSelection?._true?.endTime?.value;
                                if (useAsConsumer) {
                                    consumerName = customConfig?.data?.props?.operation?.subSelection[oprname]?.isStatic?.subSelection?._true?.useAsConsumer?.subSelection?._true?.consumerName?.value;
                                    consumerGroupName = customConfig?.data?.props?.operation?.subSelection[oprname]?.isStatic?.subSelection?._true?.useAsConsumer?.subSelection?._true?.consumerGroupName?.value;
                                    if (!consumerName || !consumerGroupName)
                                        throw new customException_1.CustomException('consumerName/consumerGroupName not found', 404);
                                }
                            }
                        }
                        else if (oprname == 'write') {
                            isStatic = customConfig?.data?.props?.operation?.subSelection[oprname]?.isStatic.value;
                            if (isStatic) {
                                streamName = customConfig?.data?.props?.operation?.subSelection[oprname]?.isStatic?.subSelection?._true?.streamName?.value;
                                fieldName = customConfig?.data?.props?.operation?.subSelection[oprname]?.isStatic?.subSelection?._true?.streamName?.value;
                            }
                        }
                        apikey = customConfig.data?.apiKey;
                        responseNodeName = customConfig?.outputDataNodes;
                    }
                    if (customConfig) {
                        let streamhost;
                        let streamport;
                        if (!oprname)
                            throw new customException_1.CustomException('Operation name not found', 404);
                        if (currentFabric == 'PF-SCDL' && !semarc) {
                            if (storageType?.toLowerCase() == 'external') {
                                if (!dpdkey)
                                    throw new customException_1.CustomException('DPD key not found', 404);
                                let extdata = JSON.parse(await this.redisService.getJsonData(dpdkey + 'NDP', collectionName));
                                let nodedata = Object.keys(extdata)[0];
                                let configConnectors = extdata[nodedata].data['externalConnectors-STREAM']?.items;
                                if (configConnectors?.length > 0) {
                                    for (let i = 0; i < configConnectors.length; i++) {
                                        if (configConnectors[i].connectorName == conncectorName) {
                                            streamhost = configConnectors[i]?.credentials.host;
                                            streamport = parseInt(configConnectors[i]?.credentials.port);
                                        }
                                    }
                                }
                                if (!streamhost || !streamport) {
                                    throw new customException_1.CustomException('Invalid stream credentials', 422);
                                }
                                const ext_redis = new ioredis_1.default({
                                    host: streamhost,
                                    port: streamport,
                                });
                                if (oprname == 'read') {
                                    if (!streamName) {
                                        throw new customException_1.CustomException('Stream RequestParams were empty', 404);
                                    }
                                    const startOfToday = new Date(fromStreamid).getTime();
                                    const endOfToday = new Date(toStreamid).getTime();
                                    if (startOfToday && endOfToday) {
                                        streamArr = await ext_redis.xrevrange(streamName, endOfToday, startOfToday, 'COUNT', count);
                                    }
                                    else if (useAsConsumer) {
                                        if (await ext_redis.call('EXISTS', streamName)) {
                                            var grpInfo = await ext_redis.xinfo('GROUPS', streamName);
                                            if (grpInfo.length == 0) {
                                                await ext_redis.xgroup('CREATE', streamName, consumerGroupName, '0', 'MKSTREAM');
                                            }
                                            else if (!grpInfo[0].includes(consumerGroupName)) {
                                                await ext_redis.xgroup('CREATE', streamName, consumerGroupName, '0', 'MKSTREAM');
                                            }
                                            var result = await ext_redis.xreadgroup('GROUP', consumerGroupName, consumerName, 'STREAMS', streamName, '>');
                                            let streamData = [];
                                            if (result) {
                                                result.forEach(([key, message]) => {
                                                    message.forEach(([messageId, data]) => {
                                                        var obj = {};
                                                        obj['msgid'] = messageId;
                                                        obj['data'] = data;
                                                        streamData.push(obj);
                                                    });
                                                });
                                            }
                                            if (streamData != 'No Data available to read') {
                                                for (var s = 0; s < streamData.length; s++) {
                                                    var msgid = streamData[s].msgid;
                                                    let dataObj = streamData[s].data[1];
                                                    streamArr.push(JSON.parse(dataObj));
                                                    await ext_redis.xack(streamName, consumerGroupName, msgid);
                                                }
                                            }
                                            else {
                                                throw streamData;
                                            }
                                        }
                                    }
                                    else if (!useAsConsumer && childInsertArr?.length > 0) {
                                        let entryArr = [];
                                        for (let a = 0; a < childInsertArr.length; a++) {
                                            if (childInsertArr[a].hasOwnProperty('entryId')) {
                                                entryId = childInsertArr[a]?.entryId;
                                                let entryData = await ext_redis.xrange(streamName, entryId, entryId);
                                                entryData = entryData.flat();
                                                let res = entryData[1];
                                                entryArr.push(JSON.parse(res[1]));
                                            }
                                        }
                                        streamArr = entryArr;
                                    }
                                    if (streamArr?.length == 0)
                                        throw new customException_1.CustomException('No Data available to read from firstProcessor', 404);
                                }
                                else if (oprname == 'write') {
                                    if (!fieldName)
                                        fieldName = streamName;
                                    let idarr = [];
                                    if (childInsertArr?.length > 0 && streamName && !textobj) {
                                        for (let a = 0; a < childInsertArr.length; a++) {
                                            idarr.push(await ext_redis.xadd(streamName, '*', fieldName, JSON.stringify(childInsertArr[a])));
                                        }
                                    }
                                    else if (textobj && streamName) {
                                        idarr.push(await ext_redis.xadd(streamName, '*', fieldName, JSON.stringify(textobj)));
                                    }
                                    streamArr = { entryId: idarr };
                                }
                                ext_redis.disconnect();
                            }
                            else {
                                if (oprname == 'read') {
                                    if (!streamName) {
                                        throw new customException_1.CustomException('Stream RequestParams were empty', 404);
                                    }
                                    const startOfToday = new Date(fromStreamid).getTime();
                                    const endOfToday = new Date(toStreamid).getTime();
                                    if (startOfToday && endOfToday) {
                                        streamArr = await this.redisService.getStreamRevRange(streamName, endOfToday, startOfToday, count);
                                    }
                                    else if (useAsConsumer) {
                                        if (await this.redisService.exist(streamName, collectionName)) {
                                            var grpInfo = await this.redisService.getInfoGrp(streamName);
                                            if (grpInfo.length == 0) {
                                                await this.redisService.createConsumerGroup(streamName, consumerGroupName);
                                            }
                                            else if (!grpInfo[0].includes(consumerGroupName)) {
                                                await this.redisService.createConsumerGroup(streamName, consumerGroupName);
                                            }
                                            let result = await this.redisService.readConsumerGroup(streamName, consumerGroupName, consumerName);
                                            if (result != 'No Data available to read') {
                                                for (let s = 0; s < result.length; s++) {
                                                    let msgid = result[s].msgid;
                                                    let dataObj = result[s].data[1];
                                                    streamArr.push(JSON.parse(dataObj));
                                                    if (streamArr?.length > 0)
                                                        await this.redisService.ackMessage(streamName, consumerGroupName, msgid);
                                                }
                                            }
                                            else {
                                                throw result;
                                            }
                                        }
                                    }
                                    else if (!useAsConsumer && childInsertArr?.length > 0) {
                                        let entryArr = [];
                                        for (let a = 0; a < childInsertArr.length; a++) {
                                            if (childInsertArr[a].hasOwnProperty('entryId')) {
                                                entryId = childInsertArr[a]?.entryId;
                                                let entryData = await this.redisService.getStreamRange(streamName, entryId, entryId);
                                                entryData = entryData.flat();
                                                let res = entryData[1];
                                                entryArr.push(JSON.parse(res[1]));
                                            }
                                        }
                                        streamArr = entryArr;
                                    }
                                    if (streamArr?.length == 0)
                                        throw new customException_1.CustomException('No Data available to read from firstProcessor', 404);
                                }
                                else if (oprname == 'write') {
                                    if (!fieldName)
                                        fieldName = streamName;
                                    let idarr = [];
                                    if (childInsertArr?.length > 0 && streamName && !textobj) {
                                        for (let a = 0; a < childInsertArr.length; a++) {
                                            idarr.push(await this.redisService.setStreamData(streamName, fieldName, JSON.stringify(childInsertArr[a])));
                                        }
                                    }
                                    else if (textobj && streamName) {
                                        idarr.push(await this.redisService.setStreamData(streamName, fieldName, JSON.stringify(textobj)));
                                    }
                                    streamArr = { entryId: idarr };
                                }
                            }
                        }
                        else if (semarc) {
                            let internalMappingNodes = poJson?.internalMappingNodes;
                            let internalMappedObj = {};
                            for (let n = 0; n < internalMappingNodes.length; n++) {
                                if (internalMappingNodes[n].nodeId == poNode[j].nodeId && internalMappingNodes[n].ifo?.length > 0) {
                                    for (let f = 0; f < internalMappingNodes[n].ifo.length; f++) {
                                        if (internalMappingNodes[n].ifo[f].value) {
                                            internalMappedObj[internalMappingNodes[n].ifo[f].key] = internalMappingNodes[n].ifo[f].value;
                                        }
                                        else {
                                            internalMappedObj[internalMappingNodes[n].ifo[f].key] = '';
                                        }
                                    }
                                }
                            }
                            let ifoObj = {};
                            if (internalMappedObj && Object.keys(internalMappedObj).length > 0) {
                                for (let item in internalMappedObj) {
                                    ifoObj[item.toLowerCase()] = internalMappedObj[item];
                                }
                                await this.redisService.setJsonData(processedKey + upId + ':NPV:' + poNode[j].nodeName + '.PRO', JSON.stringify(ifoObj), collectionName, 'ifo');
                            }
                            let RCMresult, zenresult, customcoderesult, codeObj = {};
                            if (inputparam) {
                                RCMresult = await this.CommonService.getRuleCodeMapper(poNode[j], inputparam, processedKey + upId, currentFabric, SessionInfo);
                            }
                            if (RCMresult) {
                                zenresult = RCMresult.rule;
                                customcoderesult = RCMresult.code;
                            }
                            if (customcoderesult != undefined) {
                                if (customcoderesult && Object.keys(customcoderesult).length > 0) {
                                    for (let item in customcoderesult) {
                                        codeObj[item.toLowerCase()] = customcoderesult[item];
                                    }
                                }
                                await this.redisService.setJsonData(processedKey + upId + ':NPV:' + poNode[j].nodeName + '.PRO', JSON.stringify(codeObj), collectionName, 'code');
                                if (Array.isArray(inputparam) && inputparam?.length > 0) {
                                    for (let i = 0; i < inputparam.length; i++) {
                                        inputparam[i] = Object.assign(inputparam[i], codeObj);
                                    }
                                }
                                else if (typeof inputparam == 'object')
                                    inputparam = Object.assign(inputparam, codeObj);
                            }
                            if (upId) {
                                await this.redisService.setStreamData(srcQueue, collectionName + '-TASK - ' + upId, JSON.stringify({ PID: upId, TID: nodeId, EVENT: targetStatus, data: { request: streamName, response: inputparam } }));
                                if (Array.isArray(inputparam) && inputparam.length > 0)
                                    await this.CommonService.getTPL(processedKey, upId, poNode[j], 'Success', targetQueue, token, currentFabric, sourceStatus, streamName, inputparam);
                                await this.redisService.setJsonData(processedKey + upId + ':NPV:' + nodeName + '.PRO', JSON.stringify(streamName), collectionName, 'request');
                                await this.redisService.setJsonData(processedKey + upId + ':NPV:' + nodeName + '.PRO', JSON.stringify(inputparam), collectionName, 'response');
                            }
                        }
                        this.logger.log('Stream first Node execution completed');
                        if (semarc)
                            return { status: 200, targetStatus: targetStatus, data: { [nodeName]: inputparam } };
                        else
                            return { status: 200, targetStatus: targetStatus, data: streamArr };
                    }
                    else {
                        throw new customException_1.CustomException('Node Data not found', 404);
                    }
                }
                catch (error) {
                    throw error;
                }
            }
            if (nodeType == 'kafka_stream_node' && poNode[j].nodeId == nodeId) {
                try {
                    this.logger.log('Kafka Stream first node Started');
                    let kafkaResultArr = [];
                    let oprname, topicName, connectorType, storageType, dpdkey, connectorName, isStatic, groupId, autoOffsetReset;
                    let childInsertArr, textobj, tempQryVal = [];
                    let customConfig = ndp[poNode[j].nodeId];
                    let nodeVersion = customConfig?.nodeVersion;
                    let clientId;
                    if (!nodeVersion)
                        throw new customException_1.CustomException('nodeVersion not found', 404);
                    let kafkaConfig = customConfig?.data;
                    if (!kafkaConfig)
                        throw new customException_1.CustomException('Kafka configuration not found', 404);
                    if (nodeVersion.toLowerCase() == 'v1') {
                        connectorType = customConfig?.data?.connector?.value;
                        storageType = customConfig?.data?.connector?._selection?.value;
                        dpdkey = customConfig?.data?.connector?.value;
                        connectorName = customConfig?.data?.connector?.subSelection?.value;
                        oprname = customConfig?.data?.operation?.value;
                        if (oprname == 'producer') {
                            isStatic = customConfig?.data?.operation?.subSelection[oprname]?.isStatic?.value;
                            if (isStatic) {
                                topicName = customConfig?.data?.operation?.subSelection[oprname]?.isStatic?.subSelection?._true?.topic?.value;
                            }
                        }
                        else if (oprname == 'consumer') {
                            isStatic = customConfig?.data?.operation?.subSelection[oprname]?.isStatic?.value;
                            if (isStatic) {
                                topicName = customConfig?.data?.operation?.subSelection[oprname]?.isStatic?.subSelection?._true?.topic?.value;
                                groupId = customConfig?.data?.operation?.subSelection[oprname]?.isStatic?.subSelection?._true?.group_id?.value;
                                groupId = groupId + '_' + upId;
                                autoOffsetReset = customConfig?.data?.operation?.subSelection[oprname]?.isStatic?.subSelection?._true?.auto_offset_reset?.value;
                            }
                        }
                    }
                    if (!oprname)
                        throw new customException_1.CustomException('Operation name not found', 404);
                    if (currentFabric == 'PF-SCDL' && !semarc) {
                        if (!isStatic && childInsertArr?.length > 0 && childInsertArr[0]?.kafkainfo) {
                            let kafkainfo = childInsertArr[0].kafkainfo;
                            topicName = kafkainfo.topicName || topicName;
                            groupId = kafkainfo.groupId || groupId;
                            delete childInsertArr[0].kafkainfo;
                        }
                        if (!topicName)
                            throw new customException_1.CustomException('Kafka topic name not found', 404);
                        let kafkaBrokers = [];
                        if (storageType?.toLowerCase() == 'external') {
                            if (!dpdkey)
                                throw new customException_1.CustomException('DPD key not found', 404);
                            let extdata = JSON.parse(await this.redisService.getJsonData(dpdkey + 'NDP', collectionName));
                            let nodedata = Object.keys(extdata)[0];
                            let configConnectors = extdata[nodedata].data['externalConnectors-KAFKA']?.items;
                            if (configConnectors?.length > 0) {
                                for (let i = 0; i < configConnectors.length; i++) {
                                    if (configConnectors[i].connectorName == connectorName) {
                                        let brokerHost = configConnectors[i]?.credentials?.host;
                                        let brokerPort = configConnectors[i]?.credentials?.port;
                                        if (brokerHost && brokerPort) {
                                            kafkaBrokers = [`${brokerHost}:${brokerPort}`];
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            kafkaBrokers = (process.env.KAFKA_BROKER).split(',');
                        }
                        if (oprname === 'producer') {
                            try {
                                const producer = await this.getProducer();
                                let messagesToSend = [];
                                if (childInsertArr?.length > 0) {
                                    messagesToSend = childInsertArr.map((item, index) => ({
                                        value: JSON.stringify(item),
                                        key: item.id || `${Date.now()}-${index}`,
                                    }));
                                }
                                else if (textobj) {
                                    messagesToSend.push({
                                        value: JSON.stringify(textobj),
                                        key: textobj.id || Date.now().toString(),
                                    });
                                }
                                const result = await producer.send({
                                    topic: topicName,
                                    messages: messagesToSend,
                                    acks: -1,
                                    timeout: 30000,
                                    compression: kafkajs_1.CompressionTypes.GZIP,
                                });
                                kafkaResultArr = {
                                    operation: 'produce',
                                    topic: topicName,
                                    messageCount: messagesToSend.length,
                                    result: result,
                                };
                            }
                            catch (producerError) {
                                throw new customException_1.CustomException(`Kafka produce error: ${producerError?.message || producerError}`, 500);
                            }
                        }
                        else if (oprname === 'consumer') {
                            if (!groupId) {
                                throw new customException_1.CustomException('Consumer group ID not found', 404);
                            }
                            try {
                                const consumer = await this.getConsumer(groupId);
                                const offsetReset = typeof autoOffsetReset === 'string'
                                    ? autoOffsetReset.toLowerCase()
                                    : 'earliest';
                                const fromBeginning = !['latest', 'newest'].includes(offsetReset);
                                await consumer.subscribe({
                                    topic: topicName,
                                    fromBeginning: fromBeginning,
                                });
                                const consumedMessages = [];
                                const maxPollRecords = 100;
                                const consumeTimeout = 10000;
                                await new Promise((resolve, reject) => {
                                    let timeoutId;
                                    let isResolved = false;
                                    const cleanup = async () => {
                                        if (!isResolved) {
                                            isResolved = true;
                                            clearTimeout(timeoutId);
                                            await consumer.stop();
                                            resolve();
                                        }
                                    };
                                    timeoutId = setTimeout(cleanup, consumeTimeout);
                                    consumer.run({
                                        autoCommit: true,
                                        autoCommitInterval: 5000,
                                        eachBatchAutoResolve: true,
                                        partitionsConsumedConcurrently: 3,
                                        eachMessage: async ({ topic, partition, message }) => {
                                            try {
                                                const messageValue = JSON.parse(message.value?.toString() || '{}');
                                                consumedMessages.push(messageValue);
                                                if (consumedMessages.length >= maxPollRecords) {
                                                    await cleanup();
                                                }
                                            }
                                            catch (msgError) {
                                                console.error(`Error processing Kafka message: ${msgError}`);
                                            }
                                        },
                                    }).catch(reject);
                                });
                                kafkaResultArr = consumedMessages.length > 0
                                    ? await this.keysToLowerCaseOnly(consumedMessages)
                                    : [];
                            }
                            catch (consumerError) {
                                throw new customException_1.CustomException(`Kafka consume error: ${consumerError?.message || consumerError}`, 500);
                            }
                        }
                    }
                    else if (semarc) {
                        let internalMappingNodes = poJson?.internalMappingNodes;
                        let internalMappedObj = {};
                        for (let n = 0; n < internalMappingNodes?.length; n++) {
                            if (internalMappingNodes[n].nodeId == poNode[j].nodeId && internalMappingNodes[n].ifo?.length > 0) {
                                for (let f = 0; f < internalMappingNodes[n].ifo.length; f++) {
                                    if (internalMappingNodes[n].ifo[f].value) {
                                        internalMappedObj[internalMappingNodes[n].ifo[f].key] = internalMappingNodes[n].ifo[f].value;
                                    }
                                    else {
                                        internalMappedObj[internalMappingNodes[n].ifo[f].key] = '';
                                    }
                                }
                            }
                        }
                        let ifoObj = {};
                        if (internalMappedObj && Object.keys(internalMappedObj).length > 0) {
                            for (let item in internalMappedObj) {
                                ifoObj[item.toLowerCase()] = internalMappedObj[item];
                            }
                            await this.redisService.setJsonData(processedKey + upId + ':NPV:' + poNode[j].nodeName + '.PRO', JSON.stringify(ifoObj), collectionName, 'ifo');
                        }
                        let RCMresult, zenresult, customcoderesult, codeObj = {};
                        if (inputparam) {
                            RCMresult = await this.CommonService.getRuleCodeMapper(poNode[j], inputparam, processedKey + upId, currentFabric, SessionInfo);
                        }
                        if (RCMresult) {
                            zenresult = RCMresult.rule;
                            customcoderesult = RCMresult.code;
                        }
                        if (customcoderesult != undefined) {
                            if (customcoderesult && Object.keys(customcoderesult).length > 0) {
                                for (let item in customcoderesult) {
                                    codeObj[item.toLowerCase()] = customcoderesult[item];
                                }
                            }
                            await this.redisService.setJsonData(processedKey + upId + ':NPV:' + poNode[j].nodeName + '.PRO', JSON.stringify(codeObj), collectionName, 'code');
                            if (Array.isArray(inputparam) && inputparam?.length > 0) {
                                for (let i = 0; i < inputparam.length; i++) {
                                    inputparam[i] = Object.assign(inputparam[i], codeObj);
                                }
                            }
                            else if (typeof inputparam == 'object')
                                inputparam = Object.assign(inputparam, codeObj);
                        }
                        if (upId) {
                            await this.redisService.setStreamData(srcQueue, collectionName + '-TASK - ' + upId, JSON.stringify({ PID: upId, TID: nodeId, EVENT: targetStatus, data: { request: topicName, response: inputparam } }));
                            if (Array.isArray(inputparam) && inputparam.length > 0)
                                await this.CommonService.getTPL(processedKey, upId, poNode[j], 'Success', targetQueue, token, currentFabric, sourceStatus, topicName, inputparam);
                            await this.redisService.setJsonData(processedKey + upId + ':NPV:' + nodeName + '.PRO', JSON.stringify({ topic: topicName, operation: oprname }), collectionName, 'request');
                            await this.redisService.setJsonData(processedKey + upId + ':NPV:' + nodeName + '.PRO', JSON.stringify(inputparam), collectionName, 'response');
                        }
                    }
                    this.logger.log('Kafka Stream first node Completed');
                    if (semarc)
                        return { status: 200, targetStatus: targetStatus, data: { [nodeName]: inputparam } };
                    else
                        return { status: 200, targetStatus: targetStatus, data: kafkaResultArr };
                }
                catch (error) {
                    console.log('error', error);
                    this.logger.error('Kafka Stream first node Failed', error);
                    throw error;
                }
            }
            if (nodeType == 'dbnode' && poNode[j].nodeId == nodeId) {
                try {
                    this.logger.log('first DB node Started');
                    let dbres, qryres;
                    let customConfig = ndp[poNode[j].nodeId];
                    let nodeVersion = customConfig?.nodeVersion;
                    if (!nodeVersion)
                        throw new customException_1.CustomException('Node version not found', 404);
                    let oprname, oprkey, tablename, sessionParams, selcol, filterParams, connectorType, storageType, dpdkey, conncectorName, manualQuery, insertParams;
                    if (nodeVersion.toLowerCase() == 'v1') {
                        connectorType = customConfig?.data?.pro?.connector?.value;
                        storageType = customConfig?.data?.pro?.connector?._selection?._selection?.value;
                        dpdkey = customConfig?.data?.pro?.connector?._selection?.value;
                        conncectorName = customConfig?.data?.pro?.connector?._selection?.subSelection?.value;
                        oprname = customConfig.data?.pro?.operationName?.value;
                        oprkey = Object.keys(customConfig.data.pro);
                        tablename = customConfig.data?.pro?.tableName;
                        sessionParams = customConfig.data?.pro?.filterParams;
                        if (oprname == 'select') {
                            selcol = customConfig.data?.pro[oprname]?.selectColumns.items;
                            filterParams = customConfig.data?.pro[oprname]?.filterParams?.items;
                        }
                        manualQuery = customConfig.data?.pro?.manualQuery;
                        if (oprname == 'insert') {
                            insertParams = customConfig.data?.pro[oprname]?.insertParams?.items;
                        }
                    }
                    let dbUrl, schemaname, dbConfig, Querystr, qry;
                    if (customConfig) {
                        if (currentFabric == 'PF-SCDL' && !semarc) {
                            if (storageType?.toLowerCase() == 'external') {
                                if (!dpdkey)
                                    throw new customException_1.CustomException('DPD key not found', 404);
                                let extdata = JSON.parse(await this.redisService.getJsonData(dpdkey + 'NDP', collectionName));
                                let nodedata = Object.keys(extdata)[0];
                                let configConnectors = extdata[nodedata].data['externalConnectors-DB']?.items;
                                if (configConnectors?.length > 0) {
                                    for (let i = 0; i < configConnectors.length; i++) {
                                        if (configConnectors[i].connectorName == conncectorName) {
                                            dbConfig = configConnectors[i]?.credentials;
                                        }
                                    }
                                }
                                if (!dbConfig?.host) {
                                    throw new customException_1.CustomException(`Invalid DB credentials`, 404);
                                }
                                if (dbConfig?.port && dbConfig?.username && dbConfig?.password && dbConfig?.database && dbConfig?.schema)
                                    dbUrl = `postgresql://${dbConfig?.username}:${dbConfig?.password}@${dbConfig?.host}:${dbConfig?.port}/${dbConfig?.database}?schema=${dbConfig?.schema}`;
                                else
                                    dbUrl = dbConfig?.host;
                                schemaname = dbConfig?.schema;
                            }
                            else {
                                dbUrl = process.env.DATABASE_URL;
                                schemaname = process.env.DATABASE_URL.split('schema=')[1];
                            }
                            if (!dbUrl)
                                throw new customException_1.CustomException('DB url not found', 404);
                            const { Client } = pg;
                            const client = new Client({
                                connectionString: dbUrl,
                            });
                            if (!oprname) {
                                oprname = 'select';
                            }
                            let str = [];
                            if (sessionParams?.length > 0) {
                                for (let i = 0; i < sessionParams.length; i++) {
                                    var filcol = sessionParams[i].name;
                                    var filval = sessionParams[i].value;
                                    if (filval) {
                                        if ((Object.keys(sobj)).includes(filval)) {
                                            let strobj = ` ${filcol} = '${sobj[filval]}' `;
                                            str.push(strobj);
                                        }
                                    }
                                }
                            }
                            if (filterParams?.length > 0) {
                                for (let i = 0; i < filterParams.length; i++) {
                                    var filcol = filterParams[i].key;
                                    var filval = filterParams[i].value.value;
                                    if (filval && filval.includes('session.') && filcol)
                                        str.push(` ${filcol} = '${sobj[filval]}' `);
                                    else if (filcol && filval)
                                        str.push(` ${filcol} = '${filval}' `);
                                }
                            }
                            if (manualQuery) {
                                qry = manualQuery;
                                if (qry.endsWith(';')) {
                                    qry = qry.slice(0, -1);
                                }
                                if (page && count) {
                                    const cleanedQuery = qry.trim();
                                    if (/limit\s+\d+/i.test(cleanedQuery)) {
                                        throw new Error('LIMIT clause detected. Please do not include it.');
                                    }
                                    qry = `${cleanedQuery} LIMIT ${count} OFFSET ${offset}`;
                                }
                                let formKey = ``;
                                let removedVal;
                                if (filterData && filterData.length) {
                                    for (let f = 0; f < filterData.length; f++) {
                                        if (filterData[f].nodeId && filterData[f].nodeId == poNode[j].nodeId) {
                                            const { nodeId, ...filterParamsObj } = filterData[f];
                                            const filterParamsObjKey = Object.keys(filterParamsObj);
                                            const filterParamsObjvalues = Object.values(filterParamsObj);
                                            for (let p = 0; p < filterParamsObjKey.length; p++) {
                                                const key = filterParamsObjKey[p];
                                                if (key.includes('.')) {
                                                    let s_item = key.split('.');
                                                    removedVal = s_item.filter((item) => !statickeyword.includes(item)).join('.');
                                                    if (removedVal.includes('.') && removedVal.startsWith('items.')) {
                                                        removedVal = removedVal.replace('items.', '');
                                                    }
                                                }
                                                else {
                                                    removedVal = key;
                                                }
                                                const value = filterParamsObjvalues[p];
                                                if (typeof value == 'number') {
                                                    formKey = formKey + ` ${removedVal} = ${value} AND`;
                                                }
                                                else if (typeof value == 'string') {
                                                    formKey = formKey + ` ${removedVal} = '${value}' AND`;
                                                }
                                                else if (Array.isArray(value) && value.length > 0) {
                                                    let s = '';
                                                    for (let item of value) {
                                                        s = s + `'${item}',`;
                                                    }
                                                    if (s.endsWith(',')) {
                                                        s = s.slice(0, -1);
                                                    }
                                                    formKey = formKey + ` ${removedVal}  IN (${s}) AND`;
                                                }
                                            }
                                        }
                                    }
                                    if (formKey.endsWith(' AND')) {
                                        formKey = formKey.slice(0, -4);
                                    }
                                }
                                if (formKey)
                                    str.push(formKey);
                                if (str.length > 0) {
                                    Querystr = str.join('AND');
                                    qry = await this.CommonService.appendWhereClause(qry, Querystr);
                                }
                            }
                            await client.connect();
                            if (qry)
                                qryres = await client.query(qry);
                            if (qryres)
                                dbres = qryres.rows;
                            await client.end();
                        }
                        else if (semarc) {
                            if (flag != 'N' && inputparam?.length == 0) {
                                await this.redisService.setStreamData(srcQueue, collectionName + '-TASK - ' + upId, JSON.stringify({ PID: upId, TID: nodeId, EVENT: targetStatus, data: { request: qry, response: inputparam } }));
                                await this.CommonService.getTPL(processedKey, upId, poNode[j], 'Success', targetQueue, token, currentFabric, sourceStatus, qry, dfoSchema);
                                return { status: 200, targetStatus: targetStatus, data: inputparam };
                            }
                            else if (oprname == 'select' && inputparam?.length == 0) {
                                throw new customException_1.CustomException('No Records Found', 404);
                            }
                            let RCMresult, zenresult, customcoderesult, codeObj = {};
                            RCMresult = await this.CommonService.getRuleCodeMapper(poNode[j], inputparam, processedKey + upId, currentFabric, SessionInfo);
                            if (RCMresult) {
                                zenresult = RCMresult.rule;
                                customcoderesult = RCMresult.code;
                            }
                            if (customcoderesult != undefined) {
                                if (customcoderesult && Object.keys(customcoderesult).length > 0) {
                                    for (let item in customcoderesult) {
                                        codeObj[item.toLowerCase()] = customcoderesult[item];
                                    }
                                }
                                await this.redisService.setJsonData(processedKey + upId + ':NPV:' + poNode[j].nodeName + '.PRO', JSON.stringify(codeObj), collectionName, 'code');
                                if (Array.isArray(inputparam) && inputparam?.length > 0) {
                                    for (let i = 0; i < inputparam.length; i++) {
                                        inputparam[i] = Object.assign(inputparam[i], codeObj);
                                    }
                                }
                                else if (typeof inputparam == 'object')
                                    inputparam = Object.assign(inputparam, codeObj);
                            }
                            if (upId) {
                                await this.redisService.setStreamData(srcQueue, collectionName + '-TASK - ' + upId, JSON.stringify({ PID: upId, TID: nodeId, EVENT: targetStatus, data: { request: qry, response: inputparam } }));
                                await this.CommonService.getTPL(processedKey, upId, poNode[j], 'Success', targetQueue, token, currentFabric, sourceStatus, qry, inputparam);
                                await this.redisService.setJsonData(processedKey + upId + ':NPV:' + nodeName + '.PRO', JSON.stringify(qry), collectionName, 'request');
                                await this.redisService.setJsonData(processedKey + upId + ':NPV:' + nodeName + '.PRO', JSON.stringify(inputparam), collectionName, 'response');
                            }
                        }
                        this.logger.log('first DB Node execution completed');
                        if (semarc)
                            return { status: 200, targetStatus: targetStatus, data: { [nodeName]: inputparam } };
                        else
                            return { status: 200, targetStatus: targetStatus, data: dbres };
                    }
                }
                catch (error) {
                    throw error;
                }
            }
            if (nodeType == 'mongo-dbnode' && poNode[j].nodeId == nodeId) {
                try {
                    this.logger.log(`first ${poNode[j].nodeName},Mongo DB Node started`);
                    let customConfig = ndp[poNode[j].nodeId];
                    let collnName, manualQryType, manualQry, sessionfilterParams, connectorType, storageType, dpdkey, conncectorName, filterParams;
                    let nodeVersion = customConfig?.nodeVersion;
                    if (!nodeVersion)
                        throw 'Node version not found';
                    if (nodeVersion.toLowerCase() == 'v1') {
                        connectorType = customConfig?.data?.pro?.connector?.value;
                        storageType = customConfig?.data?.pro?.connector?._selection?._selection?.value;
                        dpdkey = customConfig?.data?.pro?.connector?._selection?.value;
                        conncectorName = customConfig?.data?.pro?.connector?._selection?.subSelection?.value;
                        collnName = customConfig?.data?.pro?.collectionName;
                        manualQryType = customConfig?.data?.pro?.manualQueryType?.value;
                        manualQry = customConfig?.data?.pro?.manualQueryType?.manualQuery;
                        sessionfilterParams = customConfig?.data?.pro?.filterParams;
                        filterParams = customConfig.data?.pro['select']?.filterParams?.items;
                    }
                    if (customConfig) {
                        let mongoQry, mongoDbarr, mongodbConfig, mongodbUrl;
                        if (currentFabric == 'PF-SCDL' && !semarc) {
                            if (storageType?.toLowerCase() == 'external') {
                                if (!dpdkey)
                                    throw new customException_1.CustomException('DPD key not found', 404);
                                let extdata = JSON.parse(await this.redisService.getJsonData(dpdkey + 'NDP', collectionName));
                                if (!extdata)
                                    throw new customException_1.CustomException('DPD value not found', 404);
                                let nodedata = Object.keys(extdata)[0];
                                let configConnectors = extdata[nodedata].data['externalConnectors-DB']?.items;
                                if (configConnectors?.length > 0) {
                                    for (let i = 0; i < configConnectors.length; i++) {
                                        if (configConnectors[i].connectorName == conncectorName) {
                                            mongodbConfig = configConnectors[i]?.credentials;
                                        }
                                    }
                                }
                                if (!mongodbConfig?.host) {
                                    throw new customException_1.CustomException(`Invalid MongoDB credentials`, 404);
                                }
                                if (mongodbConfig.password?.includes('@'))
                                    mongodbConfig.password = mongodbConfig.password.replaceAll('@', '%40');
                                if (mongodbConfig?.port && mongodbConfig?.username && mongodbConfig?.password && mongodbConfig?.database)
                                    mongodbUrl = `mongodb://${mongodbConfig?.username}:${mongodbConfig?.password}@${mongodbConfig?.host}:${mongodbConfig?.port}/${mongodbConfig?.database}?directConnection=true&authSource=admin`;
                                else
                                    mongodbUrl = mongodbConfig?.host;
                            }
                            else {
                                mongodbUrl = process.env.DATABASE_URL;
                            }
                            if (!mongodbUrl)
                                throw new customException_1.CustomException('Mongo DB url not found', 404);
                            const client = new mongodb_1.MongoClient(mongodbUrl);
                            client.connect()
                                .then(() => {
                                console.log('Connected to the database successfully!');
                            })
                                .catch((err) => {
                                console.error('Error connecting to the database:', err);
                            });
                            let db = client.db();
                            let staticFilter = {};
                            if (filterParams) {
                                for (let item of filterParams) {
                                    if (item.key && item?.value?.value && (item.value.value).includes('session.')) {
                                        staticFilter[item.key] = sobj[item.value.value];
                                    }
                                    else if (item.key && item?.value?.value) {
                                        staticFilter[item.key] = item?.value?.value;
                                    }
                                }
                            }
                            this.logger.log('CollectionName', collnName);
                            if (manualQry) {
                                if (!collnName || !manualQryType)
                                    throw 'Collection Name/Manual Query Type not found';
                                let sessionFilter = {};
                                if (sessionfilterParams) {
                                    for (let item of sessionfilterParams) {
                                        if (item.value) {
                                            sessionFilter[item.name] = sobj[item.value];
                                        }
                                    }
                                }
                                const FormatFn = new Function(`return ${manualQry}`);
                                let result = FormatFn();
                                manualQry = Array.isArray(result) ? result : [result];
                                if (manualQryType == 'aggregate') {
                                    if (!Array.isArray(manualQry))
                                        throw new customException_1.CustomException('Invalid aggregation format', 400);
                                    if (Object.keys(sessionFilter).length > 0)
                                        manualQry.push({ $match: sessionFilter });
                                    if (page && count) {
                                        mongoDbarr = await db.collection(collnName).aggregate(manualQry).skip(offset).limit(count).toArray();
                                    }
                                    else {
                                        mongoDbarr = await db.collection(collnName).aggregate(manualQry).toArray();
                                    }
                                }
                                else {
                                    if (Object.keys(sessionFilter).length > 0)
                                        manualQry = Object.assign(manualQry, sessionFilter);
                                    var execResponse = await db.collection(collnName)[manualQryType](manualQry);
                                    if (execResponse) {
                                        if (page && count) {
                                            mongoDbarr = typeof execResponse.toArray === 'function' ? await execResponse.skip(offset).limit(count).toArray() : execResponse;
                                        }
                                        else {
                                            mongoDbarr = typeof execResponse.toArray === 'function' ? await execResponse.toArray() : execResponse;
                                        }
                                    }
                                }
                                this.logger.log('QueryResponse', mongoDbarr);
                            }
                        }
                        else if (semarc) {
                            if (flag != 'N' && (inputparam?.length == 0 || Object.keys(inputparam).length == 0)) {
                                await this.redisService.setStreamData(srcQueue, collectionName + '-TASK - ' + upId, JSON.stringify({ PID: upId, TID: nodeId, EVENT: targetStatus, data: { request: manualQry, response: inputparam } }));
                                await this.CommonService.getTPL(processedKey, upId, poNode[j], 'Success', targetQueue, token, currentFabric, sourceStatus, mongoQry, inputparam);
                                return { status: 200, targetStatus: targetStatus, data: inputparam };
                            }
                            else if (!inputparam || inputparam?.length == 0 || Object.keys(inputparam).length == 0) {
                                await this.redisService.setStreamData(srcQueue, collectionName + '-TASK - ' + upId, JSON.stringify({ PID: upId, TID: nodeId, EVENT: targetStatus, data: { request: manualQry, response: inputparam } }));
                                throw new customException_1.CustomException('No Records Found', 404);
                            }
                            let RCMresult, zenresult, customcoderesult, codeObj = {};
                            RCMresult = await this.CommonService.getRuleCodeMapper(poNode[j], inputparam, processedKey + upId, currentFabric, SessionInfo);
                            if (RCMresult) {
                                zenresult = RCMresult.rule;
                                customcoderesult = RCMresult.code;
                            }
                            if (customcoderesult != undefined) {
                                if (customcoderesult && Object.keys(customcoderesult).length > 0) {
                                    for (let item in customcoderesult) {
                                        codeObj[item.toLowerCase()] = customcoderesult[item];
                                    }
                                }
                                await this.redisService.setJsonData(processedKey + upId + ':NPV:' + poNode[j].nodeName + '.PRO', JSON.stringify(codeObj), collectionName, 'code');
                                if (Array.isArray(inputparam) && inputparam?.length > 0) {
                                    for (let i = 0; i < inputparam.length; i++) {
                                        inputparam[i] = Object.assign(inputparam[i], codeObj);
                                    }
                                }
                                else if (typeof inputparam == 'object')
                                    inputparam = Object.assign(inputparam, codeObj);
                            }
                            if (upId) {
                                await this.redisService.setStreamData(srcQueue, collectionName + '-TASK - ' + upId, JSON.stringify({ PID: upId, TID: nodeId, EVENT: targetStatus, data: { request: manualQry, response: inputparam } }));
                                await this.CommonService.getTPL(processedKey, upId, poNode[j], 'Success', targetQueue, token, currentFabric, sourceStatus, manualQry, inputparam);
                                await this.redisService.setJsonData(processedKey + upId + ':NPV:' + nodeName + '.PRO', JSON.stringify(manualQry), collectionName, 'request');
                                await this.redisService.setJsonData(processedKey + upId + ':NPV:' + nodeName + '.PRO', JSON.stringify(inputparam), collectionName, 'response');
                            }
                        }
                        this.logger.log('first Mongo DB Node execution completed');
                        if (semarc)
                            return { status: 200, targetStatus: targetStatus, data: { [nodeName]: inputparam } };
                        else
                            return { status: 200, targetStatus: targetStatus, data: mongoDbarr };
                    }
                }
                catch (error) {
                    throw error;
                }
            }
            if (nodeType == 'filenode' && poNode[j].nodeId == nodeId) {
                try {
                    this.logger.log(`first File node Execution Started ${poNode[j].nodeName}`);
                    let customConfig = ndp[poNode[j].nodeId];
                    let nodeVersion = customConfig?.nodeVersion;
                    let connectorType, storageType, dpdkey, conncectorName, oprname, oprkey, encryptionFlag, fileFolderPath, fileType, fileName, ndpPro, apikey, responseNodeName, fullPath;
                    if (!nodeVersion)
                        throw new customException_1.CustomException('nodeVersion not found', 404);
                    if (customConfig) {
                        let fileres, url, userName, password;
                        if (nodeVersion.toLowerCase() == 'v1') {
                            connectorType = customConfig?.data?.pro?.connector?.value;
                            storageType = customConfig?.data?.pro?.connector?._selection?._selection?.value;
                            dpdkey = customConfig?.data?.pro?.connector?._selection?.value;
                            conncectorName = customConfig?.data?.pro?.connector?._selection?.subSelection?.value;
                            ndpPro = customConfig.data?.pro;
                            oprname = ndpPro?.operationName.value;
                            oprkey = Object.keys(ndpPro);
                            encryptionFlag = ndpPro?.encryptionFlag;
                            apikey = customConfig?.data?.apiKey;
                            responseNodeName = customConfig?.outputDataNodes;
                        }
                        if (currentFabric == 'PF-SCDL' && !semarc) {
                            if (storageType.toLowerCase() == 'external') {
                                if (!dpdkey)
                                    throw new customException_1.CustomException('DPD key not found', 404);
                                let extdata = JSON.parse(await this.redisService.getJsonData(dpdkey + 'NDP', collectionName));
                                if (extdata && Object.keys(extdata).length > 0) {
                                    let nodedata = Object.keys(extdata)[0];
                                    let configConnectors = extdata[nodedata].data['externalConnectors-FILE']?.items;
                                    if (configConnectors?.length > 0) {
                                        for (let i = 0; i < configConnectors.length; i++) {
                                            if (configConnectors[i].connectorName == conncectorName) {
                                                url = configConnectors[i]?.credentials.host;
                                                userName = configConnectors[i]?.credentials.username;
                                                password = configConnectors[i]?.credentials.password;
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                url = process.env.SEAWEED_OUTPUT_HOST;
                                userName = process.env.SEAWEED_USERNAME;
                                password = process.env.SEAWEED_PASSWORD;
                            }
                            const seaWeedConfig = {
                                url: url,
                                username: userName,
                                password: password,
                            };
                            if (pfjson?.length > 0 && responseNodeName?.length > 0 && !apikey) {
                                for (let p = 0; p < pfjson.length; p++) {
                                    if (responseNodeName.includes(pfjson[p].nodeId)) {
                                        var connectedNodeName = pfjson[p].nodeName;
                                    }
                                }
                            }
                            if (!fileName || !oprname)
                                throw new customException_1.CustomException('Invalid Credentials', 422);
                            fullPath = fileType ? fileFolderPath + '/' + fileName + '.' + fileType : fileFolderPath + '/' + fileName;
                            if (oprname === 'read') {
                                if (fileFolderPath && fileName) {
                                    let encCredentials = await this.CommonService.checkEncryption(poNode[j]);
                                    if (encCredentials?.selectedDpd && encCredentials?.encryptionMethod) {
                                        let url = seaWeedConfig.url + '/' + fullPath;
                                        fileres = await this.CommonService.downloadAndDecryptFile(seaWeedConfig, url);
                                    }
                                    else {
                                        fileres = await this.CommonService.setfileKeys(seaWeedConfig, oprname, fileFolderPath, fileName, fileType);
                                    }
                                }
                                if (!fileres || (Array.isArray(fileres) && fileres.length == 0) || (typeof fileres == 'object' && Object.keys(fileres).length == 0)) {
                                    throw new customException_1.CustomException('Data not found', 404);
                                }
                            }
                        }
                        else if (semarc) {
                            let internalMappingNodes = poJson?.internalMappingNodes;
                            let internalMappedObj = {};
                            for (let n = 0; n < internalMappingNodes.length; n++) {
                                if (internalMappingNodes[n].nodeId == poNode[j].nodeId && internalMappingNodes[n].ifo?.length > 0) {
                                    for (let f = 0; f < internalMappingNodes[n].ifo.length; f++) {
                                        if (internalMappingNodes[n].ifo[f].value) {
                                            internalMappedObj[internalMappingNodes[n].ifo[f].key] = internalMappingNodes[n].ifo[f].value;
                                        }
                                        else {
                                            internalMappedObj[internalMappingNodes[n].ifo[f].key] = '';
                                        }
                                    }
                                }
                            }
                            let ifoObj = {};
                            if (internalMappedObj && Object.keys(internalMappedObj).length > 0) {
                                for (let item in internalMappedObj) {
                                    ifoObj[item.toLowerCase()] = internalMappedObj[item];
                                }
                                await this.redisService.setJsonData(processedKey + upId + ':NPV:' + poNode[j].nodeName + '.PRO', JSON.stringify(ifoObj), collectionName, 'ifo');
                            }
                            let RCMresult, zenresult, customcoderesult, codeObj = {};
                            RCMresult = await this.CommonService.getRuleCodeMapper(poNode[j], inputparam, processedKey + upId, currentFabric, SessionInfo);
                            if (RCMresult) {
                                zenresult = RCMresult.rule;
                                customcoderesult = RCMresult.code;
                            }
                            if (customcoderesult != undefined) {
                                if (customcoderesult && Object.keys(customcoderesult).length > 0) {
                                    for (let item in customcoderesult) {
                                        codeObj[item.toLowerCase()] = customcoderesult[item];
                                    }
                                }
                                await this.redisService.setJsonData(processedKey + upId + ':NPV:' + poNode[j].nodeName + '.PRO', JSON.stringify(codeObj), collectionName, 'code');
                                if (Array.isArray(inputparam) && inputparam?.length > 0) {
                                    for (let i = 0; i < inputparam.length; i++) {
                                        inputparam[i] = Object.assign(inputparam[i], codeObj);
                                    }
                                }
                                else if (typeof inputparam == 'object')
                                    inputparam = Object.assign(inputparam, codeObj);
                            }
                            if (upId) {
                                await this.redisService.setStreamData(srcQueue, collectionName + '-TASK - ' + upId, JSON.stringify({ PID: upId, TID: nodeId, EVENT: targetStatus }));
                                await this.CommonService.getTPL(processedKey, upId, poNode[j], 'Success', targetQueue, token, currentFabric, sourceStatus, fullPath, inputparam);
                                await this.redisService.setJsonData(processedKey + upId + ':NPV:' + nodeName + '.PRO', JSON.stringify(fullPath), collectionName, 'request');
                                await this.redisService.setJsonData(processedKey + upId + ':NPV:' + nodeName + '.PRO', JSON.stringify(inputparam), collectionName, 'response');
                            }
                        }
                        this.logger.log('first File Node execution completed');
                        if (semarc)
                            return { status: 200, targetStatus: targetStatus, data: { [nodeName]: inputparam } };
                        else
                            return { status: 200, targetStatus: targetStatus, data: fileres };
                    }
                }
                catch (error) {
                    throw error;
                }
            }
            if (nodeType == 'function_node' && poNode[j].nodeId == nodeId) {
                try {
                    this.logger.log(`first ${poNode[j].nodeName} functionnode Started`);
                    let mapobj = {}, status, params, customConfig, procedurequery, nodeVersion, dbType, connectorType, storageType, dpdkey, conncectorName, dbConfig, executecommand, inMemory, filterParams;
                    customConfig = ndp[poNode[j].nodeId];
                    nodeVersion = customConfig.nodeVersion;
                    inMemory = customConfig.inMemory;
                    if (!nodeVersion)
                        throw new customException_1.CustomException('nodeVersion not found', 404);
                    if (inMemory == 'true')
                        throw new customException_1.CustomException('inMemory is active', 403);
                    if (nodeVersion.toLowerCase() == 'v1') {
                        dbType = customConfig?.data?.pro?.dbType.value;
                        connectorType = customConfig?.data?.pro?.connector?.value;
                        storageType = customConfig?.data?.pro?.connector?._selection?._selection?.value;
                        dpdkey = customConfig?.data?.pro?.connector?._selection?.value;
                        conncectorName = customConfig?.data?.pro?.connector?._selection?.subSelection?.value;
                        procedurequery = customConfig?.data?.pro?.code.value;
                        params = customConfig?.data?.pro?.params.items;
                        executecommand = customConfig?.data?.pro?.executecommand?.value;
                    }
                    let dbUrl;
                    if (currentFabric == 'PF-SCDL' && !semarc) {
                        if (storageType?.toLowerCase() == 'external') {
                            if (!dpdkey)
                                throw new customException_1.CustomException('DPD key not found', 404);
                            let extdata = JSON.parse(await this.redisService.getJsonData(dpdkey + 'NDP', collectionName));
                            let nodedata = Object.keys(extdata)[0];
                            let configConnectors = extdata[nodedata].data['externalConnectors-DB']?.items;
                            if (configConnectors?.length > 0) {
                                for (let i = 0; i < configConnectors.length; i++) {
                                    if (configConnectors[i].connectorName == conncectorName) {
                                        dbConfig = configConnectors[i]?.credentials;
                                    }
                                }
                            }
                            if (!dbConfig?.host) {
                                throw new customException_1.CustomException(`Invalid DB credentials`, 404);
                            }
                            if (dbType == 'postgres') {
                                if (dbConfig?.port && dbConfig?.username && dbConfig?.password && dbConfig?.database && dbConfig?.schema)
                                    dbUrl = `postgresql://${dbConfig?.username}:${dbConfig?.password}@${dbConfig?.host}:${dbConfig?.port}/${dbConfig?.database}?schema=${dbConfig?.schema}`;
                                else
                                    dbUrl = dbConfig?.host;
                            }
                            else if (dbType == 'mysql') {
                                if (dbConfig?.port && dbConfig?.username && dbConfig?.password && dbConfig?.database && dbConfig?.schema)
                                    dbUrl = `mysql://${dbConfig?.username}:${dbConfig?.password}@${dbConfig?.host}:${dbConfig?.port}/${dbConfig?.database}?schema=${dbConfig?.schema}`;
                                else
                                    dbUrl = dbConfig?.host;
                            }
                            else if (dbType == 'oracle') {
                                if (dbConfig?.port && dbConfig?.username && dbConfig?.password && dbConfig?.database && dbConfig?.schema && dbConfig?.serviceName)
                                    dbUrl = `oracle://${dbConfig?.username}:${dbConfig?.password}@${dbConfig?.host}:${dbConfig?.port}/?serviceName=${dbConfig?.serviceName}`;
                                else
                                    dbUrl = dbConfig?.host;
                            }
                        }
                        else {
                            dbUrl = process.env.DATABASE_URL;
                        }
                        if (params?.length > 0) {
                            for (let a = 0; a < params.length; a++) {
                                let key = params[a]?.key?.value;
                                let value = params[a]?.value?.value;
                                if (value?.includes("session.")) {
                                    value = sobj[value];
                                }
                                if (key && value)
                                    mapobj[key] = value;
                            }
                        }
                        if (mapobj && Object.keys(mapobj).length > 0) {
                            Object.keys(mapobj).forEach(key => {
                                const regex = new RegExp(`\\$\\$${key}`, 'g');
                                const value = typeof mapobj[key] === 'string' ? `'${mapobj[key]}'` : mapobj[key];
                                executecommand = executecommand.replace(regex, value);
                            });
                        }
                        if (executecommand.endsWith(';')) {
                            executecommand = executecommand.slice(0, -1);
                        }
                        let formKey = ``;
                        if (filterData && Array.isArray(filterData) && filterData.length > 0) {
                            filterData.forEach((filterObj) => {
                                if (filterObj.nodeId == poNode[j].nodeId) {
                                    const entries = Object.entries(filterObj).filter(([key]) => key !== 'nodeId');
                                    entries.forEach(([key, value]) => {
                                        let removedVal;
                                        if (key.includes('.')) {
                                            let s_item = key.split('.');
                                            removedVal = s_item.filter((item) => !statickeyword.includes(item)).join('.');
                                            if (removedVal.includes('.') && removedVal.startsWith('items.')) {
                                                removedVal = removedVal.replace('items.', '');
                                            }
                                        }
                                        else {
                                            removedVal = key;
                                        }
                                        if (value && typeof value == 'number') {
                                            formKey = formKey + ` ${removedVal} = ${value} AND`;
                                        }
                                        else if (value && typeof value == 'string' && value != '') {
                                            formKey = formKey + ` ${removedVal} = '${value}' AND`;
                                        }
                                        else if (Array.isArray(value) && value.length > 0) {
                                            let s = '';
                                            for (let item of value) {
                                                s = s + `'${item}',`;
                                            }
                                            if (s.endsWith(',')) {
                                                s = s.slice(0, -1);
                                            }
                                            formKey = formKey + ` ${removedVal}  IN (${s}) AND`;
                                        }
                                    });
                                }
                            });
                            if (formKey.endsWith(' AND')) {
                                formKey = formKey.slice(0, -4);
                            }
                            if (formKey)
                                executecommand = await this.CommonService.appendWhereClause(executecommand, formKey);
                        }
                        if (executecommand.includes('$$$') || executecommand.includes('$$'))
                            executecommand = executecommand.replace(/\${2,3}[a-zA-Z0-9_]+/g, 'NULL');
                        if (dbType == 'postgres') {
                            const { Client } = pg;
                            const client = new Client({
                                connectionString: dbUrl,
                            });
                            await client.connect();
                            await client.query(procedurequery);
                            const result = await client.query(`${executecommand}`);
                            await client.end();
                            if ((result.rows)?.length > 0) {
                                status = result.rows;
                            }
                            else if (result && currentFabric == 'PF-PFD' || currentFabric == 'PF-SCDL') {
                                status = 'Success';
                            }
                            else {
                                status = result.rows;
                            }
                        }
                        else if (dbType == 'mysql') {
                            const mysql = require('mysql2/promise');
                            const connection = await mysql.createConnection({
                                connectionString: dbUrl,
                            });
                            await connection.connect();
                            const result = await connection.query(`${executecommand}`);
                            await connection.end();
                            if ((result.rows)?.length > 0) {
                                status = result.rows;
                            }
                            else if (result && currentFabric == 'PF-PFD' || currentFabric == 'PF-SCDL') {
                                status = 'Success';
                            }
                            else {
                                status = result.rows;
                            }
                        }
                        else if (dbType == 'oracle') {
                            const oracledb = require('oracledb');
                            const connection = await oracledb.createConnection({
                                connectionString: dbUrl,
                            });
                            await connection.connect();
                            const result = await connection.query(`${executecommand}`);
                            await connection.close();
                            if ((result.rows)?.length > 0) {
                                status = result.rows;
                            }
                            else if (result && currentFabric == 'PF-PFD' || currentFabric == 'PF-SCDL') {
                                status = 'Success';
                            }
                            else {
                                status = result.rows;
                            }
                        }
                    }
                    else if (semarc) {
                        await this.redisService.setJsonData(processedKey + upId + ':NPV:' + nodeName + '.PRO', JSON.stringify(inputparam), collectionName, 'response');
                        await this.CommonService.getTPL(processedKey, upId, poNode[j], 'Success', targetQueue, token, currentFabric, sourceStatus, inputparam, inputparam);
                    }
                    this.logger.log('first functionnode node completed');
                    if (semarc)
                        return { status: 200, targetStatus: targetStatus, data: { [nodeName]: inputparam } };
                    else
                        return { status: 200, targetStatus: targetStatus, data: status };
                }
                catch (error) {
                    throw error;
                }
            }
            if (nodeType == 'procedureexecutionnode' && poNode[j].nodeId == nodeId) {
                try {
                    this.logger.log(`first ${poNode[j].nodeName} procedureexecutionnode Started`);
                    let mapobj = {}, status, params, customConfig, procedurequery, nodeVersion, dbType, connectorType, storageType, dpdkey, conncectorName, dbConfig, executecommand, inMemory;
                    customConfig = ndp[poNode[j].nodeId];
                    nodeVersion = customConfig.nodeVersion;
                    inMemory = customConfig.inMemory;
                    if (!nodeVersion)
                        throw new customException_1.CustomException('nodeVersion not found', 404);
                    if (inMemory == 'true')
                        throw new customException_1.CustomException('inMemory is active', 403);
                    if (nodeVersion.toLowerCase() == 'v1') {
                        dbType = customConfig?.data?.pro?.dbType.value;
                        connectorType = customConfig?.data?.pro?.connector?.value;
                        storageType = customConfig?.data?.pro?.connector?._selection?._selection?.value;
                        dpdkey = customConfig?.data?.pro?.connector?._selection?.value;
                        conncectorName = customConfig?.data?.pro?.connector?._selection?.subSelection?.value;
                        procedurequery = customConfig?.data?.pro?.code.value;
                        params = customConfig?.data?.pro?.params.items;
                        executecommand = customConfig?.data?.pro?.executecommand?.value;
                    }
                    let dbUrl;
                    if (currentFabric == 'PF-SCDL' && !semarc) {
                        if (storageType?.toLowerCase() == 'external') {
                            if (!dpdkey)
                                throw new customException_1.CustomException('DPD key not found', 404);
                            let extdata = JSON.parse(await this.redisService.getJsonData(dpdkey + 'NDP', collectionName));
                            let nodedata = Object.keys(extdata)[0];
                            let configConnectors = extdata[nodedata].data['externalConnectors-DB']?.items;
                            if (configConnectors?.length > 0) {
                                for (let i = 0; i < configConnectors.length; i++) {
                                    if (configConnectors[i].connectorName == conncectorName) {
                                        dbConfig = configConnectors[i]?.credentials;
                                    }
                                }
                            }
                            if (!dbConfig?.host) {
                                throw new customException_1.CustomException(`Invalid DB credentials`, 404);
                            }
                            if (dbType == 'postgres') {
                                if (dbConfig?.port && dbConfig?.username && dbConfig?.password && dbConfig?.database && dbConfig?.schema)
                                    dbUrl = `postgresql://${dbConfig?.username}:${dbConfig?.password}@${dbConfig?.host}:${dbConfig?.port}/${dbConfig?.database}?schema=${dbConfig?.schema}`;
                                else
                                    dbUrl = dbConfig?.host;
                            }
                            else if (dbType == 'mysql') {
                                if (dbConfig?.port && dbConfig?.username && dbConfig?.password && dbConfig?.database && dbConfig?.schema)
                                    dbUrl = `mysql://${dbConfig?.username}:${dbConfig?.password}@${dbConfig?.host}:${dbConfig?.port}/${dbConfig?.database}?schema=${dbConfig?.schema}`;
                                else
                                    dbUrl = dbConfig?.host;
                            }
                            else if (dbType == 'oracle') {
                                if (dbConfig?.port && dbConfig?.username && dbConfig?.password && dbConfig?.database && dbConfig?.schema && dbConfig?.serviceName)
                                    dbUrl = `oracle://${dbConfig?.username}:${dbConfig?.password}@${dbConfig?.host}:${dbConfig?.port}/?serviceName=${dbConfig?.serviceName}`;
                                else
                                    dbUrl = dbConfig?.host;
                            }
                        }
                        else {
                            dbUrl = process.env.DATABASE_URL;
                        }
                        if (params?.length > 0) {
                            for (let a = 0; a < params.length; a++) {
                                let key = params[a]?.key?.value;
                                let value = params[a]?.value?.value;
                                if (value?.includes("session.")) {
                                    value = sobj[value];
                                }
                                if (key && value)
                                    mapobj[key] = value;
                            }
                        }
                        if (mapobj && Object.keys(mapobj).length > 0) {
                            Object.keys(mapobj).forEach(key => {
                                const regex = new RegExp(`\\$\\$${key}`, 'g');
                                const value = typeof mapobj[key] === 'string' ? `'${mapobj[key]}'` : mapobj[key];
                                executecommand = executecommand.replace(regex, value);
                            });
                        }
                        if (filterData && Array.isArray(filterData) && filterData.length > 0) {
                            filterData.forEach((filterObj) => {
                                if (filterObj.nodeId == poNode[j].nodeId) {
                                    const entries = Object.entries(filterObj).filter(([key]) => key !== 'nodeId');
                                    entries.forEach(([key, value]) => {
                                        let removedVal;
                                        if (key.includes('.')) {
                                            let s_item = key.split('.');
                                            removedVal = s_item.filter((item) => !statickeyword.includes(item)).join('.');
                                            if (removedVal.includes('.') && removedVal.startsWith('items.')) {
                                                removedVal = removedVal.replace('items.', '');
                                            }
                                        }
                                        else {
                                            removedVal = key;
                                        }
                                        const regex = new RegExp(`\\$\\$\\$${removedVal}`, 'g');
                                        if (typeof value == 'number')
                                            executecommand = executecommand.replace(regex, `${value}`);
                                        else if (typeof value == 'string')
                                            executecommand = executecommand.replace(regex, `'${value}'`);
                                    });
                                }
                            });
                        }
                        if (executecommand.includes('$$$') || executecommand.includes('$$'))
                            executecommand = executecommand.replace(/\${2,3}[a-zA-Z0-9_]+/g, 'NULL');
                        if (dbType == 'postgres') {
                            const { Client } = pg;
                            const client = new Client({
                                connectionString: dbUrl,
                            });
                            await client.connect();
                            await client.query(procedurequery);
                            const result = await client.query(`${executecommand}`);
                            await client.end();
                            if ((result.rows)?.length > 0) {
                                status = result.rows;
                            }
                            else if (result && currentFabric == 'PF-PFD' || currentFabric == 'PF-SCDL') {
                                status = 'Success';
                            }
                            else {
                                status = result.rows;
                            }
                        }
                        else if (dbType == 'mysql') {
                            const mysql = require('mysql2/promise');
                            const connection = await mysql.createConnection({
                                connectionString: dbUrl,
                            });
                            await connection.connect();
                            const result = await connection.query(`${executecommand}`);
                            await connection.end();
                            if ((result.rows)?.length > 0) {
                                status = result.rows;
                            }
                            else if (result && currentFabric == 'PF-PFD' || currentFabric == 'PF-SCDL') {
                                status = 'Success';
                            }
                            else {
                                status = result.rows;
                            }
                        }
                        else if (dbType == 'oracle') {
                            const oracledb = require('oracledb');
                            const connection = await oracledb.createConnection({
                                connectionString: dbUrl,
                            });
                            await connection.connect();
                            const result = await connection.query(`${executecommand}`);
                            await connection.close();
                            if ((result.rows)?.length > 0) {
                                status = result.rows;
                            }
                            else if (result && currentFabric == 'PF-PFD' || currentFabric == 'PF-SCDL') {
                                status = 'Success';
                            }
                            else {
                                status = result.rows;
                            }
                        }
                    }
                    else if (semarc) {
                        await this.redisService.setJsonData(processedKey + upId + ':NPV:' + nodeName + '.PRO', JSON.stringify(status), collectionName, 'response');
                        await this.CommonService.getTPL(processedKey, upId, poNode[j], 'Success', targetQueue, token, currentFabric, sourceStatus, inputparam, inputparam);
                    }
                    this.logger.log('first procedureExecution node completed');
                    if (semarc)
                        return { status: 200, targetStatus: targetStatus, data: { [nodeName]: inputparam } };
                    else
                        return { status: 200, targetStatus: targetStatus, data: status };
                }
                catch (error) {
                    throw error;
                }
            }
        }
    }
    keysToLowerCaseOnly(obj) {
        if (Array.isArray(obj)) {
            return obj.map((item) => this.keysToLowerCaseOnly(item));
        }
        else if (obj !== null && typeof obj === 'object') {
            return Object.entries(obj).reduce((acc, [key, value]) => {
                acc[key.toLowerCase()] = this.keysToLowerCaseOnly(value);
                return acc;
            }, {});
        }
        return obj;
    }
};
exports.ListenerService = ListenerService;
exports.ListenerService = ListenerService = ListenerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(5, (0, common_1.Inject)((0, common_1.forwardRef)(() => event_emitter_processor_1.EventEmitterProcessor))),
    __metadata("design:paramtypes", [redisService_1.RedisService,
        jwt_1.JwtService,
        schedule_1.SchedulerRegistry,
        common_Service_1.CommonService,
        te_service_1.TeService,
        event_emitter_processor_1.EventEmitterProcessor])
], ListenerService);
//# sourceMappingURL=listener.service.js.map