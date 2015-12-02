(function (root) {
  root.TrackApiUtil = {
    createTrack: function (track) {
      $.ajax({
        url: '/api/tracks',
        method: 'POST',
        data: JSON.stringify({ track: track }),
        dataType: 'json',
        contentType: "application/json",
        success: function (track) {
          TrackActions.addTrack(new Track(track));
        }
      });
    },

    fetchTracks: function () {
      $.getJSON('/api/tracks', function (trackObjects) {
        var tracks = trackObjects.map(function (trackData) {
          return new Track(trackData);
        });

        TrackActions.resetTracks(tracks);
      });
    }
  };
})(this);
