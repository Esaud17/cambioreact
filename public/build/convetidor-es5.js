var Moneda = React.createClass({
  displayName: "Moneda",

  handleMoneda: function () {
    this.props.onClick(this.props.Cambio, this.props.index);
  },
  showSelected: function () {
    if (this.props.Cambio.state) {
      return React.createElement("i", { className: "fa fa-check-circle-o green" });
    }
  },
  render: function () {
    return React.createElement(
      "div",
      { className: "col-sm-12 item" },
      React.createElement(
        "div",
        { className: "col-sm-1 center" },
        this.showSelected()
      ),
      React.createElement(
        "div",
        { className: "col-sm-3 tag center", onClick: this.handleMoneda },
        React.createElement(
          "span",
          null,
          this.props.Cambio.moneda
        )
      ),
      React.createElement(
        "div",
        { className: "col-sm-4 value center" },
        React.createElement(
          "span",
          null,
          "L ",
          this.props.Cambio.compra
        )
      ),
      React.createElement(
        "div",
        { className: "col-sm-4 value center" },
        React.createElement(
          "span",
          null,
          "L ",
          this.props.Cambio.venta
        )
      )
    );
  }
});

var TransformMoneda = React.createClass({
  displayName: "TransformMoneda",

  handleTransform: function () {
    this.props.onTransform(parseFloat(this.refs.cantidad.value));
  },
  handleChanged: function () {
    this.props.onClick(parseFloat(this.refs.cantidad.value));
  },
  render: function () {
    return React.createElement(
      "div",
      { className: "col-sm-12 item" },
      React.createElement(
        "div",
        { className: "col-sm-12 card-title left" },
        React.createElement(
          "span",
          null,
          "CONVETIDOR DE CAMBIO"
        )
      ),
      React.createElement("br", null),
      React.createElement(
        "div",
        { className: "col-sm-12" },
        React.createElement(
          "div",
          { className: "col-sm-10 getdata" },
          React.createElement(
            "div",
            { className: "col-sm-1 symbol center" },
            React.createElement(
              "span",
              null,
              this.props.pakage.cambio.symbol
            )
          ),
          React.createElement(
            "div",
            { className: "col-sm-11" },
            React.createElement("input", { onChange: this.handleTransform, className: "data col-sm-10", ref: "cantidad", type: "text", placeholder: "Ingresa un cantidad", defaultValue: this.props.pakage.cambio.value })
          )
        ),
        React.createElement(
          "div",
          { className: "col-sm-2" },
          React.createElement(
            "div",
            { onClick: this.handleChanged, className: "col-sm-12 center" },
            React.createElement("i", { className: " fa fa-exchange red" })
          )
        )
      ),
      React.createElement(
        "div",
        { className: "col-sm-12 diver" },
        " "
      ),
      React.createElement(
        "div",
        { className: "col-sm-12" },
        React.createElement(
          "div",
          { className: "col-sm-4 labeldata center" },
          React.createElement(
            "span",
            null,
            "TOTAL :"
          )
        ),
        React.createElement(
          "div",
          { className: "col-sm-6 setdata center" },
          React.createElement(
            "span",
            null,
            this.props.pakage.result.symbol,
            " ",
            this.props.pakage.result.total
          )
        )
      )
    );
  }
});

var CambioMoneda = React.createClass({
  displayName: "CambioMoneda",

  getInitialState: function () {
    return {
      pakage: {
        result: { total: 0, symbol: "L" },
        cambio: { value: null, symbol: "$" }
      },
      symbolDefault: "L",
      changed: true,
      cambio: { moneda: "Dolar", venta: 23.7899, compra: 23.6245, symbol: "$" },
      monedas: [{ moneda: "Dolar", venta: 23.7899, compra: 23.6245, symbol: "$", state: true }, { moneda: "Euro", venta: 26.5257, compra: 23.9789, symbol: "€" }, { moneda: "Libra", venta: 29.6533, compra: 26.6554, symbol: "£" }]
    };
  },
  convertionOption: function (tempCambio, tempResult, cantidad, cambio) {

    tempCambio.value = cantidad;

    if (this.state.changed) {
      tempResult.total = Math.round10(tempCambio.value * cambio.compra, -4);
      tempResult.symbol = this.state.symbolDefault;
      tempCambio.symbol = cambio.symbol;
    } else {
      tempResult.total = Math.round10(tempCambio.value / cambio.venta, -4);
      tempResult.symbol = cambio.symbol;
      tempCambio.symbol = this.state.symbolDefault;
    }

    if (isNaN(tempResult.total)) {
      tempResult.total = 0;
    }

    return {
      tempResult: tempResult,
      tempCambio: tempCambio
    };
  },
  eachCambios: function (MonedaCambio, i) {
    return React.createElement(Moneda, { key: i, index: i, Cambio: MonedaCambio, onClick: this.handleUpdateCambio });
  },
  handleUpdateCambio: function (data, i) {

    var monedas = this.state.monedas;
    monedas.map(function (item, i) {
      monedas[i].state = false;
    });
    monedas[i].state = true;
    var cursor = this.convertionOption(this.state.pakage.cambio, this.state.pakage.result, this.state.pakage.cambio.value, data);

    this.setState({
      monedas: monedas,
      cambio: data,
      pakage: {
        cambio: cursor.tempCambio,
        result: cursor.tempResult
      }
    });
  },
  handleTransform: function (data) {
    var cursor = this.convertionOption(this.state.pakage.cambio, this.state.pakage.result, data, this.state.cambio);

    this.setState({
      pakage: {
        cambio: cursor.tempCambio,
        result: cursor.tempResult
      }
    });
  },
  handleChanged: function (data) {
    this.state.changed = !this.state.changed;
    var cursor = this.convertionOption(this.state.pakage.cambio, this.state.pakage.result, data, this.state.cambio);
    this.setState({
      changed: this.state.changed,
      pakage: {
        cambio: cursor.tempCambio,
        result: cursor.tempResult
      }
    });
  },
  render: function () {
    return React.createElement(
      "section",
      { className: "row" },
      React.createElement("br", null),
      React.createElement(
        "div",
        { className: "col-sm-4 card" },
        React.createElement(
          "div",
          { className: "col-sm-12 card-title" },
          React.createElement(
            "span",
            { className: "col-sm-6 left" },
            "TIPO DE CAMBIO"
          ),
          React.createElement(
            "span",
            { className: "col-sm-6 right blue" },
            "HONDURAS"
          )
        ),
        React.createElement(
          "div",
          { className: "col-sm-12 diver" },
          " "
        ),
        React.createElement(
          "div",
          { className: "col-sm-12 card-elements" },
          React.createElement(
            "div",
            { className: "col-sm-12 item" },
            React.createElement(
              "div",
              { className: "col-sm-4  center" },
              React.createElement(
                "span",
                null,
                "Moneda"
              )
            ),
            React.createElement(
              "div",
              { className: "col-sm-4  center" },
              React.createElement(
                "span",
                null,
                "Compra"
              )
            ),
            React.createElement(
              "div",
              { className: "col-sm-4  center" },
              React.createElement(
                "span",
                null,
                "Venta"
              )
            )
          ),
          this.state.monedas.map(this.eachCambios)
        ),
        React.createElement(
          "div",
          { className: "col-sm-12 diver" },
          " "
        ),
        React.createElement(TransformMoneda, { pakage: this.state.pakage, onClick: this.handleChanged, onTransform: this.handleTransform })
      )
    );
  }

});

ReactDOM.render(React.createElement(CambioMoneda, null), document.getElementById('cambios'));