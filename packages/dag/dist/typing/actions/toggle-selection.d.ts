import type { Graph } from '@antv/x6';
import type { ActionProtocol } from './protocol';
import { ActionType } from './protocol';
export declare const toggleSelectionActionHotKey: {
    key: string;
    text: string;
};
export declare class ToggleSelectionAction implements ActionProtocol {
    type: ActionType;
    label: string;
    hotKey: {
        key: string;
        text: string;
    };
    rubberband: boolean;
    handle: (graph: Graph) => boolean;
    toggeleSelection(graph: Graph): boolean;
    enableSelection: (graph: Graph) => void;
    disableSelection: (graph: Graph) => void;
}
//# sourceMappingURL=toggle-selection.d.ts.map