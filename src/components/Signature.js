import { Card } from 'react-md';
import React, { PureComponent } from 'react';
import '../index.css';
import { C_Icon } from './Icon';
import C_TextField from './TextField';
import {C_Button} from './Button';
import { C_CheckBox } from './CheckBox';
import { MaintenanceOrderProvider } from '../providers/MaintenanceOrder';
import { ProviderHelper } from '../helpers/Provider';
import { SessionHelper } from '../helpers/Session';
import { AuthProvider } from '../providers/Auth';
import { MessageModal } from './Message'

export class C_Signature extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: SessionHelper.getCookieData('user'),
      orderId: this.props.orderId
    }

    this.provider = new MaintenanceOrderProvider();
    this.authProvider = new AuthProvider();

  }

  componentDidMount() {

  }

  async signatureOrder(){
    const orderId = this.state.orderId;
    const userId = this.state.user.userId;

    try {
      if (!await this.validateUser()) return;

      await ProviderHelper.execute(this.provider.signOrder(userId, orderId), "Assinar")
    } catch(err) {
      console.log('signatureOrder err -> ', err)
      MessageModal.information('⚠ Erro', 'Algo deu errado. Tente novamente mais tarde');
    }
  }

  async validateUser(showModalError = true) {
    const { password } = this.state;

    try {
      await ProviderHelper.execute(this.authProvider.validateUser(password), "Autenticar",null,true);
      return true;
    } catch (err) {
      if (showModalError)
        MessageModal.information('⚠ Erro', 'Senha inválida')

      return false;
    }
  }

  render() {
    return (
      <Card
        style={this.props.style}
        className={this.props.className}
        title={this.props.title}
      >
        <div style={{ position: "relative" }}>
          <div>
            <C_Icon
              style={{ cursor: "pointer", position: "absolute", right: 0 }}
              icon="close" iconSize={25}
              action={() => this.props.onClose()}
            />
          </div>
        </div>
        <div style={{ width: "80%"}}>
          <span style={{ fontSize: 24, fontWeight: "bold" }}>{this.props.title}</span>
          <div className="md-cell md-cell--12 md-cell--bottom">
            <C_TextField
              name="password"
              value={this.state.password}
              onChange={(e) => this.setState({password: e.target.value})}
              type="password"
              label="Senha"
              placeholder="Senha"
            />
          </div>
          <div className="md-cell md-cell--12 md-cell--bottom">
            <C_CheckBox
              name="accept"
              onChange={(e)=> this.setState({ accept: e.target.value})}
              label={<div style={{ fontSize: 15, color: "#616161d9" }}>Concordo com todas as informações preenchidas na Ordem.</div>}
              type="checkbox"
              style={{ width: "100%"  }}
              checked={this.state.accept}
            />
          </div>
          <div style={{marginTop: 25}} className="md-grid">
            <C_Button
              secondary={true}
              label="CANCELAR"
              className="md-cell md-cell--6 md-cell--bottom"
              action={() => this.props.onClose()}
            />
            <C_Button
              disabled={!this.state.accept}
              className="md-cell md-cell--6 md-cell--bottom"
              primary={true}
              label="ASSINAR"
              action={() => this.signatureOrder()}
            />
          </div>
        </div>
      </Card>
    );
  }
}