import type { Graph } from '@antv/x6';
import { Dnd } from '@antv/x6-plugin-dnd';
import DAGContext from '../context';
import type { GraphNode } from '../types';
import type { ActionProtocol } from './protocol';
import { ActionType } from './protocol';
export declare class DragNodeAction extends DAGContext implements ActionProtocol {
    type: ActionType;
    label: string;
    dnd: Dnd | null;
    handle(graph: Graph, dagId: string, nodeData: Pick<GraphNode, 'codeName' | 'label' | 'status'>, e: MouseEvent): Promise<void>;
    cancel(): void;
}
//# sourceMappingURL=drag-node.d.ts.map