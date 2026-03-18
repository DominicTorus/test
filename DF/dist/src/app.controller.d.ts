import { AppService } from './app.service';
import { CommonService } from 'src/common.Service';
export declare class AppController {
    private readonly appService;
    private readonly apiService;
    constructor(appService: AppService, apiService: CommonService);
    getHello(): string;
    getExceplogs(input: any): Promise<any>;
    getProcessLog(input: any): Promise<any>;
    getSubFlowLog(input: any): Promise<any>;
    deleteLog(input: any): Promise<any>;
}
