import { Db } from 'mongodb';
export declare const connectToMongo: (attemptCount?: number) => Promise<Db>;
export declare const connectToRedis: () => Promise<void>;
export declare const getDb: () => Promise<Db>;
export declare const getRedis: () => any;
