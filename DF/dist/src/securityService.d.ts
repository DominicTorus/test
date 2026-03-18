import { RedisService } from "./redisService";
import { CommonService } from "./common.Service";
export declare class SecurityService {
    private redisService;
    private commonService;
    constructor(redisService: RedisService, commonService: CommonService);
    private readonly logger;
    getSecurityTemplate(key: any, token: any): Promise<any>;
    getNodeSecurityTemplate(nodedetails: any, nodeName: any): Promise<{
        status: string;
        message: string;
        data: any;
        statusCode?: undefined;
    } | {
        statusCode: string;
        message: string;
        status?: undefined;
        data?: undefined;
    }>;
    getObjectSecurityTemplate(objdetails: any, ObjColumArray: any): Promise<{
        status: number;
        message: string;
        data?: undefined;
    } | {
        status: number;
        message: string;
        data: any[];
    }>;
}
