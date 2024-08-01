import type { Graph } from '@antv/x6';
import DAGContext from '../context';
import type { ActionProtocol } from './protocol';
import { ActionType } from './protocol';
export declare const pasteActionHotKey: {
    key: string;
    text: string;
};
export declare class PasteAction extends DAGContext implements ActionProtocol {
    type: ActionType;
    label: string;
    hotKey: {
        key: string;
        text: string;
    };
    handle(graph: Graph, dagId: string): Promise<void>;
}
//# sourceMappingURL=paste.d.ts.map