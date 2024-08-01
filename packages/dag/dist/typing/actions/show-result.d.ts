import type { Graph } from '@antv/x6';
import DAGContext from '../context';
import type { ActionProtocol } from './protocol';
import { ActionType } from './protocol';
export declare class ShowResultAction extends DAGContext implements ActionProtocol {
    type: ActionType;
    label: string;
    handle(graph: Graph, dagId: string, outputId: string, codeName: string): Promise<void>;
}
//# sourceMappingURL=show-result.d.ts.map