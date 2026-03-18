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
exports.EncryptInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const common_Service_1 = require("./common.Service");
const operators_1 = require("rxjs/operators");
let EncryptInterceptor = class EncryptInterceptor {
    constructor(commonService) {
        this.commonService = commonService;
    }
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.mergeMap)((data) => (0, rxjs_1.from)(this.handleEncryption(data))));
    }
    async handleEncryption(data) {
        if (data?.dpdKey && data?.method) {
            let encryptedData = await this.commonService.commonEncryption(data.dpdKey, data.method, JSON.stringify(data), 'ct003_rd001_rds001_v2');
            let authTag = '';
            if (data.method === 'AESGCM') {
                authTag = encryptedData.authTag;
                encryptedData = encryptedData.encrypted;
            }
            return {
                ciphertext: encryptedData,
                dpdKey: data.dpdKey,
                method: data.method,
                authTag,
            };
        }
        return data;
    }
};
exports.EncryptInterceptor = EncryptInterceptor;
exports.EncryptInterceptor = EncryptInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [common_Service_1.CommonService])
], EncryptInterceptor);
//# sourceMappingURL=encryptInterceptor.js.map