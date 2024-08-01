import type { Graph } from '@antv/x6';
import type { ActionProtocol } from './protocol';
import { ActionType } from './protocol';
export declare class ClearStatusAction implements ActionProtocol {
    type: ActionType;
    label: string;
    handle(graph: Graph): void;
}
//# sourceMappingURL=clear-status.d.ts.map