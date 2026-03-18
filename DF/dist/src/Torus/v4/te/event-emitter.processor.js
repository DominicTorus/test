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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var EventEmitterProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitterProcessor = void 0;
const common_1 = require("@nestjs/common");
const bullmq_1 = require("bullmq");
const te_service_1 = require("./te.service");
let EventEmitterProcessor = EventEmitterProcessor_1 = class EventEmitterProcessor {
    constructor(teService) {
        this.teService = teService;
        this.logger = new common_1.Logger(EventEmitterProcessor_1.name);
        this.workers = new Map();
    }
    async onModuleInit() {
    }
    createWorker(queueName) {
        if (this.workers.has(queueName)) {
            return this.workers.get(queueName);
        }
        const workerOptions = {
            connection: {
                host: process.env.HOST,
                port: parseInt(process.env.PORT),
                maxRetriesPerRequest: 3,
            },
            concurrency: 10
        };
        const worker = new bullmq_1.Worker(queueName, async (job) => {
            this.logger.log(`Processing job ${job.id} from queue ${queueName} - Started`);
            this.logger.log(`Job data: ${JSON.stringify(job.data)}`);
            try {
                const result = await this.teService.EventEmitter(job.data);
                this.logger.log(`Job ${job.id} - Completed successfully`);
                return result;
            }
            catch (error) {
                this.logger.error(`Job ${job.id} - Failed with error: ${error}`);
                throw error;
            }
        }, workerOptions);
        worker.on('active', (job) => {
            this.logger.log(`Job ${job.id} ${job.name} is now active. Priority: ${job.opts.priority || 'default'}`);
        });
        worker.on('completed', (job, result) => {
            this.logger.log(`Job ${job.id} completed successfully`);
        });
        worker.on('failed', (job, error) => {
            this.logger.error(`Job ${job.id} failed after ${job.attemptsMade} attempts`);
            this.logger.error(`Error: ${error.message}`);
        });
        this.workers.set(queueName, worker);
        this.logger.log(`Created new worker for queue: ${queueName}`);
        return worker;
    }
    getWorker(queueName) {
        return this.createWorker(queueName);
    }
};
exports.EventEmitterProcessor = EventEmitterProcessor;
exports.EventEmitterProcessor = EventEmitterProcessor = EventEmitterProcessor_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => te_service_1.TeService))),
    __metadata("design:paramtypes", [te_service_1.TeService])
], EventEmitterProcessor);
//# sourceMappingURL=event-emitter.processor.js.map