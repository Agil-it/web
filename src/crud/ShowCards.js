import React, { Component } from 'react';
import C_Card  from '../components/Card';
import C_Menu from '../components/Menu';
import { FontIcon } from 'react-md';

// import './Login.css';

class ShowCards extends Component {
    
    constructor(props){
        super(props);
       
    }

   
  render() {

    return (
        <div style={{display:"flex", justifyContent:"center"}}>
            <C_Card 
                icon={<FontIcon>person</FontIcon>}
                style={{marginLeft:20, backgroundColor:"#00000021",marginTop:"2%", width:"20%", borderRadius:10, cursor:"pointer"}}
                title={"CADASTRO"}
                subtitle={"Usuários"}
            />
            <C_Card 
                style={{marginLeft:20, backgroundColor:"#00000021",marginTop:"2%", width:"20%", borderRadius:10, cursor:"pointer"}}
                title={"CADASTRO"}
                subtitle={"Tipo de Máquina"}
            />
            <C_Card 
                style={{marginLeft:20, backgroundColor:"#00000021",marginTop:"2%", width:"20%", borderRadius:10, cursor:"pointer"}}
                title={"CADASTRO"}
                subtitle={"Componente de Máquina"}
            />
        </div>
    );
  }
}

export default ShowCards;