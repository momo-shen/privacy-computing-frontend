declare const _exports: any;
export = _exports;
export var ActionType: any;
export var Actions: ({
    new (): {
        type: string;
        label: string;
        handle(graph: any, dagId: any, nodeId: any): void;
    };
} | {
    new (context: any): {
        type: string;
        label: string;
        handle(graph: any, dagId: any, nodeId: any, option: any): void;
        context: any;
    };
})[];
export var DAG: {
    new (): {
        dagId: string;
        requestService: {
            queryStatus(dagId: any): Promise<{
                nodeStatus: {
                    nodeId: string;
                    status: number;
                }[];
                finished: boolean;
            }>;
            queryDag(dagId: any): Promise<{
                nodes: never[];
                edges: never[];
            }>;
            saveDag(dagId: any, model: any): Promise<void>;
            startRun(dagId: any, componentIds: any): Promise<void>;
            stopRun(dagId: any, componentId: any): Promise<void>;
            continueRun(dagId: any, componentId: any): Promise<void>;
            getMaxNodeIndex(dagId: any): Promise<number>;
            context: any;
        };
        hookService: {
            createPort(nodeId: any, codeName: any): Promise<never[]>;
            createResult(nodeId: any, codeName: any): Promise<never[]>;
            context: any;
        };
        dataService: {
            nodes: any[];
            edges: any[];
            fetch(): Promise<{
                nodes: any;
                edges: any;
            }>;
            get(): {
                nodes: any[];
                edges: any[];
            };
            getNodes(): any[];
            getEdges(): any[];
            addNodes(nodes: any): Promise<void>;
            addEdges(edges: any): Promise<void>;
            removeNodesOrEdges(nodeIds: any, edgeIds: any): Promise<void>;
            changeNode(changed: any): Promise<void>;
            changeEdge(changed: any): Promise<void>;
            close(): void;
            context: any;
        };
        graphManager: {
            dagId: null;
            graph: null;
            init(dagId: any, graphConfig: any, mode?: string, ...args: any[]): void;
            initGraph(graphConfig: any): void;
            initPlugins: () => void;
            initHotKeys: () => void;
            initEvents(mode?: string): void;
            executeAction(type: any, ...args: any[]): Promise<any>;
            getActionInfo(type: any): {
                label: any;
                hotKey: any;
            } | null;
            cancelAction(type: any): any;
            cancelAllAction(): void;
            getGraphInstance(): null;
            getSelectedCells(): any;
            dispose(): void;
            context: any;
        };
        ActionHub: any;
        EventHub: any;
        init(dagId: any, graphConfig: any, mode?: string, ...args: any[]): void;
        addActions(actions: any): void;
        addGraphEvents(event: any): void;
        dispose(): void;
    };
};
export var DAGGlobalContainer: WeakMap<object, any>;
export var DefaultDataService: {
    new (context: any): {
        nodes: any[];
        edges: any[];
        fetch(): Promise<{
            nodes: any;
            edges: any;
        }>;
        get(): {
            nodes: any[];
            edges: any[];
        };
        getNodes(): any[];
        getEdges(): any[];
        addNodes(nodes: any): Promise<void>;
        addEdges(edges: any): Promise<void>;
        removeNodesOrEdges(nodeIds: any, edgeIds: any): Promise<void>;
        changeNode(changed: any): Promise<void>;
        changeEdge(changed: any): Promise<void>;
        close(): void;
        context: any;
    };
};
export var DefaultGraphManager: {
    new (context: any): {
        dagId: null;
        graph: null;
        init(dagId: any, graphConfig: any, mode?: string, ...args: any[]): void;
        initGraph(graphConfig: any): void;
        initPlugins: () => void;
        initHotKeys: () => void;
        initEvents(mode?: string): void;
        executeAction(type: any, ...args: any[]): Promise<any>;
        getActionInfo(type: any): {
            label: any;
            hotKey: any;
        } | null;
        cancelAction(type: any): any;
        cancelAllAction(): void;
        getGraphInstance(): null;
        getSelectedCells(): any;
        dispose(): void;
        context: any;
    };
};
export var DefaultHookService: {
    new (context: any): {
        createPort(nodeId: any, codeName: any): Promise<never[]>;
        createResult(nodeId: any, codeName: any): Promise<never[]>;
        context: any;
    };
};
export var DefaultRequestService: {
    new (context: any): {
        queryStatus(dagId: any): Promise<{
            nodeStatus: {
                nodeId: string;
                status: number;
            }[];
            finished: boolean;
        }>;
        queryDag(dagId: any): Promise<{
            nodes: never[];
            edges: never[];
        }>;
        saveDag(dagId: any, model: any): Promise<void>;
        startRun(dagId: any, componentIds: any): Promise<void>;
        stopRun(dagId: any, componentId: any): Promise<void>;
        continueRun(dagId: any, componentId: any): Promise<void>;
        getMaxNodeIndex(dagId: any): Promise<number>;
        context: any;
    };
};
export namespace HotKeys {
    export { copyActionHotKey };
    export { pasteActionHotKey };
    export { removeCellActionHotKey };
    export { runDownActionHotKey };
    export { runSingleActionHotKey };
    export { runUpActionHotKey };
    export { toggleSelectionActionHotKey };
    export { zoomInActionHotKey };
    export { zoomOutActionHotKey };
    export { zoomToFitActionHotKey };
    export { zoomToOriginActionHotKey };
    export { tidyLayoutActionHotKey };
}
export var NodeStatus: any;
export var ShowMenuContext: any;
export function createAction(action: any, context: any): any;
export function splitNodeId(nodeId: any): {
    dagId: any;
    index: number;
};
export function splitPortId(portId: any): {
    nodeId: any;
    type: any;
    index: number;
};
export function validateConnection(sourceNode: any, targetNode: any, sourceMagnet: any, targetMagnet: any, edges: any): boolean;
declare namespace copyActionHotKey {
    const key: string;
    const text: string;
}
declare namespace pasteActionHotKey {
    const key_1: string;
    export { key_1 as key };
    const text_1: string;
    export { text_1 as text };
}
declare namespace removeCellActionHotKey {
    const key_2: string[];
    export { key_2 as key };
    const text_2: string;
    export { text_2 as text };
}
declare namespace runDownActionHotKey {
    const key_3: string;
    export { key_3 as key };
    const text_3: string;
    export { text_3 as text };
}
declare namespace runSingleActionHotKey {
    const key_4: string;
    export { key_4 as key };
    const text_4: string;
    export { text_4 as text };
}
declare namespace runUpActionHotKey {
    const key_5: string;
    export { key_5 as key };
    const text_5: string;
    export { text_5 as text };
}
declare namespace toggleSelectionActionHotKey {
    const key_6: string;
    export { key_6 as key };
    const text_6: string;
    export { text_6 as text };
}
declare namespace zoomInActionHotKey {
    const key_7: string;
    export { key_7 as key };
    const text_7: string;
    export { text_7 as text };
}
declare namespace zoomOutActionHotKey {
    const key_8: string;
    export { key_8 as key };
    const text_8: string;
    export { text_8 as text };
}
declare namespace zoomToFitActionHotKey {
    const key_9: string;
    export { key_9 as key };
    const text_9: string;
    export { text_9 as text };
}
declare namespace zoomToOriginActionHotKey {
    const key_10: string;
    export { key_10 as key };
    const text_10: string;
    export { text_10 as text };
}
declare namespace tidyLayoutActionHotKey {
    const key_11: string;
    export { key_11 as key };
    const text_11: string;
    export { text_11 as text };
}
//# sourceMappingURL=index.cjs.d.ts.map