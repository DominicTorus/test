"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeModule = void 0;
const common_1 = require("@nestjs/common");
const te_controller_1 = require("./te.controller");
const te_service_1 = require("./te.service");
const redisService_1 = require("../../../redisService");
const common_Service_1 = require("../../../common.Service");
const microservices_1 = require("@nestjs/microservices");
const securityService_1 = require("../../../securityService");
const ruleService_1 = require("../../../ruleService");
const jwt_1 = require("@nestjs/jwt");
const codeService_1 = require("../../../codeService");
const lock_service_1 = require("../../../lock.service");
const mongoService_1 = require("../../../mongoService");
const config_1 = require("@nestjs/config");
const event_emitter_processor_1 = require("./event-emitter.processor");
const listener_service_1 = require("./listener.service");
const dynamicFlow_service_1 = require("./dynamicFlow.service");
let TeModule = class TeModule {
    configure() { }
};
exports.TeModule = TeModule;
exports.TeModule = TeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            microservices_1.ClientsModule.register([
                {
                    name: 'PO',
                    transport: microservices_1.Transport.TCP,
                    options: { port: parseInt(process.env.PO_PORT) },
                },
            ])
        ],
        controllers: [te_controller_1.TeController],
        providers: [te_service_1.TeService, redisService_1.RedisService, common_Service_1.CommonService, securityService_1.SecurityService, ruleService_1.RuleService, jwt_1.JwtService, codeService_1.CodeService, lock_service_1.LockService, config_1.ConfigService, event_emitter_processor_1.EventEmitterProcessor, listener_service_1.ListenerService, dynamicFlow_service_1.DynamicFlowService, mongoService_1.MongoService],
        exports: [dynamicFlow_service_1.DynamicFlowService]
    })
], TeModule);
//# sourceMappingURL=te.module.js.map