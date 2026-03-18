import { pfDto } from "src/dto";
import { RedisService } from "src/redisService";
import { ClientProxy } from '@nestjs/microservices';
import { SecurityService } from "src/securityService";
import { CommonService } from "src/common.Service";
import { JwtService } from "@nestjs/jwt";
export declare class TeService {
    private readonly poClient;
    private readonly redisService;
    private readonly securityService;
    private readonly jwtService;
    private readonly CommonService;
    constructor(poClient: ClientProxy, redisService: RedisService, securityService: SecurityService, jwtService: JwtService, CommonService: CommonService);
    private readonly logger;
    EventEmitter(pfdto: pfDto, node?: any): Promise<{
        upId: any;
        message: string;
        event: any;
        insertedData: any;
        statusCode?: undefined;
        key?: undefined;
        data?: undefined;
        status?: undefined;
        processKey?: undefined;
        dataset?: undefined;
    } | {
        statusCode: number;
        message: string;
        key: string;
        upId: any;
        event: any;
        data: any;
        insertedData?: undefined;
        status?: undefined;
        processKey?: undefined;
        dataset?: undefined;
    } | {
        status: string;
        statusCode: number;
        processKey: any;
        upId: any;
        message: string;
        event: any;
        insertedData?: undefined;
        key?: undefined;
        data?: undefined;
        dataset?: undefined;
    } | {
        status: string;
        statusCode: number;
        processKey: any;
        upId: any;
        message: string;
        event: any;
        dataset: {};
        insertedData?: undefined;
        key?: undefined;
        data?: undefined;
    }>;
    private executeInChunks;
    private getOrCreateNodeResponse;
    private addNodeToResponse;
    private updateNodeStatus;
    pfPreProcessor(processedKey: any, pfjson: any, upId: any, fabric: any): Promise<string>;
    getEventandSourceid(pfdto: any, poNode: any, event: any, hsourceid?: any): Promise<{
        ufname: any;
        sourceId: any;
        srcStatus: any;
        targetStatus: any;
        srcQueue: any;
        targetQueue: any;
        failureQueue: any;
        failureTargetStatus: any;
    }>;
    savehandler(data: any, key: any, event: any, nodeId: any, nodeName: any, nodeType: any, token: any, upId: any, sourceId: any, lockDetails: any, childTable?: any): Promise<any>;
    TEcall(token: any, key: any, upId: any, data: any, nodeId: any, nodeName: any, nodeType: any, event: any, sourceId: any, lockDetails: any, childTable?: any): Promise<any>;
    updateHandler(data: any, dfkey: any, upid: any, url: any, tablename: any, id: any, token: any): Promise<any>;
}
