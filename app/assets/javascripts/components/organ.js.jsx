(function (root) {

  root.Organ = React.createClass ({
    getInitialState: function () {
      var opts = root.OptionsStore.all();
      return ({
        chorus: opts.chorus,
        wave: opts.wave,
        octave: 5,
        caps: false
      });
    },

    componentDidMount: function () {
      $(root.document).on('keydown', this._onKeyDown);
      $(root.document).on('keyup', this._onKeyUp);
      root.OptionsStore.addChangeHandler(this._resetOptions);
    },

    componentWillUnmount: function () {
      $(root.document).off('keydown', this._onKeyDown);
      $(root.document).off('keyup', this._onKeyUp);
      root.OptionsStore.removeChangeHandler(this._resetOptions);
    },

    _resetOptions: function () {
      var newOptions = root.OptionsStore.all();
      var wave = newOptions.wave;
      var chorus = newOptions.chorus;
      this.setState({
        wave: wave,
        chorus: chorus
      });
    },

    _onKeyDown: function (e) {
      if (this.state.caps) {
        e.preventDefault();
        var key = KeyConstants.KEY_CODES[e.keyCode];
        if (key === 'C2') {
          key = 'C' + (this.state.octave + 1);
        } else {
          key = key + this.state.octave;
        }
        KeyActions.keyPressed(key);
      } else if (e.keyCode === 20) {
        this.setState({ caps: true });
      }
    },

    _handleWaveChange: function () {
      var waves = [ 'sine', 'square', 'triangle', 'sawtooth' ];
      var idx = waves.indexOf(this.state.wave);
      var newIdx = (idx + 1) % 4;
      this.setState({ wave: waves[newIdx] });
    },

    _handleChorusChange: function () {
      this.setState({ chorus: !this.state.chorus });
    },

    _handleOctaveUp: function () {
      if (this.state.octave <= 6) {
        this.setState({ octave: (this.state.octave + 1) });
      }
    },

    _handleOctaveDown: function () {
      if (this.state.octave >= 3) {
        this.setState({ octave: (this.state.octave - 1) });
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
            key = 'C' + (this.state.octave + 1);
          } else {
            key = key + this.state.octave;
          }
          KeyActions.keyReleased(key);
        }
      }
    },

    render: function () {
      var options = {
        wave: this.state.wave,
        chorus: this.state.chorus,
      };
      var chorusText = this.state.chorus ? ' on' : ' off';
      var capsOpacity = this.state.caps ? {opacity: 1} : {opacity: 0.4};
      var octave = this.state.octave;
      var notes = ["C", "C#", "D", "D#","E", "F", "F#", "G", "G#", "A", "A#", "B"];
      return (
        <div className='organ group'>
          <button className='wave-button organ-options-button'
            onClick={this._handleWaveChange}>
              {this.state.wave}
          </button>
          <button className='chorus-button organ-options-button'
            onClick={this._handleChorusChange}>
              {"Chorus:" + chorusText}
          </button>
          <button className='octave-button octave-down organ-options-button'
            onClick={this._handleOctaveDown}>
              -
          </button>
          <p className="octave">{'OCTAVE: ' + (octave - 5)}</p>
          <button className='octave-button octave-up organ-options-button'
            onClick={this._handleOctaveUp}>
              +
          </button>
          <ul style={capsOpacity} className='keys group'>
            {
              notes.map(function (noteName, i) {
                return (
                  <Key
                    options={options}
                    key={i}
                    index={i}
                    noteName={noteName + octave}
                  />
                );
              })
            }
            <Key options={options} index={12} noteName={"C" + (octave + 1)} />
          </ul>

          <Recorder options={options} octave={octave} />
          <JukeBox />
        </div>
      );
    }
  });

})(this);
