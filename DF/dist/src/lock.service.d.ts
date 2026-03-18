export declare class LockService {
    private redlock;
    constructor();
    acquireLock(resource: string[], ttl: number): Promise<import("redlock").Lock>;
    releaseLock(lock: any): Promise<any>;
}
