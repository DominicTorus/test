import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CommonService } from './common.Service';
export declare class EncryptInterceptor implements NestInterceptor {
    private readonly commonService;
    constructor(commonService: CommonService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    private handleEncryption;
}
