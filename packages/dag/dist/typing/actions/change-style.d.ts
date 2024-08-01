import type { Graph } from '@antv/x6';
import type { ActionProtocol } from './protocol';
import { ActionType } from './protocol';
export declare class ChangeStylesAction implements ActionProtocol {
    type: ActionType;
    label: string;
    timer: number;
    handle(graph: Graph, dagId: string, nodeStyles: {
        nodeId: string;
        styles: {
            isOpaque: boolean;
        };
    }[]): void;
    changeNodesStyle(nodeStyles: {
        nodeId: string;
        styles: {
            isOpaque: boolean;
        };
    }[], graph: Graph): void;
}
//# sourceMappingURL=change-style.d.ts.map