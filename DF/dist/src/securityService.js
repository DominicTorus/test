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
var SecurityService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityService = void 0;
const common_1 = require("@nestjs/common");
const redisService_1 = require("./redisService");
const common_Service_1 = require("./common.Service");
const customException_1 = require("./customException");
let SecurityService = SecurityService_1 = class SecurityService {
    constructor(redisService, commonService) {
        this.redisService = redisService;
        this.commonService = commonService;
        this.logger = new common_1.Logger(SecurityService_1.name);
    }
    async getSecurityTemplate(key, token) {
        this.logger.log('Security Template started');
        var artifactFlg = 0;
        let securityProfile = [];
        var artifact = key.split('AFK')[1].split(':')[1];
        var pojson = JSON.parse(await this.redisService.getJsonData(key, process.env.CLIENTCODE));
        if (pojson != null) {
            var security = pojson.securityData;
            if (security.afk && key.includes(security.afk)) {
                if (security) {
                    if (security.accessProfile.length > 0) {
                        let tokenFlg = 0;
                        let tenant = await this.commonService.splitcommonkey(key, 'CK');
                        let appgrp = await this.commonService.splitcommonkey(key, 'CATK');
                        let app = await this.commonService.splitcommonkey(key, 'AFGK');
                        let profile = JSON.parse(await this.redisService.getJsonData(`CK:TGA:FNGK:SETUP:FNK:SF:CATK:${tenant}:AFGK:${appgrp}:AFK:${app}:AFVK:v1:securityTemplate`, process.env.CLIENTCODE));
                        if (profile?.length > 0) {
                            for (let a = 0; a < profile.length; a++) {
                                securityProfile.push(profile[a].accessProfile);
                            }
                        }
                        else {
                            throw new customException_1.CustomException(`CK:TGA:FNGK:SETUP:FNK:SF:CATK:${tenant}:AFGK:${appgrp}:AFK:${app}:AFVK:v1:securityTemplate does not exist`, 404);
                        }
                        for (var i = 0; i < security.accessProfile.length; i++) {
                            var accessProfile = security.accessProfile[i];
                            if (securityProfile) {
                                if (securityProfile.includes(accessProfile.accessProfile)) {
                                    if (accessProfile.security.artifact.resource) {
                                        if (accessProfile.security.artifact.resource == artifact) {
                                            if (accessProfile.security.artifact.SIFlag.selectedValue == 'AA' || accessProfile.security.artifact.SIFlag.selectedValue == '') {
                                                var node = accessProfile.security.artifact.node;
                                                if (node && node.length > 0) {
                                                    this.logger.log('Security Template completed');
                                                    return node;
                                                }
                                                else {
                                                    throw 'Node Detail was empty';
                                                }
                                            }
                                            else if (accessProfile.security.artifact.SIFlag.selectedValue == 'BA') {
                                                throw `Permission denied to access the artifact ${artifact}`;
                                            }
                                        }
                                        else {
                                            artifactFlg++;
                                        }
                                    }
                                }
                                else {
                                    tokenFlg++;
                                }
                            }
                        }
                        if (tokenFlg == security.accessProfile.length) {
                            throw new customException_1.CustomException(`user was not authorized`, 403);
                        }
                        if (artifactFlg == security.accessProfile.length) {
                            throw new customException_1.CustomException(`Invalid artifact ${artifact}`, 400);
                        }
                    }
                    else {
                        throw new customException_1.CustomException('AccessProfile was empty', 404);
                    }
                }
                else {
                    throw new customException_1.CustomException('SecurityData does not exist', 404);
                }
            }
            else {
                throw new customException_1.CustomException(`Artifact key mismatched ${key} in security Template ${security.afk}`, 400);
            }
        }
        else {
            throw new customException_1.CustomException(`${key} doesn't exist in redis`, 404);
        }
    }
    async getNodeSecurityTemplate(nodedetails, nodeName) {
        this.logger.log('Node Security Template started!');
        var nodenameFlg = 0;
        if (nodedetails?.length > 0) {
            for (var i = 0; i < nodedetails.length; i++) {
                if (nodedetails[i].resource == nodeName) {
                    if (nodedetails[i].SIFlag.selectedValue == 'AA' || nodedetails[i].SIFlag.selectedValue == 'ATO' || nodedetails[i].SIFlag.selectedValue == '') {
                        var objElements = nodedetails[i].objElements;
                        this.logger.log('Node Security Template completed!');
                        return { status: '200', message: 'success', data: objElements };
                    }
                    else if (nodedetails[i].SIFlag.selectedValue == 'BA' || nodedetails[i].SIFlag.selectedValue == 'BTO') {
                        return { statusCode: '403', message: `Permission Denied to access ${nodeName}` };
                    }
                }
                else {
                    nodenameFlg++;
                }
            }
        }
        if (nodenameFlg == nodedetails?.length) {
            return { statusCode: '403', message: `Node ${nodeName} not found in security template` };
        }
    }
    async getObjectSecurityTemplate(objdetails, ObjColumArray) {
        this.logger.log('ObjectLevel Security Template started!');
        var blockedElementsArr = [];
        var objNameFlg = 0;
        if (objdetails?.length > 0) {
            for (let i = 0; i < objdetails.length; i++) {
                if (objdetails[i].resource) {
                    if (ObjColumArray && ObjColumArray.includes(objdetails[i].resource)) {
                        if (objdetails[i].SIFlag?.selectedValue == 'BTO' || objdetails[i].SIFlag?.selectedValue == 'BA') {
                            blockedElementsArr.push(objdetails[i].resource);
                        }
                    }
                    else {
                        objNameFlg++;
                    }
                }
            }
            if (objNameFlg == objdetails.length) {
                return { status: 403, message: `ObjectElement not found in security template` };
            }
            if (blockedElementsArr?.length > 0) {
                return { status: 201, message: 'success', data: blockedElementsArr };
            }
            else {
                return { status: 201, message: 'success' };
            }
        }
        else {
            return { status: 403, message: `ObjectElement not found` };
        }
    }
};
exports.SecurityService = SecurityService;
exports.SecurityService = SecurityService = SecurityService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redisService_1.RedisService, common_Service_1.CommonService])
], SecurityService);
//# sourceMappingURL=securityService.js.map