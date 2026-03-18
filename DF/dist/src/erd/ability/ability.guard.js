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
exports.AbilitiesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const ability_decorator_1 = require("./ability.decorator");
const common_Service_1 = require("../../common.Service");
const jwt_services_1 = require("../../jwt.services");
const redisService_1 = require("../../redisService");
let AbilitiesGuard = class AbilitiesGuard {
    constructor(reflector, jwtService, redisService, TGCommonService) {
        this.reflector = reflector;
        this.jwtService = jwtService;
        this.redisService = redisService;
        this.TGCommonService = TGCommonService;
    }
    async canActivate(context) {
        const rules = this.reflector.get(ability_decorator_1.CHECK_ABILITY, context.getHandler()) ||
            [];
        const request = context.switchToHttp().getRequest();
        const dfKey = 'CK:CT003:FNGK:AF:FNK:API-ERD:CATK:RD001:AFGK:RDS001:AFK:Sample_ERD:AFVK:v1';
        const source = 'redis';
        const target = 'redis';
        const artifact = dfKey.split(':')[11];
        const token = request.headers.authorization.split(' ')[1];
        const decodedToken = this.jwtService.decodeToken(token);
        decodedToken.template = 'T1';
        const DO = await this.TGCommonService.readAPI(dfKey + ':DO', process.env.clientCode, token);
        const securityData = DO.security;
        const templateArray = securityData.templates;
        if (dfKey === securityData.afK) {
            for (let i = 0; i < templateArray.length; i++) {
                if (decodedToken.template === templateArray[i].template && artifact === templateArray[i].security.artifact.resource && templateArray[i].security.artifact.SIFlag.selectedValue === 'AA') {
                    for (let j = 0; j < templateArray[i].security.artifact.node.length; j++) {
                        if (rules[0].subject === templateArray[i].security.artifact.node[j].resource) {
                            let selectedValues = [];
                            for (let l = 0; l < templateArray[i].security.artifact.node.length; l++) {
                                selectedValues.push(templateArray[i].security.artifact.node[l].SIFlag.selectedValue);
                            }
                            if (selectedValues.includes('ATO') && templateArray[i].security.artifact.node[j].SIFlag.selectedValue === 'ATO') {
                                for (let m = 0; m < templateArray[i].security.artifact.node[j].objElements.length; m++) {
                                    if (rules[0].action === templateArray[i].security.artifact.node[j].objElements[m].resource) {
                                        if (templateArray[i].security.artifact.node[j].objElements[m].SIFlag.selectedValue !== 'BTO') {
                                            return true;
                                        }
                                        else {
                                            return false;
                                        }
                                    }
                                }
                            }
                            if (selectedValues.includes('ATO')) {
                                break;
                            }
                            if (templateArray[i].security.artifact.node[j].SIFlag.selectedValue === 'AA') {
                                for (let k = 0; k < templateArray[i].security.artifact.node[j].objElements.length; k++) {
                                    if (rules[0].action === templateArray[i].security.artifact.node[j].objElements[k].resource) {
                                        if (templateArray[i].security.artifact.node[j].objElements[k].SIFlag.selectedValue !== 'BTO') {
                                            return true;
                                        }
                                        else {
                                            return false;
                                        }
                                    }
                                }
                            }
                            else if (templateArray[i].security.artifact.node[j].SIFlag.selectedValue === 'BTO') {
                                return false;
                            }
                        }
                    }
                }
            }
        }
        return false;
    }
};
exports.AbilitiesGuard = AbilitiesGuard;
exports.AbilitiesGuard = AbilitiesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        jwt_services_1.JwtServices,
        redisService_1.RedisService,
        common_Service_1.CommonService])
], AbilitiesGuard);
//# sourceMappingURL=ability.guard.js.map