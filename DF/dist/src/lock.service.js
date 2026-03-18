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
exports.LockService = void 0;
const common_1 = require("@nestjs/common");
const redlock_1 = require("redlock");
const ioredis_1 = require("ioredis");
const redisClient = new ioredis_1.default({
    host: process.env.HOST,
    port: parseInt(process.env.PORT),
});
let LockService = class LockService {
    constructor() {
        this.redlock = new redlock_1.default([redisClient], {
            retryCount: parseInt(process.env.RETRYCOUNT || '3'),
            retryDelay: parseInt(process.env.RETRYDELAY || '200'),
            retryJitter: parseInt(process.env.RETRYJITTER || '100'),
        });
        this.redlock.on('clientError', (err) => {
            console.error('A Redis error has occurred:', err);
        });
    }
    async acquireLock(resource, ttl) {
        return await this.redlock.acquire(resource, ttl);
    }
    async releaseLock(lock) {
        return await lock.release();
    }
};
exports.LockService = LockService;
exports.LockService = LockService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], LockService);
//# sourceMappingURL=lock.service.js.map