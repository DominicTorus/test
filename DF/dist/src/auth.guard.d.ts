import { CanActivate, ExecutionContext } from "@nestjs/common";
import { SecurityService } from './securityService';
import { CommonService } from './common.Service';
import { RedisService } from './redisService';
export declare class AuthGuard implements CanActivate {
    private readonly securityService;
    private readonly teCommonService;
    private readonly redisService;
    private readonly logger;
    constructor(securityService: SecurityService, teCommonService: CommonService, redisService: RedisService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
