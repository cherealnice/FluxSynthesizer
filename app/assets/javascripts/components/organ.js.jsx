(function (root) {

  root.Organ = React.createClass ({
    getInitialState: function () {
      return ({ octave: KeyConstants.OCTAVE });
    },

    render: function () {
      var octave = this.state.octave;
      var notes = ["C", "C#", "D", "D#","E", "F", "F#", "G", "G#", "A", "A#", "B"];
      return (
        <div className='organ group'>
          <ul className='keys group'>
            {
              notes.map(function (noteName, i) {
                return (<Key index={i} noteName={noteName + octave} />);
              })
            }
            <Key index={12} noteName={"C" + (octave + 1)} />
          </ul>

          <Recorder />
        </div>
      );
    }
  });

})(this);
