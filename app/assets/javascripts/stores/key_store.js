(function (root) {
  "use strict";

  var _keys = [];
  var CHANGE_EVENT = 'change';
  var KeyStore = root.KeyStore = $.extend({}, EventEmitter.prototype);


  KeyStore.addChangeHandler = function (callback) {
    this.on(CHANGE_EVENT, callback);
  };

  KeyStore.removeChangeHandler = function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  };

  KeyStore.changed = function () {
    this.emit(CHANGE_EVENT);
  };

  KeyStore.all = function () {
    return _keys.slice();
  };

  KeyStore.dispatcherId = AppDispatcher.register(function (payload) {
    switch (payload.eventType) {
      case KeyConstants.KEY_PRESSED:
        KeyStore.create(payload.note);
        break;
      case KeyConstants.KEY_RELEASED:
        KeyStore.destroy(payload.note);
        break;
    }
  });

  KeyStore.create = function (note) {
    var included = _keys.some(function (_note) {
      return _note === note;
    });

    if (!included) {
      _keys.push(note);
      KeyStore.changed();
    }
  };

  KeyStore.destroy = function (note) {
    var idx = _keys.indexOf(note);
    if (idx >= 0) {
      _keys.splice(idx, 1);
      KeyStore.changed();
    }
  };

})(this);
