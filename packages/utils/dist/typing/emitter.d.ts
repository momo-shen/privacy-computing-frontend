type EventHandle<T> = (data: T) => void;
export declare class Emitter<T> {
    eventHandlers: EventHandle<T>[];
    on: (handler: EventHandle<T>) => void;
    fire: (data: T) => void;
    dispose(): void;
}
export {};
//# sourceMappingURL=emitter.d.ts.map