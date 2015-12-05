var Recorder = React.createClass({
  componentDidMount: function () {
    KeyStore.addChangeHandler(this._keysChanged);
  },

  componentWillUnmount: function () {
    KeyStore.removeChangeHandler(this._keysChanged);
  },

  getInitialState: function () {
    return {
      recording: false,
      track: new Track()
    };
  },

  isDoneRecording: function () {
    return !this.isTrackNew() && !this.state.recording;
  },

  isRecording: function () {
    return this.state.recording;
  },

  isTrackNew: function () {
    return this.state.track.isBlank();
  },

  playClass: function () {
    return "play-button" + this.isTrackNew() ? "" : " disabled";
  },

  playClick: function (e) {
    if(!this.isTrackNew()){
      this.state.track.play();
    }
  },

  recordingMessage: function () {
    if (this.isRecording()) {
      return "Stop Recording";
    } else if (this.isDoneRecording()) {
      return "Done Recording";
    } else {
      return "Start Recording";
    }
  },

  recordClick: function (e) {
    if (this.state.recording) {
      this.state.track.completeRecording();
      this.setState({ recording: false });
    } else {
      this.setState({ recording: true });
      this.state.track.startRecording();
    }
  },

  saveTrack: function (e) {
    this.state.track.set('name', prompt("Track Name:"));
    this.state.track.set('options', this.props.options);
    this.state.track.save();
    this.setState({
      recording: false,
      track: new Track()
    });
  },

  trackSavingElements: function () {
    if (this.isDoneRecording()) {
      return (
        <button onClick={this.saveTrack} className="control">
          Save Track
        </button>
      );
    }
  },

  _keysChanged: function () {
    if (this.state.recording){
      this.state.track.addNotes(KeyStore.all());
    }
  },

  render: function () {
    var hasTrack = this.isTrackNew();

    return (
      <div className="controls digital group">
        <h3>RECORDER</h3>
        <div className='buttons group'>
          <button onClick={this.recordClick} className="record-button">
            { this.recordingMessage() }
          </button>
          <button onClick={this.playClick} className={this.playClass()}>
            Play
          </button>
          { this.trackSavingElements() }
        </div>
      </div>
    );
  }
});
