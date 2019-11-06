window.events = (function () {
  function PubSub() {
  }
  PubSub.subscribe = function (eventName, func) {
      this.initDic(eventName);
      this.dic[eventName].push(func);
  };
  PubSub.unsubscribe = function (eventName, func) {
      this.initDic(eventName);
      this.dic[eventName] = this.dic[eventName].filter(function (x) { return x != func; });
      if (!this.dic[eventName].length) {
          delete this.dic[eventName];
      }
  };
  PubSub.publish = function (eventName, data) {
      this.initDic();
      if (this.dic[eventName])
          for (var _i = 0, _a = this.dic[eventName]; _i < _a.length; _i++) {
              var func = _a[_i];
              func(data);
          }
  };
  PubSub.initDic = function (eventName) {
      if (!this.dic) {
          this.dic = {};
      }
      if (eventName && !this.dic[eventName]) {
          this.dic[eventName] = [];
      }
  };
  PubSub.dic = null;

  return PubSub;
}());
