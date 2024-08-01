import type { Graph } from '@antv/x6';
import DAGContext from '../context';
import type { ActionProtocol } from './protocol';
import { ActionType } from './protocol';
export declare class ChangeNodeDataAction extends DAGContext implements ActionProtocol {
    type: ActionType;
    label: string;
    handle(graph: Graph, dagId: string, nodeId: string, option: any): void;
}
//# sourceMappingURL=update-node-data.d.ts.map