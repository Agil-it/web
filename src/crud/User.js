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
import { HandlerProvider } from '../providers/handler';
import { UserProvider } from '../providers/User';
import { ObjectHelper } from '../helpers/Object';
import C_AutoComplete from '../components/AutoComplete';

class CreateUser extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      list:[],
      fields: {},
      autocomplete: '',
      role : [{
        name: 'Líder de Setor',
        id: 'sector_leader',
      },
      {
        name: 'Técnico',
        id: 'maintainer',
      },
      {
        name: 'Admin',
        id: 'administrator',
      }],
      
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
      }]
    };

    this.provider = new HandlerProvider(new UserProvider(), "usuário")
    this.loadList();
    this.loadDefaultValues();

    this.hideModal = this.hideModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
    this.clean = this.clean.bind(this);
    this.delete = this.delete.bind(this);
    this.autocompleteSelect = this.autocompleteSelect.bind(this);
    this.getdisplayDate = this.getdisplayDate.bind(this);
    this.generatePassword = this.generatePassword.bind(this);
  }

  async loadList() {
    let list = []
    let response = await this.provider.getList();
    if (response.success) {
      list = response.data
    }
    this.setState({ list })
  }

  loadDefaultValues() {
    this.setState({
      fields: {
        password: undefined,
        gender: 'male'
      },
      autocomplete: ''
    })
  }

  hideModal() {
    this.setState({ visible: false })
    this.props.onClose()
  }

  clean() {

    this.loadDefaultValues();
    this.loadList();
  }


  delete() {
    let user = this.state.fields;
    this.provider.delete(user.id, this.clean)
  }

  save() {
    let user = this.state.fields;
    if(user.birthDate){
      let arrayData = user.birthDate.split('/')
      user.birthDate = `${arrayData[2]}-${arrayData[1]}-${arrayData[0]}`
    }

    if(user.password) String(user.password);
    console.log("CreateUser -> save -> user", user)
  
    this.provider.save(user, this.clean)
  }

  onChange(e, name) {

    if (name === "id") {
      this.setState({ autocomplete: e })
      return
    }

    let fields = this.state.fields;

    fields[e.target.name] = e.target.value;

    this.setState({ fields })
  }

  formPreventDefault(event) {
    event.preventDefault()
  }

  autocompleteSelect(id, name) {

    if (id === undefined) {
      this.clean()
      return
    }

    let item = this.state.list.find(element => element.id === id)

    var displayBirthDate = this.getdisplayDate(item.birthDate);

    let fields = {
      id: item.id,
      name: item.name,
      role: item.role,
      email: item.email,
      birthDate: item.birthDate,
      contact: item.contact,
      gender: item.gender,
      employeeBadge: item.employeeBadge,
      forceChangePassword: item.forceChangePassword,
      birthDate: displayBirthDate
    }    

    this.setState({ fields })
  }

  getdisplayDate(date){

    var formatDate = date.split("-");

    var dt = new Date(formatDate);
    var day = dt.getDate();
    var month = dt.getMonth();
    var year = dt.getFullYear();

    return `${day}/${month + 1}/${year}`;
  }

  generatePassword(){
    var fields = this.state.fields;

    fields.password = Math.random().toString(36).slice(2)

    return this.setState({fields});
  }


  render() {
    console.log("CreateUser -> render -> this.state.fields", this.state.fields)
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
              <C_AutoComplete
                id="id"
                name="id"
                value={this.state.autocomplete}
                dataSelected={this.autocompleteSelect}
                list={this.state.list}
                onChange={this.onChange}
                type="search"
                label="Buscar Usuário"
                placeholder="Buscar Usuário"
                style={{ width: 350 }}
                rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
                description="name"
              />
              <C_TextField
                id="name"
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
                id="role"
                name="role"
                value={this.state.fields.role}
                onChange={this.onChange}
                label={"Perfil de Usuário"}
                labelElement="name"
                valueElement="id"
                list={this.state.role}
                required={false}
                style={{ width: 350 }}
                listStyle={{width:350}}
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
                  action={() => this.generatePassword()}
                />
              </div>
              <C_CheckBox
                name="forceChangePassword"
                value={this.state.fields.forceChangePassword}
                onChange={this.onChange}
                label={<div style={{ fontSize: 17, color: "#616161d9" }}>Alterar Senha no Primeiro Acesso</div>}
                type="checkbox"
                style={{}}
                checked={this.state.fields.forceChangePassword}
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
                label="Senha"
                placeholder="Senha"
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
                checked={false}
                style={{ width: 350 }}
                list={this.state.genders}
              />
              <C_TextField
                name="employeeBadge"
                value={this.state.fields.employeeBadge}
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