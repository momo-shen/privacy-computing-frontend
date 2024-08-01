import type { Graph } from '@antv/x6';
import DAGContext from '../context';
import type { ActionProtocol } from './protocol';
import { ActionType } from './protocol';
export declare const copyActionHotKey: {
    key: string;
    text: string;
};
export declare class CopyAction extends DAGContext implements ActionProtocol {
    type: ActionType;
    label: string;
    hotKey: {
        key: string;
        text: string;
    };
    handle(graph: Graph, dagId: string, nodeIds?: string[], edgeIds?: string[]): void;
}
//# sourceMappingURL=copy.d.ts.map