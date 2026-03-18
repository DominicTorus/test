import { TeService } from './te.service';
import { CommonService } from 'src/common.Service';
import { pfDto } from 'src/dto';
import { LockService } from 'src/lock.service';
import { RedisService } from 'src/redisService';
export declare class TeController {
    private readonly teService;
    private readonly apiService;
    private readonly lockservice;
    private readonly redisService;
    constructor(teService: TeService, apiService: CommonService, lockservice: LockService, redisService: RedisService);
    private readonly logger;
    pfEventEmitter(pfdto: pfDto, auth: any): Promise<any>;
    getUpdate(input: any, auth: any): Promise<any>;
    save(input: any, auth: any): Promise<any>;
}
