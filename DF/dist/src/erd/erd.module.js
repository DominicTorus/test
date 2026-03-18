"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErdModule = void 0;
const common_1 = require("@nestjs/common");
const user_module_1 = require("./user/user.module");
const ruleService_1 = require("../ruleService");
const codeService_1 = require("../codeService");
const redisService_1 = require("../redisService");
let ErdModule = class ErdModule {
};
exports.ErdModule = ErdModule;
exports.ErdModule = ErdModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.userModule],
        controllers: [],
        providers: [ruleService_1.RuleService, codeService_1.CodeService, redisService_1.RedisService]
    })
], ErdModule);
//# sourceMappingURL=erd.module.js.map