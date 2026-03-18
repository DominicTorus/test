export declare class MongoService {
    private gridfsBucket;
    private vaultAddr;
    private vaultToken;
    private keyName;
    constructor();
    private readonly logger;
    findDocument(collectionName: any, findQuery: any, projectionValue?: any, Options?: any): Promise<any>;
    updateDocument(collectionName: any, path: any, findQuery: any): Promise<any>;
    countDocuments(collectionName: any, findQuery: any): Promise<any>;
    insertDocument(collectionName: any, key: string, insertValue: any): Promise<any>;
    appendFileInToDocument(collectionName: string, key: string, AppendKey: string, AppendValue: any): Promise<any>;
    existsDocument(collectionName: string, key: string, filter?: object): Promise<0 | import("mongodb").WithId<import("bson").Document>>;
    setKey(key: any): Promise<any>;
    getKeys(key: any): Promise<any>;
    updateKey(key: any): Promise<any>;
    saveFileToGridFS(bucketName: string, objectName: string, objectData: any, encryptionFlag?: string): Promise<any>;
    readFileFromGridFS(bucketName: string, filename: string, decryptionFlag?: string): Promise<any>;
    readFileFromGridFSWithId(bucketName: string, fileId: any, decryptionFlag?: string): Promise<any>;
    readFileFromGridFsWithFilter(bucketName: string, filename: string, filter: object, decryptionFlag?: string): Promise<any>;
    deleteFileFromGridFs(bucketName: string, filename: string, filter?: object): Promise<any>;
    encryptWithVault(plaintext: Buffer): Promise<string>;
    decryptWithVault(ciphertext: string): Promise<Buffer>;
}
