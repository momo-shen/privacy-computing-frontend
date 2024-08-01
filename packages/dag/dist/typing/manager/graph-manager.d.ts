import { Graph } from '@antv/x6';
import { ActionType } from '../actions';
import DAGContext from '../context';
import type { GraphMode } from './protocol';
import type { GraphManager } from './protocol';
export declare class DefaultGraphManager extends DAGContext implements GraphManager {
    dagId: string | null;
    graph: Graph | null;
    init(dagId: string, graphConfig: Graph.Options, mode?: GraphMode, ...args: any[]): void;
    initGraph(graphConfig: Graph.Options): void;
    initPlugins: () => void;
    initHotKeys: () => void;
    initEvents(mode?: GraphMode): void;
    executeAction(type: ActionType | ActionType[], ...args: any[]): Promise<any>;
    getActionInfo(type: ActionType): {
        label: any;
        hotKey: any;
    } | null;
    cancelAction(type: ActionType): any;
    cancelAllAction(): void;
    getGraphInstance(): Graph | null;
    getSelectedCells(): import("@antv/x6").Cell<import("@antv/x6").Cell.Properties>[];
    dispose(): void;
}
//# sourceMappingURL=graph-manager.d.ts.map