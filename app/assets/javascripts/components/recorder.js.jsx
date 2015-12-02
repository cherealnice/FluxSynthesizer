var Recorder = React.createClass({
  getInitialState: function () {
    return ({ recording: false, playing: false, track: new Track({name: this.props.name}) });
  },

  componentDidMount: function () {
    KeyStore.addChangeHandler(this.handleChange);
  },

  toggleRecording: function () {
    if (this.state.recording) {
      this.state.track.stopRecording();
    } else {
      this.state.track.startRecording();
    }

    this.setState({ recording: !this.state.recording });
  },

  handleChange: function () {
    if (this.state.recording) {
      var notes = KeyStore.all();
      this.state.track.addNotes(notes);
    }
  },

  togglePlayback: function () {
    if (this.state.playing) {
      this.state.track.stopPlay();
    } else {
      this.state.track.play();
    }

    this.setState({ playing: !this.state.playing });
  },

  render: function () {
    return (
      <div>
        <button onClick={this.toggleRecording}>
          {this.state.recording ? "STOP RECORDING" : "RECORD"}
        </button>
        <button onClick={this.togglePlayback}>
          {this.state.playing ? "STOP PLAY" : "PLAY"}
        </button>
      </div>
    );
  }
});
