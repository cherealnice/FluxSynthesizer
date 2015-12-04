function Track(attrs) {
  var defaults = {
    name: "",
    roll: []
  };

  this.attributes = $.extend(defaults, attrs || {});
}

Track.prototype = {
  addNotes: function (notes) {
    var timeSlice = { time: this._timeDelta() };
    if (notes.length > 0) {
      timeSlice.notes = notes;
    }
    this.attributes.roll.push(timeSlice);
  },

  completeRecording: function () {
    this.addNotes([]);
  },

  get: function (attr) {
    return this.attributes[attr];
  },

  isBlank: function () {
    return this.attributes.roll.length === 0;
  },

  play: function () {
    if (this.interval) { return; }

    var currentNote = 0,
        playBackStartTime = Date.now(),
        roll = this.attributes.roll,
        delta;

    this.interval = setInterval(function () {

      if (currentNote < roll.length) {
        delta = Date.now() - playBackStartTime;

        if (delta >= roll[currentNote].time) {
          var notes = roll[currentNote].notes || [];
          KeyActions.groupUpdate(notes);
          currentNote++;
        }
      } else {
        clearInterval(this.interval);
        delete this.interval;
      }
    }.bind(this), 20);
  },

  set: function (attr, val) {
    this.attributes[attr] = val;
  },

  save: function (options) {
    this.attributes.options = options;
    if (this.isBlank()) {
      throw "track can't be blank!";
    } else if (this.attributes.name === "") {
      throw "name can't be blank!";
    } else {
      TrackActions.createTrack(this.attributes);
    }
  },

  startRecording: function () {
    this.attributes.roll = [];
    this.start = Date.now();
  },

  _timeDelta: function () {
    return Date.now() - this.start;
  }
};
