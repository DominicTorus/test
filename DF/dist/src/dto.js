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
exports.signinToTorusDto = exports.introspectDto = exports.myAccountForClientdto = exports.logoutDto = exports.ifoDto = exports.fetchRuleDetailsDto = exports.fetchActionDetailsDto = exports.InitiatePFDto = exports.paginationDataFilterDto = exports.codefilterDto = exports.codeExecutionDto = exports.getMapperDetailsDto = exports.elementsFilterDto = exports.getPresignedUrlDto = exports.OrchestrationDto = exports.uploadFileMobileDto = exports.uploadFileDto = exports.setUpKeyDto = exports.dataGet = exports.pageDto = exports.pfDto = exports.PoEvent = exports.securityDto = exports.saveHandlerDto = exports.uploadHandlerDto = exports.readAPIDTO = exports.ReadMDdto = exports.imageFileFilter = exports.fileNameEditor = exports.FILE_UPLOADS_DIR = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const path_1 = require("path");
exports.FILE_UPLOADS_DIR = (0, path_1.join)(process.cwd(), 'uploads');
const fileNameEditor = (req, file, callback) => {
    var ext = req?.headers?.filename ? req?.headers?.filename + '.' + file.originalname.split('.').pop() : file.originalname.split('.').pop();
    callback(null, ext);
};
exports.fileNameEditor = fileNameEditor;
const imageFileFilter = (req, file, callback) => {
    callback(null, true);
};
exports.imageFileFilter = imageFileFilter;
class ReadMDdto {
}
exports.ReadMDdto = ReadMDdto;
class readAPIDTO {
}
exports.readAPIDTO = readAPIDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Source', example: 'redis' }),
    __metadata("design:type", String)
], readAPIDTO.prototype, "SOURCE", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Target', example: 'mongo' }),
    __metadata("design:type", String)
], readAPIDTO.prototype, "TARGET", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'CK', example: 'TCL' }),
    __metadata("design:type", String)
], readAPIDTO.prototype, "CK", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'FNGK', example: 'AF' }),
    __metadata("design:type", String)
], readAPIDTO.prototype, "FNGK", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'FNK', example: 'DF' }),
    __metadata("design:type", String)
], readAPIDTO.prototype, "FNK", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'CATK', example: ['FINTECH'] }),
    __metadata("design:type", Array)
], readAPIDTO.prototype, "CATK", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'AFGK', example: ['VPHCoreMaster'] }),
    __metadata("design:type", Array)
], readAPIDTO.prototype, "AFGK", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'AFK', example: ['bankmaster'] }),
    __metadata("design:type", Array)
], readAPIDTO.prototype, "AFK", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'AFVK', example: ['v1'] }),
    __metadata("design:type", Array)
], readAPIDTO.prototype, "AFVK", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'AFSK', example: 'nodeProperty' }),
    __metadata("design:type", String)
], readAPIDTO.prototype, "AFSK", void 0);
class uploadHandlerDto {
}
exports.uploadHandlerDto = uploadHandlerDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Key', example: 'TGA:ABKUF:BUILD:ABC:mvp:bank:v2:Events:Grouprow4:ButtonSave:v1' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], uploadHandlerDto.prototype, "key", void 0);
class saveHandlerDto {
}
exports.saveHandlerDto = saveHandlerDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Key', example: 'TGA:ABKUF:BUILD:ABC:mvp:bank:v2:Events:Grouprow4:ButtonSave:v1' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], saveHandlerDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'value' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], saveHandlerDto.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'path', example: 'params.request' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], saveHandlerDto.prototype, "path", void 0);
class securityDto {
}
exports.securityDto = securityDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Key', example: 'TGA:ABKUF:BUILD:ABC:mvp:bank:v2' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], securityDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'nodeName', example: 'row1' }),
    __metadata("design:type", String)
], securityDto.prototype, "nodeName", void 0);
class PoEvent {
    constructor(pfdto, event, pfs, poJson, pfo, ndp, flag, page, count, filterData, lock, childTable, logicCenter, schedulerStatus) {
        this.pfdto = pfdto;
        this.event = event;
        this.pfs = pfs;
        this.poJson = poJson;
        this.pfo = pfo;
        this.ndp = ndp;
        this.flag = flag;
        this.page = page;
        this.count = count;
        this.filterData = filterData;
        this.lock = lock;
        this.childTable = childTable;
        this.logicCenter = logicCenter;
        this.schedulerStatus = schedulerStatus;
    }
}
exports.PoEvent = PoEvent;
class pfDto {
}
exports.pfDto = pfDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], pfDto.prototype, "key", void 0);
class pageDto {
}
exports.pageDto = pageDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], pageDto.prototype, "key", void 0);
class dataGet {
}
exports.dataGet = dataGet;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], dataGet.prototype, "key", void 0);
class setUpKeyDto {
}
exports.setUpKeyDto = setUpKeyDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "CK:TGA:FNGK:SETUP:FNK:SF:CATK:TENANT:AFGK:TT001:AFK:PROFILE:AFVK:v1:tpc" }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], setUpKeyDto.prototype, "key", void 0);
class uploadFileDto {
}
exports.uploadFileDto = uploadFileDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary' }),
    __metadata("design:type", Object)
], uploadFileDto.prototype, "file", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'key' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], uploadFileDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'bucketFolderame' }),
    __metadata("design:type", String)
], uploadFileDto.prototype, "bucketFolderame", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'folderPath' }),
    __metadata("design:type", String)
], uploadFileDto.prototype, "folderPath", void 0);
class uploadFileMobileDto {
}
exports.uploadFileMobileDto = uploadFileMobileDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary' }),
    __metadata("design:type", Object)
], uploadFileMobileDto.prototype, "file", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'key' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], uploadFileMobileDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'bucketFolderame' }),
    __metadata("design:type", String)
], uploadFileMobileDto.prototype, "bucketFolderame", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'folderPath' }),
    __metadata("design:type", String)
], uploadFileMobileDto.prototype, "folderPath", void 0);
class OrchestrationDto {
}
exports.OrchestrationDto = OrchestrationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'key' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], OrchestrationDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'componentId' }),
    __metadata("design:type", String)
], OrchestrationDto.prototype, "componentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'controlId' }),
    __metadata("design:type", String)
], OrchestrationDto.prototype, "controlId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'isTable' }),
    __metadata("design:type", Boolean)
], OrchestrationDto.prototype, "isTable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'accessProfile' }),
    __metadata("design:type", Array)
], OrchestrationDto.prototype, "accessProfile", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'dpdKey' }),
    __metadata("design:type", String)
], OrchestrationDto.prototype, "dpdKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'method' }),
    __metadata("design:type", String)
], OrchestrationDto.prototype, "method", void 0);
class getPresignedUrlDto {
}
exports.getPresignedUrlDto = getPresignedUrlDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'key' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], getPresignedUrlDto.prototype, "key", void 0);
class elementsFilterDto {
}
exports.elementsFilterDto = elementsFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'key' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], elementsFilterDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'group' }),
    __metadata("design:type", String)
], elementsFilterDto.prototype, "group", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'control' }),
    __metadata("design:type", String)
], elementsFilterDto.prototype, "control", void 0);
class getMapperDetailsDto {
}
exports.getMapperDetailsDto = getMapperDetailsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ufkey' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], getMapperDetailsDto.prototype, "ufkey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'componentId' }),
    __metadata("design:type", String)
], getMapperDetailsDto.prototype, "componentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'category' }),
    __metadata("design:type", String)
], getMapperDetailsDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'controlId' }),
    __metadata("design:type", String)
], getMapperDetailsDto.prototype, "controlId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'bindtranValue' }),
    __metadata("design:type", Object)
], getMapperDetailsDto.prototype, "bindtranValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'code' }),
    __metadata("design:type", Object)
], getMapperDetailsDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'dpdKey' }),
    __metadata("design:type", String)
], getMapperDetailsDto.prototype, "dpdKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'method' }),
    __metadata("design:type", String)
], getMapperDetailsDto.prototype, "method", void 0);
class codeExecutionDto {
}
exports.codeExecutionDto = codeExecutionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'stringCode' }),
    __metadata("design:type", String)
], codeExecutionDto.prototype, "stringCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'params' }),
    __metadata("design:type", String)
], codeExecutionDto.prototype, "params", void 0);
class codefilterDto {
}
exports.codefilterDto = codefilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'key' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], codefilterDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'groupId' }),
    __metadata("design:type", Object)
], codefilterDto.prototype, "groupId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'controlId' }),
    __metadata("design:type", String)
], codefilterDto.prototype, "controlId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'event' }),
    __metadata("design:type", Object)
], codefilterDto.prototype, "event", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'dpdKey' }),
    __metadata("design:type", String)
], codefilterDto.prototype, "dpdKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'method' }),
    __metadata("design:type", String)
], codefilterDto.prototype, "method", void 0);
class paginationDataFilterDto {
}
exports.paginationDataFilterDto = paginationDataFilterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'key' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], paginationDataFilterDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'data' }),
    __metadata("design:type", Object)
], paginationDataFilterDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'dpdKey' }),
    __metadata("design:type", String)
], paginationDataFilterDto.prototype, "dpdKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'method' }),
    __metadata("design:type", String)
], paginationDataFilterDto.prototype, "method", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'primaryKey' }),
    __metadata("design:type", String)
], paginationDataFilterDto.prototype, "primaryKey", void 0);
class InitiatePFDto {
}
exports.InitiatePFDto = InitiatePFDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'key' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], InitiatePFDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'sourceId' }),
    __metadata("design:type", Object)
], InitiatePFDto.prototype, "sourceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'dpdKey' }),
    __metadata("design:type", String)
], InitiatePFDto.prototype, "dpdKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'method' }),
    __metadata("design:type", String)
], InitiatePFDto.prototype, "method", void 0);
class fetchActionDetailsDto {
}
exports.fetchActionDetailsDto = fetchActionDetailsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'key' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], fetchActionDetailsDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'groupId' }),
    __metadata("design:type", String)
], fetchActionDetailsDto.prototype, "groupId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'controlId' }),
    __metadata("design:type", String)
], fetchActionDetailsDto.prototype, "controlId", void 0);
class fetchRuleDetailsDto {
}
exports.fetchRuleDetailsDto = fetchRuleDetailsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'key' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], fetchRuleDetailsDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'groupId' }),
    __metadata("design:type", String)
], fetchRuleDetailsDto.prototype, "groupId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'controlId' }),
    __metadata("design:type", String)
], fetchRuleDetailsDto.prototype, "controlId", void 0);
class ifoDto {
}
exports.ifoDto = ifoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'formData' }),
    __metadata("design:type", Object)
], ifoDto.prototype, "formData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'key' }),
    __metadata("design:type", String)
], ifoDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'controlId' }),
    __metadata("design:type", String)
], ifoDto.prototype, "controlId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'isTable' }),
    __metadata("design:type", Boolean)
], ifoDto.prototype, "isTable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'dpdKey' }),
    __metadata("design:type", String)
], ifoDto.prototype, "dpdKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'method' }),
    __metadata("design:type", String)
], ifoDto.prototype, "method", void 0);
class logoutDto {
}
exports.logoutDto = logoutDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'key' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], logoutDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'dpdKey' }),
    __metadata("design:type", String)
], logoutDto.prototype, "dpdKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'method' }),
    __metadata("design:type", String)
], logoutDto.prototype, "method", void 0);
class myAccountForClientdto {
}
exports.myAccountForClientdto = myAccountForClientdto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'key' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], myAccountForClientdto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'dpdKey' }),
    __metadata("design:type", String)
], myAccountForClientdto.prototype, "dpdKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'method' }),
    __metadata("design:type", String)
], myAccountForClientdto.prototype, "method", void 0);
class introspectDto {
}
exports.introspectDto = introspectDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'key' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], introspectDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'dpdKey' }),
    __metadata("design:type", String)
], introspectDto.prototype, "dpdKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'method' }),
    __metadata("design:type", String)
], introspectDto.prototype, "method", void 0);
class signinToTorusDto {
    constructor() {
        this.type = 't';
    }
}
exports.signinToTorusDto = signinToTorusDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'client' }),
    __metadata("design:type", String)
], signinToTorusDto.prototype, "client", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'username' }),
    __metadata("design:type", String)
], signinToTorusDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'password' }),
    __metadata("design:type", String)
], signinToTorusDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'type' }),
    __metadata("design:type", String)
], signinToTorusDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'dpdKey' }),
    __metadata("design:type", String)
], signinToTorusDto.prototype, "dpdKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'method' }),
    __metadata("design:type", String)
], signinToTorusDto.prototype, "method", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ufClientType' }),
    __metadata("design:type", String)
], signinToTorusDto.prototype, "ufClientType", void 0);
//# sourceMappingURL=dto.js.map