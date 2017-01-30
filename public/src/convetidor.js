class FormReactive extends React.Component{
    constructor(props){
      super(props);
      this.state  = {};
    }
    handleChanged(e){
      console.log(this.cantidad );

    }
    render(){
      return <div>
         <label>Ingresa Valor</label>
         <input ref={(input) => this.cantidad = input}  type="text" placeholder="Valor a convertir" onChange={this.handleChanged} defaultValue = {this.props.cantidad}/>
      </div>
    }
}

class Convertidor extends React.Component{
  constructor(props){
     super(props);
     this.state  = {
          Lempiras: 23.999,
          Dolares: 1,
     }
   }
   render(){
     return <div className="col-sm-4 box">
        1 $  = {} Lps.
        <FormReactive cantidad = {this.state.Cantida} />
     </div>
   }
}


ReactDOM.render(
  <Convertidor />
  ,document.getElementById('calculador')
)
