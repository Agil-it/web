import React, { Component } from 'react';
import  C_Button  from '../components/Button';
import  C_TextField  from '../components/TextField';

// import './Login.css';

class Login extends Component {
  render() {
    return (
        <div style={{marginTop:50}} >
            <div style={{textAlign:"center"}} >
                <h1 style={{fontSize:60, fontWeight:"bold"}}>LOGIN</h1>
                <h3 style={{color:"#A40003", marginTop:100, fontSize:30, fontWeight:"bold"}}>AGIL.IT</h3>
                <h4 style={{fontWeight:"bold", marginTop:40}}>SISTEMA GERENCIADOR DE ORDEM DE MANUTENÇÃO</h4>
            </div>
            <div style={{marginTop:40}}>
                <div style={{display:"flex", justifyContent:"center"}}>
                    <C_TextField 
                        placeholder="Usuário"
                        type="text"
                        style={{width:460}}
                    />
                </div>
                <div style={{display:"flex", justifyContent:"center", marginTop:20}}>
                    <C_TextField 
                        placeholder="Senha"
                        type="password"
                        style={{width:460}}
                    />
                </div>
                
                <div style={{marginTop:40, display:"flex", justifyContent:"center"}}>
                    <C_Button 
                        style={{fontSize:20, width:"40%", height:50}}
                        label={"ENTRAR"}
                    />
                </div>
            </div>
        </div>
    );
  }
}

export default Login;