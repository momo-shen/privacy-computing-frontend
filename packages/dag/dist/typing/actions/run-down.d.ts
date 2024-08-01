import type { Graph } from '@antv/x6';
import DAGContext from '../context';
import type { ActionProtocol } from './protocol';
import { ActionType } from './protocol';
export declare const runDownActionHotKey: {
    key: string;
    text: string;
};
export declare class RunDownAction extends DAGContext implements ActionProtocol {
    type: ActionType;
    label: string;
    hotKey: {
        key: string;
        text: string;
    };
    handle: (graph: Graph, dagId: string, nodeId: string[]) => Promise<void>;
    getSubGraph(graph: Graph, nodeId: string, nodeIds?: Set<string>): Set<string>;
}
//# sourceMappingURL=run-down.d.ts.map