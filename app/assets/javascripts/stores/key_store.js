(function (root) {

  var _keys = [];
  var CHANGE_EVENT = 'change';

  root.KeyStore = $.extend({}, EventEmitter.prototype, {

    addChangeHandler: function (callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeHandler: function (callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    changed: function () {
      this.emit(CHANGE_EVENT);
    },

    all: function () {
      return _keys.slice();
    },

    create: function (note) {
      var included = _keys.some(function (_note) {
        return _note === note;
      });

      if (!included) {
        _keys.push(note);
        KeyStore.changed();
      }
    },

    destroy: function (note) {
      var idx = _keys.indexOf(note);
      if (idx >= 0) {
        _keys.splice(idx, 1);
        KeyStore.changed();
      }
    },

    _groupUpdate: function (keys) {
      _keys = keys.slice();
      this.emit(CHANGE_EVENT);
    },

    dispatcherId: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
        case KeyConstants.KEY_PRESSED:
          KeyStore.create(payload.note);
          break;
        case KeyConstants.KEY_RELEASED:
          KeyStore.destroy(payload.note);
          break;
        case OrganConstants.GROUP_UPDATE:
          root.KeyStore._groupUpdate(payload.notes);
          break;
      }
    })
  });
})(this);
