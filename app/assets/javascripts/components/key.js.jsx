(function (root) {

  root.Key = React.createClass({
    getInitialState: function () {
      return ({ pressed: false });
    },

    componentDidMount: function () {
      this.noteInstances = this.createNotes();
      KeyStore.addChangeHandler(this.changeHandler);
    },

    createNotes: function () {
      var noteName = this.props.noteName;
      var wave = this.props.options.wave;
      var freq = TONES[noteName];
      var notes = [];
      for (var i = 0; i < 4; i++) {
        var note = new Note(freq, wave);
        notes.push(note);
      }

      return notes;
    },

    componentWillReceiveProps: function (newProps) {
      this.noteInstances.forEach(function (note) {
        note.updateOptions(newProps.options, newProps.noteName);
      });
    },

    changeHandler: function () {
      var keys = KeyStore.all();
      var inKeys = keys.some(function (key) {
        return key === this.props.noteName;
      }.bind(this));

      if (inKeys) {
        this.noteInstances.forEach(function (note) {
          note.start();
        });
        this.setState({pressed: true});
      } else {
        this.noteInstances.forEach(function (note) {
          note.stop();
        });
        this.setState({pressed: false});
      }
    },

    render: function () {
      var pressed = "";
      var color;
      var index = "_" + this.props.index;
      if (this.state.pressed) {
        pressed = "pressed ";
      }
      if (this.props.noteName.length === 3) {
        color = " black";
      } else {
        color = " white";
      }
      return (
        <li className={'key ' + pressed + index + color}></li>
      );
    }
  });
})(this);
