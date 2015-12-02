var Track = window.Track = function (attributes) {
  this.name = attributes.name;
  this.roll = attributes.roll || [];
};

Track.prototype.startRecording = function () {
  this.roll = [];
  this.startTime = new Date();
};

Track.prototype.stopRecording = function () {
  var timeslice = new Date() - this.startTime;
  this.addNotes([]);
};

Track.prototype.addNotes = function (notes) {
    var timeslice = new Date() - this.startTime;
    this.roll.push({ timeslice: timeslice, notes: notes });
};


Track.prototype.parseNotes = function (currentFrame, currentNotes) {

    if (currentNotes.length === 0) {
      currentFrame.forEach(function (note) {
        KeyActions.keyPressed(note);
      });
    }

    if (currentFrame.length === 0) {
      currentNotes.forEach(function (note) {
        KeyActions.keyReleased(note);
      });
    }

  currentFrame.forEach(function (note) {

    for (var i = 0; i < currentNotes.length; i++) {
      var play = true;
      if (currentNotes[i] === note) {
        play = false;
      }

      if (play) {
        KeyActions.keyPressed(note);
      }
    }
  });
  
  currentNotes.forEach(function (note) {
    for (var i = 0; i < currentFrame.length; i++) {
      var stop = true;
      if (currentFrame[i] === note) {
        stop = false;
      }

      if(stop) {
        KeyActions.keyReleased(note);
      }
    }
  });
};

Track.prototype.play = function () {
  if (this.interval) {
    return;
  }

  var playbackStartTime = Date.now();
  var currentFrameIndex = 0;
  var currentNotes = [];
  var currentFrame = [];

  var intervalId = setInterval(function() {
    if (currentFrameIndex === this.roll.length) {
      this.interval = 0;
      clearInterval(intervalId);
    } else {

    this.interval = 10;
    if (this.roll[currentFrameIndex].timeslice < Date.now() - playbackStartTime ) {
      currentFrame = this.roll[currentFrameIndex].notes;
      currentNotes = KeyStore.all();
      currentFrameIndex++;
    } else {
      this.parseNotes(currentFrame, currentNotes);
    }
  }
  }.bind(this), this.interval);

};
