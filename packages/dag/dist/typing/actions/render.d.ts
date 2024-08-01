import type { Graph } from '@antv/x6';
import DAGContext from '../context';
import type { GraphNode, GraphEdge } from '../types';
import type { ActionProtocol } from './protocol';
import { ActionType } from './protocol';
export declare class RenderAction extends DAGContext implements ActionProtocol {
    type: ActionType;
    label: string;
    handle(graph: Graph): Promise<void>;
    createX6Node(node: GraphNode): Promise<{
        id: string;
        x: number;
        y: number;
        shape: string;
        data: {
            id: string;
            codeName: string;
            label: string;
            status: import("../types").NodeStatus;
            outputs: import("../types").GraphNodeOutput[];
            styles: {
                isOpaque?: boolean | undefined;
                isHighlighted?: boolean | undefined;
                isContinueRun?: boolean | undefined;
                nodeParties?: {
                    nodeId: string;
                    nodeName: string;
                }[] | undefined;
            } | undefined;
            nodeDef: any;
        };
        ports: import("../types").GraphPort[];
    }>;
    createX6Edge(edge: GraphEdge): {
        shape: string;
        id: string;
        source: {
            cell: string;
            port: string;
        };
        target: {
            cell: string;
            port: string;
        };
        data: {
            id: string;
            source: string;
            sourceAnchor: string;
            target: string;
            targetAnchor: string;
        };
        attrs: {
            line: {
                stroke: string;
                strokeWidth: number;
                targetMarker: null;
                opacity: number;
            };
        };
        zIndex: number;
    };
}
//# sourceMappingURL=render.d.ts.map