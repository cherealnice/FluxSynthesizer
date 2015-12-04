(function (root) {

  root.Key = React.createClass({
    getInitialState: function () {
      return ({ pressed: false });
    },

    componentDidMount: function () {
      var noteName = this.props.noteName;
      var wave = this.props.options.wave;
      var freq = TONES[noteName];
      this.noteInstance = new Note(freq, wave);
      KeyStore.addChangeHandler(this.changeHandler);
    },

    componentWillReceiveProps: function (newProps) {
      this.noteInstance.updateOptions(newProps.options);
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
