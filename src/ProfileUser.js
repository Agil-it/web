import React, { Component } from 'react';
import './index.css';
import { UserProvider } from './providers/User';
import { HandlerProvider } from './providers/handler';
import { C_Icon } from './components/Icon';
import { C_Label } from './components/Label';
import C_Header from './components/Header';
import { UserHelper } from './helpers/UserHelper';
import { DateHelper } from './helpers/Date';

class ProfileUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: this.props.user.userId,
      user: {},
    }

    this.provider = new HandlerProvider(new UserProvider(), "usuário")
    this.getUser();
  }

  async getUser(){
    let { user, userId } = this.state

    let response = await this.provider.get(userId);
    if (response.success) user = response.data

    this.setState({ user })
  }

  render() {
    const { user } = this.state;

    return (
      <div style={{ position: "relative", width: "100%", padding: 15}}>
        <div style={{ width: "15%"}}>
          <C_Icon icon="person_pin" style={{ fontSize: "12em", color: "#A40003" }} />  
          <h3 style={{ width: "auto", maxWidth: 200, textAlign: "center" }}>{UserHelper.translate("role", user.role)}</h3>   
        </div>
        <div style={{ padding: 15, position: "absolute", top: 15, left:250, width: "85%"}}>
          <div style={{ color: "#424242", fontSize:"4em", fontWeight: "bold", fontFamily:"Arial"}}>{user.name}</div>
          <div style={{marginTop: 25, border:"2px solid silver", borderRadius: 5, padding: 15, width: "50%"}}>
            <strong style={{ display: "flex" }}>Crachá:<p style={{ marginLeft: 5 }}>{user.employeeBadge}</p></strong>
            <strong style={{ display: "flex" }}>Email:<p style={{ marginLeft: 5 }}>{user.email}</p></strong>
          </div>
        </div>
        <div style={{marginTop: 30}}>
          <C_Header backgroundColor="#847f7f" icon={"expand_more"} title="Informações do Usuário">
            <div style={{border: "1px solid silver", borderRadius: 5}}>
              <div className="md-grid" >
                <C_Label className="md-cell md-cell--6 md-cell--bottom" label="Nome" value={user.name} />
                <C_Label className="md-cell md-cell--3 md-cell--bottom" label="Contato" value={user.contact} />
                {user.sector ?
                  <C_Label className="md-cell md-cell--3 md-cell--bottom" label="Setor" value={user.sector.description} />
                : (user.workCenter ? 
                  <C_Label className="md-cell md-cell--3 md-cell--bottom" label="Centro de Trabalho" value={user.workCenter.description} />
                : undefined)
                }
              </div>
              <div className="md-grid" >
                <C_Label className="md-cell md-cell--6 md-cell--bottom" label="Data de Nascimento" value={DateHelper.formatDate(user.birthDate)} />
                <C_Label className="md-cell md-cell--3 md-cell--bottom" label="Sexo" value={UserHelper.translate("gender", user.gender)} />
              </div>
              <div className="md-grid" >
                <C_Label className="md-cell md-cell--6 md-cell--bottom" label="Cadastrado em" value={DateHelper.formatDate(user.createdAt)} />
                <C_Label className="md-cell md-cell--3 md-cell--bottom" label="Última Atualização" value={DateHelper.formatDate(user.updatedAt)} />
              </div>
            </div>
          </C_Header>
        </div>
     </div>
    )
  }
}

export default ProfileUser;