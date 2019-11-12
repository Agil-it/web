import React, { Component } from 'react';
import C_Button  from '../components/Button';
import C_TextField  from '../components/TextField';
import C_Menu from '../components/Menu'

// import './Login.css';

class Login extends Component {
    
    constructor(props){
        super(props);
       
    }

    onLogin = this.onLogin.bind(this);

    onLogin(callback){

        let jwt="teste"
        this.props.onSuccess(jwt)
    }

   
  render() {

    return (
        <div>
            <div style={{
                    position: 'absolute',
                    height:'100%',
                    width:'100%',
                    left:0,
                    top:0,
                    backgroundImage: `url(../assets/background.png)`,
                    backgroundSize:'cover',
                    backgroundRepeat: 'no-repeat',
                    opacity:0.05,
                    zIndex:-1
                }}>
            </div>
            <div style={{marginTop: "7%"}}>
                <div style={{ textAlign:"center"}} >
                    <h1 style={{fontSize:60, fontWeight:"bold"}}>LOGIN</h1>
                    <h3 style={{color:"#A40003", marginTop:100, fontSize:30, fontWeight:"bold"}}>AGIL.IT</h3>
                    <h4 style={{fontWeight:"bold", marginTop:40, fontSize:18}}>SISTEMA GERENCIADOR DE ORDEM DE MANUTENÇÃO</h4>
                </div>
                <div style={{marginTop:70}}>
                    <div style={{display:"flex",justifyContent:"center"}}>
                        <C_TextField 
                            placeholder="Usuário"
                            type="text"
                            style={{color:"#616161", fontWeight:"bold",fontSize:14, width:460}}
                        />
                    </div>
                    <div style={{display:"flex", justifyContent:"center", marginTop:20}}>
                        <C_TextField 
                            placeholder="Senha"
                            type="password"
                            style={{color:"#616161",fontWeight:"bold",fontSize:14, width:460}}
                        />
                    </div>
                    
                    <div style={{marginTop:40, display:"flex", justifyContent:"center"}}>
                        <C_Button 
                            primary={true}
                            style={{fontSize:20, width:"40%", height:50}}
                            label={"ENTRAR"}
                            action={() => this.onLogin()}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default Login;