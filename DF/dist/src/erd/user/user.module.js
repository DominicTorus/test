"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModule = void 0;
const common_1 = require("@nestjs/common");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
const jwt_1 = require("@nestjs/jwt");
const redisService_1 = require("../../redisService");
const jwt_services_1 = require("../../jwt.services");
const common_Service_1 = require("../../common.Service");
const prisma_service_1 = require("../prisma.service");
const ability_module_1 = require("../ability/ability.module");
const ruleService_1 = require("../../ruleService");
const codeService_1 = require("../../codeService");
const mongoService_1 = require("../../mongoService");
const config_1 = require("@nestjs/config");
const uf_service_1 = require("../../Torus/v2/uf/uf.service");
let userModule = class userModule {
};
exports.userModule = userModule;
exports.userModule = userModule = __decorate([
    (0, common_1.Module)({
        imports: [ability_module_1.AbilityModule, jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: '1d' },
            })],
        controllers: [user_controller_1.userController],
        providers: [user_service_1.userService, prisma_service_1.PrismaService, jwt_services_1.JwtServices, redisService_1.RedisService, common_Service_1.CommonService, ruleService_1.RuleService, codeService_1.CodeService, mongoService_1.MongoService, config_1.ConfigService, uf_service_1.UfService]
    })
], userModule);
//# sourceMappingURL=user.module.js.map