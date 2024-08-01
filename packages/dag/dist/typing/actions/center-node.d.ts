import type { Graph } from '@antv/x6';
import type { ActionProtocol } from './protocol';
import { ActionType } from './protocol';
export declare class CenterNodeAction implements ActionProtocol {
    type: ActionType;
    label: string;
    handle(graph: Graph, dagId: string, nodeId?: string): void;
}
//# sourceMappingURL=center-node.d.ts.map