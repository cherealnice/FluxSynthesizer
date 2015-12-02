var Key = React.createClass({
  getInitialState: function () {
    return ({ pressed: false });
  },

  componentDidMount: function () {
    var noteName = this.props.noteName;
    var freq = TONES[noteName];
    this.noteInstance = new Note(freq);
    KeyStore.addChangeHandler(this.changeHandler);
  },

  changeHandler: function () {
    var keys = KeyStore.all();
    var inKeys = keys.some(function (key) {
      return key === this.props.noteName;
    }.bind(this));

    if (inKeys) {
      this.noteInstance.start();
      this.setState({pressed: true});
    } else {
      this.noteInstance.stop();
      this.setState({pressed: false});
    }
  },

  render: function () {
    var pressed = "";
    var color;
    if (this.state.pressed) {
      pressed = "pressed";
    }
    if (this.props.noteName.length === 3) {
      color = " black";
    } else {
      color = " white";
    }
    return (
      <li className={'key ' + pressed + color}>{this.props.noteName}</li>
    );
  }

});
