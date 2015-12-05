(function (root) {

  var _options = { wave: 'sine', chorus: false, octave: 5 };

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

    _resetOptions: function (options, octave) {
      _options.wave = options.wave;
      _options.chorus = options.chorus;
      _options.octave = octave;
    },

    dispatcherId: AppDispatcher.register(function (payload) {
      switch (payload.actionType) {
        case OrganConstants.RESET_OPTIONS:
          options = payload.track.attributes.options;
          octave = payload.track.attributes.octave;
          root.OptionsStore._resetOptions(options, octave);
          root.OptionsStore.emit(CHANGE_EVENT);
        break;
      }
    })
  });
})(this);
