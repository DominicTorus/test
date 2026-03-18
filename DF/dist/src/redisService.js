"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const Redis = require('ioredis');
require("dotenv/config");
const _ = require("lodash");
const mongoClient_1 = require("./mongoClient");
const mongoQueue_dynamic_1 = require("./mongoQueue-dynamic");
let db;
let redis;
(0, mongoClient_1.connectToMongo)().then(async () => {
    db = await (0, mongoClient_1.getDb)();
    console.log('Database initialized');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
(0, mongoClient_1.connectToRedis)().then(() => {
    redis = (0, mongoClient_1.getRedis)();
    console.log('Redis initialized');
}).catch((error) => {
    console.error('Error connecting to Redis:', error);
});
let RedisService = class RedisService {
    constructor() {
        this.BATCH_SIZE = 10000;
    }
    async getJsonData(key, collectionName) {
        try {
            let returnValue;
            if (collectionName) {
                const parts = key.split(":");
                const requiredMarkers = ["CK", "FNGK", "FNK", "CATK", "AFGK", "AFK", "AFVK"];
                requiredMarkers.forEach(marker => {
                    const idx = parts.indexOf(marker);
                    if (idx === -1 || !parts[idx + 1] || parts[idx + 1] === "undefined" || parts.length <= 14) {
                        throw new Error(`Invalid Redis key`);
                    }
                });
                let redisResult = await redis.call('JSON.GET', key);
                if (redisResult) {
                    returnValue = redisResult;
                }
                else {
                    var mongoResult = await (0, mongoQueue_dynamic_1.queueMongoOperation)(() => this.getDocument(collectionName, key), `getDocument:${key}`);
                    if (mongoResult?.length > 0 && mongoResult[0]?.value) {
                        await redis.call('JSON.SET', key, '$', JSON.stringify(mongoResult[0]?.value));
                        returnValue = JSON.stringify(mongoResult[0]?.value);
                    }
                    else {
                        returnValue = null;
                    }
                }
            }
            else {
                throw 'client not found';
            }
            return returnValue;
        }
        catch (error) {
            throw error;
        }
    }
    async getJsonDataWithPath(key, path, collectionName) {
        try {
            const parts = key.split(":");
            const requiredMarkers = ["CK", "FNGK", "FNK", "CATK", "AFGK", "AFK", "AFVK"];
            requiredMarkers.forEach(marker => {
                const idx = parts.indexOf(marker);
                if (idx === -1 || !parts[idx + 1] || parts[idx + 1] === "undefined" || parts.length <= 14) {
                    throw new Error(`Invalid Redis key`);
                }
            });
            return await redis.call('JSON.GET', key, path);
        }
        catch (error) {
            let mongoResult = await (0, mongoQueue_dynamic_1.queueMongoOperation)(() => this.getDocument(collectionName, key, path), `getDocumentWithPath:${key}`);
            if (mongoResult && mongoResult?.length > 0) {
                return mongoResult;
            }
            else {
                throw error;
            }
        }
    }
    async AppendJsonArr(key, value, collectionName, path) {
        try {
            if (path) {
                var request = await redis.call('JSON.ARRAPPEND', key, '$.' + path, value);
            }
            else {
                var request = await redis.call('JSON.ARRAPPEND', key, '$', value);
            }
            if (request) {
                await (0, mongoQueue_dynamic_1.queueMongoOperation)(() => this.appendDocumentData(collectionName, key, JSON.parse(value)), `appendDocumentData:${key}`);
            }
            return request;
        }
        catch (error) {
            throw error;
        }
    }
    async setJsonData(key, value, collectionName, path) {
        try {
            if (!collectionName && !key)
                throw "client/key not found";
            const parts = key.split(":");
            const requiredMarkers = ["CK", "FNGK", "FNK", "CATK", "AFGK", "AFK", "AFVK"];
            requiredMarkers.forEach(marker => {
                const idx = parts.indexOf(marker);
                if (idx === -1 || !parts[idx + 1] || parts[idx + 1] === "undefined" || parts.length <= 14) {
                    throw new Error(`Invalid Redis key`);
                }
            });
            const defpath = path ? `.${path}` : "$";
            await this.exist(key, collectionName);
            let redisResult = await redis.call('JSON.SET', key, defpath, value);
            if (redisResult == 'OK') {
                var mongoResult = await (0, mongoQueue_dynamic_1.queueMongoOperation)(() => this.setDocument(collectionName, key, JSON.parse(value), path), `setDocument:${key}`);
            }
            if (mongoResult?.value)
                return 'Value Stored';
        }
        catch (error) {
            throw error;
        }
    }
    async setJsonDataBatch(operations, collectionName) {
        try {
            if (!collectionName)
                throw new Error('client not found');
            if (!operations || operations.length === 0)
                return;
            for (const op of operations) {
                const parts = op.key.split(':');
                const requiredMarkers = ['CK', 'FNGK', 'FNK', 'CATK', 'AFGK', 'AFK', 'AFVK'];
                requiredMarkers.forEach(marker => {
                    const idx = parts.indexOf(marker);
                    if (idx === -1 || !parts[idx + 1] || parts[idx + 1] === 'undefined' || parts.length <= 14) {
                        throw new Error(`Invalid Redis key: ${op.key}`);
                    }
                });
            }
            const pipeline = redis.pipeline();
            for (const op of operations) {
                const defpath = op.path ? `.${op.path}` : '$';
                pipeline.call('JSON.SET', op.key, defpath, op.value);
            }
            const results = await pipeline.exec();
            if (results) {
                for (let i = 0; i < results.length; i++) {
                    const [error, result] = results[i];
                    if (error) {
                        throw new Error(`Pipeline command ${i} failed: ${error.message}`);
                    }
                }
            }
        }
        catch (error) {
            console.error('Batch setJsonData error:', error);
            throw error;
        }
    }
    async setStreamData(streamName, key, strValue) {
        try {
            streamName = streamName?.trim();
            if (streamName && streamName != '' && key && strValue) {
                var result = await redis.xadd(streamName, '*', key, strValue);
                if (result) {
                    await redis.call('EXPIRE', key, 86400);
                }
                return result;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async hset(hashName, field, value) {
        try {
            return await redis.hset(hashName, field, value);
        }
        catch (error) {
            throw error;
        }
    }
    async hget(hashName, field) {
        try {
            return await redis.hget(hashName, field);
        }
        catch (error) {
            throw error;
        }
    }
    async exist(key, collectionName) {
        try {
            if (collectionName) {
                let redisResult = await redis.call('EXISTS', key);
                if (redisResult) {
                    return redisResult;
                }
                else {
                    let mongoResult = await (0, mongoQueue_dynamic_1.queueMongoOperation)(() => this.existsDocument(collectionName, key), `existsDocument:${key}`);
                    if (mongoResult) {
                        let doc = await (0, mongoQueue_dynamic_1.queueMongoOperation)(() => this.getDocument(collectionName, key), `getDocument:${key}`);
                        if (doc?.length > 0 && doc[0]?.value) {
                            await redis.call('JSON.SET', key, '$', JSON.stringify(doc[0]?.value));
                        }
                        return 1;
                    }
                    else {
                        return mongoResult;
                    }
                }
            }
            else {
                throw 'client not found';
            }
        }
        catch (error) {
            throw error;
        }
    }
    async quit() {
        await redis.quit();
    }
    async getStreamData(streamName) {
        try {
            var messages = await redis.xread('STREAMS', streamName, 0);
            if (messages && messages != null) {
                return messages;
            }
            else {
                return await this.convertStreamStruct(streamName);
            }
        }
        catch (error) {
            throw error;
        }
    }
    async getStreamRange(streamName, end, start) {
        try {
            let messages;
            if (start && !end)
                end = '+';
            if (end && !start)
                start = '-';
            if (end && start) {
                messages = await redis.call('XRANGE', streamName, start, end);
            }
            else
                messages = await redis.call('XRANGE', streamName, '-', '+');
            return messages;
        }
        catch (error) {
            throw error;
        }
    }
    async getStreamRevRange(streamName, end, start, count) {
        try {
            if (end && start) {
                var messages = await redis.xrevrange(streamName, end, start, 'COUNT', count);
            }
            else {
                var messages = await redis.xrevrange(streamName, '+', '-', 'COUNT', count);
            }
            return messages;
        }
        catch (error) {
            throw error;
        }
    }
    async getStreamDatawithCount(count, streamName) {
        try {
            var messages = await redis.xread('COUNT', count, 'STREAMS', streamName, 0);
            return messages;
        }
        catch (error) {
            throw error;
        }
    }
    async createConsumerGroup(streamName, groupName) {
        try {
            await redis.xgroup('CREATE', streamName, groupName, '0', 'MKSTREAM');
            return `consumerGroup was created as ${groupName}`;
        }
        catch (error) {
            throw error;
        }
    }
    async createConsumer(streamName, groupName, consumerName) {
        try {
            var result = await redis.xgroup('CREATECONSUMER', streamName, groupName, consumerName);
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    async readConsumerGroup(streamName, groupName, consumerName) {
        try {
            var res = [];
            var result = await redis.xreadgroup('GROUP', groupName, consumerName, 'STREAMS', streamName, '>');
            if (result) {
                result.forEach(([key, message]) => {
                    message.forEach(([messageId, data]) => {
                        var obj = {};
                        obj['msgid'] = messageId;
                        obj['data'] = data;
                        res.push(obj);
                    });
                });
                return res;
            }
            else {
                return 'No Data available to read';
            }
        }
        catch (error) {
            throw error;
        }
    }
    async ackMessage(streamName, groupName, msgId) {
        try {
            let result = await redis.xack(streamName, groupName, msgId);
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteWithEntryId(streamName, msgId) {
        try {
            return await redis.call('XDEL', streamName, msgId);
        }
        catch (error) {
            throw error;
        }
    }
    async getInfoGrp(groupName) {
        try {
            let result = await redis.xinfo('GROUPS', groupName);
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    async getKeys(key, collectionName, isKeySuffix = false) {
        try {
            let redisKey;
            if (collectionName) {
                if (key.endsWith(':'))
                    redisKey = isKeySuffix ? '*:' + key : key + '*';
                else
                    redisKey = isKeySuffix ? '*:' + key : key + ':*';
                const parts = key.split(":").map(p => p.trim());
                const KeyrequiredMarkers = ["CK", "FNGK", "FNK", "CATK", "AFGK", "AFK", "AFVK"];
                KeyrequiredMarkers.forEach(marker => {
                    const idx = parts.indexOf(marker);
                    if (parts[idx + 1] === "undefined" || parts[idx + 1] === '') {
                        throw new Error(`Invalid Redis key`);
                    }
                });
                let keys = await redis.keys(redisKey);
                if (keys?.length == 0) {
                    const arrID = [];
                    const requiredMarkers = ["CK", "FNGK", "FNK", "CATK", "AFGK", "AFK", "AFVK"];
                    for (const item of keys) {
                        const _id = item;
                        const parts = _id.split(":").map(p => p.trim());
                        let isValid = true;
                        for (const marker of requiredMarkers) {
                            const idx = parts.indexOf(marker);
                            const next = parts[idx + 1];
                            if (idx === -1 || next === undefined || next === null || next.trim?.() === "" || next.toLowerCase?.() === "undefined" || parts.length <= 14) {
                                isValid = false;
                                await this.deleteKey(_id, collectionName);
                                break;
                            }
                        }
                        if (isValid && !arrID.includes(_id)) {
                            arrID.push(_id);
                        }
                    }
                    if (arrID.length > 0)
                        keys = arrID;
                    keys = await (0, mongoQueue_dynamic_1.queueMongoOperation)(() => this.getDocumentKeys(collectionName, key), `getDocumentKeys:${key}`);
                }
                return keys;
            }
            else {
                throw 'client not found';
            }
        }
        catch (error) {
            throw error;
        }
    }
    async deleteKey(key, collectionName) {
        try {
            var response = await redis.del(key);
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async expire(key, seconds) {
        try {
            var result = await redis.call('EXPIRE', key, seconds);
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    async renameKey(oldKey, newKey, client) {
        try {
            var result = await redis.call('RENAME', oldKey, newKey);
            let mongoResult = await (0, mongoQueue_dynamic_1.queueMongoOperation)(() => this.existsDocument(client, oldKey), `existsDocument:${oldKey}`);
            if (mongoResult) {
                await (0, mongoQueue_dynamic_1.queueMongoOperation)(() => this.renameDocumentId(client, oldKey, newKey), `renameDocumentId:${oldKey}`);
            }
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    async getstreamKey(key) {
        try {
            let keys;
            keys = await redis.keys(key);
            if (keys?.length == 0) {
                keys = await this.getDocumentKeys(key);
            }
            return keys;
        }
        catch (error) {
            throw error;
        }
    }
    async sethash(records, key) {
        try {
            const totalBatches = Math.ceil(records.length / this.BATCH_SIZE);
            let storedCount = 0;
            for (let batchNum = 0; batchNum < totalBatches; batchNum++) {
                const start = batchNum * this.BATCH_SIZE;
                const end = Math.min(start + this.BATCH_SIZE, records.length);
                const batch = records.slice(start, end);
                const pipeline = redis.pipeline();
                batch.forEach((record, index) => {
                    const globalIndex = start + index;
                    pipeline.hset(key + ':' + batchNum, globalIndex.toString(), JSON.stringify(record));
                });
                await pipeline.exec();
            }
            await redis.set(key + ':total', records.length);
            await redis.set(key + ':batches', totalBatches);
        }
        catch (error) {
            throw error;
        }
    }
    async getAllRecordshash(key) {
        const totalBatches = parseInt(await redis.get(key + ':batches') || '0');
        const allRecords = [];
        for (let batchNum = 0; batchNum < totalBatches; batchNum++) {
            const batchData = await redis.hgetall(key + ':' + batchNum);
            const batchRecords = Object.values(batchData).map(value => JSON.parse(value));
            allRecords.push(...batchRecords);
            console.log(`Loaded batch ${batchNum + 1}/${totalBatches}`);
        }
        return allRecords;
    }
    async setDocument(collectionName, key, value, path, filter) {
        try {
            if (key && collectionName) {
                let collection;
                if (key.includes(':FNGK:AFR:') || key.includes(':FNGK:AFRS:'))
                    collection = db.collection('TORUS_AMDKEYS');
                else
                    collection = db.collection(collectionName + '_AMDKEYS');
                let customId = { _id: key };
                let customVal = { $set: { value } };
                if (filter)
                    customId = Object.assign(customId, filter);
                if (path) {
                    if (path.includes('[') && path.includes(']')) {
                        path = path.replace(']', '');
                        path = path.replace('[', '');
                    }
                    path = 'value.' + path;
                    customVal = { $set: { [path]: value } };
                }
                var result = await collection.findOneAndUpdate(customId, customVal, { upsert: true, returnDocument: 'after' });
                if (result) {
                    return result;
                }
                else {
                    return 0;
                }
            }
            else {
                throw 'key/client not found';
            }
        }
        catch (error) {
            throw error;
        }
    }
    async getDocumentKeys(collectionName, key) {
        try {
            if (!collectionName)
                throw 'client not found';
            let collection;
            let result;
            if (key) {
                if (key.includes(':FNGK:AFR:') || key.includes(':FNGK:AFRS:'))
                    collection = db.collection('TORUS_AMDKEYS');
                else
                    collection = db.collection(collectionName + '_AMDKEYS');
                const parts = key.split(":").map(p => p.trim());
                const KeyrequiredMarkers = ["CK", "FNGK", "FNK", "CATK", "AFGK", "AFK", "AFVK"];
                KeyrequiredMarkers.forEach(marker => {
                    const idx = parts.indexOf(marker);
                    if (parts[idx + 1] === "undefined" || parts[idx + 1] === '') {
                        throw new Error(`Invalid Redis key: missing value for ${marker}`);
                    }
                });
                if (key.includes(':*:')) {
                    key = key.replaceAll(':*', '.*?');
                }
                result = await collection.find({ _id: { $regex: (`${key}`) } }).toArray();
            }
            else {
                collection = db.collection(collectionName);
                result = await collection.find().toArray();
            }
            let arrID = [];
            if (result && result.length > 0) {
                const arrID = [];
                const requiredMarkers = ["CK", "FNGK", "FNK", "CATK", "AFGK", "AFK", "AFVK"];
                for (const item of result) {
                    const _id = item?._id;
                    if (!_id || typeof _id !== "string")
                        continue;
                    const parts = _id.split(":").map(p => p.trim());
                    let isValid = true;
                    for (const marker of requiredMarkers) {
                        const idx = parts.indexOf(marker);
                        const next = parts[idx + 1];
                        if (idx === -1 || next === undefined || next === null || next.trim?.() === "" || next.toLowerCase?.() === "undefined" || parts.length <= 14) {
                            isValid = false;
                            await this.deleteKey(_id, collectionName);
                            break;
                        }
                    }
                    if (isValid && !arrID.includes(_id)) {
                        arrID.push(_id);
                    }
                }
                return arrID;
            }
            else {
                return arrID;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async getDocument(collectionName, key, path, filter) {
        try {
            if (!collectionName)
                throw 'client not found';
            let collection;
            if (key.includes(':FNGK:AFR:') || key.includes(':FNGK:AFRS:'))
                collection = db.collection('TORUS_AMDKEYS');
            else
                collection = db.collection(collectionName + '_AMDKEYS');
            const parts = key.split(":").map(p => p.trim());
            const KeyrequiredMarkers = ["CK", "FNGK", "FNK", "CATK", "AFGK", "AFK", "AFVK"];
            KeyrequiredMarkers.forEach(marker => {
                const idx = parts.indexOf(marker);
                if (parts[idx + 1] === "undefined" || parts[idx + 1] === '' || parts.length <= 14) {
                    throw new Error(`Invalid Redis key: missing value for ${marker}`);
                }
            });
            let customId = {
                _id: key
            };
            var result = await collection.find(customId).toArray();
            if (result?.length > 0) {
                const arrID = [];
                const requiredMarkers = ["CK", "FNGK", "FNK", "CATK", "AFGK", "AFK", "AFVK"];
                for (const item of result) {
                    const _id = item?._id;
                    if (!_id || typeof _id !== "string")
                        continue;
                    const parts = _id.split(":").map(p => p.trim());
                    let isValid = true;
                    for (const marker of requiredMarkers) {
                        const idx = parts.indexOf(marker);
                        const next = parts[idx + 1];
                        if (idx === -1 || next === undefined || next === null || next.trim?.() === "" || next.toLowerCase?.() === "undefined" || parts.length <= 14) {
                            isValid = false;
                            await this.deleteKey(_id, collectionName);
                            break;
                        }
                    }
                    if (isValid) {
                        arrID.push(item);
                    }
                }
                if (arrID.length > 0)
                    result = arrID;
                if (path) {
                    return await _.get(result?.[0], 'value' + path);
                }
                return result;
            }
            else {
                return 0;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async getCollection(collectionName) {
        try {
            const collection = db.collection(collectionName + '_AMDKEYS');
            var result = await collection.find().toArray();
            if (result?.length > 0) {
                return result;
            }
            else {
                return 0;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async listCollections(collectionName) {
        try {
            let collections = [];
            let collectionList = await db.listCollections().toArray();
            collectionList.forEach(collection => {
                if (collectionName) {
                    if (collection.name.includes(collectionName)) {
                        collections.push(collection.name);
                    }
                }
                else {
                    collections.push(collection.name);
                }
            });
            if (collections.length > 0) {
                return collections;
            }
            else {
                return 0;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async existsDocument(collectionName, key) {
        try {
            if (!collectionName)
                throw 'client not found';
            let collection;
            if (key.includes(':FNGK:AFR:') || key.includes(':FNGK:AFRS:'))
                collection = db.collection('TORUS_AMDKEYS');
            else
                collection = db.collection(collectionName + '_AMDKEYS');
            let customId = { _id: key };
            var result = await collection.findOne(customId, { projection: { _id: 1 } });
            if (result) {
                return result;
            }
            else {
                return 0;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async appendDocumentData(collectionName, key, AppendValue) {
        try {
            if (!collectionName)
                throw 'client not found';
            let collection;
            if (key.includes(':FNGK:AFR:') || key.includes(':FNGK:AFRS:'))
                collection = db.collection('TORUS_AMDKEYS');
            else
                collection = db.collection(collectionName + '_AMDKEYS');
            let customId = { _id: key };
            var result = await collection.find(customId).toArray();
            if (result?.length > 0) {
                let pushQry = { $push: { ['value']: AppendValue } };
                return await collection.updateOne(customId, pushQry);
            }
            else {
                return await this.setDocument(collectionName, key, [AppendValue]);
            }
        }
        catch (error) {
            throw error;
        }
    }
    async appendStreamDocument(collectionName, key, AppendValue) {
        try {
            const collection = db.collection(collectionName);
            let customId = { _id: key };
            var result = await collection.find(customId).toArray();
            if (result?.length > 0) {
                let pushQry = { $push: { ['value']: AppendValue } };
                return await collection.updateOne(customId, pushQry);
            }
            else {
                return await this.setStreamDocument(collectionName, key, [AppendValue]);
            }
        }
        catch (error) {
            throw error;
        }
    }
    async setStreamDocument(collectionName, key, value, path, filter) {
        try {
            const collection = db.collection(collectionName);
            let customId = { _id: key };
            let customVal = { $set: { value } };
            if (filter)
                customId = Object.assign(customId, filter);
            if (path) {
                if (path.includes('[') && path.includes(']')) {
                    path = path.replace(']', '');
                    path = path.replace('[', '');
                }
                path = 'value.' + path;
                customVal = { $set: { [path]: value } };
            }
            var result = await collection.findOneAndUpdate(customId, customVal, { upsert: true, returnDocument: 'after' });
            if (result) {
                return result;
            }
            else {
                return 0;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async convertStreamStruct(collectionName) {
        try {
            const collection = db.collection(collectionName);
            let docs = await collection.find().toArray();
            let FinalArr = [];
            if (docs?.length > 0) {
                let EntryIdArr = [];
                for (let d = 0; d < docs.length; d++) {
                    let singleDoc = docs[d];
                    let singleDocId = singleDoc._id;
                    let singleDocValArr = singleDoc.value;
                    for (let v = 0; v < singleDocValArr.length; v++) {
                        let fieldKeyArr = [];
                        let EntryId = singleDocValArr[v].EntryId;
                        delete singleDocValArr[v].EntryId;
                        await redis.xadd(collectionName, EntryId, singleDocId, JSON.stringify(singleDocValArr[v]));
                        fieldKeyArr.push(EntryId, [singleDocId, JSON.stringify(singleDocValArr[v])]);
                        EntryIdArr.push(fieldKeyArr);
                    }
                }
                FinalArr.push([collectionName, EntryIdArr]);
                return FinalArr;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async convertStreamRangeStruct(collectionName) {
        try {
            const collection = db.collection(collectionName);
            let docs = await collection.find().toArray();
            if (docs?.length > 0) {
                let EntryIdArr = [];
                for (let d = 0; d < docs.length; d++) {
                    let singleDoc = docs[d];
                    let singleDocId = singleDoc._id;
                    let singleDocValArr = singleDoc.value;
                    for (let v = 0; v < singleDocValArr.length; v++) {
                        let fieldKeyArr = [];
                        let EntryId = singleDocValArr[v].EntryId;
                        delete singleDocValArr[v].EntryId;
                        await redis.xadd(collectionName, EntryId, singleDocId, JSON.stringify(singleDocValArr[v]));
                        fieldKeyArr.push(EntryId, [singleDocId, JSON.stringify(singleDocValArr[v])]);
                        EntryIdArr.push(fieldKeyArr);
                    }
                }
                return EntryIdArr;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async renameDocumentId(collectionName, oldId, newId) {
        try {
            const collection = db.collection(collectionName + '_AMDKEYS');
            const doc = await collection.findOne({ _id: oldId });
            if (!doc) {
                throw (`_id "${oldId}" not found`);
            }
            doc._id = newId;
            await collection.insertOne(doc);
            return newId;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteDocument(collectionName, key) {
        try {
            if (!collectionName)
                throw 'client not found';
            let collection;
            if (key.includes(':FNGK:AFR:') || key.includes(':FNGK:AFRS:'))
                collection = db.collection('TORUS_AMDKEYS');
            else
                collection = db.collection(collectionName + '_AMDKEYS');
            let res = await collection.deleteOne({ _id: key });
            return res;
        }
        catch (err) {
            throw err;
        }
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)()
], RedisService);
//# sourceMappingURL=redisService.js.map