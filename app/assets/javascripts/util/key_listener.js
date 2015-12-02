(function () {

  $(document).on('keyup', function(e) {
    e.preventDefault();
    var key = KeyConstants.KEY_CODES[e.keyCode] + KeyConstants.OCTAVE;
    KeyActions.keyReleased(key);
  });

  $(document).on('keydown', function(e) {
    e.preventDefault();
    console.log(e.keyCode);
    var key = KeyConstants.KEY_CODES[e.keyCode] + KeyConstants.OCTAVE;
    KeyActions.keyPressed(key);
  });
})();
