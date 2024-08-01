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
export {
  Emitter,
  Future,
  Registry,
  createRegistry
};
//# sourceMappingURL=index.esm.js.map