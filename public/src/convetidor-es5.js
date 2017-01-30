var Moneda = React.createClass({
  handleMoneda: function(){
    this.props.onClick(this.props.Cambio, this.props.index);
  },
  showSelected: function(){
    if(this.props.Cambio.state){
      return <i className="fa fa-check-circle-o green"></i>
    }
  },
  render: function(){
    return (
      <div className="col-sm-12 item">
        <div className="col-sm-1 center">
          {this.showSelected()}
        </div>
        <div className="col-sm-3 tag center" onClick={this.handleMoneda}>

          <span>
             {this.props.Cambio.moneda}
          </span>
        </div>
        <div className="col-sm-4 value center">
          <span>
            L {this.props.Cambio.compra}
          </span>
        </div>
        <div className="col-sm-4 value center">
          <span>
            L {this.props.Cambio.venta}
          </span>
        </div>
      </div>
    )
  }
})

var TransformMoneda = React.createClass({
  handleTransform: function(){
    this.props.onTransform(parseFloat(this.refs.cantidad.value));
  },
  handleChanged: function() {
    this.props.onClick(parseFloat(this.refs.cantidad.value));
  },
  render: function(){
    return (
      <div className="col-sm-12 item">
        <div className="col-sm-12 card-title left">
          <span >CONVETIDOR DE CAMBIO</span>
        </div>
        <br/>
        <div className="col-sm-12">
          <div className="col-sm-10 getdata">
            <div className="col-sm-1 symbol center">
              <span>
                {this.props.pakage.cambio.symbol}
              </span>
            </div>
            <div className="col-sm-11">
              <input onChange={this.handleTransform} className="data col-sm-10" ref="cantidad" type="text" placeholder="Ingresa un cantidad" defaultValue={this.props.pakage.cambio.value} />
            </div>
          </div>
          <div className="col-sm-2">
             <div  onClick={this.handleChanged} className="col-sm-12 center" >
               <i className=" fa fa-exchange red"></i>
             </div>
          </div>
        </div>
        <div className="col-sm-12 diver"> </div>
        <div className="col-sm-12">
          <div className="col-sm-4 labeldata center">
            <span>
              TOTAL :
            </span>
          </div>
          <div className="col-sm-6 setdata center">
             <span>
                {this.props.pakage.result.symbol} {this.props.pakage.result.total}
             </span>
          </div>
        </div>
      </div>
    )
  }
})

var CambioMoneda = React.createClass({
  getInitialState:function(){
    return{
      pakage:{
        result:{ total:0 , symbol: "L"},
        cambio:{ value:null, symbol: "$" },
      },
      symbolDefault: "L",
      changed:true,
      cambio: {moneda:"Dolar",venta:23.7899,compra:23.6245,symbol:"$"},
      monedas: [
        {moneda:"Dolar",venta:23.7899,compra:23.6245,symbol:"$",state:true},
        {moneda:"Euro",venta:26.5257,compra: 23.9789,symbol:"€"},
        {moneda:"Libra",venta:29.6533,compra: 26.6554,symbol:"£"},
      ]
    }
  },
  convertionOption: function(tempCambio,tempResult,cantidad,cambio){

    tempCambio.value = cantidad;

    if(this.state.changed){
      tempResult.total =  Math.round10( (tempCambio.value * cambio.compra) , -4 );
      tempResult.symbol = this.state.symbolDefault;
      tempCambio.symbol = cambio.symbol;
    }else{
      tempResult.total =  Math.round10( (tempCambio.value / cambio.venta) , -4 );
      tempResult.symbol = cambio.symbol;
      tempCambio.symbol = this.state.symbolDefault;
    }

    if(isNaN(tempResult.total)){
        tempResult.total = 0;
    }

    return {
      tempResult:tempResult,
      tempCambio: tempCambio,
    }
  },
  eachCambios: function (MonedaCambio,i) {
    return <Moneda key={i} index={i} Cambio={MonedaCambio} onClick={ this.handleUpdateCambio } />
  },
  handleUpdateCambio: function(data, i){

    var monedas = this.state.monedas;
    monedas.map(function(item, i){
       monedas[i].state = false;
    })
    monedas[i].state = true;
    var cursor = this.convertionOption(this.state.pakage.cambio , this.state.pakage.result,this.state.pakage.cambio.value,data);

    this.setState({
      monedas:monedas,
      cambio:data,
      pakage:{
        cambio:cursor.tempCambio,
        result:cursor.tempResult,
      }
    });
  },
  handleTransform: function(data){
    var cursor = this.convertionOption(this.state.pakage.cambio , this.state.pakage.result,data,this.state.cambio);

    this.setState({
      pakage:{
        cambio:cursor.tempCambio,
        result:cursor.tempResult,
      }
    });
  },
  handleChanged: function(data) {
    this.state.changed = !this.state.changed;
    var cursor = this.convertionOption(this.state.pakage.cambio , this.state.pakage.result,data,this.state.cambio);
    this.setState({
      changed: this.state.changed,
      pakage:{
        cambio:cursor.tempCambio,
        result:cursor.tempResult,
      }
    });
  },
  render: function(){
    return (
        <section className="row">
          <br/>
          <div className="col-sm-4 card">
             <div className="col-sm-12 card-title">
               <span className="col-sm-6 left">TIPO DE CAMBIO</span>
               <span className="col-sm-6 right blue">HONDURAS</span>
             </div>
             <div className="col-sm-12 diver"> </div>
             <div className="col-sm-12 card-elements">
               <div className="col-sm-12 item">
                 <div className="col-sm-4  center">
                   <span>
                     Moneda
                   </span>
                 </div>
                 <div className="col-sm-4  center">
                   <span>
                     Compra
                   </span>
                 </div>
                 <div className="col-sm-4  center">
                   <span>
                     Venta
                   </span>
                 </div>
               </div>
               {
                 this.state.monedas.map(this.eachCambios)
               }
             </div>
             <div className="col-sm-12 diver"> </div>
             <TransformMoneda pakage={this.state.pakage} onClick={this.handleChanged}  onTransform={this.handleTransform} />
          </div>
        </section>
    )
  }

});

ReactDOM.render(
  <CambioMoneda />
  ,document.getElementById('cambios')
)
