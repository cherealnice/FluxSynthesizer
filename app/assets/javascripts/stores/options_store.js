(function (root) {

  var _options = { wave: 'sine', chorus: false };

  var CHANGE_EVENT = 'change';

  root.OptionsStore = $.extend({}, EventEmitter.prototype, {

    all: function () {
      return _options;
    },

    addChangeHandler: function (callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeHandler: function (callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    _resetOptions: function (options) {
      _options = options;
    },

    dispatcherId: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
        case OrganConstants.RESET_OPTIONS:
          root.OptionsStore._resetOptions(payload.track.attributes.options);
          root.OptionsStore.emit(CHANGE_EVENT);
        break;
      }
    })
  });
})(this);
