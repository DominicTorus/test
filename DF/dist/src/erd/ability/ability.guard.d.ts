import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CommonService } from 'src/common.Service';
import { JwtServices } from 'src/jwt.services';
import { RedisService } from 'src/redisService';
export declare class AbilitiesGuard implements CanActivate {
    private reflector;
    private readonly jwtService;
    private readonly redisService;
    private readonly TGCommonService;
    constructor(reflector: Reflector, jwtService: JwtServices, redisService: RedisService, TGCommonService: CommonService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
