import type { Graph, Node } from '@antv/x6';
import DAGContext from '../context';
import type { ActionProtocol } from './protocol';
import { ActionType } from './protocol';
export declare class AddNodeAction extends DAGContext implements ActionProtocol {
    type: ActionType;
    label: string;
    handle(graph: Graph, dagId: string, node: Node): void;
}
//# sourceMappingURL=add-node.d.ts.map