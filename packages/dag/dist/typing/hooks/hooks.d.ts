import DAGContext from '../context';
import type { GraphPort, GraphNodeOutput } from '../types';
import type { HookService } from './protocol';
export declare class DefaultHookService extends DAGContext implements HookService {
    createPort(nodeId: string, codeName: string): Promise<GraphPort[]>;
    createResult(nodeId: string, codeName: string): Promise<GraphNodeOutput[]>;
}
//# sourceMappingURL=hooks.d.ts.map