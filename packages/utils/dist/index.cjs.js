"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Emitter: () => Emitter,
  Future: () => Future,
  Registry: () => Registry,
  createRegistry: () => createRegistry
});
module.exports = __toCommonJS(src_exports);

// src/future.ts
var Future = class {
  awaitable;
  setResult;
  setException;
  _status = "pending";
  constructor() {
    this.awaitable = new Promise((resolve, reject) => {
      this.setResult = resolve;
      this.setException = reject;
    });
    this.then = this.awaitable.then.bind(this.awaitable);
    this.catch = this.awaitable.catch.bind(this.awaitable);
    this.finally = this.awaitable.finally.bind(this.awaitable);
  }
  done = () => this._status !== "pending";
  get status() {
    return this._status;
  }
  set status(s) {
    if (this.done()) {
      return;
    }
    this._status = s;
  }
  fulfill = (value) => {
    this.setResult(value);
    this.status = "fulfilled";
  };
  reject = (reason) => {
    this.setException(reason);
    this.status = "rejected";
  };
  then;
  catch;
  finally;
  get [Symbol.toStringTag]() {
    return `[Future ${this._status}]`;
  }
};

// src/emitter.ts
var Emitter = class {
  eventHandlers = [];
  on = (handler) => {
    this.eventHandlers.push(handler);
  };
  fire = (data) => {
    this.eventHandlers.forEach((evt) => {
      evt(data);
    });
  };
  dispose() {
    this.eventHandlers = [];
  }
};

// src/registry.ts
var Registry = class {
  data = /* @__PURE__ */ new Set();
  register(instance) {
    if (!this.data.has(instance)) {
      this.data.add(instance);
    }
  }
  unRegister(instance) {
    if (this.data.has(instance)) {
      this.data.delete(instance);
    }
  }
  getData = () => {
    return [...this.data];
  };
};
function createRegistry() {
  return new Registry();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Emitter,
  Future,
  Registry,
  createRegistry
});
//# sourceMappingURL=index.cjs.js.map