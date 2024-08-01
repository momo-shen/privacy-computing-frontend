import type { Graph } from '@antv/x6';
import DAGContext from '../context';
import type { ActionProtocol } from './protocol';
import { ActionType } from './protocol';
export declare const removeCellActionHotKey: {
    key: string[];
    text: string;
};
export declare class RemoveCellAction extends DAGContext implements ActionProtocol {
    type: ActionType;
    label: string;
    hotKey: {
        key: string[];
        text: string;
    };
    handle(graph: Graph, dagId: string, nodeIds?: string[], edgeIds?: string[]): void;
}
//# sourceMappingURL=remove-cell.d.ts.map