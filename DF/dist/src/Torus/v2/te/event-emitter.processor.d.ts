import { OnModuleInit } from '@nestjs/common';
import { Worker } from 'bullmq';
import { TeService } from './te.service';
export declare class EventEmitterProcessor implements OnModuleInit {
    private readonly teService;
    private readonly logger;
    private workers;
    constructor(teService: TeService);
    onModuleInit(): Promise<void>;
    createWorker(queueName: string): Worker;
    getWorker(queueName: string): Worker;
}
