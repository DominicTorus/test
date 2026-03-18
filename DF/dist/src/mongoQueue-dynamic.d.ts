export declare function queueMongoOperation<T>(operation: () => Promise<T>, operationName?: string): Promise<T>;
