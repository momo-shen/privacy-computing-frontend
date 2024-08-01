"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  ActionType: () => ActionType,
  Actions: () => Actions,
  DAG: () => DAG,
  DAGGlobalContainer: () => DAGGlobalContainer,
  DefaultDataService: () => DefaultDataService,
  DefaultGraphManager: () => DefaultGraphManager,
  DefaultHookService: () => DefaultHookService,
  DefaultRequestService: () => DefaultRequestService,
  HotKeys: () => HotKeys,
  NodeStatus: () => NodeStatus,
  Portal: () => import_x6_react_shape2.Portal,
  Registry: () => import_utils3.Registry,
  ShapeRegister: () => import_x6_react_shape2.register,
  ShowMenuContext: () => ShowMenuContext,
  createAction: () => createAction,
  splitNodeId: () => splitNodeId,
  splitPortId: () => splitPortId,
  validateConnection: () => validateConnection
});
module.exports = __toCommonJS(src_exports);

// src/context.ts
var DAGContext = class {
  context;
  constructor(context) {
    this.context = context;
  }
};

// src/actions/protocol.ts
var ActionType = /* @__PURE__ */ ((ActionType2) => {
  ActionType2["render"] = "render";
  ActionType2["addNode"] = "addNode";
  ActionType2["addEdge"] = "addEdge";
  ActionType2["moveNode"] = "moveNode";
  ActionType2["removeCell"] = "removeCell";
  ActionType2["dragNode"] = "dragNode";
  ActionType2["updateEdge"] = "updateEdge";
  ActionType2["clearStatus"] = "clearStatus";
  ActionType2["queryStatus"] = "queryStatus";
  ActionType2["runAll"] = "runAll";
  ActionType2["runSingle"] = "runSingle";
  ActionType2["runDown"] = "runDown";
  ActionType2["runUp"] = "runUp";
  ActionType2["stopRun"] = "stopRun";
  ActionType2["stopAll"] = "stopAll";
  ActionType2["continueRun"] = "continueRun";
  ActionType2["copy"] = "copy";
  ActionType2["paste"] = "paste";
  ActionType2["zoomIn"] = "zoomIn";
  ActionType2["zoomOut"] = "zoomOut";
  ActionType2["zoomToFit"] = "zoomToFit";
  ActionType2["zoomToOrigin"] = "zoomToOrigin";
  ActionType2["zoomTo"] = "zoomTo";
  ActionType2["selectNode"] = "selectNode";
  ActionType2["toggleSelection"] = "toggleSelection";
  ActionType2["centerNode"] = "centerNode";
  ActionType2["showResult"] = "showResult";
  ActionType2["changeStyles"] = "changeStyles";
  ActionType2["changeNodeData"] = "changeNodeData";
  ActionType2["tidyLayout"] = "tidyLayout";
  ActionType2["changeStatus"] = "changeStatus";
  return ActionType2;
})(ActionType || {});

// src/actions/add-edge.ts
var AddEdgeAction = class extends DAGContext {
  type = "addEdge" /* addEdge */;
  label = "\u6DFB\u52A0\u8FB9";
  handle(graph, dagId, edge) {
    const sourceId = edge.getSourceCellId();
    const targetId = edge.getTargetCellId();
    const sourcePortId = edge.getSourcePortId();
    const targetPortId = edge.getTargetPortId();
    if (sourcePortId && targetPortId) {
      const edgeId = `${sourcePortId}__${targetPortId}`;
      const meta = {
        id: edgeId,
        source: sourceId,
        target: targetId,
        sourceAnchor: sourcePortId,
        targetAnchor: targetPortId
      };
      const realEdge = graph.createEdge({
        shape: "dag-edge",
        id: edgeId,
        source: {
          cell: sourceId,
          port: sourcePortId
        },
        target: {
          cell: targetId,
          port: targetPortId
        },
        data: {
          id: edge.id,
          source: sourceId,
          sourceAnchor: sourcePortId,
          target: targetId,
          targetAnchor: targetPortId
        },
        zIndex: -1
      });
      edge.remove();
      graph.addEdge(realEdge);
      this.context.dataService.addEdges([meta]);
    }
  }
};

// src/actions/add-node.ts
var AddNodeAction = class extends DAGContext {
  type = "addNode" /* addNode */;
  label = "\u6DFB\u52A0\u8282\u70B9";
  handle(graph, dagId, node) {
    const nodeData = node.getData();
    const pos = node.position();
    const meta = {
      id: nodeData.id,
      codeName: nodeData.codeName,
      label: nodeData.label,
      x: pos.x,
      y: pos.y,
      status: nodeData.status
    };
    this.context.dataService.addNodes([meta]);
  }
};

// src/actions/center-node.ts
var CenterNodeAction = class {
  type = "centerNode" /* centerNode */;
  label = "\u5C45\u4E2D";
  handle(graph, dagId, nodeId) {
    if (!nodeId) {
      graph.centerContent();
    } else {
      graph.centerCell(graph.getCellById(nodeId));
    }
  }
};

// src/actions/change-status.ts
var ChangeStatusAction = class {
  type = "changeStatus" /* changeStatus */;
  label = "\u6539\u53D8\u8282\u70B9\u72B6\u6001";
  handle(graph, dagId, node) {
    this.changeNodeStatus(node, graph);
  }
  changeNodeStatus(node, graph) {
    const { nodeId, status } = node;
    const graphNode = graph.getCellById(nodeId);
    if (node) {
      graphNode.setData({
        ...graphNode.getData(),
        status
      });
    }
  }
};

// src/actions/change-style.ts
var ChangeStylesAction = class {
  type = "changeStyles" /* changeStyles */;
  label = "\u6539\u53D8\u6837\u5F0F";
  timer = 0;
  handle(graph, dagId, nodeStyles) {
    this.changeNodesStyle(nodeStyles, graph);
  }
  changeNodesStyle(nodeStyles, graph) {
    nodeStyles?.forEach(({ nodeId, styles }) => {
      const node = graph.getCellById(nodeId);
      if (node) {
        node.setData({
          ...node.getData(),
          styles
        });
      }
    });
  }
};

// src/types/index.ts
var NodeStatus = /* @__PURE__ */ ((NodeStatus2) => {
  NodeStatus2[NodeStatus2["success"] = 0] = "success";
  NodeStatus2[NodeStatus2["running"] = 1] = "running";
  NodeStatus2[NodeStatus2["failed"] = 2] = "failed";
  NodeStatus2[NodeStatus2["pending"] = 3] = "pending";
  NodeStatus2[NodeStatus2["default"] = 4] = "default";
  NodeStatus2[NodeStatus2["stopped"] = 5] = "stopped";
  NodeStatus2[NodeStatus2["unfinished"] = 6] = "unfinished";
  return NodeStatus2;
})(NodeStatus || {});

// src/actions/clear-status.ts
var ClearStatusAction = class {
  type = "clearStatus" /* clearStatus */;
  label = "\u6E05\u9664\u8FD0\u884C\u72B6\u6001";
  handle(graph) {
    const nodes = graph.getNodes();
    nodes.forEach((node) => {
      node.setData({
        ...node.getData(),
        status: 4 /* default */
      });
    });
    const edges = graph.getEdges();
    edges.forEach((edge) => {
      edge.attr("line/strokeDasharray", "");
      edge.attr("line/style/animation", "");
    });
  }
};

// src/actions/copy.ts
var import_antd = require("antd");

// src/utils/platform.ts
var LANGUAGE_DEFAULT = "en";
var _isWindows = false;
var _isMacintosh = false;
var _isLinux = false;
var _isLinuxSnap = false;
var _isNative = false;
var _isWeb = false;
var _isIOS = false;
var _locale;
var _language = LANGUAGE_DEFAULT;
var _translationsConfigFile;
var _userAgent;
var _isIE = false;
var _isEdge = false;
var _isOpera = false;
var _isFirefox = false;
var _isWebKit = false;
var _isChrome = true;
var _isSafari = false;
var _isIPad = false;
var _globals = typeof self === "object" ? self : typeof global === "object" ? global : {};
var nodeProcess;
if (typeof process !== "undefined") {
  nodeProcess = process;
} else if (typeof _globals.vscode !== "undefined") {
  nodeProcess = _globals.vscode.process;
}
var isElectronRenderer = typeof nodeProcess?.versions?.electron === "string" && nodeProcess.type === "renderer";
var isElectronSandboxed = isElectronRenderer && nodeProcess?.sandboxed;
var browserCodeLoadingCacheStrategy = (() => {
  if (isElectronSandboxed) {
    return "bypassHeatCheck";
  }
  const env = nodeProcess?.env.ENABLE_VSCODE_BROWSER_CODE_LOADING;
  if (typeof env === "string") {
    if (env === "none" || env === "code" || env === "bypassHeatCheck" || env === "bypassHeatCheckAndEagerCompile") {
      return env;
    }
    return "bypassHeatCheck";
  }
  return void 0;
})();
if (typeof navigator === "object" && !isElectronRenderer) {
  _userAgent = navigator.userAgent;
  _isWindows = _userAgent.indexOf("Windows") >= 0;
  _isMacintosh = _userAgent.indexOf("Macintosh") >= 0;
  _isIOS = (_userAgent.indexOf("Macintosh") >= 0 || _userAgent.indexOf("iPad") >= 0 || _userAgent.indexOf("iPhone") >= 0) && !!navigator.maxTouchPoints && navigator.maxTouchPoints > 0;
  _isLinux = _userAgent.indexOf("Linux") >= 0;
  _isWeb = true;
  _locale = navigator.language;
  _language = _locale;
  _isIE = _userAgent.indexOf("Trident") >= 0;
  _isEdge = _userAgent.indexOf("Edge/") >= 0;
  _isOpera = _userAgent.indexOf("Opera") >= 0;
  _isFirefox = _userAgent.indexOf("Firefox") >= 0;
  _isWebKit = _userAgent.indexOf("AppleWebKit") >= 0;
  _isChrome = _userAgent.indexOf("Chrome") >= 0;
  _isSafari = _userAgent.indexOf("Chrome") === -1 && _userAgent.indexOf("Safari") >= 0;
  _isIPad = _userAgent.indexOf("iPad") >= 0;
} else if (typeof nodeProcess === "object") {
  _isWindows = nodeProcess.platform === "win32";
  _isMacintosh = nodeProcess.platform === "darwin";
  _isLinux = nodeProcess.platform === "linux";
  _isLinuxSnap = _isLinux && !!nodeProcess.env.SNAP && !!nodeProcess.env.SNAP_REVISION;
  _locale = LANGUAGE_DEFAULT;
  _language = LANGUAGE_DEFAULT;
  const rawNlsConfig = nodeProcess.env.VSCODE_NLS_CONFIG;
  if (rawNlsConfig) {
    try {
      const nlsConfig = JSON.parse(rawNlsConfig);
      const resolved = nlsConfig.availableLanguages["*"];
      _locale = nlsConfig.locale;
      _language = resolved || LANGUAGE_DEFAULT;
      _translationsConfigFile = nlsConfig._translationsConfigFile;
    } catch (e) {
    }
  }
  _isNative = true;
} else {
  console.error("Unable to resolve platform.");
}
var _platform = 0 /* Web */;
if (_isMacintosh) {
  _platform = 1 /* Mac */;
} else if (_isWindows) {
  _platform = 3 /* Windows */;
} else if (_isLinux) {
  _platform = 2 /* Linux */;
}
var isWindows = _isWindows;
var language = _language;
var Language;
((Language2) => {
  function value() {
    return language;
  }
  Language2.value = value;
  function isDefaultVariant() {
    if (language.length === 2) {
      return language === "en";
    }
    if (language.length >= 3) {
      return language[0] === "e" && language[1] === "n" && language[2] === "-";
    }
    return false;
  }
  Language2.isDefaultVariant = isDefaultVariant;
  function isDefault() {
    return language === "en";
  }
  Language2.isDefault = isDefault;
})(Language || (Language = {}));
var isBasicWasmSupported = typeof window.WebAssembly !== "undefined";

// src/actions/copy.ts
var copyActionHotKey = {
  key: isWindows ? "ctrl+c" : "cmd+c",
  text: isWindows ? "Ctrl C" : "\u2318 C"
};
var DAG_COPY_CONTENT = "DAG_COPY_CONTENT";
var CopyAction = class extends DAGContext {
  type = "copy" /* copy */;
  label = "\u590D\u5236";
  hotKey = copyActionHotKey;
  handle(graph, dagId, nodeIds = [], edgeIds = []) {
    const nodes = nodeIds.map((id) => graph.getCellById(id));
    const edges = edgeIds.map((id) => graph.getCellById(id));
    const nodesData = nodes.map((node) => node.getData());
    const edgesData = edges.filter((edge) => {
      const edgeData = edge.getData();
      return nodesData.find((node) => node.id === edgeData.source) && nodesData.find((node) => node.id === edgeData.target);
    });
    const data = {
      nodes: nodes.map((node) => node.toJSON()),
      edges: edgesData.map((edge) => edge.toJSON())
    };
    localStorage.setItem(DAG_COPY_CONTENT, JSON.stringify(data));
    const events = this.context.EventHub.getData();
    for (const event of events) {
      if (event.onCopyActionChange) {
        event.onCopyActionChange(true);
      }
    }
    import_antd.message.success("\u590D\u5236\u6210\u529F");
  }
};

// src/actions/drag-node.ts
var import_x6_plugin_dnd = require("@antv/x6-plugin-dnd");
var DragNodeAction = class extends DAGContext {
  type = "dragNode" /* dragNode */;
  label = "\u62D6\u62FD\u8282\u70B9";
  dnd = null;
  async handle(graph, dagId, nodeData, e) {
    if (!this.dnd) {
      this.dnd = new import_x6_plugin_dnd.Dnd({
        target: graph,
        getDragNode: (node2) => node2.clone({ keepId: true }),
        getDropNode: (node2) => node2.clone({ keepId: true })
      });
    }
    const maxNodeIndex = await this.context.requestService.getMaxNodeIndex(dagId);
    const nodeId = `${dagId}-node-${maxNodeIndex + 1}`;
    const { label, codeName, status } = nodeData;
    const outputs = await this.context.hookService.createResult(nodeId, codeName);
    const ports = await this.context.hookService.createPort(nodeId, codeName);
    const node = graph.createNode({
      id: nodeId,
      shape: "dag-node",
      ports,
      data: {
        id: nodeId,
        codeName,
        label,
        status: status || 4 /* default */,
        outputs
      }
    });
    this.dnd.start(node, e);
  }
  cancel() {
    if (this.dnd) {
      this.dnd.dispose();
      this.dnd = null;
    }
  }
};

// src/actions/move-node.ts
var MoveNodeAction = class extends DAGContext {
  type = "moveNode" /* moveNode */;
  label = "\u79FB\u52A8\u8282\u70B9";
  handle(graph, dagId, node) {
    const { x, y } = node.position();
    this.context.dataService.changeNode([
      {
        nodeId: node.id,
        meta: {
          x,
          y
        }
      }
    ]);
  }
};

// src/actions/paste.ts
var pasteActionHotKey = {
  key: isWindows ? "ctrl+v" : "cmd+v",
  text: isWindows ? "Ctrl V" : "\u2318 V"
};
var DAG_COPY_CONTENT2 = "DAG_COPY_CONTENT";
var PasteAction = class extends DAGContext {
  type = "paste" /* paste */;
  label = "\u7C98\u8D34";
  hotKey = pasteActionHotKey;
  async handle(graph, dagId) {
    const strDta = localStorage.getItem(DAG_COPY_CONTENT2);
    if (!strDta) {
      return;
    }
    const data = JSON.parse(strDta);
    const maxNodeIndex = await this.context.requestService.getMaxNodeIndex(dagId);
    const fixNodeIds = {};
    data.nodes.forEach((node, index) => {
      const nextNodeId = `${dagId}-node-${maxNodeIndex + index + 1}`;
      fixNodeIds[node.id] = nextNodeId;
      node.data.status = node.data.status === 6 /* unfinished */ ? 6 /* unfinished */ : 4 /* default */;
      const { x, y } = node.position;
      node.position = { x: x + 32, y: y + 32 };
    });
    let str = JSON.stringify(data);
    Object.keys(fixNodeIds).forEach((nodeId) => {
      str = str.replace(new RegExp(`"${nodeId}"`, "g"), `"${fixNodeIds[nodeId]}"`);
      str = str.replace(new RegExp(`${nodeId}-`, "g"), `${fixNodeIds[nodeId]}-`);
    });
    const fixedData = JSON.parse(str);
    graph.addNodes(fixedData.nodes, { dry: true });
    graph.addEdges(fixedData.edges, { dry: true });
    graph.resetSelection(fixedData.nodes.map((n) => n.id));
    const nodes = fixedData.nodes.map((node) => ({
      id: node.data.id,
      codeName: node.data.codeName,
      label: node.data.label,
      x: node.position.x,
      y: node.position.y,
      status: node.data.status === 6 /* unfinished */ ? 4 /* default */ : node.data.status,
      nodeDef: node.data.nodeDef
    }));
    await this.context.dataService.addNodes(nodes);
    await this.context.dataService.addEdges(
      fixedData.edges.map((edge) => ({
        id: edge.data.id,
        source: edge.data.source,
        target: edge.data.target,
        sourceAnchor: edge.data.sourceAnchor,
        targetAnchor: edge.data.targetAnchor
      }))
    );
    const events = this.context.EventHub.getData();
    for (const event of events) {
      if (event.onNodesPasted) {
        event.onNodesPasted(nodes);
      }
    }
  }
};

// src/actions/query-status.ts
var QueryStatusAction = class extends DAGContext {
  type = "queryStatus" /* queryStatus */;
  label = "\u67E5\u8BE2\u8FD0\u884C\u72B6\u6001";
  timer = 0;
  async handle(graph, dagId) {
    await this.queryStatus(graph, dagId);
  }
  cancel() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = 0;
    }
  }
  async queryStatus(graph, dagId) {
    const events = this.context.EventHub.getData();
    const { nodeStatus, finished } = await this.context.requestService.queryStatus(
      dagId
    );
    this.changeNodesStatus(nodeStatus, graph);
    const isRunning = !finished;
    if (isRunning) {
      this.timer = window.setTimeout(() => {
        this.queryStatus(graph, dagId);
      }, 2e3);
      for (const event of events) {
        if (event.onNodeRunning) {
          event.onNodeRunning(true);
        }
        if (event.onNodeStatusChanged) {
          event.onNodeStatusChanged(nodeStatus);
        }
      }
    } else {
      for (const event of events) {
        if (event.onNodeRunning) {
          event.onNodeRunning(false);
        }
        if (event.onNodeStatusChanged) {
          event.onNodeStatusChanged(nodeStatus);
        }
      }
    }
  }
  changeNodesStatus(nodeStatus, graph) {
    nodeStatus.forEach(({ nodeId, status }) => {
      const node = graph.getCellById(nodeId);
      if (node) {
        node.setData({
          ...node.getData(),
          status
        });
        const edges = graph.getIncomingEdges(nodeId);
        edges?.forEach((edge) => {
          const sourceNodeId = edge.getSourceCellId();
          if (sourceNodeId) {
            const sourceNode = nodeStatus.find((item) => item.nodeId === sourceNodeId);
            if (sourceNode && sourceNode.status === 0 /* success */) {
              this.changeEdgeStatus(graph, edge.id, status);
            }
          }
        });
      }
    });
  }
  changeEdgeStatus(graph, edgeId, status) {
    const edge = graph.getCellById(edgeId);
    if (edge) {
      if (status === 1 /* running */) {
        edge.attr("line/strokeDasharray", 5);
        edge.attr("line/stroke", "#1890ff");
        edge.attr("line/strokeWidth", "2");
        edge.attr("line/style/animation", "ant-line 30s infinite linear");
      } else if (status === 0 /* success */ || status === 2 /* failed */) {
        edge.attr("line/strokeDasharray", "");
        edge.attr("line/style/animation", "");
        edge.attr("line/strokeWidth", "1.5");
        edge.attr("line/stroke", "#c2c8d5");
      } else {
        edge.attr("line/strokeDasharray", "");
        edge.attr("line/style/animation", "");
        edge.attr("line/strokeWidth", "1");
        edge.attr("line/stroke", "#c2c8d5");
      }
    }
  }
};

// src/actions/remove-cell.ts
var removeCellActionHotKey = {
  key: ["delete", "backspace"],
  text: "Delete"
};
var RemoveCellAction = class extends DAGContext {
  type = "removeCell" /* removeCell */;
  label = "\u5220\u9664";
  hotKey = removeCellActionHotKey;
  handle(graph, dagId, nodeIds = [], edgeIds = []) {
    nodeIds.forEach((nodeId) => {
      const node = graph.getCellById(nodeId);
      if (node) {
        const connectedEdges = graph.getConnectedEdges(node);
        connectedEdges.forEach((c) => {
          edgeIds.push(c.id);
        });
      }
    });
    if (nodeIds.length > 0 || edgeIds.length > 0) {
      graph.removeCells([...nodeIds, ...edgeIds]);
      this.context.dataService.removeNodesOrEdges(nodeIds, edgeIds);
    }
  }
};

// src/actions/render.ts
var RenderAction = class extends DAGContext {
  type = "render" /* render */;
  label = "render";
  async handle(graph) {
    const { nodes, edges } = await this.context.dataService.fetch();
    if (nodes.length > 0)
      graph.drawBackground();
    graph.clearCells();
    const x6Nodes = await Promise.all(
      nodes.map(async (node) => await this.createX6Node(node))
    );
    const x6Edges = edges.map((edge) => this.createX6Edge(edge));
    graph.addNodes(x6Nodes, { dry: true });
    graph.addEdges(x6Edges, { dry: true });
    graph.zoomToFit({ maxScale: 1, minScale: 0.6 });
    graph.centerContent();
  }
  async createX6Node(node) {
    const outputs = await this.context.hookService.createResult(node.id, node.codeName);
    const ports = await this.context.hookService.createPort(node.id, node.codeName);
    return {
      id: node.id,
      x: node.x,
      y: node.y,
      shape: "dag-node",
      data: {
        id: node.id,
        codeName: node.codeName,
        label: node.label,
        status: node.status,
        outputs,
        styles: node.styles,
        nodeDef: node.nodeDef
      },
      ports
    };
  }
  createX6Edge(edge) {
    return {
      shape: "dag-edge",
      id: edge.id,
      source: {
        cell: edge.source,
        port: edge.sourceAnchor
      },
      target: {
        cell: edge.target,
        port: edge.targetAnchor
      },
      data: {
        id: edge.id,
        source: edge.source,
        sourceAnchor: edge.sourceAnchor,
        target: edge.target,
        targetAnchor: edge.targetAnchor
      },
      attrs: {
        line: {
          stroke: "#C2C8D5",
          strokeWidth: 1,
          targetMarker: null,
          opacity: edge?.styles?.isOpaque ? 0.25 : 1
        }
      },
      zIndex: -1
    };
  }
};

// src/actions/run-all.ts
var RunAllAction = class extends DAGContext {
  type = "runAll" /* runAll */;
  label = "\u5168\u90E8\u8FD0\u884C";
  handle = async (graph, dagId) => {
    const nodeIds = graph.getNodes().map((node) => node.id);
    return await this.context.requestService.startRun(dagId, nodeIds);
  };
};

// src/actions/run-down.ts
var runDownActionHotKey = {
  key: isWindows ? "ctrl+down" : "cmd+down",
  text: isWindows ? "Ctrl \u2193" : "\u2318 \u2193"
};
var RunDownAction = class extends DAGContext {
  type = "runDown" /* runDown */;
  label = "\u5F00\u59CB\u6267\u884C";
  hotKey = runDownActionHotKey;
  handle = async (graph, dagId, nodeId) => {
    if (!nodeId || nodeId.length === 0)
      return;
    const events = this.context.EventHub.getData();
    for (const event of events) {
      if (event.onBlankClick) {
        event.onBlankClick();
      }
    }
    const nodeIds = this.getSubGraph(graph, nodeId[0]);
    this.context.requestService.startRun(dagId, Array.from(nodeIds));
  };
  getSubGraph(graph, nodeId, nodeIds = /* @__PURE__ */ new Set()) {
    nodeIds.add(nodeId);
    const outgoingEdges = graph.getOutgoingEdges(nodeId);
    outgoingEdges?.forEach((edge) => {
      const data = edge.getData();
      const { target } = data;
      this.getSubGraph(graph, target, nodeIds);
    });
    return nodeIds;
  }
};

// src/actions/run-single.ts
var runSingleActionHotKey = {
  key: "enter",
  text: "Enter"
};
var RunSingleAction = class extends DAGContext {
  type = "runSingle" /* runSingle */;
  label = "\u6267\u884C\u5355\u8282\u70B9";
  hotKey = runSingleActionHotKey;
  handle = async (graph, dagId, nodeIds) => {
    if (!nodeIds || nodeIds.length === 0)
      return;
    const events = this.context.EventHub.getData();
    for (const event of events) {
      if (event.onBlankClick) {
        event.onBlankClick();
      }
    }
    await this.context.requestService.startRun(dagId, nodeIds);
  };
};

// src/actions/run-up.ts
var runUpActionHotKey = {
  key: isWindows ? "ctrl+up" : "cmd+up",
  text: isWindows ? "Ctrl \u2191" : "\u2318 \u2191"
};
var RunUpAction = class extends DAGContext {
  type = "runUp" /* runUp */;
  label = "\u6267\u884C\u5230\u6B64";
  hotKey = runUpActionHotKey;
  handle = async (graph, dagId, nodeId) => {
    if (!nodeId || nodeId.length === 0)
      return;
    const events = this.context.EventHub.getData();
    for (const event of events) {
      if (event.onBlankClick) {
        event.onBlankClick();
      }
    }
    const nodeIds = this.getSuperGraph(graph, nodeId[0]);
    await this.context.requestService.startRun(dagId, Array.from(nodeIds));
  };
  getSuperGraph(graph, nodeId, nodeIds = /* @__PURE__ */ new Set()) {
    nodeIds.add(nodeId);
    const incomingEdges = graph.getIncomingEdges(nodeId);
    incomingEdges?.forEach((edge) => {
      const data = edge.getData();
      const { source } = data;
      this.getSuperGraph(graph, source, nodeIds);
    });
    return nodeIds;
  }
};

// src/actions/select-node.ts
var SelectNodeAction = class {
  type = "selectNode" /* selectNode */;
  label = "\u9009\u62E9";
  handle(graph, dagId, nodeId) {
    graph.resetSelection(nodeId);
  }
};

// src/actions/show-result.ts
var ShowResultAction = class extends DAGContext {
  type = "showResult" /* showResult */;
  label = "\u5C55\u793A\u7ED3\u679C";
  async handle(graph, dagId, outputId, codeName) {
    const events = this.context.EventHub.getData();
    for (const event of events) {
      if (event.onResultClick) {
        event.onResultClick(dagId, outputId, codeName);
      }
    }
  }
};

// src/actions/stop-all.ts
var StopAllAction = class extends DAGContext {
  type = "stopAll" /* stopAll */;
  label = "\u505C\u6B62\u5168\u90E8";
  handle = async (graph, dagId, nodeId) => {
    return await this.context.requestService.stopRun(dagId);
  };
};

// src/actions/stop-run.ts
var StopRunAction = class extends DAGContext {
  type = "stopRun" /* stopRun */;
  label = "\u505C\u6B62\u6267\u884C";
  handle = async (graph, dagId, nodeId) => {
    await this.context.requestService.stopRun(dagId, nodeId);
  };
};

// src/actions/continue-run.ts
var ContinueRunAction = class extends DAGContext {
  type = "continueRun" /* continueRun */;
  label = "\u7EE7\u7EED\u6267\u884C";
  handle = async (graph, dagId, nodeId) => {
    await this.context.requestService.continueRun(dagId, nodeId);
  };
};

// src/actions/tidy-layout.ts
var import_layout = require("@antv/layout");
var tidyLayoutActionHotKey = {
  key: isWindows ? "ctrl+l" : "cmd+l",
  text: isWindows ? "Ctrl L" : "\u2318 L"
};
var TidyLayoutAction = class extends DAGContext {
  type = "tidyLayout" /* tidyLayout */;
  label = "\u4E00\u952E\u6574\u7406";
  hotKey = tidyLayoutActionHotKey;
  handle = (graph, dagId) => {
    const dargeLayout = new import_layout.DagreLayout({
      type: "dagre",
      ranksep: 35,
      nodesep: 15,
      nodeSize: [180, 36]
    });
    const model = {
      nodes: [],
      edges: []
    };
    const nodes = graph.getNodes();
    const edges = graph.getEdges();
    nodes.forEach((node) => {
      model.nodes.push(node.getData());
    });
    edges.forEach((edge) => {
      model.edges.push(edge.getData());
    });
    dargeLayout.layout(model);
    model.nodes.forEach((node) => {
      const { id } = node;
      const graphNode = graph.getCellById(id);
      if (graphNode && graphNode.isNode()) {
        graphNode.position(node.x, node.y);
      }
    });
    graph.zoomToFit({ maxScale: 1, minScale: 0.2 });
    graph.centerContent();
    this.context.requestService.saveDag(dagId, model);
  };
};

// src/actions/toggle-selection.ts
var toggleSelectionActionHotKey = {
  key: "",
  text: "Shift + \u9F20\u6807\u5DE6\u952E"
};
var ToggleSelectionAction = class {
  type = "toggleSelection" /* toggleSelection */;
  label = "\u5207\u6362\u6846\u9009\u72B6\u6001";
  hotKey = toggleSelectionActionHotKey;
  rubberband = false;
  handle = (graph) => {
    return this.toggeleSelection(graph);
  };
  toggeleSelection(graph) {
    if (this.rubberband) {
      this.disableSelection(graph);
    } else {
      this.enableSelection(graph);
    }
    return this.rubberband;
  }
  enableSelection = (graph) => {
    graph.disablePanning();
    graph.setRubberbandModifiers(null);
    this.rubberband = true;
  };
  disableSelection = (graph) => {
    graph.enablePanning();
    graph.setRubberbandModifiers("shift");
    this.rubberband = false;
  };
};

// src/actions/update-node-data.ts
var ChangeNodeDataAction = class extends DAGContext {
  type = "changeNodeData" /* changeNodeData */;
  label = "\u6539\u53D8\u8282\u70B9\u53C2\u6570";
  handle(graph, dagId, nodeId, option) {
    if (graph) {
      const node = graph.getCellById(nodeId);
      if (!node)
        return;
      this.context.dataService.changeNode([
        {
          nodeId: node.id,
          meta: option
        }
      ]);
      node.setData(
        {
          ...node.getData(),
          ...option
        },
        { overwrite: true, silent: true }
      );
    }
  }
};

// src/actions/zoom-in.ts
var zoomInActionHotKey = {
  key: isWindows ? "ctrl+=" : "cmd+=",
  text: isWindows ? "Ctrl +" : "\u2318 +"
};
var ZoomInAction = class {
  type = "zoomIn" /* zoomIn */;
  label = "\u653E\u5927";
  hotKey = zoomInActionHotKey;
  handle(graph) {
    const zoom = graph.zoom();
    if (zoom < 1.5) {
      graph.zoom(0.25);
    }
    return graph.zoom();
  }
};

// src/actions/zoom-out.ts
var zoomOutActionHotKey = {
  key: isWindows ? "ctrl+-" : "cmd+-",
  text: isWindows ? "Ctrl -" : "\u2318 -"
};
var ZoomOutAction = class {
  type = "zoomOut" /* zoomOut */;
  label = "\u7F29\u5C0F";
  hotKey = zoomOutActionHotKey;
  handle(graph) {
    const zoom = graph.zoom();
    if (zoom > 0.5) {
      graph.zoom(-0.25);
    }
    return graph.zoom();
  }
};

// src/actions/zoom-to.ts
var ZoomToAction = class {
  type = "zoomTo" /* zoomTo */;
  label = "\u7F29\u653E\u81F3";
  handle(graph, dagId, zoom) {
    graph.zoomTo(zoom);
    return graph.zoom();
  }
};

// src/actions/zoom-to-fit.ts
var zoomToFitActionHotKey = {
  key: isWindows ? "ctrl+p" : "cmd+p",
  text: isWindows ? "Ctrl P" : "\u2318 P"
};
var ZoomToFitAction = class {
  type = "zoomToFit" /* zoomToFit */;
  label = "\u81EA\u9002\u5E94\u7A97\u53E3\u5927\u5C0F";
  hotKey = zoomToFitActionHotKey;
  handle = (graph) => {
    graph.zoomToFit({ maxScale: 1 });
    return graph.zoom();
  };
};

// src/actions/zoom-to-origin.ts
var zoomToOriginActionHotKey = {
  key: isWindows ? "ctrl+o" : "cmd+o",
  text: isWindows ? "Ctrl O" : "\u2318 O"
};
var ZoomToOriginAction = class {
  type = "zoomToOrigin" /* zoomToOrigin */;
  label = "\u5B9E\u9645\u50CF\u7D20\u5C55\u793A";
  hotKey = zoomToOriginActionHotKey;
  handle(graph) {
    graph.zoomTo(1);
    return graph.zoom();
  }
};

// src/actions/index.ts
var Actions = [
  AddEdgeAction,
  AddNodeAction,
  ClearStatusAction,
  CopyAction,
  DragNodeAction,
  MoveNodeAction,
  PasteAction,
  QueryStatusAction,
  RemoveCellAction,
  RenderAction,
  RunAllAction,
  RunDownAction,
  RunSingleAction,
  RunUpAction,
  StopRunAction,
  ContinueRunAction,
  ZoomInAction,
  ZoomOutAction,
  SelectNodeAction,
  ZoomToFitAction,
  ZoomToOriginAction,
  CenterNodeAction,
  ToggleSelectionAction,
  ZoomToAction,
  ShowResultAction,
  ChangeStylesAction,
  StopAllAction,
  TidyLayoutAction,
  ChangeNodeDataAction,
  ChangeStatusAction
];
var HotKeys = {
  copyActionHotKey,
  pasteActionHotKey,
  removeCellActionHotKey,
  runDownActionHotKey,
  runSingleActionHotKey,
  runUpActionHotKey,
  toggleSelectionActionHotKey,
  zoomInActionHotKey,
  zoomOutActionHotKey,
  zoomToFitActionHotKey,
  zoomToOriginActionHotKey,
  tidyLayoutActionHotKey
};
function createAction(action, context) {
  return new action(context);
}

// src/manager/graph-manager.ts
var import_x6 = require("@antv/x6");
var import_x6_plugin_keyboard = require("@antv/x6-plugin-keyboard");
var import_x6_plugin_selection = require("@antv/x6-plugin-selection");

// src/utils/index.ts
var validateConnection = (sourceNode, targetNode, sourceMagnet, targetMagnet, edges) => {
  if (!sourceMagnet || sourceMagnet.getAttribute("port-group") === "top") {
    return false;
  }
  if (!targetMagnet || targetMagnet.getAttribute("port-group") !== "top") {
    return false;
  }
  const port = targetMagnet.getAttribute("port");
  if (edges.find((edge) => edge.getTargetPortId() === port)) {
    return false;
  }
  let res = true;
  const sourcePortId = sourceMagnet.getAttribute("port");
  const sourcePortType = sourceNode.getPort(sourcePortId)?.type;
  const targetPortId = targetMagnet.getAttribute("port");
  const targetPortType = targetNode.getPort(targetPortId)?.type;
  for (const sourceType of sourcePortType) {
    if (targetPortType.indexOf(sourceType) < 0) {
      res = false;
      break;
    }
  }
  return res;
};
var splitNodeId = (nodeId) => {
  const list = nodeId.split("-");
  if (list.length !== 3) {
    throw new Error("invalid node id");
  }
  return {
    dagId: list[0],
    index: parseInt(list[2], 10)
  };
};
var splitPortId = (portId) => {
  const list = portId.split("-");
  if (list.length !== 5) {
    throw new Error("invalid port id");
  }
  const nodeId = list.slice(0, 3).join("-");
  return {
    nodeId,
    type: list[3],
    index: parseInt(list[4], 10)
  };
};

// src/manager/graph-manager.ts
var DefaultGraphManager = class extends DAGContext {
  dagId = null;
  graph = null;
  init(dagId, graphConfig, mode = "FULL", ...args) {
    this.dagId = dagId;
    if (this.graph) {
      this.graph.dispose();
      this.graph = null;
    }
    if (!this.graph) {
      this.initGraph(graphConfig);
      if (mode === "FULL") {
        this.initPlugins();
        this.initHotKeys();
      }
      this.initEvents(mode);
      this.executeAction(["render" /* render */, "queryStatus" /* queryStatus */]);
    }
  }
  initGraph(graphConfig) {
    this.graph = new import_x6.Graph({
      width: 1e3,
      height: 800,
      panning: {
        enabled: true,
        eventTypes: ["leftMouseDown", "mouseWheel"]
      },
      mousewheel: {
        enabled: true,
        modifiers: "ctrl",
        factor: 1.1,
        maxScale: 1.5,
        minScale: 0.5
      },
      highlighting: {
        magnetAvailable: {
          name: "stroke",
          args: {
            attrs: {
              fill: "#fff",
              stroke: "#A4DEB1",
              "stroke-width": 4
            }
          }
        },
        magnetAdsorbed: {
          name: "stroke",
          args: {
            attrs: {
              fill: "#fff",
              stroke: "#31d0c6",
              "stroke-width": 4
            }
          }
        }
      },
      connecting: {
        snap: {
          radius: 50
        },
        allowBlank: false,
        allowLoop: false,
        highlight: true,
        connector: "dag-connector",
        connectionPoint: "anchor",
        anchor: "center",
        validateMagnet({ magnet }) {
          return magnet.getAttribute("port-group") !== "top";
        },
        validateConnection({ sourceCell, targetCell, sourceMagnet, targetMagnet }) {
          return validateConnection(
            sourceCell,
            targetCell,
            sourceMagnet,
            targetMagnet,
            this.getEdges()
          );
        },
        createEdge() {
          return this.createEdge({
            shape: "dag-edge",
            attrs: {
              line: {
                strokeDasharray: "5 5"
              }
            },
            zIndex: -1
          });
        }
      },
      ...graphConfig
    });
  }
  initPlugins = () => {
    if (this.graph) {
      this.graph.use(
        new import_x6_plugin_keyboard.Keyboard({
          global: false
        })
      );
      this.graph.use(
        new import_x6_plugin_selection.Selection({
          enabled: true,
          multiple: true,
          rubberEdge: true,
          rubberNode: true,
          modifiers: "shift",
          rubberband: true
        })
      );
    }
  };
  initHotKeys = () => {
    const actionIsRun = ["runDown" /* runDown */, "runUp" /* runUp */, "runSingle" /* runSingle */];
    const actionWithoutSelection = ["tidyLayout" /* tidyLayout */];
    if (this.graph && this.dagId) {
      const actions = this.context.ActionHub.getData();
      for (const item of actions) {
        if (item.hotKey) {
          const { key } = item.hotKey;
          if (key) {
            this.graph.bindKey(key, (e) => {
              const nodeIds = this.graph?.getSelectedCells().filter((cell) => cell.isNode()).map((cell) => cell.id);
              const edgeIds = this.graph?.getSelectedCells().filter((cell) => cell.isEdge()).map((cell) => cell.id);
              e.preventDefault();
              if (this.graph) {
                const events = this.context.EventHub.getData();
                for (const event of events) {
                  if (event.onBlankClick) {
                    event.onBlankClick();
                  }
                }
                if (actionWithoutSelection.includes(item.type)) {
                  item.handle(this.graph, this.dagId);
                  return;
                }
                item.handle(this.graph, this.dagId, nodeIds, edgeIds);
                if (actionIsRun.includes(item.type)) {
                  setTimeout(() => {
                    this.executeAction("queryStatus" /* queryStatus */);
                  }, 1500);
                }
              }
            });
          }
        }
      }
    }
  };
  initEvents(mode = "FULL") {
    if (!this.graph) {
      return;
    }
    this.graph.on("node:click", ({ node }) => {
      const events = this.context.EventHub.getData();
      for (const event of events) {
        if (event.onNodeClick) {
          event.onNodeClick(node);
        }
      }
    });
    this.graph.on("blank:click", () => {
      const events = this.context.EventHub.getData();
      for (const event of events) {
        if (event.onBlankClick) {
          event.onBlankClick();
        }
      }
    });
    this.graph.on("scale", () => {
      if (this.graph) {
        const events = this.context.EventHub.getData();
        for (const event of events) {
          if (event.onGraphScale) {
            event.onGraphScale(this.graph.zoom());
          }
        }
      }
    });
    this.graph.on("node:added", ({ node, options }) => {
      if (options.dry) {
        return;
      }
      this.executeAction("addNode" /* addNode */, node);
    });
    if (mode === "LITE")
      return;
    this.graph.on("edge:removed", ({ edge }) => {
      const events = this.context.EventHub.getData();
      for (const event of events) {
        if (event.onEdgeRemoved) {
          event.onEdgeRemoved(edge);
        }
      }
    });
    this.graph.on("edge:connected", ({ edge }) => {
      this.executeAction("addEdge" /* addEdge */, edge);
      const events = this.context.EventHub.getData();
      for (const event of events) {
        if (event.onEdgeConnected) {
          event.onEdgeConnected(edge);
        }
      }
    });
    this.graph.on("node:added", () => {
      this.graph?.drawBackground();
    });
    this.graph.on("node:moved", ({ node }) => {
      this.executeAction("moveNode" /* moveNode */, node);
    });
    this.graph.on("selection:changed", ({ selected }) => {
      const events = this.context.EventHub.getData();
      for (const event of events) {
        if (event.onSelectionChanged) {
          event.onSelectionChanged(selected);
        }
      }
    });
    this.graph.on("edge:mouseenter", ({ cell, e }) => {
      if (!this.graph) {
        return;
      }
      const edge = cell;
      const edgeView = edge.findView(this.graph);
      const { sourceAnchor, targetAnchor } = edgeView;
      const { clientX, clientY } = e;
      const p = this.graph.clientToLocal(clientX, clientY);
      if (p.distance(sourceAnchor) < 10 || p.distance(targetAnchor) < 10) {
        return;
      }
      cell.addTools([
        {
          name: "button-remove",
          args: {
            distance: 0.5,
            onClick: ({ view }) => {
              this.executeAction("removeCell" /* removeCell */, [], [view.cell.id]);
            }
          }
        },
        {
          name: "source-arrowhead",
          args: {
            tagName: "circle",
            attrs: {
              r: 4,
              fill: "#52c41a",
              stroke: "#52c41a"
            }
          }
        },
        {
          name: "target-arrowhead",
          args: {
            tagName: "circle",
            attrs: {
              r: 4,
              fill: "#52c41a",
              stroke: "#52c41a"
            }
          }
        }
      ]);
    });
    this.graph.on("edge:mouseleave", ({ cell }) => {
      cell.removeTools();
    });
    this.graph.on("edge:change:source", ({ edge, current }) => {
      const item = current;
      if (item && item.cell && item.port) {
        this.executeAction("updateEdge" /* updateEdge */, edge);
      }
    });
    this.graph.on("edge:change:target", ({ edge, current }) => {
      const item = current;
      if (item && item.cell && item.port) {
        this.executeAction("updateEdge" /* updateEdge */, edge);
      }
    });
  }
  async executeAction(type, ...args) {
    const actions = this.context.ActionHub.getData();
    for (const item of actions) {
      if (this.dagId) {
        if (Array.isArray(type)) {
          if (type.includes(item.type)) {
            await item.handle(this.graph, this.dagId, ...args);
          }
        } else {
          if (type === item.type) {
            return await item.handle(this.graph, this.dagId, ...args);
          }
        }
      }
    }
  }
  getActionInfo(type) {
    const actions = this.context.ActionHub.getData();
    for (const item of actions) {
      if (item.type === type) {
        return {
          label: item.label,
          hotKey: item.hotKey
        };
      }
    }
    return null;
  }
  cancelAction(type) {
    const actions = this.context.ActionHub.getData();
    for (const item of actions) {
      if (item.type === type && item.cancel) {
        return item.cancel();
      }
    }
  }
  cancelAllAction() {
    const actions = this.context.ActionHub.getData();
    for (const item of actions) {
      if (item.cancel) {
        item.cancel();
      }
    }
  }
  getGraphInstance() {
    return this.graph;
  }
  getSelectedCells() {
    if (this.graph) {
      return this.graph.getSelectedCells();
    }
    return [];
  }
  dispose() {
    if (this.graph) {
      this.graph.dispose();
      this.context.dataService.close();
      this.cancelAllAction();
      this.graph = null;
      this.dagId = null;
    }
  }
};

// src/request/request.ts
var DefaultRequestService = class extends DAGContext {
  async queryStatus(dagId) {
    return {
      nodeStatus: [
        {
          nodeId: "test-node-1",
          status: 0 /* success */
        },
        {
          nodeId: "test-node-2",
          status: 1 /* running */
        }
      ],
      finished: false
    };
  }
  async queryDag(dagId) {
    return {
      nodes: [
        // {
        //   codeName: 'ss_sgd_train',
        //   id: 'test_node_1',
        //   label: '逻辑回归',
        //   x: 100,
        //   y: 100,
        //   status: 0,
        // },
        // {
        //   codeName: 'ss_sgd_predict',
        //   id: 'test_node_2',
        //   label: '模型预测',
        //   x: 300,
        //   y: 300,
        //   status: 2,
        // },
      ],
      edges: [
        // {
        //   id: 'test_node_1_output_0__test_node_2_input_0',
        //   source: 'test_node_1',
        //   sourceAnchor: 'test_node_1_output_0',
        //   target: 'test_node_2',
        //   targetAnchor: 'test_node_2_input_0',
        // },
      ]
    };
  }
  async saveDag(dagId, model) {
    return;
  }
  async startRun(dagId, componentIds) {
    return;
  }
  async stopRun(dagId, componentId) {
    return;
  }
  async continueRun(dagId, componentId) {
    return;
  }
  async getMaxNodeIndex(dagId) {
    return 2;
  }
};

// src/hooks/hooks.ts
var DefaultHookService = class extends DAGContext {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createPort(nodeId, codeName) {
    return [];
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createResult(nodeId, codeName) {
    return [];
  }
};

// src/data/data-service.ts
var DefaultDataService = class extends DAGContext {
  nodes = [];
  edges = [];
  async fetch() {
    const { nodes, edges } = await this.context.requestService.queryDag(
      this.context.dagId
    );
    this.nodes = nodes;
    this.edges = edges;
    return {
      nodes,
      edges
    };
  }
  get() {
    return {
      nodes: this.nodes,
      edges: this.edges
    };
  }
  getNodes() {
    return this.nodes;
  }
  getEdges() {
    return this.edges;
  }
  async addNodes(nodes) {
    this.nodes.push(...nodes);
    await this.context.requestService.saveDag(this.context.dagId, {
      nodes: this.nodes,
      edges: this.edges
    });
  }
  async addEdges(edges) {
    this.edges.push(...edges);
    await this.context.requestService.saveDag(this.context.dagId, {
      nodes: this.nodes,
      edges: this.edges
    });
  }
  async removeNodesOrEdges(nodeIds, edgeIds) {
    this.nodes = this.nodes.filter((node) => !nodeIds.includes(node.id));
    this.edges = this.edges.filter((edge) => !edgeIds.includes(edge.id));
    this.context.requestService.saveDag(this.context.dagId, {
      nodes: this.nodes,
      edges: this.edges
    });
  }
  async changeNode(changed) {
    changed.forEach(({ nodeId, meta }) => {
      const node = this.nodes.find((item) => item.id === nodeId);
      if (node) {
        Object.keys(meta).forEach((key) => {
          const str = key;
          node[str] = meta[str];
        });
      }
    });
    this.context.requestService.saveDag(this.context.dagId, {
      nodes: this.nodes,
      edges: this.edges
    });
  }
  async changeEdge(changed) {
    changed.forEach(({ edgeId, meta }) => {
      const edge = this.edges.find((item) => item.id === edgeId);
      if (edge) {
        Object.keys(meta).forEach((key) => {
          const str = key;
          edge[str] = meta[str];
        });
      }
    });
    this.context.requestService.saveDag(this.context.dagId, {
      nodes: this.nodes,
      edges: this.edges
    });
  }
  close() {
    this.nodes = [];
    this.edges = [];
  }
};

// src/shapes/node.tsx
var import_icons3 = require("@ant-design/icons");
var import_x6_react_components = require("@antv/x6-react-components");
var import_x6_react_shape = require("@antv/x6-react-shape");
var import_antd4 = require("antd");
var import_style = require("@antv/x6-react-components/es/dropdown/style/index.css");
var import_style2 = require("@antv/x6-react-components/es/menu/style/index.css");
var import_classnames = __toESM(require("classnames"));
var import_react = __toESM(require("react"));

// src/shapes/descriptions.tsx
var import_icons = require("@ant-design/icons");
var import_antd3 = require("antd");

// src/component/ellipsis-middle/index.tsx
var import_antd2 = require("antd");
var import_jsx_runtime = require("react/jsx-runtime");
var { Text } = import_antd2.Typography;
var EllipsisMiddles = (props) => {
  const {
    suffixCount,
    children,
    maxWidth,
    className,
    onClick,
    style,
    showTip = true
  } = props;
  let start;
  let suffix;
  if (children && children?.length > suffixCount) {
    start = children?.slice(0, children?.length - suffixCount)?.trim();
    suffix = children?.slice(-suffixCount)?.trim();
  } else {
    start = children;
    suffix = "";
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    Text,
    {
      onClick,
      className,
      style: {
        ...style,
        maxWidth,
        width: "100%",
        minWidth: `${suffixCount + 2}em`
      },
      ellipsis: {
        suffix,
        tooltip: showTip ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children }) : null
      },
      children: start
    }
  );
};

// src/shapes/descriptions.tsx
var import_index = require("./index-EL43OVMQ.less");

// src/shapes/utils.ts
var parseNodeId = (nodeId) => {
  const list = nodeId.split("-");
  if (list.length !== 3) {
    throw new Error("invalid node id");
  }
  return {
    dagId: list[0],
    nodeNum: parseInt(list[2], 10)
  };
};

// src/shapes/descriptions.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var { Paragraph } = import_antd3.Typography;
var statusColorEnum = /* @__PURE__ */ ((statusColorEnum2) => {
  statusColorEnum2["success"] = "success";
  statusColorEnum2["error"] = "error";
  statusColorEnum2["default"] = "default";
  return statusColorEnum2;
})(statusColorEnum || {});
var Description = (props) => {
  const { dagContext } = props;
  const { id, status, outputs, codeName, showContinueRun } = props.data;
  const { nodeNum } = parseNodeId(id);
  let statusDes = "";
  let statusColor = "";
  if (status === 0 /* success */) {
    statusDes = "\u6210\u529F";
    statusColor = "success" /* success */;
  } else if (status === 2 /* failed */) {
    statusDes = "\u5931\u8D25";
    statusColor = "error" /* error */;
  } else if (status === 1 /* running */) {
    statusDes = "\u6267\u884C\u4E2D";
  } else if (status === 3 /* pending */) {
    statusDes = "\u5DF2\u63D0\u4EA4";
  } else if (status === 4 /* default */) {
    statusDes = "\u5DF2\u914D\u7F6E";
  } else if (status === 5 /* stopped */) {
    statusDes = "\u5DF2\u505C\u6B62";
  } else if (status === 6 /* unfinished */) {
    statusDes = "\u5F85\u914D\u7F6E";
    statusColor = "default" /* default */;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "description", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "bottom", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "copy", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: "\u7EC4\u4EF6ID\uFF1A" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        Paragraph,
        {
          copyable: {
            text: id,
            tooltips: ["\u590D\u5236", "\u590D\u5236\u6210\u529F"]
          },
          style: { marginBottom: 0, color: "#000000a6", fontSize: 12 },
          children: nodeNum
        }
      ) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { marginBottom: "4px" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: "\u6267\u884C\u72B6\u6001\uFF1A" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { children: [
        statusColor && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          import_antd3.Badge,
          {
            status: statusColorEnum[statusColor]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { style: { marginLeft: "4px" }, children: statusDes })
      ] }),
      showContinueRun && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ContinueRunItem, { ...props }) })
    ] }),
    status === 0 /* success */ && outputs && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { marginBottom: "4px" }, children: "\u6267\u884C\u7ED3\u679C\uFF1A" }),
      outputs.map((output) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        ResultItem,
        {
          output,
          codeName,
          dagContext
        },
        output.id
      ))
    ] })
  ] }) });
};
var resultInfo = {
  table: { text: "\u8F93\u51FA\u8868", icon: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_icons.FileTextOutlined, {}) },
  model: { text: "\u6A21\u578B", icon: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_icons.ExperimentOutlined, {}) },
  rule: { text: "\u89C4\u5219", icon: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_icons.ContainerOutlined, {}) },
  report: { text: "\u62A5\u544A", icon: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_icons.FileSearchOutlined, {}) }
};
var ResultItem = (props) => {
  const { output, codeName, dagContext } = props;
  const { name, type } = output;
  const onResultClicked = (e) => {
    e.stopPropagation();
    dagContext.graphManager.executeAction("showResult" /* showResult */, output.id, codeName);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "resultItem", onClick: onResultClicked, children: [
    resultInfo[type]?.icon,
    resultInfo[type]?.text && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "title", children: [
      resultInfo[type].text,
      "\uFF1A"
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_antd3.Tooltip, { title: name, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(EllipsisMiddles, { className: "elllips", maxWidth: 130, suffixCount: 3, children: name }) })
  ] });
};
var ContinueRunItem = (props) => {
  const { dagContext } = props;
  const { id } = props.data;
  const onContinueRun = (e) => {
    e.stopPropagation();
    dagContext.graphManager.executeAction("continueRun" /* continueRun */, id);
    setTimeout(() => {
      dagContext.graphManager.executeAction("queryStatus" /* queryStatus */, []);
    }, 1500);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { onClick: onContinueRun, className: "continueRunBtn", children: "\u7EE7\u7EED\u6267\u884C" });
};

// src/shapes/node.tsx
var import_index2 = require("./index-EL43OVMQ.less");

// src/shapes/node-icon.tsx
var import_icons2 = require("@ant-design/icons");
var import_jsx_runtime3 = require("react/jsx-runtime");
var ComponentIcons = {
  default: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_icons2.DatabaseFilled, { style: { color: "#A1AABC" } }),
  stats: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_icons2.PieChartFilled, { style: { color: "#A1AABC" } }),
  preprocessing: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_icons2.LayoutFilled, { style: { color: "#A1AABC" } }),
  feature: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_icons2.LayoutFilled, { style: { color: "#A1AABC" } }),
  control: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_icons2.CodeFilled, { style: { color: "#A1AABC" } }),
  "ml.train": /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_icons2.BulbFilled, { style: { color: "#A1AABC" } }),
  "ml.eval": /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_icons2.FundFilled, { style: { color: "#A1AABC" } })
};

// src/shapes/node.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var { Item: MenuItem, Divider } = import_x6_react_components.Menu;
var ShowMenuContext = import_react.default.createContext(true);
var DagNode = (props) => {
  const { node, graph } = props;
  const DAGContext2 = DAGGlobalContainer.get(graph);
  const graphManager = DAGContext2?.graphManager;
  const data = node.getData();
  const { id, status, label, codeName, styles } = data;
  const statusName = NodeStatus[status];
  const [domain] = codeName.split("/");
  const {
    isOpaque = false,
    isHighlighted = false,
    isContinueRun = false
  } = styles || {};
  const showMenu = import_react.default.useContext(ShowMenuContext);
  const getStatusFlag = () => {
    switch (status) {
      case 0 /* success */:
        return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_icons3.CheckCircleOutlined, { style: { color: "rgba(35,182,95,1)" } });
      case 2 /* failed */:
        return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_icons3.CloseCircleOutlined, { style: { color: "rgba(252,117,116,1)" } });
      case 5 /* stopped */:
        return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_icons3.PoweroffOutlined, { style: { color: "rgba(252,117,116,1)" } });
      case 1 /* running */:
        return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_icons3.SyncOutlined, { style: { color: "#1890FF" }, spin: true });
      case 3 /* pending */:
        return null;
      default:
        return null;
    }
  };
  const onMenuItemClick = (key) => {
    const argsIsArrayKey = ["removeCell" /* removeCell */, "copy" /* copy */];
    const argsIsRun = ["runDown" /* runDown */, "runUp" /* runUp */, "runSingle" /* runSingle */];
    const argsIsContinue = ["continueRun" /* continueRun */];
    if (argsIsArrayKey.includes(key)) {
      graphManager.executeAction(key, [id]);
    } else if (argsIsRun.includes(key)) {
      graphManager.executeAction(key, [id]);
      setTimeout(() => {
        graphManager.executeAction("queryStatus" /* queryStatus */, []);
      }, 1500);
    } else if (argsIsContinue.includes(key)) {
      graphManager.executeAction(key, id);
      setTimeout(() => {
        graphManager.executeAction("queryStatus" /* queryStatus */, []);
      }, 1500);
    } else {
      graphManager.executeAction(key, id);
    }
  };
  const showContinueRun = showMenu && (data.status === 5 /* stopped */ || data.status === 2 /* failed */) && isContinueRun;
  const getMenuItems = () => {
    const menu = /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
      import_x6_react_components.Menu,
      {
        hasIcon: true,
        onClick: (key) => onMenuItemClick(key),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            MenuItem,
            {
              name: "copy" /* copy */,
              icon: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_icons3.CopyOutlined, {}),
              hotkey: HotKeys.copyActionHotKey.text,
              text: "\u590D\u5236"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            MenuItem,
            {
              name: "removeCell" /* removeCell */,
              icon: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_icons3.DeleteOutlined, {}),
              hotkey: HotKeys.removeCellActionHotKey.text,
              text: "\u5220\u9664"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Divider, {}),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            MenuItem,
            {
              name: "runDown" /* runDown */,
              icon: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_icons3.LogoutOutlined, {}),
              hotkey: HotKeys.runDownActionHotKey.text,
              text: "\u4ECE\u6B64\u5904\u5F00\u59CB\u6267\u884C"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            MenuItem,
            {
              name: "runUp" /* runUp */,
              icon: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_icons3.LoginOutlined, {}),
              hotkey: HotKeys.runUpActionHotKey.text,
              text: "\u6267\u884C\u5230\u6B64\u5904"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            MenuItem,
            {
              name: "runSingle" /* runSingle */,
              icon: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_icons3.PlayCircleOutlined, {}),
              hotkey: HotKeys.runSingleActionHotKey.text,
              text: "\u6267\u884C\u8282\u70B9"
            }
          ),
          data.status === 1 /* running */ && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(MenuItem, { name: "stopRun" /* stopRun */, icon: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_icons3.StopOutlined, {}), text: "\u505C\u6B62\u6267\u884C" }),
          showContinueRun && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            MenuItem,
            {
              name: "continueRun" /* continueRun */,
              icon: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_icons3.SyncOutlined, {}),
              text: "\u7EE7\u7EED\u6267\u884C"
            }
          )
        ]
      }
    );
    return menu;
  };
  return showMenu ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    import_x6_react_components.Dropdown,
    {
      overlay: getMenuItems(),
      trigger: ["contextMenu"],
      overlayStyle: { overflowY: "auto" },
      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        import_antd4.Popover,
        {
          trigger: "hover",
          content: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Description, { data: { ...data, showContinueRun }, dagContext: DAGContext2 }),
          placement: "bottom",
          arrow: false,
          overlayClassName: "popover",
          overlayStyle: { width: 258 },
          destroyTooltipOnHide: true,
          children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: (0, import_classnames.default)(["dag-node", statusName]), children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "icon", children: ComponentIcons[domain] || ComponentIcons["default"] }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "label", children: label }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "status", children: getStatusFlag() })
          ] })
        }
      )
    }
  ) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    import_antd4.Popover,
    {
      trigger: "hover",
      content: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Description, { data: { ...data, showContinueRun }, dagContext: DAGContext2 }),
      placement: "bottom",
      arrow: false,
      overlayClassName: "popover",
      overlayStyle: { width: 258 },
      destroyTooltipOnHide: true,
      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: (0, import_classnames.default)(
            ["dag-node", statusName],
            { opaque: isOpaque },
            { hightlight: isHighlighted }
          ),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "icon", children: ComponentIcons[domain] || ComponentIcons["default"] }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "label", children: label }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "status", children: getStatusFlag() })
          ]
        }
      )
    }
  );
};
(0, import_x6_react_shape.register)({
  shape: "dag-node",
  width: 180,
  height: 36,
  component: DagNode,
  effect: ["data"],
  inherit: "react-shape",
  ports: {
    groups: {
      top: {
        position: "top",
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: "#C2C8D5",
            strokeWidth: 1,
            fill: "#fff"
          }
        }
      },
      bottom: {
        position: "bottom",
        markup: [
          {
            tagName: "circle",
            selector: "outer"
          },
          {
            tagName: "circle",
            selector: "inner"
          }
        ],
        attrs: {
          outer: {
            r: 10,
            magnet: true,
            stroke: "transparent",
            fill: "transparent"
          },
          inner: {
            r: 4,
            magnet: true,
            stroke: "#C2C8D5",
            strokeWidth: 1,
            fill: "#fff"
          }
        }
      }
    }
  }
});

// src/shapes/edge.ts
var import_x62 = require("@antv/x6");
import_x62.Graph.registerEdge(
  "dag-edge",
  {
    inherit: "edge",
    attrs: {
      line: {
        stroke: "#C2C8D5",
        strokeWidth: 1,
        targetMarker: null
      }
    },
    zIndex: -1
  },
  true
);

// src/shapes/connector.ts
var import_x63 = require("@antv/x6");
import_x63.Graph.registerConnector(
  "dag-connector",
  (s, e) => {
    const offset = 4;
    const deltaY = Math.abs(e.y - s.y);
    const control = Math.floor(deltaY / 3 * 2);
    const v1 = { x: s.x, y: s.y + offset + control };
    const v2 = { x: e.x, y: e.y - offset - control };
    return import_x63.Path.normalize(
      `M ${s.x} ${s.y}
     L ${s.x} ${s.y + offset}
     C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${e.x} ${e.y - offset}
     L ${e.x} ${e.y}
    `
    );
  },
  true
);

// src/index.ts
var import_x6_react_shape2 = require("@antv/x6-react-shape");
var import_utils3 = require("@secretflow/utils");
var DAGGlobalContainer = /* @__PURE__ */ new WeakMap();
var DAG = class {
  dagId = "";
  requestService = new DefaultRequestService(this);
  hookService = new DefaultHookService(this);
  dataService = new DefaultDataService(this);
  graphManager = new DefaultGraphManager(this);
  ActionHub = (0, import_utils3.createRegistry)();
  EventHub = (0, import_utils3.createRegistry)();
  constructor() {
    Actions.forEach((Action) => {
      this.ActionHub.register(new Action(this));
    });
  }
  init(dagId, graphConfig, mode = "FULL", ...args) {
    this.dagId = dagId;
    this.graphManager.init(dagId, graphConfig, mode, ...args);
    if (this.graphManager.graph) {
      DAGGlobalContainer.set(this.graphManager.graph, this);
    }
  }
  addActions(actions) {
    actions.forEach((Action) => {
      this.ActionHub.register(createAction(Action, this));
    });
  }
  addGraphEvents(event) {
    this.EventHub.register(event);
  }
  dispose() {
    if (this.graphManager.graph) {
      DAGGlobalContainer.delete(this.graphManager.graph);
    }
    this.graphManager.dispose();
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ActionType,
  Actions,
  DAG,
  DAGGlobalContainer,
  DefaultDataService,
  DefaultGraphManager,
  DefaultHookService,
  DefaultRequestService,
  HotKeys,
  NodeStatus,
  Portal,
  Registry,
  ShapeRegister,
  ShowMenuContext,
  createAction,
  splitNodeId,
  splitPortId,
  validateConnection
});
//# sourceMappingURL=index.cjs.js.map