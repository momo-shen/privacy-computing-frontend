import { AddEdgeAction } from './add-edge';
import { AddNodeAction } from './add-node';
import { CenterNodeAction } from './center-node';
import { ChangeStatusAction } from './change-status';
import { ChangeStylesAction } from './change-style';
import { CopyAction } from './copy';
import { DragNodeAction } from './drag-node';
import type { DAGProtocol } from './protocol';
import type { ActionFactory } from './protocol';
import { RemoveCellAction } from './remove-cell';
import { StopAllAction } from './stop-all';
import { ChangeNodeDataAction } from './update-node-data';
import { ZoomToAction } from './zoom-to';
export * from './protocol';
export declare const Actions: (typeof AddEdgeAction | typeof AddNodeAction | typeof CenterNodeAction | typeof ChangeStatusAction | typeof ChangeStylesAction | typeof CopyAction | typeof DragNodeAction | typeof RemoveCellAction | typeof StopAllAction | typeof ChangeNodeDataAction | typeof ZoomToAction)[];
export declare const HotKeys: {
    copyActionHotKey: {
        key: string;
        text: string;
    };
    pasteActionHotKey: {
        key: string;
        text: string;
    };
    removeCellActionHotKey: {
        key: string[];
        text: string;
    };
    runDownActionHotKey: {
        key: string;
        text: string;
    };
    runSingleActionHotKey: {
        key: string;
        text: string;
    };
    runUpActionHotKey: {
        key: string;
        text: string;
    };
    toggleSelectionActionHotKey: {
        key: string;
        text: string;
    };
    zoomInActionHotKey: {
        key: string;
        text: string;
    };
    zoomOutActionHotKey: {
        key: string;
        text: string;
    };
    zoomToFitActionHotKey: {
        key: string;
        text: string;
    };
    zoomToOriginActionHotKey: {
        key: string;
        text: string;
    };
    tidyLayoutActionHotKey: {
        key: string;
        text: string;
    };
};
export declare function createAction(action: ActionFactory, context: DAGProtocol): import("./protocol").ActionProtocol;
//# sourceMappingURL=index.d.ts.map