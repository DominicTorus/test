"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queueMongoOperation = queueMongoOperation;
const common_1 = require("@nestjs/common");
const logger = new common_1.Logger('MongoQueue');
let mongoQueue;
let queueInitialized = false;
async function initializeQueue() {
    if (!queueInitialized) {
        const PQueueModule = await Promise.resolve().then(() => require('p-queue'));
        const PQueue = PQueueModule.default;
        mongoQueue = new PQueue({
            concurrency: 20,
            timeout: 60000,
            throwOnTimeout: true,
            autoStart: true
        });
        queueInitialized = true;
        logger.log('MongoDB Queue initialized successfully');
    }
    return mongoQueue;
}
async function queueMongoOperation(operation, operationName = 'Unknown') {
    const queue = await initializeQueue();
    const result = await queue.add(async () => {
        try {
            const result = await operation();
            return result;
        }
        catch (error) {
            logger.error(`[FAIL] ${operationName} - ${error.message}`);
            throw error;
        }
    }, {
        priority: 0
    });
    return result;
}
//# sourceMappingURL=mongoQueue-dynamic.js.map