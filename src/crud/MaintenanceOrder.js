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
import { InstallationAreaProvider } from '../providers/InstallationArea';
import { OrderTypeProvider } from '../providers/OrderType';
import { ClassificationProvider } from '../providers/Classification';
import { MachineProvider } from '../providers/Machine';
import { C_Button } from '../components/Button';
import C_Card  from '../components/Card';
import { C_Icon } from '../components/Icon';

class CreateMaintenanceOrder extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedProfile: undefined, visible: true,
      completeOrder: '', completeClassification: "", completeOrderType: '', completeArea: '', completeEquipment: '',
      listEquipments: [],
      orderEquipments: [],
      listAreas : [],
      classifications: [],
      listTypes: [],
      listOrders: [],
      fields: {},
      priority: [
        { label: 'Urgente', value: 'urgent' },
        { label: 'Alta', value: 'high' },
        { label: 'Média', value: 'medium' },
        { label: 'Baixa', value: 'low' },

      ],
      orderLayout: [
        { label: 'Preventiva/Corretiva', value: 'default' },
        { label: 'Rota', value: 'route' },
        { label: 'Lista', value: 'list' },
      ]
    };

    // this.provider = new HandlerProvider(new UserProvider(), "usuário")
    this.provider = new HandlerProvider(new MaintenanceOrderProvider(), "ordem de manutenção")
    this.providerEquipment = new HandlerProvider(new MachineProvider(), "equipamento")
    this.providerArea = new HandlerProvider(new InstallationAreaProvider(), "área de instalação")
    this.providerOrderType = new HandlerProvider(new OrderTypeProvider(), "tipo de ordem")
    this.providerClassification = new HandlerProvider(new ClassificationProvider(), "classificação da ordem")

    this.loadingData();

    this.hideModal = this.hideModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
    this.clean = this.clean.bind(this);
    this.delete = this.delete.bind(this);
    this.orderTypeComplete = this.orderTypeComplete.bind(this);
    this.orderComplete = this.orderComplete.bind(this);
    this.equipmentComplete = this.equipmentComplete.bind(this);
    this.areaComplete = this.areaComplete.bind(this);
    this.classificationComplete = this.classificationComplete.bind(this);
    this.getOrder = this.getOrder.bind(this);
    this.getEquipment = this.getEquipment.bind(this);

  }

  async loadingData(){
    this.loadOrders();
    this.loadEquipments();
    this.loadAreas();
    this.loadTypes();
    this.loadClassifications();
  }

  async loadClassifications() {
    let classifications = []
    let response = await this.providerClassification.getList();
    console.log("CreateMaintenanceOrder -> listAreas -> response", response)
    if (response.success) {
      classifications = response.data
    }
    this.setState({ classifications })
  }

  async loadTypes(){
    let listTypes = []
    let response = await this.providerOrderType.getList();
    console.log("CreateMaintenanceOrder -> listAreas -> response", response)
    if (response.success) {
      listTypes = response.data
    }
    this.setState({ listTypes })
  }

  async loadAreas() {
    let listAreas = []
    let response = await this.providerArea.getList();
    console.log("CreateMaintenanceOrder -> listAreas -> response", response)
    if (response.success) {
      listAreas = response.data
    }
    this.setState({ listAreas })
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


  async loadOrders() {
    let listOrders = []
    let response = await this.provider.getList();
    if (response.success) {
      listOrders = response.data
    }
    this.setState({ listOrders })
  }

  hideModal() {
    this.setState({ visible: false })
    this.props.onClose()
  }

  clean() {
    var fields = this.state.fields;

    ObjectHelper.clearFields(fields);
    this.setState({ fields,  
      order: {}, orderEquipments: [],
      completeEquipment: "", completeArea: "", completeOrder: "",
      completeOrderType: "", completeClassification: ""
    });

  }

  delete() {
    let order = this.state.fields;
    this.provider.delete(order.id, this.clean)
  }

  save() {
    let fields = this.state.fields;

    let orderEquipments = this.state.orderEquipments;

    for (let i = 0; i < orderEquipments.length; i++) {
      orderEquipments[i].installationArea = { id: this.state.installationArea.id}
    }

    let order = {
      orderNumber: fields.orderNumber,
      orderEquipment: orderEquipments,
      orderLayout: {
        id: 1
      },
      priority: fields.priority,
      openedDate: new Date(),
      orderType: {
        id: this.state.orderType.id
      },
      orderClassification: {
        id: this.state.orderClassification.id
      },
      needStopping: false
    }
    this.provider.save(order, this.clean)
  }


  onChange(e, name) {
    if (name === "id") {
      this.setState({ completeOrder: e })
      return
    }

    if (name === "orderEquipmentId"){
      this.setState({ completeEquipment: e })
      return
    }

    if (name === "installationArea") {
      this.setState({ completeArea: e })
      return
    }

    if (name === "orderType") {
      this.setState({ completeOrderType: e })
      return
    }

    if (name === "orderClassification") {
      this.setState({ completeClassification: e })
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
      console.log("CreateMaintenanceOrder -> getOrder -> order", order)
    }

    let fields = {
      orderNumber: order.orderNumber,
      priority: order.priority,
      machine: order && order.orderEquipment[0] ? order.orderEquipment[0].equipment.description : "",
      descriptionArea: order && order.orderEquipment[0] ? order.orderEquipment[0].installationArea.description : "",
      superiorMachine: order && order.orderEquipment[0] && order.orderEquipment[0].superiorEquipment ? order.orderEquipment[0].superiorEquipment.description : "",
      orderLayout: order.orderLayout.orderLayout,
      descriptionClassification: order.orderClassification.description,
      descriptionOrderType: order.orderType.description,
    }

    let installationArea = order && order.orderEquipment[0] ? order.orderEquipment[0].installationArea : {}
    let orderType = order.orderType.description
    let orderClassification = order.orderClassification.description,


    this.setState({ 
      fields, installationArea, orderType, orderClassification, 
      completeOrderType: fields.descriptionOrderType,
      completeClassification: fields.descriptionClassification,
      completeArea: fields.descriptionArea,
      orderEquipments: order.orderEquipment 
    })
  }

  async getEquipment(id) {
    let orderEquipments = this.state.orderEquipments;

    let response = await this.providerEquipment.get(id);

    if (response.success) {
      orderEquipments.push({equipment: response.data, createdBy:1, updatedBy:1})
    }

    this.setState({ orderEquipments });
  }

  classificationComplete(id, name) {
    if (id === undefined) {
      this.clean()
      return
    }

    let orderClassification = this.state.classifications.find(element => element.id === id)

    this.setState({ orderClassification })
    return
  }

  areaComplete(id, name){
    if (id === undefined) {
      this.clean()
      return
    }

    let installationArea = this.state.listAreas.find(element => element.id === id)

    this.setState({ installationArea })
    return
  }

  orderTypeComplete(id, name) {
    if (id === undefined) {
      this.clean()
      return
    }

    let orderType = this.state.listTypes.find(element => element.id === id)

    this.setState({ orderType })
    return
  }

  equipmentComplete(id, name) {
    if (id === undefined) {
      this.clean()
      return
    }

    let equipment = this.state.listEquipments.find(element => element.id === id)

    this.getEquipment(equipment.id)
  }

  orderComplete(id, name) {
  console.log("CreateMaintenanceOrder -> orderComplete -> id", id)

    if (id === undefined) {
      this.clean()
      return
    }

    let item = this.state.listOrders.find(element => element.id === id)

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
                  description="orderNumber"
                  onChange={this.onChange}
                  type="search"
                  list={this.state.listOrders}
                  label="Buscar Ordem de Manutenção"
                  placeholder="Buscar Ordem de Manutenção"
                  rightIcon={"search"}
                  value={this.state.completeOrder}
                  dataSelected={this.orderComplete}
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
                <C_AutoComplete
                  id="orderType"
                  name="orderType"
                  onChange={this.onChange}
                  type="search"
                  list={this.state.listTypes}
                  label="Tipo da Ordem de Manutenção"
                  placeholder="Tipo da Ordem de Manutenção"
                  rightIcon={"search"}
                  value={this.state.completeOrderType}
                  dataSelected={this.orderTypeComplete}
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
                <C_AutoComplete
                  id="installationArea"
                  name="installationArea"
                  onChange={this.onChange}
                  type="search"
                  list={this.state.listAreas}
                  label="Local de Instalação"
                  placeholder="Local de Instalação"
                  rightIcon={"search"}
                  value={this.state.completeArea}
                  dataSelected={this.areaComplete}
                />
              </div>
              <div className="md-cell md-cell--6 md-cell--bottom">
                <C_AutoComplete
                  id="orderClassification"
                  name="orderClassification"
                  onChange={this.onChange}
                  type="search"
                  list={this.state.classifications}
                  label="Classificação da Ordem"
                  placeholder="Classificação da Ordem"
                  rightIcon={"search"}
                  value={this.state.completeClassification}
                  dataSelected={this.classificationComplete}
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
                  rightIcon={"search"}
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
                  rightIcon={"search"}
                  value={this.state.completeEquipment}
                  dataSelected={this.equipmentComplete}
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
                      style={{cursor:"pointer", position:"absolute", right:0 }} 
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
                  rightIcon={"search"}
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
                  rightIcon={"search"}
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
                  rightIcon={"search"}
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
                  rightIcon={"search"}
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