import { OnModuleInit } from '@nestjs/common';
import { UfService } from './Torus/v2/uf/uf.service';
import { CommonService } from './common.Service';
export declare class AppService implements OnModuleInit {
    private readonly ufservice;
    private readonly commonService;
    private readonly apiUrl;
    private readonly clientcode;
    constructor(ufservice: UfService, commonService: CommonService);
    onModuleInit(): Promise<void>;
    getHello(): string;
    dataPrep(allBody: any): {
        erdWithData: any;
        torusApis: any;
    };
}
