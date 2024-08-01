import type { Graph } from '@antv/x6';
import DAGContext from '../context';
import type { ActionProtocol } from './protocol';
import { ActionType } from './protocol';
export declare class RunAllAction extends DAGContext implements ActionProtocol {
    type: ActionType;
    label: string;
    handle: (graph: Graph, dagId: string) => Promise<void>;
}
//# sourceMappingURL=run-all.d.ts.map