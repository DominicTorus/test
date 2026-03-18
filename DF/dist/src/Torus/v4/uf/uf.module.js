"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UfModule = void 0;
const common_1 = require("@nestjs/common");
const uf_service_1 = require("./uf.service");
const uf_controller_1 = require("./uf.controller");
const jwt_1 = require("@nestjs/jwt");
const jwt_services_1 = require("../../../jwt.services");
const redisService_1 = require("../../../redisService");
const common_Service_1 = require("../../../common.Service");
const ruleService_1 = require("../../../ruleService");
const codeService_1 = require("../../../codeService");
const mongoService_1 = require("../../../mongoService");
const config_1 = require("@nestjs/config");
let UfModule = class UfModule {
};
exports.UfModule = UfModule;
exports.UfModule = UfModule = __decorate([
    (0, common_1.Module)({
        imports: [jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '1d' },
            }),],
        controllers: [uf_controller_1.UfController],
        providers: [uf_service_1.UfService, jwt_1.JwtModule, jwt_services_1.JwtServices, redisService_1.RedisService, common_Service_1.CommonService, ruleService_1.RuleService, codeService_1.CodeService, config_1.ConfigService, mongoService_1.MongoService],
        exports: [uf_service_1.UfService]
    })
], UfModule);
//# sourceMappingURL=uf.module.js.map