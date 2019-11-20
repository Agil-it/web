import React, { Component } from 'react';
import {
  Button,
  DialogContainer,
  Divider,
  Toolbar,
  FontIcon,
} from 'react-md';

import C_TextField from '../components/TextField';
import C_CrudButtons from '../components/CrudButtons';
import C_Button from '../components/Button';
import C_SelectField from '../components/SelectField';
import C_CheckBox from '../components/CheckBox';
import C_Calendar from '../components/Calendar';
import C_RadioGroup from '../components/RadioGroup';
import { HandlerProvider } from '../providers/Handler';
// import { UserProvider } from '../providers/User';
import { ObjectHelper } from '../helpers/Object';


class CreateMaintenanceOrder extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedProfile: undefined,
      visible: true,
      priority: [{
        label: 'Urgente',
        value: 'urgent',
      },
      {
        label: 'Alta',
        value: 'high',
      },
      {
        label: 'Média',
        value: 'regular',
      },
      {
        label: 'Baixa',
        value: 'low',
      }],

      fields: {
        id: undefined,
        installationArea: undefined,
        maintenanceOrderType: undefined,
        classification: undefined,
        forceChangePassword: false,
        maintenanceType: undefined,
        email: "",
        contact: undefined,
        birthDate: undefined,
        gender: undefined,
        workCenter: undefined,
        employeeBadge: undefined
      },

      maintenanceType: [{
        label: 'Preventiva',
        value: 'default',
      },
      {
        label: 'Rota',
        value: 'route',
      },
      {
        label: 'List',
        value: 'list',
      }]
    };

    // this.provider = new HandlerProvider(new UserProvider(), "usuário")

    this.hideModal = this.hideModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
    this.clean = this.clean.bind(this);
    this.delete = this.delete.bind(this);
  }

  hideModal() {
    this.setState({ visible: false })
    this.props.onClose()
  }

  clean() {
    var fields = this.state.fields;

    ObjectHelper.clearFields(fields);
    this.setState({ fields });
  }

  delete() {
    let user = this.state.fields;
    this.provider.delete(user.id, this.clean)
  }

  save() {
    let user = this.state.fields;
    console.log("TCL: CreateUser -> save -> user", user)
    this.provider.save(user, this.clean)
  }

  onChange(e) {
    let fields = this.state.fields;

    fields[e.target.name] = e.target.value;
    this.setState({ fields })
  }

  formPreventDefault(event) {
    event.preventDefault()
  }

  render() {
    return (
      <DialogContainer
        id="simple-full-page-dialog"
        visible={this.state.visible}
        width="60%"
        height="100%"
        dialogStyle={{borderRadius:5}}
        aria-labelledby="simple-full-page-dialog-title"
      >
        <Toolbar
          fixed
          colored
          title="Cadastrar Ordem de Manutenção"
          style={{borderRadius:5}}
          actions={<FontIcon style={{ cursor: "pointer" }} onClick={() => this.hideModal()}>close</FontIcon>}
        />
        <section className="md-toolbar-relative">
          <form ref={(el) => this.form = el} onSubmit={this.formPreventDefault}>
            <div style={{ display: "flex", justifyContent: "left" }}>
              <C_TextField
                style={{ fontSize: 17 }}
                id="id"
                name="id"
                value={this.state.fields.id}
                onChange={this.onChange}
                type="search"
                label="Ordem de Manutenção"
                placeholder="Ordem de Manutenção"
                rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
                required={true}
                css={{ width: 350 }}
              />
              <C_TextField
                style={{ fontSize: 17 }}
                id="installationArea"
                name="installationArea"
                value={this.state.fields.installationArea}
                onChange={this.onChange}
                type="search"
                label="Local de Instalação"
                placeholder="Local de Instalação"
                rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
                required={true}
                css={{ width: 350, marginLeft: 30}}
              />
            </div><br></br>
            <div style={{ display: "flex", justifyContent: "left" }}>
                <C_TextField
                    style={{ fontSize: 17 }}
                    id="maintenanceOrderType"
                    name="maintenanceOrderType"
                    value={this.state.fields.maintenanceOrderType}
                    onChange={this.onChange}
                    type="search"
                    label="Tipo da Ordem de Manutenção"
                    placeholder="Tipo da Ordem de Manutenção"
                    rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
                    required={true}
                    css={{ width: 350 }}
                />
               <C_TextField
                    style={{ fontSize: 17 }}
                    id="classification"
                    name="classification"
                    value={this.state.fields.classification}
                    onChange={this.onChange}
                    type="search"
                    label="Classificação da Ordem"
                    placeholder="Classificação da Ordem"
                    rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
                    required={true}
                    css={{ width: 350, marginLeft: 30 }}
                />
            </div><br></br>
            <div style={{ display: "flex" }}>
              <div style={{ width: "50%", marginLeft: 20 }}>
                <C_Button
                  style={{ height: 50, width: "50%", display: "flex", justifyContent: "center", fontSize: 15 }}
                  primary={true}
                  label={"Gerar senha"}
                  icon={<FontIcon>lock</FontIcon>}
                />
              </div>
              <C_CheckBox
                name="forceChangePassword"
                value={this.state.fields.forceChangePassword}
                onChange={this.onChange}
                label={<div style={{ fontSize: 17, color: "#616161d9" }}>Alterar Senha no Primeiro Acesso</div>}
                type="checkbox"
                style={{}}
              />
            </div><br /><br />
            <div style={{ display: "flex", justifyContent: "left" }}>
              <C_TextField
                style={{ fontSize: 17 }}
                name="email"
                value={this.state.fields.email}
                onChange={this.onChange}
                label="Email"
                placeholder="Email"
                required={true}
                css={{ width: 350 }}
              />
              <C_TextField
                style={{ fontSize: 17 }}
                name="password"
                value={this.state.fields.password}
                onChange={this.onChange}
                type="password"
                label="Password"
                placeholder="Password"
                css={{ width: 350, marginLeft: 30 }}
              />
            </div><br></br>
            <div style={{ display: "flex", justifyContent: "left" }}>
              <C_Calendar
                id="birthDate"
                name="birthDate"
                value={this.state.fields.birthDate}
                onChange={this.onChange}
                label={<div style={{ fontSize: 17 }}>Data de Nascimento</div>}
                allDay
                cancelLabel={"Cancelar"}
                css={{ width: 350 }}
              />
              <C_TextField
                style={{ fontSize: 17 }}
                name="contact"
                value={this.state.fields.contact}
                onChange={this.onChange}
                label="Telefone de Contato"
                placeholder="Telefone de Contato"
                required={true}
                onChange={this.onChange}
                css={{ width: 350, marginLeft: 30, marginTop: 16 }}
              />
            </div><br></br>
            <div style={{ display: "flex", justifyContent: "left" }}>
              <C_RadioGroup
                name="gender"
                value={this.state.fields.gender}
                onChange={this.onChange}
                label={<div style={{ fontSize: 17, color: "#616161d9" }}>Gênero</div>}
                type="radio"
                style={{ width: 350 }}
                list={this.state.priority}
              />
              <C_TextField
                style={{ fontSize: 17 }}
                name="employeeBadge"
                value={this.state.fields.geemployeeBadgeder}
                onChange={this.onChange}
                label="Crachá do Usuário"
                placeholder="Crachá do Usuário"
                css={{ width: 350, marginLeft: 30 }}
              />
            </div>
          </form>
        </section>
        <C_CrudButtons
          onSave={this.save}
          onClean={this.clean}
          onDelete={this.delete}
          crudLevel={!!this.state.fields.id}
        />
      </DialogContainer>
    );
  }
}

export default CreateMaintenanceOrder;