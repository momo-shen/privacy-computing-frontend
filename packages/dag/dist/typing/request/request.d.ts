import DAGContext from '../context';
import type { GraphModel } from '../types';
import { NodeStatus } from '../types';
import type { RequestService } from './protocol';
export declare class DefaultRequestService extends DAGContext implements RequestService {
    queryStatus(dagId: string): Promise<{
        nodeStatus: {
            nodeId: string;
            status: NodeStatus;
        }[];
        finished: boolean;
    }>;
    queryDag(dagId: string): Promise<GraphModel>;
    saveDag(dagId: string, model: GraphModel): Promise<void>;
    startRun(dagId: string, componentIds: string[]): Promise<void>;
    stopRun(dagId: string, componentId?: string): Promise<void>;
    continueRun(dagId: string, componentId?: string): Promise<void>;
    getMaxNodeIndex(dagId: string): Promise<number>;
}
//# sourceMappingURL=request.d.ts.map