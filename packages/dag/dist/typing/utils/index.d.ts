import type { Edge, Node } from '@antv/x6';
export declare const validateConnection: (sourceNode: Node, targetNode: Node, sourceMagnet: Element, targetMagnet: Element, edges: Edge[]) => boolean;
export declare const splitNodeId: (nodeId: string) => {
    dagId: string;
    index: number;
};
export declare const splitPortId: (portId: string) => {
    nodeId: string;
    type: "input" | "output";
    index: number;
};
//# sourceMappingURL=index.d.ts.map