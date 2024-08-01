import type { ResultOriginData, TypeOfData } from './typing';
export declare function parseData({ tableHeader, records }: {
    tableHeader: string[];
    records: (string | number)[][];
}, type?: string): any;
export declare const safeJson: (jsonStr?: string, defaultVal?: {}) => any;
export declare const execCopy: (content: string) => void;
export declare const lexicographicalOrder: (a: string, b: string) => any;
export declare const modifyDataStructure: (resultObj: ResultOriginData) => {
    records: (string | number)[][];
    schema: {
        name: string;
        type: TypeOfData;
    }[];
};
//# sourceMappingURL=utils.d.ts.map