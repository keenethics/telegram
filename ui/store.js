import nanoid from 'nanoid';

export default class Store {
  constructor (store) {
    const id = nanoid();
    this.id = id;

    this.store = new Proxy(store, {
      get: function (target, property) {
        return target[property];
      },
      set: function (target, key, value) {
        Object.assign(target, { [key]: value });
        window.events.publish(`${id}-${key}`);

        return true;
      }
    });
  }

  set (key, value) {
    this.store[key] = value;
  }

  get (key) {
    if (key) return this.store[key];

    return Object.assign({}, this.store);
  }

  subscribe (key, callback) {
    window.events.subscribe(`${this.id}-${key}`, callback);
  }
}
