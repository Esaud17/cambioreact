class FormReactive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleChanged(e) {
    console.log(this.cantidad);
  }
  render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "label",
        null,
        "Ingresa Valor"
      ),
      React.createElement("input", { ref: input => this.cantidad = input, type: "text", placeholder: "Valor a convertir", onChange: this.handleChanged, defaultValue: this.props.cantidad })
    );
  }
}

class Convertidor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Lempiras: 23.999,
      Dolares: 1
    };
  }
  render() {
    return React.createElement(
      "div",
      { className: "col-sm-4 box" },
      "1 $  = ",
      " Lps.",
      React.createElement(FormReactive, { cantidad: this.state.Cantida })
    );
  }
}

ReactDOM.render(React.createElement(Convertidor, null), document.getElementById('calculador'));