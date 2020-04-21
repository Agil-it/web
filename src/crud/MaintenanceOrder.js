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
import {C_Button} from '../components/Button';
import C_SelectField from '../components/SelectField';
import C_CheckBox from '../components/CheckBox';
import C_Calendar from '../components/Calendar';
import C_RadioGroup from '../components/RadioGroup';
import { HandlerProvider } from '../providers/handler';
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
        maintenanceType: undefined,
        priority: undefined,
        superiorMachine: undefined,
        machine: undefined,
        workCenter:undefined,
        defectComponent: undefined,
        defectCause: undefined,
        descriptionCause:"",
        defectDiagnostic: undefined,
        descriptionDiagnostic:"",

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
        label: 'Lista',
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
              <C_SelectField
                name="maintenanceType"
                id="maintenanceType"
                value={this.state.fields.maintenanceType}
                onChange={this.onChange}
                type="text"
                label={"Tipo da Manutenção"}
                placeholder={"Selecione"}
                list={this.state.maintenanceType}
                required={true}
                style={{ width: 350 }}
              />
              <C_SelectField
                id="priority"
                name="priority"
                value={this.state.fields.priority}
                onChange={this.onChange}
                type="text"
                label={"Prioridade"}
                placeholder={"Selecione"}
                list={this.state.priority}
                required={true}
                style={{ width: 350, marginLeft: 30 }}
              />
            </div><br /><br />
            <div style={{ display: "flex", justifyContent: "left" }}>
              <C_TextField
                id="superiorMachine"
                name="superiorMachine"
                value={this.state.fields.superiorMachine}
                onChange={this.onChange}
                type="search"
                label="Equipamento Superior"
                placeholder="Equipamento Superior"
                rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
                required={true}
                css={{ width: 350 }}
              />
              <C_TextField
                id="machine"
                name="machine"
                value={this.state.fields.machine}
                onChange={this.onChange}
                type="search"
                label="Equipamento"
                placeholder="Equipamento"
                rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
                required={true}
                css={{ width: 350, marginLeft: 30 }}
              />
            </div><br></br>
            <div style={{ display: "flex", justifyContent: "left" }}>
              <C_TextField
                id="workCenter"
                name="workCenter"
                value={this.state.fields.workCenter}
                onChange={this.onChange}
                type="search"
                label="Centro de Trabalho"
                placeholder="Centro de Trabalho"
                rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
                required={true}
                css={{ width: 350 }}
              />
              <C_TextField
                id="defectComponent"
                name="defectComponent"
                value={this.state.fields.defectComponent}
                onChange={this.onChange}
                type="search"
                label="Componente Defeituoso"
                placeholder="Componente Defeituoso"
                rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
                required={true}
                css={{ width: 350, marginLeft: 30 }}
              />
            </div><br></br>
            <div style={{ display: "flex", justifyContent: "left" }}>
              <C_TextField
                id="defectCause"
                name="defectCause"
                value={this.state.fields.defectCause}
                onChange={this.onChange}
                type="search"
                label="Causa do Defeito"
                placeholder="Causa do Defeito"
                rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
                required={true}
                css={{ width: 350 }}
              />
              <C_TextField
                id="descriptionCause"
                name="descriptionCause"
                value={this.state.fields.descriptionCause}
                onChange={this.onChange}
                label="Descrição da Causa"
                placeholder="Descrição da Causa"
                required={true}
                css={{ width: 350, marginLeft: 30 }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "left" }}>
              <C_TextField
                id="defectDiagnostic"
                name="defectDiagnostic"
                value={this.state.fields.defectDiagnostic}
                onChange={this.onChange}
                type="search"
                label="Sintoma do Defeito"
                placeholder="Sintoma do Defeito"
                rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
                required={true}
                css={{ width: 350 }}
              />
              <C_TextField
                id="descriptionDiagnostic"
                name="descriptionDiagnostic"
                value={this.state.fields.descriptionDiagnostic}
                onChange={this.onChange}
                label="Descrição do Sintoma"
                placeholder="Descrição do Sintoma"
                required={true}
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