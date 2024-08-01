import type { Graph } from '@antv/x6';
import DAGContext from '../context';
import { NodeStatus } from '../types';
import type { ActionProtocol } from './protocol';
import { ActionType } from './protocol';
export declare class QueryStatusAction extends DAGContext implements ActionProtocol {
    type: ActionType;
    label: string;
    timer: number;
    handle(graph: Graph, dagId: string): Promise<void>;
    cancel(): void;
    queryStatus(graph: Graph, dagId: string): Promise<void>;
    changeNodesStatus(nodeStatus: {
        nodeId: string;
        status: NodeStatus;
    }[], graph: Graph): void;
    changeEdgeStatus(graph: Graph, edgeId: string, status: NodeStatus): void;
}
//# sourceMappingURL=query-status.d.ts.map