import type { Graph, Edge } from '@antv/x6';
import DAGContext from '../context';
import type { ActionProtocol } from './protocol';
import { ActionType } from './protocol';
export declare class UpdateEdgeAction extends DAGContext implements ActionProtocol {
    type: ActionType;
    label: string;
    handle(graph: Graph, dagId: string, edge: Edge): void;
}
//# sourceMappingURL=update-edge.d.ts.map