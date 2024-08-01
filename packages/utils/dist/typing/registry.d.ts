export declare class Registry<T> {
    data: Set<T>;
    register(instance: T): void;
    unRegister(instance: T): void;
    getData: () => T[];
}
export declare function createRegistry<T>(): Registry<T>;
//# sourceMappingURL=registry.d.ts.map