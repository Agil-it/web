import React, { Component } from 'react';
import {
  DialogContainer,
  Toolbar,
  FontIcon,
} from 'react-md';

import C_TextField from '../components/TextField';
import C_CrudButtons from '../components/CrudButtons';
import { C_Button } from '../components/Button';
import C_SelectField from '../components/SelectField';
import {C_CheckBox} from '../components/CheckBox';
import {C_Calendar} from '../components/Calendar';
import C_RadioGroup from '../components/RadioGroup';
import { HandlerProvider } from '../providers/handler';
import { UserProvider } from '../providers/User';
import { WorkCenterProvider } from '../providers/WorkCenter';
import { SectorProvider } from '../providers/Sector';
import C_AutoComplete from '../components/AutoComplete';

class CreateUser extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      list: [],
      listWorkCenter: [],
      listSectors: [],
      autocomplete: '',
      completeSector: '',
      completeWorkcenter: '',
      role: [{
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
      fields: this.getDefaultFields(),
    };

    this.provider = new HandlerProvider(new UserProvider(), "usuário")
    this.providerWorkCenter = new HandlerProvider(new WorkCenterProvider(), "centro de trabalho")
    this.providerSector = new HandlerProvider(new SectorProvider(), "setor")

    this.hideModal = this.hideModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
    this.clean = this.clean.bind(this);
    this.delete = this.delete.bind(this);
    this.autocompleteSelect = this.autocompleteSelect.bind(this);
    this.getdisplayDate = this.getdisplayDate.bind(this);
    this.generatePassword = this.generatePassword.bind(this);
  }

  componentDidMount() {
    this.loadingData();
    this.loadDefaultValues();
  }

  async loadingData() {
    let { list, listWorkCenter, listSectors } = this.state;

    let res1 = await this.provider.getList();
    if (res1.success) list = res1.data

    let res2 = await this.providerWorkCenter.getList();
    if (res2.success) listWorkCenter = res2.data

    let res3 = await this.providerSector.getList();
    if (res3.success) listSectors = res3.data

    this.setState({ list, listWorkCenter, listSectors })
  }

  getDefaultFields() {
    return {
      id: '',
      name: '',
      role: '',
      email: '',
      birthDate: '',
      contact: '',
      gender: 'male',
      employeeBadge: '',
      password: '',
      forceChangePassword: false,
      birthDate: '',
      workCenter: '',
      sector: '',
    };
  }

  loadDefaultValues() {
    const fields = this.getDefaultFields();

    this.setState({
      fields,
      autocomplete: '',
      completeWorkcenter: '', 
      completeSector: '',
    })
  }

  hideModal() {
    this.setState({ visible: false })
    this.props.onClose()
  }

  clean() {

    this.loadDefaultValues();
    this.loadingData();
  }


  delete() {
    let user = this.state.fields;
    this.provider.delete(user.id, this.clean)
  }

  save() {
    let user = this.state.fields;

    if (this.state.completeSector) user.sector = this.state.completeSector;

    if (this.state.completeWorkcenter) user.workCenter = this.state.completeWorkcenter;

    if (user.birthDate) {
      let arrayData = user.birthDate.split('/')
      user.birthDate = `${arrayData[2]}-${arrayData[1]}-${arrayData[0]}`
    }

    if (user.password) String(user.password);

    this.provider.save(user, this.clean)
  }

  onChange(e, name) {
    if (name === "id") this.setState({ autocomplete: e })
    else if (name === "workCenter") this.setState({ completeWorkcenter: e })
    else if (name === "sector") this.setState({ completeSector: e })
    else {
      let fields = this.state.fields;

      fields[e.target.name] = e.target.value;

      this.setState({ fields })
    }
  }

  formPreventDefault(event) {
    event.preventDefault()
  }

  autocompleteSelect(id, name) {

    if (name === 'id') {
      const user = this.state.list.find(element => element.id === id)

      if (!user || id === undefined) return this.clean();
  
      var displayBirthDate = this.getdisplayDate(user.birthDate);
  
      const fields = {
        id: user.id,
        name: user.name,
        role: user.role,
        email: user.email,
        birthDate: user.birthDate,
        contact: user.contact,
        gender: user.gender,
        employeeBadge: user.employeeBadge,
        forceChangePassword: user.forceChangePassword,
        birthDate: displayBirthDate,
        workCenter: user.workCenter,
        sector: user.sector,
        password: '',
      }
  
      this.setState({ 
        fields, 
        completeWorkcenter: fields.workCenter,
        completeSector: fields.sector
      })

    }
    else if (name == "workCenter") {
      let workCenter = this.state.listWorkcenter.find(element => element.id === id)
      this.setState({ workCenter })
    }
    else if (name == "sector") {
      let sector = this.state.listSectors.find(element => element.id === id)
      this.setState({ sector })
    }
  }

  getdisplayDate(date) {

    var formatDate = date.split("-");

    var dt = new Date(formatDate);
    var day = dt.getDate();
    var month = dt.getMonth();
    var year = dt.getFullYear();

    return `${day}/${month + 1}/${year}`;
  }

  generatePassword() {
    var fields = this.state.fields;

    fields.password = Math.random().toString(36).slice(2)

    return this.setState({ fields });
  }


  render() {
    console.log("CreateUser -> render -> this.state.fields", this.state.fields)

    const genders = [
      { label: 'Feminino', value: 'female' },
      { label: 'Masculino', value: 'male' }
    ]

    return (
      <DialogContainer
        id="simple-full-page-dialog"
        visible={this.state.visible}
        width="60%"
        height="100%"
        onHide={this.hideModal}
        dialogStyle={{ borderRadius: 5 }}
        aria-labelledby="simple-full-page-dialog-title"
      >
        <Toolbar
          fixed
          colored
          title="Cadastrar Usuários"
          style={{ borderRadius: 5 }}
          actions={<FontIcon style={{ cursor: "pointer" }} onClick={() => this.hideModal()}>close</FontIcon>}
        />
        <section className="md-toolbar-relative">
          <form ref={(el) => this.form = el} onSubmit={this.formPreventDefault}>
            <div className="md-grid">
              <div className="md-cell md-cell--6 md-cell--bottom">
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
                  style={{ width: "100%" }}
                  rightIcon={"search"}
                  description="name"
                />
              </div>
              <div className="md-cell md-cell--6 md-cell--bottom">
                <C_TextField
                  id="name"
                  name="name"
                  value={this.state.fields.name}
                  onChange={this.onChange}
                  label="Nome do Usuário"
                  placeholder="Nome do Usuário"
                />
              </div>
            </div>
            <div className="md-grid">
              <div className="md-cell md-cell--6 md-cell--bottom">
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
                  style={{ width: "100%" }}
                />
              </div>
              {this.state.fields.role == "sector_leader" ?
                <div className="md-cell md-cell--6 md-cell--bottom">
                  <C_AutoComplete
                    id="sector"
                    name="sector"
                    value={this.state.completeSector}
                    dataSelected={this.autocompleteSelect}
                    list={this.state.listSectors}
                    onChange={this.onChange}
                    type="search"
                    label="Setor"
                    placeholder="Setor"
                    style={{ width: "100%" }}
                    rightIcon="search"
                  />
                </div>
                : (this.state.fields.role == "maintainer" ?
                  <div className="md-cell md-cell--6 md-cell--bottom">
                    <C_AutoComplete
                      id="workCenter"
                      name="workCenter"
                      value={this.state.completeWorkcenter}
                      dataSelected={this.autocompleteSelect}
                      list={this.state.listWorkCenter}
                      onChange={this.onChange}
                      type="search"
                      label="Centro de Trabalho"
                      placeholder="Centro de Trabalho"
                      style={{ width: "100%" }}
                      rightIcon="search"
                    />
                  </div>
                : undefined)
              }
            </div>
            <div className="md-grid">
              <div className="md-cell md-cell--3 md-cell--bottom">
                <C_Button
                  style={{ width: 180 }}
                  primary={true}
                  label={<div style={{textAlign:"center"}}>Gerar senha</div>}
                  icon={<FontIcon>lock</FontIcon>}
                  action={() => this.generatePassword()}
                />
              </div>
              <div className="md-cell md-cell--9 md-cell--bottom">
                <C_CheckBox
                  name="forceChangePassword"
                  value={this.state.fields.forceChangePassword}
                  onChange={this.onChange}
                  label={<div style={{ fontSize: 15, color: "#616161d9" }}>Alterar Senha no Primeiro Acesso</div>}
                  type="checkbox"
                  style={{ width: "100%", textAlign: "center" }}
                  checked={this.state.fields.forceChangePassword}
                />
              </div>
            </div>
            <div className="md-grid">
              <div className="md-cell md-cell--6 md-cell--bottom">
                <C_TextField
                  name="email"
                  value={this.state.fields.email}
                  onChange={this.onChange}
                  label="Email"
                  placeholder="Email"
                  required={true}
                />
              </div>
              <div className="md-cell md-cell--6 md-cell--bottom">
                <C_TextField
                  name="password"
                  value={this.state.fields.password}
                  onChange={this.onChange}
                  type="password"
                  label="Senha"
                  placeholder="Senha"
                />
              </div>
            </div>
            <div className="md-grid">
              <div className="md-cell md-cell--6">
                <C_Calendar
                  fullWidth={true}
                  notInline={true}
                  id="birthDate"
                  name="birthDate"
                  value={this.state.fields.birthDate}
                  onChange={this.onChange}
                  label={"Data de Nascimento"}
                  cancelLabel={"Cancelar"}
                />
              </div>
              <div className="md-cell md-cell--6 md-cell--bottom">
                <C_TextField
                  name="contact"
                  value={this.state.fields.contact}
                  label="Telefone de Contato"
                  placeholder="Telefone de Contato"
                  fullWidth={true}
                  onChange={this.onChange}
                />
              </div>
            </div>
            <div className="md-grid">
              <div className="md-cell md-cell--6 md-cell--bottom">
                <fieldset style={{ borderRadius: 5, border: "1px solid silver", padding: 10}}>
                  <legend style={{ width: "auto", border: "none", paddingRight: 5, paddingLeft: 5, marginLeft: 10, color: "#666666a6", fontSize: 16}}>Gênero</legend>
                    <C_RadioGroup
                      id="gender"
                      name="gender"
                      value={this.state.fields.gender}
                      onChange={this.onChange}
                      options={genders}
                    />
                </fieldset>
              </div>
              <div className="md-cell md-cell--6 md-cell--bottom">
                <C_TextField
                  name="employeeBadge"
                  value={this.state.fields.employeeBadge}
                  onChange={this.onChange}
                  label="Crachá do Usuário"
                  placeholder="Crachá do Usuário"
                />
              </div>
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