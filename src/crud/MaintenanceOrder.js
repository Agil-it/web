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
import C_SelectField from '../components/SelectField';
import { HandlerProvider } from '../providers/handler';
import { ObjectHelper } from '../helpers/Object';
import C_AutoComplete from '../components/AutoComplete';
import { MaintenanceOrderProvider } from '../providers/MaintenanceOrder';
import { MachineProvider } from '../providers/Machine';
import { C_Button } from '../components/Button';
import C_Card  from '../components/Card';
import { C_Icon } from '../components/Icon';

class CreateMaintenanceOrder extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedProfile: undefined,
      visible: true,
      autocomplete: '',
      autocompleteEquipment: '',
      listEquipments: [],
      orderEquipments: [],
      list: [],
      fields: {},
      priority: [
        { label: 'Urgente', value: 'urgent' },
        { label: 'Alta', value: 'high' },
        { label: 'Média', value: 'medium' },
        { label: 'Baixa', value: 'low' },

      ],
      orderLayout: [
        { label: 'Preventiva', value: 'default' },
        { label: 'Rota', value: 'route' },
        { label: 'Lista', value: 'list' },
      ]
    };

    // this.provider = new HandlerProvider(new UserProvider(), "usuário")
    this.provider = new HandlerProvider(new MaintenanceOrderProvider(), "ordem de manutenção")
    this.providerEquipment = new HandlerProvider(new MachineProvider(), "equipamento")

    this.loadList();
    this.loadEquipments();

    this.hideModal = this.hideModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
    this.clean = this.clean.bind(this);
    this.delete = this.delete.bind(this);
    this.autocompleteSelect = this.autocompleteSelect.bind(this);
    this.autoCompleteEquipment = this.autoCompleteEquipment.bind(this);
    this.getOrder = this.getOrder.bind(this);
    this.getEquipment = this.getEquipment.bind(this);

  }

  async loadEquipments() {
    let listEquipments = []
    let response = await this.providerEquipment.getList();
    console.log("CreateMaintenanceOrder -> loadEquipments -> response", response)
    if (response.success) {
      listEquipments = response.data
    }
    this.setState({ listEquipments })
  }

  async loadList() {
    let list = []
    let response = await this.provider.getList();
    if (response.success) {
      list = response.data
    }
    this.setState({ list })
  }

  hideModal() {
    this.setState({ visible: false })
    this.props.onClose()
  }

  clean() {
    var fields = this.state.fields;
    let autocomplete = ''

    ObjectHelper.clearFields(fields);
    this.setState({ fields, autocomplete, order: {}, autocompleteEquipment: "", orderEquipments: [] });

  }

  delete() {
    let order = this.state.fields;
    this.provider.delete(order.id, this.clean)
  }

  save() {
    let fields = this.state.fields;

    let order = {
      orderNumber: fields.orderNumber,
      orderEquipment: this.state.orderEquipments,
      orderLayout: {
        id: 1
      },
      priority: fields.priority,
      openedDate: new Date(),
      orderType: {
        id: 1
      },
      orderClassification: {
        id: 1
      },
      needStopping: false
    }
    this.provider.save(order, this.clean)
  }


  onChange(e, name) {
    if (name === "id") {
      this.setState({ autocomplete: e })
      return
    }

    if (name === "orderEquipmentId"){
      this.setState({ autocompleteEquipment: e })
      return
    }

    let fields = this.state.fields;

    fields[e.target.name] = e.target.value;
    this.setState({ fields })

  }

  async getOrder(id) {

    let order = {};
    let response = await this.provider.get(id);

    if (response.success) {
      order = response.data
    }

    let fields = {
      orderNumber: order.orderNumber,
      priority: order.priority,
      machine: order && order.orderEquipment[0] ? order.orderEquipment[0].equipment.description : "",
      installationArea: order && order.orderEquipment[0] ? order.orderEquipment[0].installationArea.description : "",
      superiorMachine: order && order.orderEquipment[0] ? order.orderEquipment[0].superiorEquipment.description : "",
      orderLayout: order.orderLayout.orderLayout,
      classification: order.orderClassification.description,
      maintenanceOrderType: order.orderType.description,
    }

    this.setState({ fields, orderEquipments: order.orderEquipment })
  }

  async getEquipment(id) {
    let orderEquipments = this.state.orderEquipments;

    let response = await this.providerEquipment.get(id);

    if (response.success) {
      orderEquipments.push({equipment: response.data, createdBy:1, updatedBy:1})
    }

    this.setState({ orderEquipments });
  }

  autoCompleteEquipment(id, name) {
    if (id === undefined) {
      this.clean()
      return
    }

    let equipment = this.state.listEquipments.find(element => element.id === id)

    this.getEquipment(equipment.id)
  }

  autocompleteSelect(id, name) {

    if (id === undefined) {
      this.clean()
      return
    }

    let item = this.state.list.find(element => element.id === id)

    this.getOrder(item.id)
  }

  formPreventDefault(event) {
    event.preventDefault()
  }

  render() {

    console.log("render -> STATE", this.state)

    var orderEquipments = this.state.orderEquipments;

    return (
      <DialogContainer
        id="simple-full-page-dialog"
        visible={this.state.visible}
        width="60%"
        height="100%"
        dialogStyle={{ borderRadius: 5 }}
        aria-labelledby="simple-full-page-dialog-title"
      >
        <Toolbar
          fixed
          colored
          title="Cadastrar Ordem de Manutenção"
          style={{ borderRadius: 5 }}
          actions={<FontIcon style={{ cursor: "pointer" }} onClick={() => this.hideModal()}>close</FontIcon>}
        />
        <section className="md-toolbar-relative">
          <form ref={(el) => this.form = el} onSubmit={this.formPreventDefault}>
            <div className="md-grid">
              <div className="md-cell md-cell--12 md-cell--bottom">
                <C_AutoComplete
                  id="id"
                  name="id"
                  description={"orderNumber"}
                  onChange={this.onChange}
                  type="search"
                  list={this.state.list}
                  label="Buscar Ordem de Manutenção"
                  placeholder="Buscar Ordem de Manutenção"
                  rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
                  value={this.state.autocomplete}
                  dataSelected={this.autocompleteSelect}
                // css={{ width: 350 }}
                />
              </div>
              <div className="md-cell md-cell--6 md-cell--bottom">
                <C_TextField
                  id="orderNumber"
                  name="orderNumber"
                  value={this.state.fields.orderNumber}
                  onChange={this.onChange}
                  type="search"
                  label="Número da Ordem"
                  placeholder="Número da Ordem"
                  required={true}
                // css={{ width: 350, marginLeft: 30}}
                />
              </div>
              <div className="md-cell md-cell--6 md-cell--bottom">
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
                // css={{ width: 350, marginLeft: 30}}
                />
              </div>
            </div>
            <div className="md-grid">
              <div className="md-cell md-cell--6 md-cell--bottom">
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
                />
              </div>
              <div className="md-cell md-cell--6 md-cell--bottom">
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
                />
              </div>
            </div>
            <div className="md-grid">
              <div className="md-cell md-cell--6 md-cell--bottom">
                <C_SelectField
                  name="orderLayout"
                  id="orderLayout"
                  value={this.state.fields.orderLayout}
                  onChange={this.onChange}
                  type="text"
                  label={"Layout da Ordem"}
                  placeholder={"Selecione"}
                  list={this.state.orderLayout}
                  required={true}
                  style={{ width: "100%" }}
                />
              </div>
              <div className="md-cell md-cell--6 md-cell--bottom">
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
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <div className="md-grid">
              <div className="md-cell md-cell--6 md-cell--bottom">
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
                // css={{ width: 350 }}
                />
              </div>
              <div style={{ position: "relative" }} className="md-cell md-cell--6 md-cell--bottom">
                <C_AutoComplete
                  id="orderEquipmentId"
                  name="orderEquipmentId"
                  onChange={this.onChange}
                  type="search"
                  list={this.state.listEquipments}
                  label="Adicionar Equipamento"
                  placeholder="Adicionar Equipamento"
                  rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
                  value={this.state.autocompleteEquipment}
                  dataSelected={this.autoCompleteEquipment}
                // css={{ width: 350 }}
                />

                {orderEquipments && orderEquipments.length > 0 ?
                  <div onClick={() => this.setState({ showModalEquipments: true })} className="slideInRight" style={{ alignItems: "center", display: "flex", left: 0, position: "absolute" }}>
                    <div className="effectfront" style={{ cursor: "pointer", padding: 5, backgroundColor: "#A40003", color: "white", width: 30, height: 30, borderRadius: 22 }}>
                      <div style={{ fontSize: 16, textAlign: "center" }}>{orderEquipments.length}</div>
                    </div>
                    <div style={{ color: "#A40003", marginLeft: 10, fontSize: 14 }}>{orderEquipments.length == 1 ? "Equipamento Adicionado!" : "Equipamentos Adicionados!"}</div>
                  </div>
                : undefined}

                {this.state.showModalEquipments && orderEquipments.length > 0 ?
                  <div className="zoomIn" style={{ position:"absolute", width:"100%", zIndex:2}}>
                    <C_Icon 
                      style={{cursor:"pointer", margin:10, position:"absolute", right:0 }} 
                      icon="close"
                      action={() => this.setState({showModalEquipments:false})}
                    />
                    {orderEquipments.map((item, i ) => 
                      <div>
                        <div style={{ position: "relative" }}>
                          <C_Icon
                            iconSize={16}
                            style={{ color:"#A40003", cursor: "pointer", position: "absolute", top: 0, margin:10 }}
                            icon="delete"
                            action={() => {
                              orderEquipments.splice(i, 1);

                              this.setState({ orderEquipments })

                            }}
                          />
                        </div>
                        <div>
                          <C_Card
                            icon={i+1}
                            title={<div style={{ fontWeight: "bold" }}>{item.equipment.description}</div>}
                            subtitle={item.equipment.machineType.description}
                            style={{width:"100%"}}
                          />                        
                        </div>
                      </div>
                    )}
                  </div>
                : undefined }
              </div>
            </div>
            <div className="md-grid">
              <div className="md-cell md-cell--6 md-cell--bottom">
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
                // css={{ width: 350 }}
                />
              </div>
              <div className="md-cell md-cell--6 md-cell--bottom">
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
                // css={{ width: 350, marginLeft: 30 }}
                />
              </div>
            </div>
            <div className="md-grid">
              <div className="md-cell md-cell--6 md-cell--bottom">
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
                // css={{ width: 350 }}
                />
              </div>
              <div className="md-cell md-cell--6 md-cell--bottom">
                <C_TextField
                  id="descriptionCause"
                  name="descriptionCause"
                  value={this.state.fields.descriptionCause}
                  onChange={this.onChange}
                  label="Descrição da Causa"
                  placeholder="Descrição da Causa"
                  required={true}
                // css={{ width: 350, marginLeft: 30 }}
                />
              </div>
            </div>
            <div className="md-grid">
              <div className="md-cell md-cell--6 md-cell--bottom">
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
                // css={{ width: 350 }}
                />
              </div>
              <div className="md-cell md-cell--6 md-cell--bottom">
                <C_TextField
                  id="descriptionDiagnostic"
                  name="descriptionDiagnostic"
                  value={this.state.fields.descriptionDiagnostic}
                  onChange={this.onChange}
                  label="Descrição do Sintoma"
                  placeholder="Descrição do Sintoma"
                  required={true}
                // css={{ width: 350, marginLeft: 30 }}
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

export default CreateMaintenanceOrder;