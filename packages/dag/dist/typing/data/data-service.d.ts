import DAGContext from '../context';
import type { GraphEdge, GraphNode } from '../types';
import type { DataService } from './protocol';
export declare class DefaultDataService extends DAGContext implements DataService {
    nodes: GraphNode[];
    edges: GraphEdge[];
    fetch(): Promise<{
        nodes: GraphNode[];
        edges: GraphEdge[];
    }>;
    get(): {
        nodes: GraphNode[];
        edges: GraphEdge[];
    };
    getNodes(): GraphNode[];
    getEdges(): GraphEdge[];
    addNodes(nodes: GraphNode[]): Promise<void>;
    addEdges(edges: GraphEdge[]): Promise<void>;
    removeNodesOrEdges(nodeIds: string[], edgeIds: string[]): Promise<void>;
    changeNode(changed: {
        nodeId: string;
        meta: Partial<GraphNode>;
    }[]): Promise<void>;
    changeEdge(changed: {
        edgeId: string;
        meta: Partial<GraphEdge>;
    }[]): Promise<void>;
    close(): void;
}
//# sourceMappingURL=data-service.d.ts.map