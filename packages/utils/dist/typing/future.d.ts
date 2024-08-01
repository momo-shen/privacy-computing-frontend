type FutureStatus = PromiseSettledResult<unknown>['status'] | 'pending';
/**
 * [Future](https://docs.python.org/3/library/asyncio-future.html#future-object)-like interface
 */
export declare class Future<T = void> implements Promise<T> {
    protected readonly awaitable: Promise<T>;
    protected setResult: (result: T) => void;
    protected setException: (reason: unknown) => void;
    protected _status: FutureStatus;
    constructor();
    done: () => boolean;
    get status(): FutureStatus;
    protected set status(s: FutureStatus);
    fulfill: (value: T) => void;
    reject: (reason?: unknown) => void;
    then: Promise<T>['then'];
    catch: Promise<T>['catch'];
    finally: Promise<T>['finally'];
    get [Symbol.toStringTag](): string;
}
export {};
//# sourceMappingURL=future.d.ts.map