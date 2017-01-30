var Comida = React.createClass({
  displayName: "Comida",

  getInitialState: function () {
    return {
      like: Boolean(this.props.like),
      editing: false
    };
  },
  handleLike: function () {
    this.setState({
      like: !this.state.like
    });
  },
  editing: function () {
    this.setState({ editing: true });
  },
  save: function () {
    var Comida = {
      item: this.refs.comida.value,
      from: this.refs.origen.value,
      img: this.refs.imagen.value
    };
    this.props.onChange(Comida, this.props.index);
    this.setState({ editing: false });
  },
  cancel: function () {
    this.setState({ editing: false });
  },
  remove: function () {
    this.props.onRemove(this.props.index);
  },
  showEditingView: function () {
    return React.createElement(
      "div",
      { className: "col-sm-4" },
      React.createElement(
        "div",
        { className: "box col-sm-8" },
        React.createElement(
          "div",
          { onClick: this.cancel, className: "btn btn-default del" },
          React.createElement("i", { className: "glyphicon glyphicon-remove-circle" })
        ),
        React.createElement(
          "div",
          { onClick: this.save, className: "btn btn-default edit" },
          React.createElement("i", { className: "glyphicon glyphicon-ok-circle" })
        ),
        React.createElement(
          "div",
          { className: "crital" },
          React.createElement(
            "div",
            { className: "col-sm-12" },
            React.createElement("input", { ref: "comida", type: "text", className: "form-control", placeholder: "Agrega una comida", defaultValue: this.props.item.item })
          ),
          React.createElement(
            "div",
            { className: "col-sm-12" },
            React.createElement("input", { ref: "origen", type: "text", className: "form-control", placeholder: "Agrega una origen", defaultValue: this.props.item.from })
          ),
          React.createElement(
            "div",
            { className: "col-sm-12" },
            React.createElement("input", { ref: "imagen", type: "text", className: "form-control", placeholder: "Agrega url de imagen", defaultValue: this.props.item.img })
          )
        )
      )
    );
  },
  showFinalView: function () {
    var divStyle = {
      backgroundImage: 'url(' + this.props.item.img + ')',
      backgroundSize: '100% 100%'
    };
    return React.createElement(
      "div",
      { className: "col-sm-4" },
      React.createElement(
        "div",
        { className: "box col-sm-8", style: divStyle },
        React.createElement(
          "div",
          { onClick: this.remove, className: "btn btn-default del" },
          React.createElement("i", { className: "glyphicon glyphicon-remove" })
        ),
        React.createElement(
          "div",
          { onClick: this.editing, className: "btn btn-default edit" },
          React.createElement("i", { className: "glyphicon glyphicon-pencil" })
        ),
        React.createElement(
          "div",
          { className: "crital" },
          React.createElement(
            "div",
            { className: "col-sm-12" },
            React.createElement(
              "h1",
              null,
              this.props.item.item
            )
          ),
          React.createElement(
            "div",
            { className: "col-sm-9" },
            React.createElement(
              "p",
              null,
              this.props.item.from
            )
          ),
          React.createElement(
            "div",
            { className: "col-sm-3" },
            React.createElement(
              "span",
              null,
              React.createElement("input", { onChange: this.handleLike, defaultChecked: this.state.like, type: "checkbox", className: "glyphicon glyphicon-heart" })
            )
          )
        )
      )
    );
  },
  render: function () {
    if (this.state.editing) {
      return this.showEditingView();
    } else {
      return this.showFinalView();
    }
  }
});

var ListaComidas = React.createClass({
  displayName: "ListaComidas",

  getInitialState: function () {
    return {
      comidas: [{ item: "Tacos", from: "Mexicana", img: "https://static1.squarespace.com/static/53f3f136e4b0124220e8333e/t/54110606e4b0e5bb93d5efa6/1410401799249/tacos+on+a+tray.jpg" }, { item: "Paella", from: "Española", img: "https://www.chowstatic.com/assets/recipe_photos/29656_grilled_paella_mixta.jpg" }, { item: "Ceviche", from: "Peruana", img: "https://unareceta.com/wp-content/uploads/2016/10/ceviche.jpg", like: true }]
    };
  },
  componentWillMount: function () {

    var pais;
    var self = this;
    $.getJSON("https://restcountries.eu/rest/v1/all", function (data) {
      for (pais in data) {
        var Temporal = {
          item: null,
          from: null,
          img: null
        };
        Temporal.comida = data[pais].name;
        Temporal.origen = data[pais].region;
        Temporal.imagen = "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTK_kdf8kbYLy7t0x9sGnskbvRO-Hqim5yZOBeWV-4UfDmiIzgn";
        self.add(Temporal);
      }
      $(self.refs.spinner).removeClass("glypicon-refresh-animate");
      $(self.refs.spinner).hide();
    });
  },
  componentDidMount: function () {
    $(this.refs.spinner).addClass("glypicon-refresh-animate");
  },
  add: function (comida) {

    var nuevaComida = {
      item: this.refs.comida.value,
      from: this.refs.origen.value,
      img: this.refs.imagen.value
    };

    if (nuevaComida.item == "") {
      if (typeof comida == "undefined") {
        nuevaComida.item = "comida";
        nuevaComida.from = "comida";
        nuevaComida.img = "comida";
      } else {
        nuevaComida.item = comida.comida;
        nuevaComida.from = comida.origen;
        nuevaComida.img = comida.imagen;
      }
    }
    var arr = this.state.comidas;
    arr.push(nuevaComida);
    this.setState({ comidas: arr });

    this.refs.comida.value = "";
    this.refs.origen.value = "";
    this.refs.imagen.value = "";
  },
  eachComidas: function (elm, i) {
    return React.createElement(Comida, { Key: i, index: i, onRemove: this.remove, onChange: this.update, item: elm });
  },
  handleKeyDown: function (e) {
    if (e.charCode === 13) {
      this.add();
    }
  },
  update: function (comida, i) {
    var arr = this.state.comidas;
    arr[i] = comida;
    this.setState({ comidas: arr });
  },
  remove: function (i) {
    var arr = this.state.comidas;
    arr.splice(i, 1);
    this.setState({ comidas: arr });
  },
  render: function () {
    return React.createElement(
      "div",
      { className: "row" },
      React.createElement("br", null),
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "div",
          { className: "haderbox col-sm-12" },
          React.createElement(
            "h1",
            null,
            "Lista de Comidas"
          ),
          React.createElement(
            "h2",
            null,
            "Total: ",
            this.state.comidas.length
          ),
          React.createElement("span", { ref: "spinner", className: "glyphicon glyphicon-refresh" })
        )
      ),
      React.createElement("br", null),
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "div",
          { className: "col-sm-12" },
          React.createElement(
            "div",
            { className: "input-group" },
            React.createElement("input", { ref: "comida", type: "text", className: "form-control", placeholder: "Agrega una comida" }),
            React.createElement("input", { ref: "origen", type: "text", className: "form-control", placeholder: "Agrega una origen" }),
            React.createElement("input", { ref: "imagen", type: "text", className: "form-control", placeholder: "Agrega url de imagen", onKeyPress: this.handleKeyDown }),
            React.createElement(
              "span",
              { className: "input-group-btn" },
              React.createElement(
                "div",
                { onClick: this.add.bind(null, { comida: "nueva", origen: "nueva", imagen: "nueva" }), className: "btn btn-default btn-success" },
                "+"
              )
            )
          )
        )
      ),
      React.createElement("br", null),
      React.createElement(
        "div",
        { className: "row" },
        this.state.comidas.map(this.eachComidas)
      ),
      React.createElement("br", null)
    );
  }
});

ReactDOM.render(React.createElement(ListaComidas, null), document.getElementById('listado'));