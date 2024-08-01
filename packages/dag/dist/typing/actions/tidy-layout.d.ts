import type { Graph } from '@antv/x6';
import DAGContext from '../context';
import type { ActionProtocol } from './protocol';
import { ActionType } from './protocol';
export declare const tidyLayoutActionHotKey: {
    key: string;
    text: string;
};
export declare class TidyLayoutAction extends DAGContext implements ActionProtocol {
    type: ActionType;
    label: string;
    hotKey: {
        key: string;
        text: string;
    };
    handle: (graph: Graph, dagId: string) => void;
}
//# sourceMappingURL=tidy-layout.d.ts.map