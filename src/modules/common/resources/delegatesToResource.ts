export class DelegatesToResource {
  tmpResource: Record<string, unknown>;
  proxy: this;

  constructor(resource) {
    if (!(resource instanceof Object)) {
      resource = {};
    }

    this.tmpResource = resource;

    this.proxy = new Proxy(this, {
      get(target, property) {
        if (target[property]) {
          return target[property];
        }

        if (resource[property]) {
          return resource[property];
        }

        return undefined;
      },
    });

    return this.proxy;
  }
}
