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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const uf_service_1 = require("./Torus/v2/uf/uf.service");
const common_Service_1 = require("./common.Service");
let AppService = class AppService {
    constructor(ufservice, commonService) {
        this.ufservice = ufservice;
        this.commonService = commonService;
        this.apiUrl = process.env.API_URL;
        this.clientcode = process.env.CLIENTCODE;
    }
    async onModuleInit() {
        console.log('Application started, calling API...');
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbklkIjoiZ3VydSIsImNsaWVudCI6IkNUMDA1IiwidHlwZSI6ImMiLCJsb2dUeXBlIjoibW9uZ29kYiIsInNpZCI6IjNlMjc0MDhmLTRkNTYtNDM1NC05MjUxLWJlMmRmMzgwNTA3MiIsImlhdCI6MTc2OTQ4NTc2NSwiZXhwIjoxNzY5NDg2OTY1fQ.PgiZCgD2f-KGRRSfvo6-T_QUKux_U2hsxvlgNXj-qLY';
        return;
        let preParedData = await this.dataPrep(JSON.parse(fs.readFileSync('./swagger.json', 'utf-8')));
        if (Object.keys(preParedData).includes('erdWithData')) {
            let endPointData = {};
            let erdDatas = {};
            endPointData.data = preParedData?.erdWithData || {};
            endPointData.type = "json";
            let res = await this.ufservice.getEndPoints(endPointData);
            erdDatas.endpoint = res;
            erdDatas.tenant = "CT003";
            erdDatas.domain = "RDS";
            erdDatas.collection = "Raffle Draw System";
            erdDatas.data = preParedData?.erdWithData || {};
            erdDatas.fabric = 'API-APIPD';
            erdDatas.loginId = "guru";
            erdDatas.erdFlag = true;
            await this.ufservice.createApiCollection(erdDatas, this.clientcode);
        }
        if (Object.keys(preParedData).includes('torusApis')) {
            let torusData = {};
            torusData.tenant = "CT003";
            torusData.domain = "RDS";
            torusData.collection = "Raffle Draw System";
            torusData.fabric = 'API-APIPD-TORUS';
            torusData.data = preParedData?.torusApis || {};
            torusData.loginId = "guru";
        }
    }
    getHello() {
        return 'Hello World!';
    }
    dataPrep(allBody) {
        let appPaths = Object.keys(allBody?.paths);
        let erdWithData = structuredClone(allBody);
        let torusApis = structuredClone(allBody);
        erdWithData['paths'] = {};
        torusApis['paths'] = {};
        let onlyErdKeys = [];
        appPaths.map((keys) => {
            if (!keys.startsWith('/te/') &&
                !keys.startsWith('/UF/') &&
                !keys.startsWith('/expLog') &&
                !keys.startsWith('/prcLog') &&
                keys != '/') {
                onlyErdKeys.push(keys);
                erdWithData.paths[keys] = {};
            }
            else {
                torusApis.paths[keys] = allBody.paths[keys];
            }
        });
        onlyErdKeys.map((key) => {
            erdWithData.paths[key] = allBody.paths[key];
        });
        return {
            erdWithData,
            torusApis,
        };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [uf_service_1.UfService,
        common_Service_1.CommonService])
], AppService);
//# sourceMappingURL=app.service.js.map