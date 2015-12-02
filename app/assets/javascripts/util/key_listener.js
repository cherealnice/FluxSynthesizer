(function () {

  $(document).on('keyup', function(e) {
    e.preventDefault();
    var key = KeyConstants.KEY_CODES[e.keyCode];
    if (key === 'C2') {
      key = 'C' + (KeyConstants.OCTAVE + 1);
    } else {
      key = key + KeyConstants.OCTAVE;
    }
    KeyActions.keyReleased(key);
  });

  $(document).on('keydown', function(e) {
    e.preventDefault();
    console.log(e.keyCode);
    var key = KeyConstants.KEY_CODES[e.keyCode];
    if (key === 'C2') {
      key = 'C' + (KeyConstants.OCTAVE + 1);
    } else {
      key = key + KeyConstants.OCTAVE;
    }
    KeyActions.keyPressed(key);
  });
})();
