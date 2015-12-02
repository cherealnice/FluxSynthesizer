(function (root) {

  root.JukeBox = React.createClass({
    componentDidMount: function () {
      TrackStore.addChangeListener(this._onChange);
      TrackApiUtil.fetchTracks();
    },

    getInitialState: function () {
      return { tracks: TrackStore.all() };
    },

    render: function () {
      return (
        <div className="jukebox">
          <h3>JUKEBOX</h3>
          {
            this.state.tracks.map(function (track) {
              return <TrackPlayer key={track.get('id')} track={track}/>;
            })
          }
        </div>
      );
    },

    _onChange: function () {
      this.setState({ tracks: TrackStore.all() });
    }
  });

})(this);
