"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoService = void 0;
const common_1 = require("@nestjs/common");
const jsonata_1 = require("jsonata");
const mongodb_1 = require("mongodb");
const stream_1 = require("stream");
const axios_1 = require("axios");
const mongoClient_1 = require("./mongoClient");
let db;
(0, mongoClient_1.connectToMongo)().then(async () => {
    db = await (0, mongoClient_1.getDb)();
    console.log('Database initialized');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
class MongoService {
    constructor() {
        this.vaultAddr = process.env.VAULT_URL;
        this.vaultToken = process.env.VAULT_TOKEN;
        this.keyName = process.env.VAULT_KEY;
        this.logger = new common_1.Logger(MongoService.name);
    }
    async findDocument(collectionName, findQuery, projectionValue, Options) {
        const collection = db.collection(collectionName);
        const { page = 0, limit = 0, sortOrder = 0 } = Options || {};
        const queryOptions = { projection: projectionValue, skip: page, limit: limit, sort: sortOrder };
        const result = await collection.find(findQuery, projectionValue ? queryOptions : {}).toArray();
        return result || 0;
    }
    async updateDocument(collectionName, path, findQuery) {
        const collection = db.collection(collectionName);
        var result = await collection.updateOne(path, findQuery);
        if (result) {
            return result;
        }
        else {
            return 0;
        }
    }
    async countDocuments(collectionName, findQuery) {
        let countDocumentsLists = db.collection(collectionName).countDocuments(findQuery);
        return countDocumentsLists;
    }
    async insertDocument(collectionName, key, insertValue) {
        const collection = db.collection(collectionName);
        let result;
        if (key) {
            let customIdAndValue = { _id: key };
            customIdAndValue.value = insertValue;
            result = await collection.insertOne(customIdAndValue);
        }
        else {
            result = await collection.insertOne(insertValue);
        }
        if (result) {
            return result;
        }
        else {
            return 0;
        }
    }
    async appendFileInToDocument(collectionName, key, AppendKey, AppendValue) {
        try {
            const collection = db.collection(collectionName);
            let customId = { _id: key };
            let pushQry = { $push: { [AppendKey]: AppendValue } };
            return await collection.updateOne(customId, pushQry);
        }
        catch (error) {
            throw error;
        }
    }
    async existsDocument(collectionName, key, filter) {
        try {
            const collection = db.collection(collectionName);
            let customId;
            if (key) {
                customId = { _id: key };
            }
            else {
                customId = filter;
            }
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
    async setKey(key) {
        try {
            var setkey;
            var CK = key.CK;
            var FNGK = key.FNGK;
            var FNK = key.FNK;
            var CATK = key.CATK;
            var AFGK = key.AFGK;
            var AFK = key.AFK;
            var AFVK = key.AFVK;
            var AFSK = key.AFSK;
            var afskkey = Object.keys(AFSK);
            var afskvalue = Object.values(AFSK);
            var isexist = await db.collection(CK).find({ 'FNGK': FNGK, 'FNK': FNK, 'CATK': CATK, 'AFGK': AFGK, 'AFK': AFK, 'AFVK': AFVK }, { projection: { _id: 1 } }).toArray();
            if (isexist.length > 0) {
                setkey = await db.collection(CK).updateOne({ 'FNGK': FNGK, 'FNK': FNK, 'CATK': CATK, 'AFGK': AFGK, 'AFK': AFK, 'AFVK': AFVK }, { $set: { ['AFSK.' + afskkey[0]]: afskvalue[0] } });
                if (setkey.modifiedCount > 0) {
                    return { "message": "Value Inserted", "insertedId": isexist[0]['_id'] };
                }
                else {
                    return { "message": "Same value can not be updated", "insertedId": isexist[0]['_id'] };
                }
            }
            else {
                setkey = await db.collection(CK).insertOne({
                    "FNGK": FNGK,
                    "FNK": FNK,
                    "CATK": CATK,
                    "AFGK": AFGK,
                    "AFK": AFK,
                    "AFVK": AFVK,
                    "AFSK": AFSK,
                });
                if (setkey.insertedId) {
                    return { "message": "Value Inserted", "insertedId": setkey.insertedId };
                }
                else {
                    return { "message": "Value not Inserted" };
                }
            }
        }
        catch (error) {
            throw error;
        }
    }
    async getKeys(key) {
        var json;
        var finalArr = [];
        var CK = key.CK;
        var FNGK = key.FNGK;
        var FNK = key.FNK;
        var CATK = key.CATK;
        var AFGK = key.AFGK;
        var AFK = key.AFK;
        var AFVK = key.AFVK;
        var AFSK = key.AFSK;
        var PATH = key.PATH;
        if (AFSK && PATH == undefined) {
            json = await db.collection(CK).find({ 'FNGK': FNGK, 'FNK': FNK, 'CATK': { $in: CATK }, 'AFGK': { $in: AFGK }, 'AFK': { $in: AFK }, 'AFVK': { $in: AFVK }, ['AFSK.' + AFSK]: { $exists: true } }, { projection: { [`AFSK.${AFSK}`]: 1, _id: 0 } }).toArray();
            if (json.length > 0) {
                return json[0]['AFSK'][AFSK];
            }
            else {
                throw new common_1.BadRequestException(`Key not found in collection ${CK}`);
            }
        }
        else if (AFSK && PATH) {
            json = await db.collection(CK).find({ 'FNGK': FNGK, 'FNK': FNK, 'CATK': { $in: CATK }, 'AFGK': { $in: AFGK }, 'AFK': { $in: AFK }, 'AFVK': { $in: AFVK }, [`AFSK.${AFSK}.${PATH}`]: { $exists: true } }, { projection: { [`AFSK.${AFSK}.${PATH}`]: 1, _id: 0 } }).toArray();
            if (json.length > 0) {
                var splittedPath = PATH.split('.');
                if (splittedPath.length > 0) {
                    var field = json[0]['AFSK'][AFSK];
                    for (var i = 0; i < splittedPath.length; i++) {
                        if (field[splittedPath[i]] !== undefined) {
                            field = field[splittedPath[i]];
                        }
                        else {
                            throw new common_1.BadRequestException(`Path not found`);
                        }
                    }
                    return field;
                }
                return json[0]['AFSK'][AFSK][PATH];
            }
            else {
                throw new common_1.BadRequestException(`Key not found in collection ${CK}`);
            }
        }
        else {
            let querypath = {
                'FNGK': FNGK,
                'FNK': FNK,
            };
            if (CATK.length > 0) {
                querypath['CATK'] = { $in: CATK };
            }
            if (AFGK.length > 0) {
                querypath['AFGK'] = { $in: AFGK };
            }
            if (AFK.length > 0) {
                querypath['AFK'] = { $in: AFK };
            }
            if (AFVK.length > 0) {
                querypath['AFVK'] = { $in: AFVK };
            }
            json = await db.collection(CK).find(querypath, { projection: { _id: 0 } }).toArray();
            if (json.length == 0) {
                throw new common_1.BadRequestException(`Key not found in collection ${CK}`);
            }
            const processObject = (obj) => {
                const values = Object.values(obj).slice(0, -1);
                const nestedKeys = obj.AFSK ? Object.keys(obj.AFSK) : [];
                return [...values, ...nestedKeys];
            };
            const ArrResult = json.map(processObject);
            for (let i = 0; i < ArrResult.length; i++) {
                if (CATK.includes(ArrResult[i][2]) || CATK.length == 0) {
                    if (AFGK.includes(ArrResult[i][3]) || AFGK.length == 0) {
                        if (AFK.includes(ArrResult[i][4]) || AFK.length == 0) {
                            if (AFVK.includes(ArrResult[i][5]) || AFVK.length == 0) {
                                finalArr.push(ArrResult[i]);
                            }
                        }
                    }
                }
            }
            const output = { FNGKList: [] };
            finalArr.forEach((item) => {
                const fngk = item[0];
                const fnk = item[1];
                const catk = item[2];
                const afgk = item[3];
                const afk = item[4];
                const afvk = item[5];
                const afskList = item.slice(6);
                let fngkObj = output.FNGKList.find((obj) => obj.FNGK === fngk);
                if (!fngkObj) {
                    fngkObj = { FNGK: fngk, FNKList: [] };
                    output.FNGKList.push(fngkObj);
                }
                let fnkObj = fngkObj.FNKList.find((obj) => obj.FNK === fnk);
                if (!fnkObj) {
                    fnkObj = { FNK: fnk, CATKList: [] };
                    fngkObj.FNKList.push(fnkObj);
                }
                let catkObj = fnkObj.CATKList.find((obj) => obj.CATK === catk);
                if (!catkObj) {
                    catkObj = { CATK: catk, AFGKList: [] };
                    fnkObj.CATKList.push(catkObj);
                }
                let afgkObj = catkObj.AFGKList.find((obj) => obj.AFGK === afgk);
                if (!afgkObj) {
                    afgkObj = { AFGK: afgk, AFKList: [] };
                    catkObj.AFGKList.push(afgkObj);
                }
                let afkObj = afgkObj.AFKList.find((obj) => obj.AFK === afk);
                if (!afkObj) {
                    afkObj = { AFK: afk, AFVKList: [] };
                    afgkObj.AFKList.push(afkObj);
                }
                let afvkObj = afkObj.AFVKList.find((obj) => obj.AFVK === afvk);
                if (!afvkObj) {
                    afvkObj = { AFVK: afvk, AFSKList: afskList };
                    afkObj.AFVKList.push(afvkObj);
                }
            });
            var jsonPath;
            if (key.AFVK.length > 0) {
                jsonPath = 'FNGKList.FNKList.CATKList.AFGKList.AFKList.AFVKList';
            }
            else if (key.AFK.length > 0) {
                jsonPath = 'FNGKList.FNKList.CATKList.AFGKList.AFKList';
            }
            else if (key.AFGK.length > 0) {
                jsonPath = 'FNGKList.FNKList.CATKList.AFGKList';
            }
            else if (key.CATK.length > 0) {
                jsonPath = 'FNGKList.FNKList.CATKList';
            }
            else {
                jsonPath = 'FNGKList.FNKList.CATKList';
            }
            const expression = (0, jsonata_1.default)(jsonPath);
            var customresult = await expression.evaluate(output);
            const removeKeys = (obj, keys) => {
                if (Array.isArray(obj))
                    return obj.map(item => removeKeys(item, keys));
                if (typeof obj === 'object' && obj !== null) {
                    return Object.keys(obj).reduce((previousValue, key) => {
                        return keys.includes(key) ? previousValue : { ...previousValue, [key]: removeKeys(obj[key], keys) };
                    }, {});
                }
                return obj;
            };
            var finalResponse;
            if (key.stopsAt) {
                if (key.stopsAt == "AFVK") {
                    finalResponse = await removeKeys(customresult, ["AFSKList"]);
                }
                else if (key.stopsAt == "AFK") {
                    finalResponse = await removeKeys(customresult, ["AFVKList"]);
                }
                else if (key.stopsAt == "AFGK") {
                    finalResponse = await removeKeys(customresult, ["AFKList"]);
                }
                else if (key.stopsAt == "CATK") {
                    finalResponse = await removeKeys(customresult, ["AFGKList"]);
                }
                else {
                    return customresult;
                }
                return finalResponse;
            }
            else {
                return customresult;
            }
        }
    }
    async updateKey(key) {
        var setvalue;
        var filed;
        var CK = key.CK;
        var FNGK = key.FNGK;
        var FNK = key.FNK;
        var CATK = key.CATK;
        var AFGK = key.AFGK;
        var AFK = key.AFK;
        var AFVK = key.AFVK;
        var AFSK = key.AFSK;
        var path = key.PATH;
        var afskKey = Object.keys(AFSK);
        var afskValue = Object.values(AFSK);
        var value = Object.values(afskValue[0]);
        var objId = await db.collection(CK).find({ 'FNGK': FNGK, 'FNK': FNK, 'CATK': CATK, 'AFGK': AFGK, 'AFK': AFK, 'AFVK': AFVK }, { projection: { _id: 1 } }).toArray();
        if (objId.length == 0) {
            throw new common_1.BadRequestException('Key Not Found in MongoDB');
        }
        if (path == undefined) {
            filed = `AFSK.${afskKey}`;
            setvalue = { $set: { [filed]: afskValue[0] } };
        }
        else {
            filed = `AFSK.${afskKey}.${path}`;
            setvalue = { $set: { [filed]: value[0] } };
        }
        var updJson = await db.collection(CK).updateOne({ _id: objId[0]['_id'] }, setvalue);
        if (updJson.modifiedCount != 0) {
            return { "message": 'Updated Successfully', "_id": objId };
        }
        else {
            return 'Not Updated';
        }
    }
    async saveFileToGridFS(bucketName, objectName, objectData, encryptionFlag) {
        try {
            if (!bucketName || !objectName || !objectData)
                throw 'Invalid Input';
            this.gridfsBucket = new mongodb_1.GridFSBucket(db, { bucketName });
            const uploadId = [];
            if (encryptionFlag == 'Y') {
                objectData = Buffer.from(JSON.stringify(objectData));
                const ciphertext = await this.encryptWithVault(objectData);
                var readable = stream_1.Readable.from([ciphertext]);
            }
            else {
                var readable = stream_1.Readable.from([JSON.stringify(objectData)]);
            }
            return new Promise((resolve, reject) => {
                var uploadStream;
                if (encryptionFlag == 'Y') {
                    uploadStream = this.gridfsBucket.openUploadStream(objectName, { metadata: { isEncrypted: true } });
                }
                else {
                    if (objectData?.METADATA) {
                        uploadStream = this.gridfsBucket.openUploadStream(objectName, { metadata: objectData.METADATA });
                    }
                    else {
                        uploadStream = this.gridfsBucket.openUploadStream(objectName);
                    }
                }
                readable.pipe(uploadStream)
                    .on('error', reject)
                    .on('finish', () => resolve(uploadStream.id.toString()));
            });
        }
        catch (error) {
            console.log('ERROR', error);
            throw error;
        }
    }
    async readFileFromGridFS(bucketName, filename, decryptionFlag) {
        this.gridfsBucket = new mongodb_1.GridFSBucket(db, { bucketName });
        const cursor = this.gridfsBucket.find({ filename });
        const files = await cursor.toArray();
        console.log('files', files);
        var finalResult = [];
        for (let f = 0; f < files.length; f++) {
            try {
                this.logger.log('ReadFileFromGridFS started');
                console.log('filename', files[f].filename);
                console.log('fileId', files[f]._id);
                const retrievedData = await new Promise((resolve, reject) => {
                    const downloadStream = this.gridfsBucket.openDownloadStream(files[f]._id);
                    let data = '';
                    downloadStream.setEncoding('utf8');
                    downloadStream.on('data', chunk => {
                        data += chunk;
                    });
                    downloadStream.on('end', () => {
                        resolve(data);
                    });
                    downloadStream.on('error', reject);
                });
                if (decryptionFlag == 'Y') {
                    finalResult.push(JSON.parse((await this.decryptWithVault(retrievedData)).toString()));
                }
                else {
                    console.log('retrievedData', typeof retrievedData);
                    finalResult.push(JSON.parse(retrievedData));
                }
            }
            catch (error) {
                console.log('ERROR', error);
                throw error;
            }
        }
        return finalResult.flat();
    }
    async readFileFromGridFSWithId(bucketName, fileId, decryptionFlag) {
        try {
            this.logger.log('readFileFromGridFSWithId started');
            this.gridfsBucket = new mongodb_1.GridFSBucket(db, { bucketName });
            const retrievedData = await new Promise((resolve, reject) => {
                const fileObjectId = new mongodb_1.ObjectId(fileId);
                const downloadStream = this.gridfsBucket.openDownloadStream(fileObjectId);
                let data = '';
                downloadStream.setEncoding('utf8');
                downloadStream.on('data', chunk => {
                    data += chunk;
                });
                downloadStream.on('end', () => {
                    resolve(data);
                });
                downloadStream.on('error', reject);
            });
            if (decryptionFlag == 'Y') {
                console.log('retrievedData', typeof retrievedData);
                return JSON.parse((await this.decryptWithVault(retrievedData)).toString());
            }
            else {
                console.log('retrievedData', typeof retrievedData);
                return JSON.parse(retrievedData);
            }
        }
        catch (error) {
            console.log('ERROR', error);
            throw error;
        }
    }
    async readFileFromGridFsWithFilter(bucketName, filename, filter, decryptionFlag) {
        try {
            this.logger.log('ReadFileFromGridFS started');
            if (!bucketName || !filename)
                throw 'Invalid Payload';
            this.gridfsBucket = new mongodb_1.GridFSBucket(db, { bucketName });
            console.log('filename', filename);
            console.log('filter', filter);
            if (filter) {
                let metaDataVal = Object.assign({ filename: { $regex: filename, $options: 'i' } }, filter);
                console.log('metaDataVal', metaDataVal);
                var files = await this.gridfsBucket.find(metaDataVal).toArray();
            }
            else {
                var files = await this.gridfsBucket.find({ filename }).toArray();
            }
            var finalResult = [];
            if (files?.length > 0) {
                for (let f = 0; f < files.length; f++) {
                    try {
                        const retrievedData = await new Promise((resolve, reject) => {
                            const downloadStream = this.gridfsBucket.openDownloadStream(files[f]._id);
                            let data = '';
                            downloadStream.setEncoding('utf8');
                            downloadStream.on('data', chunk => {
                                data += chunk;
                            });
                            downloadStream.on('end', () => {
                                resolve(data);
                            });
                            downloadStream.on('error', reject);
                        });
                        if (decryptionFlag == 'Y') {
                            finalResult.push(JSON.parse((await this.decryptWithVault(retrievedData)).toString()));
                        }
                        else {
                            finalResult.push(JSON.parse(retrievedData));
                        }
                    }
                    catch (error) {
                        console.log('ERROR', error);
                        throw error;
                    }
                }
                return finalResult.flat();
            }
            else {
                throw 'No Records Found';
            }
        }
        catch (error) {
            console.log('ERROR', error);
            throw error;
        }
    }
    async deleteFileFromGridFs(bucketName, filename, filter) {
        try {
            this.logger.log('deleteFileFromGridFS started');
            this.gridfsBucket = new mongodb_1.GridFSBucket(db, { bucketName });
            if (!bucketName || !filename)
                throw 'Invalid Input';
            console.log('filter', filter);
            if (filter) {
                var files = await this.gridfsBucket.find({ filename, filter }).toArray();
            }
            else {
                var files = await this.gridfsBucket.find({ filename }).toArray();
            }
            console.log('files', files);
            let fileIdArr = [];
            if (files?.length > 0) {
                for (let f = 0; f < files.length; f++) {
                    await this.gridfsBucket.delete(files[f]._id);
                    fileIdArr.push(files[f]._id.toString());
                }
                this.logger.log('deleteFileFromGridFS completed');
                return fileIdArr;
            }
        }
        catch (error) {
            console.log('ERROR', error);
            throw error;
        }
    }
    async encryptWithVault(plaintext) {
        try {
            this.logger.log('encryptWithVault started');
            console.log('plaintext', typeof plaintext);
            const base64Plaintext = plaintext.toString('base64');
            const res = await axios_1.default.post(`${this.vaultAddr}/v1/transit/encrypt/${this.keyName}`, { plaintext: base64Plaintext }, {
                headers: {
                    'X-Vault-Token': this.vaultToken,
                },
            });
            return res.data.data.ciphertext;
        }
        catch (error) {
            console.log('encryptWithVault Error', error);
            return error;
        }
    }
    async decryptWithVault(ciphertext) {
        this.logger.log('decryptWithVault started');
        const response = await axios_1.default.post(`${this.vaultAddr}/v1/transit/decrypt/${this.keyName}`, { ciphertext }, {
            headers: {
                'X-Vault-Token': this.vaultToken,
            }
        });
        const base64Plain = response.data.data.plaintext;
        return Buffer.from(base64Plain, 'base64');
    }
}
exports.MongoService = MongoService;
//# sourceMappingURL=mongoService.js.map