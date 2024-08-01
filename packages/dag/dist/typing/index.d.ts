/** 暴露接口和默认类方便继承 */
export * from './actions';
export * from './manager';
export * from './request';
export * from './hooks';
export * from './data';
export * from './types';
export * from './utils';
export * from './shapes';
import type { Graph } from '@antv/x6';
import { Portal, register as ShapeRegister } from '@antv/x6-react-shape';
import { Registry } from '@secretflow/utils';
import type { ActionFactory } from './actions/protocol';
import type { DataService } from './data';
import type { HookService } from './hooks';
import type { GraphManager, GraphMode } from './manager';
import type { DAGProtocol } from './protocol';
import type { RequestService } from './request';
import type { GraphEventHandlerProtocol } from './types';
export { Portal, ShapeRegister, Registry };
export type { RequestService, HookService, DataService, GraphManager };
export declare const DAGGlobalContainer: WeakMap<Graph, DAG>;
export declare class DAG implements DAGProtocol {
    dagId: string;
    requestService: RequestService;
    hookService: HookService;
    dataService: DataService;
    graphManager: GraphManager;
    ActionHub: any;
    EventHub: any;
    constructor();
    init(dagId: string, graphConfig: Graph.Options, mode?: GraphMode, ...args: any[]): void;
    addActions(actions: ActionFactory[]): void;
    addGraphEvents(event: GraphEventHandlerProtocol): void;
    dispose(): void;
}
//# sourceMappingURL=index.d.ts.map