import type { Graph } from '@antv/x6';
import type { NodeStatus } from '../..';
import type { ActionProtocol } from './protocol';
import { ActionType } from './protocol';
export declare class ChangeStatusAction implements ActionProtocol {
    type: ActionType;
    label: string;
    handle(graph: Graph, dagId: string, node: {
        nodeId: string;
        status: NodeStatus;
    }): void;
    changeNodeStatus(node: {
        nodeId: string;
        status: NodeStatus;
    }, graph: Graph): void;
}
//# sourceMappingURL=change-status.d.ts.map