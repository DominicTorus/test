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
var AuthGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const securityService_1 = require("./securityService");
const common_Service_1 = require("./common.Service");
const redisService_1 = require("./redisService");
let AuthGuard = AuthGuard_1 = class AuthGuard {
    constructor(securityService, teCommonService, redisService) {
        this.securityService = securityService;
        this.teCommonService = teCommonService;
        this.redisService = redisService;
        this.logger = new common_1.Logger(AuthGuard_1.name);
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            throw new common_1.UnauthorizedException('Authorization header is missing');
        }
        const [type, token] = authHeader.split(' ');
        if (type !== 'Bearer' || !token) {
            throw new common_1.UnauthorizedException('Invalid authorization format. Expected "Bearer <token>"');
        }
        try {
            const body = request.body;
            if (!body || typeof body.key !== 'string') {
                throw new Error('Invalid request body or key not found');
            }
            const key = body.key;
            let seckey;
            if (await this.redisService.exist(key + 'PO', process.env.CLIENTCODE)) {
                seckey = key + 'PO';
            }
            else if (await this.redisService.exist(key + 'DO', process.env.CLIENTCODE)) {
                seckey = key + 'DO';
            }
            if (!seckey) {
                throw new Error('Security key not found in Redis');
            }
            const sjsoncheck = await this.securityService.getSecurityTemplate(seckey, token);
            if (sjsoncheck && Array.isArray(sjsoncheck) && sjsoncheck.length > 0) {
                this.logger.log("Auth Guard started..");
                if (request.session) {
                    request.session.node = sjsoncheck;
                }
                else {
                    this.logger.error('request.session is not available');
                }
                return true;
            }
            else {
                await this.teCommonService.getTSL(key, token, 'Badrequest in security template', 400);
                throw new common_1.BadRequestException('Badrequest in security template');
            }
        }
        catch (error) {
            const tslerror = await this.teCommonService.getTSL(request.body?.key, token, error instanceof Error ? error.message : String(error), 400);
            throw new common_1.BadRequestException(tslerror);
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = AuthGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [securityService_1.SecurityService,
        common_Service_1.CommonService,
        redisService_1.RedisService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map