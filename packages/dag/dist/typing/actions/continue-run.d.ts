import type { Graph } from '@antv/x6';
import DAGContext from '../context';
import type { ActionProtocol } from './protocol';
import { ActionType } from './protocol';
export declare class ContinueRunAction extends DAGContext implements ActionProtocol {
    type: ActionType;
    label: string;
    handle: (graph: Graph, dagId: string, nodeId: string) => Promise<void>;
}
//# sourceMappingURL=continue-run.d.ts.map