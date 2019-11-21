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
import { UserProvider } from '../providers/User';
import { ObjectHelper } from '../helpers/Object';


class CreateUser extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedProfile: undefined,
      visible: true,
      genders: [{
        label: 'Feminino',
        value: 'female',
      },
      {
        label: 'Masculino',
        value: 'male',
      }],

      types: [{
        label: 'Componente',
        value: 'A',
      },
      {
        label: 'Setor',
        value: 'B',
      },
      {
        label: 'Equipamento',
        value: 'C',
      },
      {
        label: 'Tipo de Máquina',
        value: 'D',
      },
      {
        label: 'Equipamento Superior',
        value: 'E',
      }],

      fields: {
        id: undefined,
        name: undefined,
        role: undefined,
        sector: "",
        forceChangePassword: false,
        password: undefined,
        email: "",
        contact: undefined,
        birthDate: undefined,
        gender: undefined,
        workCenter: undefined,
        employeeBadge: undefined
      },

      profiles: [{
        label: 'Líder de Setor',
        value: 'sector_leader',
      },
      {
        label: 'Técnico',
        value: 'maintainer',
      },
      {
        label: 'Admin',
        value: 'administrator',
      }]
    };

    this.provider = new HandlerProvider(new UserProvider(), "usuário")

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
          title="Cadastrar Usuários"
          style={{borderRadius:5}}
          actions={<FontIcon style={{ cursor: "pointer" }} onClick={() => this.hideModal()}>close</FontIcon>}
        />
        <section className="md-toolbar-relative">
          <form ref={(el) => this.form = el} onSubmit={this.formPreventDefault}>
            <div style={{ display: "flex", justifyContent: "left" }}>
              <C_TextField
                id="id"
                name="id"
                value={this.state.fields.id}
                onChange={this.onChange}
                type="search"
                label="Código do Usuário"
                placeholder="Código do Usuário"
                rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
                required={true}
                css={{ width: 350 }}
              />
              <C_TextField
                name="name"
                value={this.state.fields.name}
                onChange={this.onChange}
                label="Nome do Usuário"
                placeholder="Nome do Usuário"
                css={{ width: 350, marginLeft: 30 }}
              />
            </div><br></br>
            <div style={{ display: "flex", justifyContent: "left" }}>
              <C_SelectField
                name="role"
                value={this.state.fields.role}
                onChange={this.onChange}
                type="text"
                label={"Perfil de Usuário"}
                placeholder="Selecione"
                list={this.state.profiles}
                required={false}
                style={{ width: 350 }}
              />
              {this.state.fields.role == "sector_leader" ?
                <C_TextField
                  name="sector"
                  value={this.state.fields.sector}
                  onChange={this.onChange}
                  type="search"
                  label="Setor"
                  placeholder="Setor"
                  rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
                  block paddedBlock
                  required={true}
                  css={{ width: 350, marginLeft: 30 }}
                />
                : (this.state.fields.role == "maintainer" ?
                  <C_TextField
                    name="workCenter"
                    value={this.state.fields.workCenter}
                    onChange={this.onChange}
                    type="search"
                    label="Centro de Trabalho"
                    placeholder="Centro de Trabalho"
                    rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
                    block paddedBlock
                    required={true}
                    onChange={this.onChange}
                    css={{ width: 350, marginLeft: 30 }}
                  /> : undefined)
              }
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
                name="email"
                value={this.state.fields.email}
                onChange={this.onChange}
                label="Email"
                placeholder="Email"
                required={true}
                css={{ width: 350 }}
              />
              <C_TextField
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
                label={"Data de Nascimento"}
                allDay
                cancelLabel={"Cancelar"}
                css={{ width: 350 }}
              />
              <C_TextField
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
                list={this.state.genders}
              />
              <C_TextField
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

export default CreateUser;