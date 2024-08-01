import type { Graph } from '@antv/x6';
import type { ActionProtocol } from './protocol';
import { ActionType } from './protocol';
export declare const zoomToFitActionHotKey: {
    key: string;
    text: string;
};
export declare class ZoomToFitAction implements ActionProtocol {
    type: ActionType;
    label: string;
    hotKey: {
        key: string;
        text: string;
    };
    handle: (graph: Graph) => number;
}
//# sourceMappingURL=zoom-to-fit.d.ts.map