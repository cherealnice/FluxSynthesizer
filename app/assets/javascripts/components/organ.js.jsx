(function (root) {

  root.Organ = React.createClass ({
    getInitialState: function () {
      return ({ octave: KeyConstants.OCTAVE, caps: false });
    },

    componentDidMount: function () {
      $(root.document).on('keydown', this._onKeyDown);
      $(root.document).on('keyup', this._onKeyUp);
    },

    componentWillUnmount: function () {
      $(root.document).off('keydown', this._onKeyDown);
      $(root.document).off('keyup', this._onKeyUp);
    },

    _onKeyDown: function (e) {
      if (this.state.caps) {
        e.preventDefault();
        var key = KeyConstants.KEY_CODES[e.keyCode];
        if (key === 'C2') {
          key = 'C' + (KeyConstants.OCTAVE + 1);
        } else {
          key = key + KeyConstants.OCTAVE;
        }
        KeyActions.keyPressed(key);
      } else if (e.keyCode === 20) {
        this.setState({ caps: true });
      }
    },

    _onKeyUp: function (e) {
      if (this.state.caps) {
        if (e.keyCode === 20) {
          this.setState({ caps: false });
        } else {
          e.preventDefault();
          var key = KeyConstants.KEY_CODES[e.keyCode];
          if (key === 'C2') {
            key = 'C' + (KeyConstants.OCTAVE + 1);
          } else {
            key = key + KeyConstants.OCTAVE;
          }
          KeyActions.keyReleased(key);
        }
      }
    },

    render: function () {
      var capsOpacity = this.state.caps ? {opacity: 1} : {opacity: 0.4};
      var octave = this.state.octave;
      var notes = ["C", "C#", "D", "D#","E", "F", "F#", "G", "G#", "A", "A#", "B"];
      return (
        <div className='organ group'>
          <ul style={capsOpacity} className='keys group'>
            {
              notes.map(function (noteName, i) {
                return (<Key key={i} index={i} noteName={noteName + octave} />);
              })
            }
            <Key index={12} noteName={"C" + (octave + 1)} />
          </ul>

          <Recorder />
          <JukeBox />
        </div>
      );
    }
  });

})(this);
