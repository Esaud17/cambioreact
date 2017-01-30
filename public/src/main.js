var Comida = React.createClass({
  getInitialState:function(){
    return{
      like: Boolean(this.props.like),
      editing: false
    }
  },
  handleLike:function(){
    this.setState({
      like: !this.state.like
    });
  },
  editing:function(){
    this.setState({editing:true});
  },
  save:function(){
    var Comida = {
      item:this.refs.comida.value,
      from:this.refs.origen.value,
      img:this.refs.imagen.value
    };
    this.props.onChange(Comida,this.props.index);
    this.setState({editing:false});
  },
  cancel:function(){
      this.setState({editing:false});
  },
  remove: function() {
    this.props.onRemove(this.props.index);
  },
  showEditingView: function(){
    return (<div className="col-sm-4">
        <div className="box col-sm-8">
          <div onClick={this.cancel} className="btn btn-default del"><i className="glyphicon glyphicon-remove-circle"></i></div>
          <div onClick={this.save} className="btn btn-default edit"><i className="glyphicon glyphicon-ok-circle"></i></div>
          <div className="crital">

            <div className="col-sm-12">
              <input ref="comida" type="text" className="form-control" placeholder="Agrega una comida" defaultValue={this.props.item.item} />
            </div>

            <div className="col-sm-12">
              <input ref="origen" type="text" className="form-control" placeholder="Agrega una origen" defaultValue={this.props.item.from} />
            </div>

            <div className="col-sm-12">
              <input ref="imagen" type="text" className="form-control" placeholder="Agrega url de imagen" defaultValue={this.props.item.img} />
            </div>

          </div>
        </div>
    </div>)
  },
  showFinalView: function(){
    var divStyle = {
      backgroundImage: 'url(' + this.props.item.img + ')',
      backgroundSize: '100% 100%',
    };
    return (<div className="col-sm-4">
        <div className="box col-sm-8" style={divStyle}>
          <div onClick={this.remove} className="btn btn-default del"><i className="glyphicon glyphicon-remove"></i></div>
          <div onClick={this.editing} className="btn btn-default edit"><i className="glyphicon glyphicon-pencil"></i></div>
          <div className="crital">
            <div className="col-sm-12">
                <h1>{this.props.item.item}</h1>
            </div>
            <div className="col-sm-9">
              <p>{this.props.item.from}</p>
            </div>
            <div className="col-sm-3">
              <span>
                <input onChange={this.handleLike} defaultChecked={this.state.like} type="checkbox" className="glyphicon glyphicon-heart" />
              </span>
            </div>
            
          </div>
        </div>
    </div>)
  },
  render: function() {
    if(this.state.editing){
      return this.showEditingView();
    }else{
      return this.showFinalView();
    }
  }
});

var ListaComidas = React.createClass({
  getInitialState:function(){
    return{
      comidas: [
        {item:"Tacos",from:"Mexicana",img:"https://static1.squarespace.com/static/53f3f136e4b0124220e8333e/t/54110606e4b0e5bb93d5efa6/1410401799249/tacos+on+a+tray.jpg"},
        {item:"Paella",from:"Española",img:"https://www.chowstatic.com/assets/recipe_photos/29656_grilled_paella_mixta.jpg" },
        {item:"Ceviche",from:"Peruana",img:"https://unareceta.com/wp-content/uploads/2016/10/ceviche.jpg", like:true}
      ]
    }
  },
  componentWillMount:function() {

      var pais;
      var self = this;
      $.getJSON("https://restcountries.eu/rest/v1/all",function(data){
        for(pais in data)
        {
          var Temporal = {
            item: null,
            from: null,
            img: null
          };
          Temporal.comida = data[pais].name;
          Temporal.origen =data[pais].region;
          Temporal.imagen = "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTK_kdf8kbYLy7t0x9sGnskbvRO-Hqim5yZOBeWV-4UfDmiIzgn";
          self.add(Temporal);
        }
        $(self.refs.spinner).removeClass("glypicon-refresh-animate");
        $(self.refs.spinner).hide();
      });
  },
  componentDidMount:function() {
    $(this.refs.spinner).addClass("glypicon-refresh-animate");
  },
  add:function(comida){

    var nuevaComida = {
      item:this.refs.comida.value,
      from:this.refs.origen.value,
      img:this.refs.imagen.value
    };

    if(nuevaComida.item == ""){
      if( typeof comida == "undefined"){
          nuevaComida.item = "comida";
          nuevaComida.from = "comida";
          nuevaComida.img = "comida";
      }else{
        nuevaComida.item = comida.comida;
        nuevaComida.from = comida.origen;
        nuevaComida.img = comida.imagen;
      }
    }
    var arr = this.state.comidas;
    arr.push(nuevaComida);
    this.setState({comidas:arr});

    this.refs.comida.value = "";
    this.refs.origen.value = "";
    this.refs.imagen.value = "";
  },
  eachComidas:function(elm,i){
    return <Comida Key={i} index={i} onRemove={this.remove} onChange={this.update} item={elm}/>;
  },
  handleKeyDown:function(e){
    if(e.charCode===13){
      this.add();
    }
  },
  update:function(comida,i){
    var arr = this.state.comidas;
    arr[i]=comida;
    this.setState({comidas:arr});
  },
  remove:function(i){
    var arr = this.state.comidas;
    arr.splice(i,1);
    this.setState({comidas:arr});
  },
  render: function(){
    return(
      <div className="row">
          <br/>

          <div className="row">
            <div className="haderbox col-sm-12" >
              <h1>Lista de Comidas</h1>
              <h2>Total: {this.state.comidas.length}</h2>
              <span ref="spinner" className="glyphicon glyphicon-refresh"></span>
            </div>
          </div>
          <br/>

          <div className="row">
            <div className="col-sm-12" >
              <div className="input-group" >
                <input ref="comida" type="text" className="form-control" placeholder="Agrega una comida" />
                <input ref="origen" type="text" className="form-control" placeholder="Agrega una origen" />
                <input ref="imagen" type="text" className="form-control" placeholder="Agrega url de imagen" onKeyPress={this.handleKeyDown} />
                <span className="input-group-btn">
                  <div onClick={this.add.bind(null,{comida:"nueva",origen:"nueva",imagen:"nueva"})} className="btn btn-default btn-success">+</div>
                </span>
              </div>
            </div>
          </div>
          <br/>

          <div className="row">
          {
            this.state.comidas.map(this.eachComidas)
          }
          </div>
          <br/>
      </div>)

  }
});

ReactDOM.render(
  <ListaComidas />
  ,document.getElementById('listado')
)
