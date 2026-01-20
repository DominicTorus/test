import { Injectable, Logger } from '@nestjs/common';
const Redis = require('ioredis');
import 'dotenv/config';
import { Db,MongoClient } from 'mongodb';
import { connectToMongo, connectToRedis, getDb, getRedis } from './mongoClient';
const _ = require("lodash")
import { format } from 'date-fns';
import axios from 'axios';
import { Readable } from 'stream';
import * as FormData from 'form-data';


let db: Db;
let redis

  connectToMongo().then(async () => { 
    db = await getDb();
    console.log('Database initialized'); 
  }).catch((error) => {
    console.error('Error connecting to MongoDB:', error);    
    throw new Error('Error connecting to MongoDB:' + error);
  }); 

   connectToRedis().then(() => { 
    redis = getRedis();
    console.log('Redis initialized'); 
  }).catch((error) => {
    console.error('Error connecting to Redis:', error);
  });

@Injectable()
export class RedisService {
  private readonly BATCH_SIZE = 10000 
   /**
   * Retrieves JSON data from Redis.
   * @param key The key used to identify the JSON data in Redis.
   * @returns The JSON data retrieved from Redis.
   * @throws {Error} If there is an error retrieving the JSON data.
   */
 async getJsonData(key: string, collectionName: string) {
    try {
      let returnValue: any;      
      if(collectionName){
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
        } else{
          var mongoResult:any = await this.getDocument(collectionName,key) 
          if(mongoResult?.length>0 && mongoResult[0]?.value){  
            await redis.call('JSON.SET', key, '$', JSON.stringify(mongoResult[0]?.value));
            returnValue = JSON.stringify(mongoResult[0]?.value);
          }else{
            returnValue = null
          }       
        }       
      }else{
        throw 'client not found'
      }
      return returnValue;
    } catch (error) {
      throw error;
    }
  }
  
   /**
   * Retrieves JSON data from Redis with a specified path.
   * @param key The key used to identify the JSON data in Redis.
   * @param path The path to the specific JSON value within the JSON data.
   * @returns The JSON value at the specified path.
   * @throws {Error} If there is an error retrieving the JSON value.
+   */
  async getJsonDataWithPath(key: string, path:any,collectionName: string) {   
    if(collectionName){        
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
      } catch (error) {
        console.log('ERROR',error.message);
        return await this.getDocument(collectionName,key,path)       
        // throw error;
      }
   }else{
      throw 'client not found'
    }
  }

  async AppendJsonArr(key: string, value: any,path?: string) {
    try {
      if(path){
        var request = await redis.call('JSON.ARRAPPEND', key, '$.'+path, value)   
      }else{
        var request = await redis.call('JSON.ARRAPPEND', key, '$', value)   
      }               
      return request;
    } catch (error) {
      throw error
    }    
  }
  
  /**
   * Stores JSON data in Redis.
   * @param key The key used to identify the JSON data in Redis.
   * @param value The JSON data to be stored.
   * @param path The path to the specific JSON value within the JSON data.
   * @returns A string indicating that the value was stored.
   * @throws {Error} If there is an error storing the JSON data.
   */
 
 async setJsonData(key: string, value: any, collectionName: string, path?: string) {
    try {
     if (!collectionName && !key) throw "client/key not found";
    // validate key segments inline  
     
      const parts = key.split(":");
      const requiredMarkers = ["CK", "FNGK", "FNK", "CATK", "AFGK", "AFK", "AFVK"];
      requiredMarkers.forEach(marker => {
        const idx = parts.indexOf(marker);
        if (idx === -1 || !parts[idx + 1] || parts[idx + 1] === "undefined" || parts.length <= 14) {
          throw new Error(`Invalid Redis key`);
        }
      });

      const defpath = path ? `.${path}` : "$";
      let redisResult =    await redis.call("JSON.SET", key, defpath, value);
      if(redisResult == 'OK'){
        var mongoResult:any  = await this.setDocument(collectionName,key, JSON.parse(value),path)              
      if(mongoResult?.value)
        return 'Value Stored'; 
      }     
           
   } catch (error) {
    throw error;
   }
 }

 
 /**
   * Stores stream data in Redis.
   * @param streamName The name of the Redis stream.
   * @param key The key used to identify the stream data.
   * @param strValue The stream data to be stored.
   * @returns The ID of the added message.
   * @throws {Error} If there is an error storing the stream data.
   */

  async setStreamData(streamName: string, key: string, strValue: any, type?) {
    try { 
      var result = await redis.xadd(streamName, '*', key, JSON.stringify(strValue));     
      if(result){     
        result = await this.structuredExcepLogs(streamName,'',key,strValue,result)        
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

   async structuredExcepLogs(streamname,logType, streamKey?,streamValue?,timeStamp?) {
      try { 
        let logInfo = "logInfo"
        let USER   
        let date = new Date(Number(timeStamp.split("-")[0]));
        let entryId = format(date, 'yyyy-MM-dd')       
        streamValue = typeof streamValue == 'string'? JSON.parse(streamValue):streamValue       
        if (streamValue?.sessionInfo?.user) {
          USER = streamValue.sessionInfo.user
        } 
        
        const requiredKeys = ['CK:',':FNGK:',':FNK:',':CATK:',':AFGK:',':AFK:',':AFVK:'];
        if (streamKey == 'TORUS' || streamKey == 'GENERALERRORS' || streamKey == 'Logs Screen') { 
          streamValue['errorDetails']['DateAndTime'] = format(date, 'yyyy-MM-dd HH:mm:ss:SSS')
          streamValue['DATE'] = entryId 
          const structKey = {
            AFSK: {
              [logInfo]: [streamValue]
            }
          };
          const exists = await this.existsDocument(streamname, streamKey,'','Y');
          if (exists && Object.keys(exists).length > 0 && exists._id) {
            await this.appendFileInToDocument(streamname, streamKey, 'value.AFSK.' + logInfo, streamValue);
          } else {
            await db.collection(streamname).createIndex({ "value.AFSK.logInfo.DATE": 1});
            await this.insertDocument(streamname, streamKey, structKey);
          }
          return timeStamp
        }else if (requiredKeys.every((key) => streamKey.includes(key))) {        
          streamValue['DateAndTime'] = format(date, 'yyyy-MM-dd HH:mm:ss:SSS')
          streamValue['DATE'] = entryId  
          streamValue['USER'] = USER
          const structKey = {
            CK: await this.splitcommonkey(streamKey, 'CK'),
            FNGK: await this.splitcommonkey(streamKey, 'FNGK'),
            FNK: await this.splitcommonkey(streamKey, 'FNK'),
            CATK: await this.splitcommonkey(streamKey, 'CATK'),
            AFGK: await this.splitcommonkey(streamKey, 'AFGK'),
            AFK: await this.splitcommonkey(streamKey, 'AFK'),
            AFVK: await this.splitcommonkey(streamKey, 'AFVK'),           
            AFSK: {
              [logInfo]: [streamValue]
            }
          };
          const exists = await this.existsDocument(streamname, streamKey,'','Y');
          if (exists && Object.keys(exists).length > 0 && exists._id) {
            await this.appendFileInToDocument(streamname, streamKey, 'value.AFSK.' + logInfo, streamValue);
          } else {
            await db.collection(streamname).createIndex({ "value.CK": 1, "value.FNGK": 1, "value.FNK": 1, "value.CATK": 1, "value.AFGK": 1, "value.AFK": 1, "value.AFVK": 1, "value.DATE": 1, "value.USER": 1 });
            await this.insertDocument(streamname, streamKey, structKey);
          }
          return timeStamp
        }
      } catch (error) {      
        throw error
      }
   }

    async appendFileInToDocument(collectionName: string, key: string,AppendKey:string,AppendValue:any){
      try {
         if(collectionName && key){
        const collection:any = db.collection(collectionName);        
        let customId:any = {_id:key}
        var result:any = await collection.find(customId).toArray()      
        if(result?.length>0){                
          let pushQry = { $push: { [AppendKey] : AppendValue } }               
          return await collection.updateOne(customId, pushQry);             
         }
        }else{
        throw 'key/client not found'
        }
      } catch (error) {
        throw error
      }
    }

  /**
   * Checks if a key exists in Redis.
   * @param key The key to check in Redis.
   * @returns The result of the EXISTS command (0 or 1).
   * @throws {Error} If there is an error executing the EXISTS command.
   */

    async sethash(records,key){
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
          pipeline.hset(
            key+':'+batchNum,
            globalIndex.toString(),
            JSON.stringify(record)
          );
        });
        await pipeline.exec();
      }

      await redis.set( key+':total', records.length);
      await redis.set(key+':batches', totalBatches);
    } catch (error) {
      throw error
    }
  }


    async getAllRecordshash(key): Promise<any[]> {
   //const total = parseInt(await redis.get('records:total') || '0');
    const totalBatches = parseInt(await redis.get(key+':batches') || '0'); 
    // if (total === 0) {
    //   return [];
    // }    
    const allRecords: any[] = [];    
    for (let batchNum = 0; batchNum < totalBatches; batchNum++) {
      const batchData: Record<string, string> = await redis.hgetall(
       key+':'+batchNum
      );      
      const batchRecords = Object.values(batchData).map(value => 
        JSON.parse(value)
      );      
      allRecords.push(...batchRecords);
      console.log(`Loaded batch ${batchNum + 1}/${totalBatches}`);
    }
    
    return allRecords;
  }

    async quit(){
     await redis.quit();
  }

    async hset(hashName,field, value){
    try {
      return await redis.hset(hashName, field, value)
    } catch (error) {
      throw error;
    }
  }

  async hget(hashName,field){
    try {
      return await redis.hget(hashName,field);
    } catch (error) {
      throw error
    }
  }
  
  async exist(key,collectionName: string) {
    try {     
      if(collectionName){       
        let redisResult = await redis.call('EXISTS', key);
        if(redisResult){
          return redisResult;
        }else{
          let mongoResult = await this.existsDocument(collectionName,key)
          if(mongoResult){
            let doc = await this.getDocument(collectionName,key)
            if(doc?.length>0 && doc[0]?.value){          
            
            await redis.call('JSON.SET', key, '$', JSON.stringify(doc[0]?.value));}
            //await redis.call('JSON.SET', key, '$', JSON.stringify(doc));
            return 1
          }else{
          return mongoResult
          }
        }       
      }else{
        throw 'client not found'
      }
    } catch (error) {
      throw error;
    }
  }
 
 
   /**
   * Retrieves stream data from Redis.
   * @param streamName The name of the Redis stream.
   * @returns An array of messages in the stream.
   * @throws {Error} If there is an error retrieving the stream data.
   */
  
    async getStreamData(streamName) {
    try {
      var messages = await redis.xread('STREAMS', streamName, 0);     
      if(messages && messages != null){
        return messages;        
      }else{
        return await this.convertStreamStruct(streamName)
      }
    } catch (error) {
      throw error;
    }
  }
  
   /**
   * Retrieves stream data from Redis using XRANGE command.
   * 
   * @param {string} streamName - The name of the Redis stream.
   * @returns {Promise<string[][]>} - An array of messages in the stream.
   * @throws {Error} - If there is an error retrieving the stream data.
   */
  
   async getStreamRange(streamName,end?,start?){
    try {
      let messages;
      if(start && !end) 
        end = '+'
      if(end && !start)
        start = '-'
       if(end && start){
       messages = await redis.call('XRANGE', streamName, start, end);
       }else
         messages = await redis.call('XRANGE', streamName, '-', '+');
      // if(messages?.length == 0){    
      //   return await this.convertStreamRangeStruct(streamName)
      // }else{
        return messages;
      // }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves stream data from Redis using XREVRANGE command.
   * 
   * @param {string} streamName - The name of the Redis stream.
   * @param {number} count - The number of messages to retrieve.
   * @returns {Promise<string[][]>} - An array of messages in the stream.
   * @throws {Error} - If there is an error retrieving the stream data.
   */
   async getStreamRevRange(streamName, end?,start?,count?) {
    try {    
      if(end && start){
        var messages = await redis.xrevrange(streamName,end, start,'COUNT',count);
      }else{
        var messages = await redis.xrevrange(streamName,'+', '-', 'COUNT',count);
      }
      return messages;
    } catch (error) {
      throw error;
    }
  }
   
  /**
   * Retrieves stream data from Redis with count.
   * 
   * @param {number} count - The number of messages to retrieve.
   * @param {string} streamName - The name of the Redis stream.
   * @returns {Promise<string[][]>} - An array of messages in the stream.
   * @throws {Error} - If there is an error retrieving the stream data.
   */
  async getStreamDatawithCount(count, streamName) {
    try {
      var messages = await redis.xread('COUNT',count,'STREAMS', streamName, 0);
      return messages;
    } catch (error) {
      throw error;
    }
  }
 
  /**
   * Creates a consumer group for a given stream in Redis.
   *
   * @param {string} streamName - The name of the Redis stream.
   * @param {string} groupName - The name of the consumer group.
   * @returns {Promise<string>} - A promise that resolves to a string indicating the consumer group was created.
   * @throws {Error} - If there is an error creating the consumer group.
  */
  async createConsumerGroup(streamName, groupName) {
    try {
      await redis.xgroup('CREATE', streamName, groupName, '0', 'MKSTREAM');
      return `consumerGroup was created as ${groupName}`;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Creates a consumer within a consumer group in Redis.
   * @param {string} streamName - The name of the Redis stream.
   * @param {string} groupName - The name of the consumer group.
   * @param {string} consumerName - The name of the consumer.
   * @returns {Promise<string>} - A promise that resolves to a string indicating the consumer was created.
   * @throws {Error} - If there is an error creating the consumer.
   */
  async createConsumer(streamName, groupName, consumerName) {
    try {
      var result = await redis.xgroup('CREATECONSUMER',streamName,groupName,consumerName);
      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Reads messages from a Redis stream for a specific consumer group.
   * @param {string} streamName - The name of the Redis stream.
   * @param {string} groupName - The name of the consumer group.
   * @param {string} consumerName - The name of the consumer.
   * @returns {Promise<Array>} - A promise that resolves to an array of objects containing the message ID and data.
   * @throws {Error} - If there is an error reading the messages.
   */
  async readConsumerGroup(streamName, groupName, consumerName) {
    try {     
      var res = [];
      var result = await redis.xreadgroup('GROUP',groupName,consumerName,'STREAMS',streamName, '>');      
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
      } else {
        return 'No Data available to read';
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Acknowledges a message in a Redis stream using the XACK command.
   * @param {string} streamName - The name of the Redis stream.
   * @param {string} groupName - The name of the consumer group.
   * @param {string} msgId - The message ID to acknowledge.
   * @returns {Promise<string>} - A promise that resolves to the result of the XACK command.
   * @throws {Error} - If there is an error acknowledging the message.
   */
  async ackMessage(streamName, groupName, msgId) {
    try {
      let result = await redis.xack(streamName, groupName, msgId);
      return result;
    } catch (error) {
      throw error;
    }
  }

   /**
   * Retrieves information about a consumer group in Redis.
   * @param {string} groupName - The name of the consumer group.
   * @returns {Promise<Array>} - A promise that resolves to an array of information about the consumer group.
   * @throws {Error} - If there is an error retrieving the information.
   */
  async getInfoGrp(groupName){
    try {     
      let result = await redis.xinfo('GROUPS', groupName);   
      return result
    } catch (error) {
      throw error;
    }
  }
 
  /**
   * Retrieves all keys in Redis that match a given pattern.
   * @param {string} key - The pattern to match against Redis keys.
   * @returns {Promise<Array>} - A promise that resolves to an array of keys that match the pattern.
   * @throws {Error} - If there is an error retrieving the keys.
   */
  
  async getKeys(key: string , collectionName: string, isKeySuffix = false) {
    try {
       let redisKey
       let mkeys       
       if(collectionName){
        if(key.endsWith(':'))
          redisKey = isKeySuffix ? '*:'+ key : key + '*';
        else
          redisKey = isKeySuffix ? '*:'+ key : key + ':*';
       
        const parts = key.split(":").map(p => p.trim());
        const KeyrequiredMarkers = ["CK", "FNGK", "FNK", "CATK", "AFGK", "AFK", "AFVK"];
        KeyrequiredMarkers.forEach(marker => {
          const idx = parts.indexOf(marker);
          if (parts[idx + 1] === "undefined" || parts[idx + 1] === '') {
            throw new Error(`Invalid Redis key`);
          }
        });

        let keys = await redis.keys(redisKey);
        const arrID: string[] = [];
        const requiredMarkers = ["CK", "FNGK", "FNK", "CATK", "AFGK", "AFK", "AFVK"];
        for (const item of keys) {
          const _id = item         
          const parts = _id.split(":").map(p => p.trim()); 
            let isValid = true;  
            for (const marker of requiredMarkers) {
              const idx = parts.indexOf(marker);
              
              const next = parts[idx + 1];                
              if (idx === -1 ||next === undefined ||next === null ||next.trim?.() === "" ||next.toLowerCase?.() === "undefined" || parts.length <= 14) {
                isValid = false;
                await this.deleteKey(_id,collectionName)
                break;
              }
            }  
            if (isValid && !arrID.includes(_id)) {
              arrID.push(_id);
            }                 
        }
        if(arrID.length>0)  keys = arrID 
             mkeys = await this.getDocumentKeys(collectionName,key)
        if(keys?.length == mkeys?.length){
          return keys
        }else{
         if(mkeys?.length > keys?.length)
          return mkeys;
         else
          return keys;
       }
     }else{
      throw 'client not found'
    }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Deletes a key in Redis.
   * @param {string} key - The key to delete.
   * @returns {Promise<void>} - A promise that resolves when the key is deleted.
   * @throws {Error} - If there is an error deleting the key.
   */
  async deleteKey(key: any,collectionName: string) {
    try {     
      if(collectionName){     
        var response = await redis.del(key);
        await this.deleteDocument(collectionName,key)        
        return response
      }else{
       throw 'client not found'
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteWithEntryId(streamName, msgId) {
    try {      
      return await redis.call('XDEL',streamName,msgId)
    } catch (error) {
      throw error;
    }
  }

  /**
   * Sets an expiration time for a Redis key.
   *
   * @param {string} key - The key to set the expiration time for.
   * @param {number} seconds - The number of seconds before the key expires.
   * @returns {Promise<number>} - A promise that resolves to the number of seconds
   * before the key expires, or 0 if the key does not exist.
   * @throws {Error} - If there is an error setting the expiration time.
   */
  async expire(key, seconds) {
    try {
      var result = await redis.call('EXPIRE', key, seconds);
      return result;
    } catch (error) {
      throw error;
    }
  }

   async renameKey(oldKey, newKey,collectionName) {
    try {     
      if(collectionName){
      var result = await redis.call('RENAME', oldKey, newKey);      
        let mongoResult = await this.existsDocument(collectionName,oldKey)
       if(mongoResult){
        await this.renameDocumentId(collectionName,oldKey,newKey)
       }                 
      return result;
     }else{
      throw 'client not found'
     }
    } catch (error) {
      throw error;
    }
  }

  async copyData(sourceKey: string, destinationKey: string,collectionName) {
    try {
      if(collectionName){
      const destinationExist = await this.exist(destinationKey,collectionName);
      if(destinationExist){
        await this.deleteKey(destinationKey,collectionName);
      }
      let mongdoc;
       let mongoResult = await this.existsDocument(collectionName,sourceKey)
       if(mongoResult){
         mongdoc = await this.getDocument(collectionName,sourceKey)
       
       }else{
         mongdoc = JSON.parse(await this.getJsonData(sourceKey,collectionName))
       }
      await this.setDocument(collectionName,destinationKey,mongdoc)
      var result = await redis.call('COPY', sourceKey, destinationKey);  
      return result;
      }else{
      throw 'client not found'
     }
    } catch (error) {
      throw error;
    }
  }  

  async getstreamKey(key: string) {
    try {
      let keys
       keys = await redis.keys(key); 
      if(keys?.length == 0){
        keys = await this.getDocumentKeys(key)
      }
      return keys;
    } catch (error) {
      throw error;
    }
  }  
 
  //------------------------ MONGO DB ----------------------------//

  async setDocument(collectionName: string, key: string, value: any,path?:any,filter?:object){
    try {
      let collection;
      if(key && collectionName){
        if(key.includes(':FNGK:AFR:') || key.includes(':FNGK:AFRS:'))
          collection = db.collection('TORUS_AMDKEYS'); 
        else
        collection = db.collection(collectionName+'_AMDKEYS');
  
        let customId:any = { _id:key}
      
        let customVal:any = { $set: { value } }      
      
        if(filter)    
          customId = Object.assign(customId,filter) 

        if(path){
          path = 'value.'+path
          customVal = { $set: { [path]:value } }
        }
      
        var result = await collection.findOneAndUpdate(customId,customVal,{ upsert: true, returnDocument: 'after' })
    
        if (result) {
          return result
        } else {
          return 0
        }
      }else{
      throw 'key/client not found'
      }
    } catch (error) {
      throw error
    }
  }  


  async getDocumentKeys(collectionName: string, key?: string) {
    try {
      if (!collectionName) throw 'client not found';
      let collection;
      let result;
     
      if (key) {
        if(key.includes(':FNGK:AFR:') || key.includes(':FNGK:AFRS:'))
          collection = db.collection('TORUS_AMDKEYS'); 
        else
          collection = db.collection(collectionName+'_AMDKEYS');
  
        const parts = key.split(":").map(p => p.trim());
        const KeyrequiredMarkers = ["CK", "FNGK", "FNK", "CATK", "AFGK", "AFK", "AFVK"];
        KeyrequiredMarkers.forEach(marker => {
          const idx = parts.indexOf(marker);
          if (parts[idx + 1] === "undefined" || parts[idx + 1] === '') {
            throw new Error(`Invalid Redis key: missing value for ${marker}`);
          }
        });
      
        if (key.includes(':*:')) {
          key = key.replaceAll(':*', '.*?')
        }
        result = await collection.find({ _id: { $regex: (`${key}`) } }).toArray();
        const arrID: string[] = [];
        const requiredMarkers = ["CK", "FNGK", "FNK", "CATK", "AFGK", "AFK", "AFVK"];
        for (const item of result) {
          const _id = item?._id;
          if (!_id || typeof _id !== "string") continue;

          const parts = _id.split(":").map(p => p.trim());         
        
          let isValid = true;  
          for (const marker of requiredMarkers) {
            const idx = parts.indexOf(marker);
            const next = parts[idx + 1];  
            if (idx === -1 ||next === undefined ||next === null ||next.trim?.() === "" ||next.toLowerCase?.() === "undefined" || parts.length <= 14) {
              isValid = false;
              await this.deleteKey(_id,collectionName)
              break;
            }
          }

          if (isValid && !arrID.includes(_id)) {
            arrID.push(_id);
          }                  
        }

        return arrID;
      }
      
    } catch (error) {
      throw error;
    }
  }

  async getDocument(collectionName: string, key: string, path?:any,filter?:object){
    try {
      if(collectionName){
        let collection;
        if(key.includes(':FNGK:AFR:') || key.includes(':FNGK:AFRS:'))
          collection = db.collection('TORUS_AMDKEYS'); 
        else
          collection = db.collection(collectionName+'_AMDKEYS');
  
      const parts = key.split(":").map(p => p.trim());
      const KeyrequiredMarkers = ["CK", "FNGK", "FNK", "CATK", "AFGK", "AFK", "AFVK"];
      KeyrequiredMarkers.forEach(marker => {
        const idx = parts.indexOf(marker);
        if (parts[idx + 1] === "undefined" || parts[idx + 1] === '' || parts.length <= 14) {
          throw new Error(`Invalid Redis key: missing value for ${marker}`);
        }
      });

      // const collection = db.collection(collectionName+'_AMDKEYS'); 
      let customId:any = {
        _id: new RegExp(`${key}`, 'i')
      }   
      
      let result = await collection.find(customId).toArray();  
     
      
      if (result?.length>0) { 
        const arrID: string[] = [];
        const requiredMarkers = ["CK", "FNGK", "FNK", "CATK", "AFGK", "AFK", "AFVK"];
        for (const item of result) {
          const _id = item?._id;
          if (!_id || typeof _id !== "string") continue;

          const parts = _id.split(":").map(p => p.trim());         
        
          let isValid = true;  
          for (const marker of requiredMarkers) {
            const idx = parts.indexOf(marker);
            const next = parts[idx + 1];  
            if (idx === -1 ||next === undefined ||next === null ||next.trim?.() === "" ||next.toLowerCase?.() === "undefined" || parts.length <= 14) {
              isValid = false;
              await this.deleteKey(_id,collectionName)
              break;
            }
          }

          if (isValid) {//&& !arrID.includes(_id)
            arrID.push(item);
          }                  
        }
       
        
        if(arrID.length>0) result = arrID
        if(path){   
          return await _.get(result?.[0],'value'+path)         
        }
        return result
      } else {
        return 0
      }
      }else{
        throw 'client not found'
      }
    } catch (error) {
      throw error
    }
  }

  async getCollection(collectionName: string){
    try {   
      if(collectionName) {
      const collection = db.collection(collectionName+'_AMDKEYS'); 
      var result = await collection.find().toArray();           
      if (result?.length>0) { 
        return result
      } else {
        return 0
      }
     }else{
      throw 'client not found'
     }
    } catch (error) {
      throw error
    }
  }

  async existsDocument(collectionName: string, key: string,filter?:any,streamFlg?:string){
    try {  
      if(!collectionName) throw 'client not found'
      // if(!streamFlg || streamFlg != 'Y'){
      //   collectionName = collectionName+'_AMDKEYS'
      // }   
      let collection;
      if(key.includes(':FNGK:AFR:') || key.includes(':FNGK:AFRS:'))
        collectionName = 'TORUS_AMDKEYS'        
      else if(!streamFlg || streamFlg != 'Y')
        collectionName = collectionName+'_AMDKEYS'

      collection = db.collection(collectionName);
      
      // const collection = db.collection(collectionName); 
      let customId:any = {_id:key}  
      if(filter){
        customId = Object.assign(customId,filter)
      }
      var result = await collection.findOne(customId,{ projection: { _id: 1 } }) 
      if (result) {
        return result
      } else {
        return 0
      }
     
    } catch (error) {
      throw error
    }
  }

  async splitcommonkey(key, spliter) {
    const parts = key.split(':');
    const index = parts.findIndex((part) => part === spliter);

    if (index !== -1) {
      return parts[index + 1];
    }
  }

  async insertDocument(collectionName: any,key:string,insertValue: any) {
    if(collectionName){
    const collection = db.collection(collectionName);
    let customIdAndValue:any
    if(key){
      customIdAndValue = { _id:key}
    }
    customIdAndValue.value = insertValue
  
    var result = await collection.insertOne(customIdAndValue)
    if (result) {
      return result
    } else {
      return 0
    }
    }else{
      throw 'client not found'
    }
  }

  async appendDocumentData(collectionName: string, key: string,AppendValue:any){
    try {
      if(collectionName){
      let collection;
      if(key.includes(':FNGK:AFR:') || key.includes(':FNGK:AFRS:'))
        collection = db.collection('TORUS_AMDKEYS'); 
      else
        collection = db.collection(collectionName+'_AMDKEYS');
      // const collection:any = db.collection(collectionName+'_AMDKEYS'); 
      let customId:any = {_id:key}
      var result:any = await collection.find(customId).toArray()     
      if(result?.length>0){                
        let pushQry = { $push: { ['value'] : AppendValue } }               
        return await collection.updateOne(customId, pushQry);             
      }else{  
        return await this.setDocument(collectionName,key,[AppendValue])
      }
     }else{
      throw 'client not found'
     }
    } catch (error) {
      throw error
    }
  }

 async renameDocumentId(collectionName: string,oldId: string,newId: string): Promise<string> {
  try {  
    if(collectionName){  
    const collection = db.collection<any>(collectionName +'_AMDKEYS');    
    const doc = await collection.findOne({ _id: oldId });
    if (!doc) {
      throw (`_id "${oldId}" not found`);
    }    
    doc._id = newId;
    await collection.insertOne(doc);  
    return newId;
    }else{
      throw 'client not found'
    }
  } catch (error) {
    throw error
  }
 }

  async deleteDocument(collectionName:string,key:any){
    try{
      if(collectionName){
      let collection;
      if(key.includes(':FNGK:AFR:') || key.includes(':FNGK:AFRS:'))
        collection = db.collection('TORUS_AMDKEYS'); 
      else
        collection = db.collection(collectionName+'_AMDKEYS');
      // const collection = db.collection(collectionName+'_AMDKEYS');
        let res = await collection.deleteOne({_id:key} )
        return res;
      }else{
        throw 'client not found'
      }
    }catch(err){
      throw err;
    }
  }

  async listCollections(collectionName?:string){
    try {
      let collections = []
      let collectionList = await db.listCollections().toArray();
      collectionList.forEach(collection => {
        if(collectionName){
          if(collection.name.includes(collectionName)){
            collections.push(collection.name);
          }
        }else{
          collections.push(collection.name);
        }
      });
      if(collections.length > 0){
        return collections
      }else{
        return 0
      }
    } catch (error) {
      throw error
    }
  }

  async appendStreamDocument(collectionName: string, key: string,AppendValue:any, type:string){
    try {
      if(collectionName){
      const collection:any = db.collection(collectionName);
      let customId:any = {_id:key}
 
      var result:any = await collection.find(customId).toArray()
     
      if(result?.length>0){                
        let pushQry = { $push: { ['value'] : AppendValue } , 
         $set: { ['type']: type }}
               
        return await collection.updateOne(customId, pushQry);
             
      }else{        
        return await this.setStreamDocument(collectionName,key,[AppendValue], type)
      }
     }else{
      throw 'client not found'
     }
    } catch (error) {
      throw error
    }
  }

  async setStreamDocument(collectionName: string, key: string, value: any, type?:string, path?:any,filter?:object){
    try {
     if(collectionName){
      const collection = db.collection(collectionName); 
      let customId:any = { _id:key}     
      let customVal:any = { $set: { value } } 
      if(type) {
          customVal= { $set: { value, type }  }
       } 
      if(filter)    
        customId = Object.assign(customId,filter) 
      if(path){
        if(path.includes('[') && path.includes(']')){
          path = path.replace(']', '');
          path = path.replace('[', '');
        }
        path = 'value.'+path
        customVal = { $set: { [path]:value } }
      }
     
      var result = await collection.findOneAndUpdate(customId,customVal,{ upsert: true, returnDocument: 'after' })
  
      if (result) {        
        return result
      } else {
        return 0
      }
     }else{
      throw 'client not found'
     }
    } catch (error) {
      throw error
    }
  }

  async convertStreamStruct(collectionName){
  try { 
    if(!collectionName)  throw 'client not found'
    const collection = db.collection(collectionName); 
    let docs: any =  await collection.find().toArray();  
      
    let FinalArr = [];  
    
    if (docs?.length > 0) {
      let EntryIdArr = []
      for (let d = 0; d < docs.length; d++) {
        let singleDoc = docs[d];
        let singleDocId = singleDoc._id;
        let singleDocValArr = singleDoc.value;

       
        for(let v = 0; v < singleDocValArr.length; v++){
          let fieldKeyArr = [];
          let EntryId = singleDocValArr[v].EntryId
          delete singleDocValArr[v].EntryId
      
          await redis.xadd(collectionName, EntryId, singleDocId, JSON.stringify(singleDocValArr[v]));

          fieldKeyArr.push(EntryId,[singleDocId,JSON.stringify(singleDocValArr[v])]);
        
          EntryIdArr.push(fieldKeyArr);
        }      

      }
      FinalArr.push([collectionName,EntryIdArr]);
      return FinalArr     
     }
     

    } catch (error) {
      throw error
    }
  }

   async convertStreamRangeStruct(collectionName){
    try {
      if(!collectionName) throw 'client not found'   
    const collection = db.collection(collectionName); 
    let docs: any =  await collection.find().toArray(); 
    
    if (docs?.length > 0) {
      let EntryIdArr = []
      for (let d = 0; d < docs.length; d++) {
        let singleDoc = docs[d];
        let singleDocId = singleDoc._id;
        let singleDocValArr = singleDoc.value;

       
        for(let v = 0; v < singleDocValArr.length; v++){
          let fieldKeyArr = [];
          let EntryId = singleDocValArr[v].EntryId
          delete singleDocValArr[v].EntryId
      
          await redis.xadd(collectionName, EntryId, singleDocId, JSON.stringify(singleDocValArr[v]));

          fieldKeyArr.push(EntryId,[singleDocId,JSON.stringify(singleDocValArr[v])]);
        
          EntryIdArr.push(fieldKeyArr);
        }      
       
      }     
      return EntryIdArr
     
    }

    } catch (error) {
      throw error
    }
  }
  
}