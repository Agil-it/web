import React, { Component } from 'react';
import {C_Button} from '../components/Button';
import C_TextField from '../components/TextField';
import {AuthProvider} from '../providers/Auth'
import { MessageModal } from '../components/Message';

class Login extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      user: {
        username: undefined,
        password: undefined
      }
    }
  }

  onLogin = this.onLogin.bind(this);
  onChange = this.onChange.bind(this);

  async onLogin() {

    var {username, password} = this.state.user 
    
    let authProvider = new AuthProvider();

    let response = await authProvider.login(username, password);

    if (!response.success) {
      MessageModal.information('Erro', response.error)
      return
    }

    this.props.onSuccess()
  }

  onChange(e){

    var user = this.state.user 

    user[e.target.name] = e.target.value;

    this.setState({user});

  }

  render() {

    return (
      <div>
        <div style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          left: 0,
          top: 0,
          backgroundImage: `url(../assets/background.png)`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          opacity: 0.05,
          zIndex: -1
        }}>
        </div>
        <div style={{ marginTop: "7%" }}>
          <div style={{ textAlign: "center" }} >
            <h1 style={{ fontSize: 60, fontWeight: "bold" }}>LOGIN</h1>
            <h3 style={{ color: "#A40003", marginTop: 100, fontSize: 30, fontWeight: "bold" }}>AGIL.IT</h3>
            <h4 style={{ fontWeight: "bold", marginTop: 40, fontSize: 18 }}>SISTEMA GERENCIADOR DE ORDEM DE MANUTENÇÃO</h4>
          </div>
          <div style={{ marginTop: 70 }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <C_TextField
                name="username"
                onChange={this.onChange}
                placeholder="Usuário"
                type="text"
                style={{ color: "#616161", fontWeight: "bold", fontSize: 14, width: 460 }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
              <C_TextField
                onChange={this.onChange}
                name="password"
                placeholder="Senha"
                type="password"
                style={{ color: "#616161", fontWeight: "bold", fontSize: 14, width: 460 }}
              />
            </div>

            <div style={{ marginTop: 40, display: "flex", justifyContent: "center" }}>
              <C_Button
                primary={true}
                style={{ fontSize: 20, width: "40%", height: 50 }}
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