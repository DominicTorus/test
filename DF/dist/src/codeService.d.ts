import { RedisService } from "./redisService";
export declare class CodeService {
    private readonly redisService;
    constructor(redisService: RedisService);
    private readonly logger;
    replaceVariable(code: string, variableName: string, newValue: any): Promise<string>;
    customCode(key: any, code: any, data: any, fabric: any, SessionInfo: any): Promise<any>;
    fastReplaceVariable(code: string, variableName: string, newValue: any): Promise<string>;
    extractDeclaredVariables(funcStr: string): Promise<any>;
}
