(function () {
  var AudioContext = window.AudioContext || window.webkitAudioContext;
  var ctx = new AudioContext();

  var createOscillator = function (freq, wave) {
  var osc = ctx.createOscillator();
  osc.type = wave;
  osc.frequency.value = freq;
  osc.detune.value = 0;
  osc.start(ctx.currentTime);
  return osc;
};

  var createGainNode = function () {
    var gainNode = ctx.createGain();
    gainNode.gain.value = 0;
    gainNode.connect(ctx.destination);
    return gainNode;
  };

  var Note = window.Note = function (freq, wave) {
    this.oscillatorNode = createOscillator(freq, wave);
    this.gainNode = createGainNode();
    this.oscillatorNode.connect(this.gainNode);
  };

  Note.prototype.start = function () {
    this.gainNode.gain.value = 0.3;
  };

  Note.prototype.stop = function () {
    this.gainNode.gain.value = 0;
  };

  Note.prototype.updateOptions = function (options) {
    this.oscillatorNode.type = options.wave;
    this.oscillatorNode.detune.value =
      options.chorus ? Math.floor( 30 * Math.random() ) - 15 : 0;
  };

})();
