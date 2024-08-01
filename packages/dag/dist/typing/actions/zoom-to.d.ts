import type { Graph } from '@antv/x6';
import type { ActionProtocol } from './protocol';
import { ActionType } from './protocol';
export declare class ZoomToAction implements ActionProtocol {
    type: ActionType;
    label: string;
    handle(graph: Graph, dagId: string, zoom: number): number;
}
//# sourceMappingURL=zoom-to.d.ts.map