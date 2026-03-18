"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedis = exports.getDb = exports.connectToRedis = exports.connectToMongo = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
const Redis = require('ioredis');
const logger = new common_1.Logger('MongoDB');
const client = new mongodb_1.MongoClient(process.env.MONGODB_URL, {
    maxPoolSize: 100,
    minPoolSize: 10,
    maxIdleTimeMS: 60000,
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 60000,
    connectTimeoutMS: 30000,
    retryWrites: true,
    retryReads: true
});
let db;
let redis;
const RECONNECT_INTERVAL = 5000;
const MAX_RECONNECT_ATTEMPTS = 10;
let isConnecting = false;
const connectToMongo = async (attemptCount = 0) => {
    if (db && client) {
        try {
            await client.db('admin').admin().ping();
            return db;
        }
        catch (error) {
            logger.warn('Connection check failed, reconnecting...');
        }
    }
    if (isConnecting) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return (0, exports.connectToMongo)(attemptCount);
    }
    isConnecting = true;
    try {
        if (client) {
            await client.close();
        }
        await client.connect();
        db = client.db(process.env.MONGODB_NAME);
        setupConnectionListeners();
        isConnecting = false;
        return db;
    }
    catch (error) {
        isConnecting = false;
        logger.error(`MongoDB connection failed (Attempt ${attemptCount + 1}/${MAX_RECONNECT_ATTEMPTS})`, error.message);
        if (attemptCount < MAX_RECONNECT_ATTEMPTS) {
            logger.warn(`Retrying connection in ${RECONNECT_INTERVAL / 1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, RECONNECT_INTERVAL));
            return (0, exports.connectToMongo)(attemptCount + 1);
        }
        else {
            throw new Error('Max reconnection attempts reached. Unable to connect to MongoDB.');
        }
    }
};
exports.connectToMongo = connectToMongo;
const setupConnectionListeners = () => {
    if (!client)
        return;
    client.removeAllListeners();
    client.on('close', () => {
        logger.warn('MongoDB connection closed');
        handleReconnection();
    });
    client.on('error', (error) => {
        logger.error('MongoDB connection error:', error.message);
        handleReconnection();
    });
    client.on('topologyClose', () => {
        logger.warn('MongoDB topology closed');
        handleReconnection();
    });
    client.on('serverHeartbeatFailed', (event) => {
        logger.warn('MongoDB heartbeat failed:', event);
    });
};
const handleReconnection = async () => {
    if (isConnecting)
        return;
    logger.log('🔄 Attempting to reconnect to MongoDB...');
    try {
        await (0, exports.connectToMongo)();
    }
    catch (error) {
        logger.error('Failed to reconnect to MongoDB:', error.message);
    }
};
const connectToRedis = async () => {
    if (!redis) {
        redis = new Redis({
            host: process.env.HOST,
            port: parseInt(process.env.PORT),
            maxRetriesPerRequest: 3,
            enableReadyCheck: true,
            retryStrategy(times) {
                const delay = Math.min(times * 50, 2000);
                return delay;
            },
            reconnectOnError(err) {
                const targetError = 'READONLY';
                if (err.message.includes(targetError)) {
                    return true;
                }
                return false;
            },
            lazyConnect: false,
            enableOfflineQueue: true,
            connectTimeout: 30000,
            keepAlive: 30000,
            family: 4,
        }).on('error', (err) => {
            console.log('Redis Client Error', err);
        }).on('ready', () => {
            console.log('✅ Redis connected successfully');
        }).on('reconnecting', () => {
            console.log('🔄 Redis reconnecting...');
        });
    }
};
exports.connectToRedis = connectToRedis;
let lastHealthCheck = Date.now();
const HEALTH_CHECK_INTERVAL = 30000;
const getDb = async () => {
    if (!db || !client) {
        logger.warn('Database not connected, attempting to connect...');
        return await (0, exports.connectToMongo)();
    }
    const now = Date.now();
    if (now - lastHealthCheck > HEALTH_CHECK_INTERVAL) {
        try {
            await client.db('admin').admin().ping();
            lastHealthCheck = now;
        }
        catch (error) {
            logger.warn('Connection lost, reconnecting...');
            return await (0, exports.connectToMongo)();
        }
    }
    return db;
};
exports.getDb = getDb;
const getRedis = () => {
    if (!redis)
        throw new Error('Redis not initialized. Call connectToRedis() first.');
    return redis;
};
exports.getRedis = getRedis;
//# sourceMappingURL=mongoClient.js.map