import type { Graph } from '@antv/x6';
import DAGContext from '../context';
import type { ActionProtocol } from './protocol';
import { ActionType } from './protocol';
export declare const runUpActionHotKey: {
    key: string;
    text: string;
};
export declare class RunUpAction extends DAGContext implements ActionProtocol {
    type: ActionType;
    label: string;
    hotKey: {
        key: string;
        text: string;
    };
    handle: (graph: Graph, dagId: string, nodeId: string[]) => Promise<void>;
    getSuperGraph(graph: Graph, nodeId: string, nodeIds?: Set<string>): Set<string>;
}
//# sourceMappingURL=run-up.d.ts.map