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
exports.user_OnlyParentEntity = exports.userEntity = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class userEntity {
}
exports.userEntity = userEntity;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "number" }),
    __metadata("design:type", Number)
], userEntity.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "string" }),
    __metadata("design:type", String)
], userEntity.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "string" }),
    __metadata("design:type", String)
], userEntity.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "string" }),
    __metadata("design:type", String)
], userEntity.prototype, "designation", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value?.toISOString()),
    (0, swagger_1.ApiProperty)({ example: "datetime" }),
    __metadata("design:type", Date)
], userEntity.prototype, "trs_created_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "string" }),
    __metadata("design:type", String)
], userEntity.prototype, "trs_created_by", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value?.toISOString()),
    (0, swagger_1.ApiProperty)({ example: "datetime" }),
    __metadata("design:type", Date)
], userEntity.prototype, "trs_modified_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "string" }),
    __metadata("design:type", String)
], userEntity.prototype, "trs_modified_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "string" }),
    __metadata("design:type", String)
], userEntity.prototype, "trs_status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "string" }),
    __metadata("design:type", String)
], userEntity.prototype, "trs_next_status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "string" }),
    __metadata("design:type", String)
], userEntity.prototype, "trs_process_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "string" }),
    __metadata("design:type", String)
], userEntity.prototype, "trs_access_profile", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "string" }),
    __metadata("design:type", String)
], userEntity.prototype, "trs_org_grp_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "string" }),
    __metadata("design:type", String)
], userEntity.prototype, "trs_org_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "string" }),
    __metadata("design:type", String)
], userEntity.prototype, "trs_role_grp_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "string" }),
    __metadata("design:type", String)
], userEntity.prototype, "trs_role_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "string" }),
    __metadata("design:type", String)
], userEntity.prototype, "trs_ps_grp_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "string" }),
    __metadata("design:type", String)
], userEntity.prototype, "trs_ps_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "string" }),
    __metadata("design:type", String)
], userEntity.prototype, "trs_sub_org_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "string" }),
    __metadata("design:type", String)
], userEntity.prototype, "trs_sub_org_grp_code", void 0);
class user_OnlyParentEntity {
}
exports.user_OnlyParentEntity = user_OnlyParentEntity;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "number" }),
    __metadata("design:type", Number)
], user_OnlyParentEntity.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "string" }),
    __metadata("design:type", String)
], user_OnlyParentEntity.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "string" }),
    __metadata("design:type", String)
], user_OnlyParentEntity.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "string" }),
    __metadata("design:type", String)
], user_OnlyParentEntity.prototype, "designation", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value?.toISOString()),
    (0, swagger_1.ApiProperty)({ example: "datetime" }),
    __metadata("design:type", Date)
], user_OnlyParentEntity.prototype, "trs_created_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "string" }),
    __metadata("design:type", String)
], user_OnlyParentEntity.prototype, "trs_created_by", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => value?.toISOString()),
    (0, swagger_1.ApiProperty)({ example: "datetime" }),
    __metadata("design:type", Date)
], user_OnlyParentEntity.prototype, "trs_modified_date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "string" }),
    __metadata("design:type", String)
], user_OnlyParentEntity.prototype, "trs_modified_by", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "string" }),
    __metadata("design:type", String)
], user_OnlyParentEntity.prototype, "trs_status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "string" }),
    __metadata("design:type", String)
], user_OnlyParentEntity.prototype, "trs_next_status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "string" }),
    __metadata("design:type", String)
], user_OnlyParentEntity.prototype, "trs_process_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "string" }),
    __metadata("design:type", String)
], user_OnlyParentEntity.prototype, "trs_access_profile", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "string" }),
    __metadata("design:type", String)
], user_OnlyParentEntity.prototype, "trs_org_grp_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "string" }),
    __metadata("design:type", String)
], user_OnlyParentEntity.prototype, "trs_org_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "string" }),
    __metadata("design:type", String)
], user_OnlyParentEntity.prototype, "trs_role_grp_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "string" }),
    __metadata("design:type", String)
], user_OnlyParentEntity.prototype, "trs_role_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "string" }),
    __metadata("design:type", String)
], user_OnlyParentEntity.prototype, "trs_ps_grp_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "string" }),
    __metadata("design:type", String)
], user_OnlyParentEntity.prototype, "trs_ps_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "string" }),
    __metadata("design:type", String)
], user_OnlyParentEntity.prototype, "trs_sub_org_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "string" }),
    __metadata("design:type", String)
], user_OnlyParentEntity.prototype, "trs_sub_org_grp_code", void 0);
//# sourceMappingURL=user.entity.js.map