"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const common_Service_1 = require("./common.Service");
const ruleService_1 = require("./ruleService");
const codeService_1 = require("./codeService");
const redisService_1 = require("./redisService");
const jwt_1 = require("@nestjs/jwt");
const mongoService_1 = require("./mongoService");
const uf_module_1 = require("./Torus/v2/uf/uf.module");
const te_module_1 = require("./Torus/v2/te/te.module");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const erd_module_1 = require("./erd/erd.module");
const encryptInterceptor_1 = require("./encryptInterceptor");
const core_1 = require("@nestjs/core");
let AppModule = class AppModule {
    configure() { }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [schedule_1.ScheduleModule.forRoot(), uf_module_1.UfModule, te_module_1.TeModule, erd_module_1.ErdModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, common_Service_1.CommonService, ruleService_1.RuleService, codeService_1.CodeService, jwt_1.JwtService, redisService_1.RedisService, config_1.ConfigService, mongoService_1.MongoService, {
                provide: core_1.APP_INTERCEPTOR,
                useClass: encryptInterceptor_1.EncryptInterceptor,
            }],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map