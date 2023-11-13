import RouteRecord from "./RouteRecord.js";

class Router {
  constructor(options) {
    // validate options
    this.#validateOptions(options);

    // initialize properties
    this.routes = (options.routes || []).map((r) => new RouteRecord(r));
    this.fallbackTemplate = options.fallbackTemplate || "";
    this.renderTarget = options.renderTarget || "#router-view";

    // bind public methods
    this.init = this.init.bind(this);
    this.push = this.push.bind(this);
    this.handleRouteChange = this.handleRouteChange.bind(this);
  }

  #validateOptions(options) {
    if (!options || typeof options !== "object") {
      throw new Error(`Invalid Router: constructor expects an object.`);
    }
    if (!["string", "undefined"].includes(typeof options.fallbackTemplate)) {
      throw new Error(
        `Invalid Router: 'fallbackTemplate' must be a string template (optional).`,
      );
    }
    if (!["string", "undefined"].includes(typeof options.renderTarget)) {
      throw new Error(
        `Invalid Router: 'renderTarget' must be a string selector ('#router-view' by default).`,
      );
    }
  }

  handleRouteChange() {
    const path = window.location.pathname;
    const matchRoute = this.#resolve(path);

    if (matchRoute) {
      this.#render(matchRoute);
    } else {
      this.#render(this.fallbackTemplate);
    }
  }

  #render(route) {
    if (!route) return;

    const target = document.querySelector(this.renderTarget);
    if (!target) return;

    if (typeof route.template === "function") {
      target.innerHTML = route.template(route.params);
    } else {
      target.innerHTML = route.template || "";
    }
  }

  #resolve(path) {
    for (const route of this.routes) {
      const params = route.match(path);
      if (params) {
        return { ...route, params };
      }
    }
    return null;
  }

  init() {
    window.onpopstate = this.handleRouteChange;
    window.router = this;
    this.handleRouteChange();
  }

  push(url) {
    history.pushState({}, '', url);
    this.handleRouteChange();
  }
}

export default Router;
