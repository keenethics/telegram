import nanoid from 'nanoid';

export default class Store {
  constructor (store) {
    this.id = nanoid();
    this.subscriptions = [];

    this._storeKeys = Object.keys(store);

    this.store = new Proxy(store, {
      get: function (target, property) {
        return target[property];
      },

      set: function(target, key, value) {
        Object.assign(target, { [key]: value });
        return true;
      }
    });
  }

  _createSubscription(keys, callback) {
    const subscription = {
      id: nanoid(5),
      fields: keys,
      callback,
    };
    this.subscriptions.push(subscription);
    return subscription.id;
  }

  _removeSubscription(subId) {
    this.subscriptions = this.subscription.filter(s => s.id !== subId);
  }

  _callSubscriptions(fields) {
    for (let sIndex = 0; sIndex < this.subscriptions.length; sIndex++) {
      const sub = this.subscriptions[sIndex];
      if (sub.fields === null) {
        return sub.callback(Object.assign({}, this.store));
      }
      const intersectingFields = fields.filter(f => sub.keys.includes(f));

      if (intersectingFields.length > 0) {
        const updatedFields = {};
        for (let i = 0; i < intersectingFields.length; i++) {
          updatedFields[intersectingFields[i]] = this.store[intersectingFields[i]];
        }
        sub.callback(updatedFields);
      }
    }
  }

  _noKey (field) {
    let msg = 'You\'ve asked for non-existent fields';
    if (field) {
      msg = `Field ${field} doesn't exist in store`;
    }
    throw new Error(msg)
  }

  /**
   * Set's new value(s) to store.
   * Accepts 1 arg - object with key-value pair(s) to set
   * OR
   * Accepts 2 args - key and value
   */
  set (key, value = null) {
    // object passed
    if (value === null) {
      const keys = Object.keys(key);
      for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
        if (!this._storeKeys.includes(keys[keyIndex])) {
          this._noKey(keys[keyIndex]);
        }
        this.store[keys[keyIndex]] = key[keys[keyIndex]];
      }
      this._callSubscriptions(keys);
      return true;
    }

    if (!this._storeKeys.includes(key)) {
      this._noKey(key);
    }

    this.store[key] = value;
    this._callSubscriptions([key]);
    return true;
  }

  /**
   * Gets value of store by key or array of keys.
   * If no key specified - whole store is returned.
   */
  get (key = null) {
    if (typeof key === 'string') {
      if (!this._storeKeys.includes(key)) {
        this._noKey(key);
      }

      return this.store[key];
    }

    if (Array.isArray(key)) {
      if (!key.every(k => this._storeKeys.includes(k))) {
        this._noKey();
      }

      const res = {};
      for (let keyIndex = 0; keyIndex < key.length; keyIndex++) {
        res[key[keyIndex]] = this.store[key[keyIndex]];
      }
      return res;
    }
    

    return Object.assign({}, this.store);

    
  }

  /**
   * Subscribes to store updates, returns subscription ID.
   * @param {string|string[]|null} key - specifies field(s) to which you want to subscribe.
   * Default to null, which will call `callback` on every update.
   */
  subscribe (key = null, callback) {
    let subscribeTo = null;
    if (Array.isArray(key)) {
      subscribeTo = key;
    } else if (typeof key === 'string' && this._storeKeys.includes(key)) {
      subscribeTo = [key];
    }
    return this._createSubscription(subscribeTo, callback);
  }

  unsubscribe (subId) {
    if (!subId) {
      throw new Error('No subscription ID specified');
    }
    this._removeSubscription(subId);
    return true;
  }
}


/**
 * Function-wrapper aroung class-based components, that will manage subscriptions
 * @param {object} component - Instance of BaseComponent inheritor
 * @param {object} store - store instance
 * @param {string|string[]} fields - fields component should subscribe to
 */
export const withSubscription = (component, store, fields) => {
  // TODO check if component is an instance of BaseComponent class

  // additional props
  // (they will be passed to BaseComponent constructor by `super(props)`):
  // withSubscription {bool} - sets to true, will call BaseComponent's `updated` method
  // 

};