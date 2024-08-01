import type { Graph } from '@antv/x6';
import DAGContext from '../context';
import type { ActionProtocol } from './protocol';
import { ActionType } from './protocol';
export declare class StopAllAction extends DAGContext implements ActionProtocol {
    type: ActionType;
    label: string;
    handle: (graph: Graph, dagId: string, nodeId: string[]) => Promise<void>;
}
//# sourceMappingURL=stop-all.d.ts.map