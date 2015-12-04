(function (root) {
  root.TrackPlayer = React.createClass({
    playClick: function () {
      root.TrackActions.resetOptions(this.props.track);
      this.props.track.play();
    },

    render: function () {
      return (
        <div className="track group">
          <p className="track-name">{this.props.track.get('name')}</p>
          <button onClick={this.playClick}>Play</button>
        </div>
      );
    }
  });
})(this);
