import React, { PureComponent } from 'react';
import { DialogContainer, Toolbar, FontIcon, Card } from 'react-md';
import C_TextField from '../components/TextField';
import C_CrudButtons from '../components/CrudButtons';
import C_SelectField from '../components/SelectField';
import { HandlerProvider } from '../providers/handler';
import { ObjectHelper } from '../helpers/Object';
import { MaintenanceOrderHelper as HelperOM } from '../helpers/MaintenanceOrder';
import C_AutoComplete from '../components/AutoComplete';
import { MaintenanceOrderProvider } from '../providers/MaintenanceOrder';
import { InstallationAreaProvider } from '../providers/InstallationArea';
import { OrderTypeProvider } from '../providers/OrderType';
import { ClassificationProvider } from '../providers/Classification';
import { MachineProvider } from '../providers/Machine';
import { OrderLayoutProvider } from '../providers/OrderLayout';
import { WorkCenterProvider } from '../providers/WorkCenter';
import { UserProvider } from '../providers/User';
import { C_Tabs } from '../components/Tabs';
import { MessageModal } from '../components/Message';
import { C_Table } from '../components/Table';
import { C_Button } from '../components/Button'
import { StringHelper } from '../helpers/String';
import {C_Icon} from '../components/Icon';

export default class CreateMaintenanceOrder extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      backgroundModal: StringHelper.backgroundModal(),
      visible: true,
      completeOrder: '', completeClassification: "", completeOrderType: '', completeArea: '', completeEquipment: '', completeWorkcenter: '',
      listEquipments: [], orderEquipments: [],
      listAreas: [], classifications: [],
      layouts: [], listUsers: [], listWorkcenter: [],
      listTypes: [], listOrders: [],
      fields: {},
      priority: [
        { label: 'Urgente', value: 'urgent' },
        { label: 'Alta', value: 'high' },
        { label: 'Média', value: 'medium' },
        { label: 'Baixa', value: 'low' },

      ],
      columns: [
        { name: "Equipamento", property: "equipment.description" },
        { name: "Tipo de Máquina", property: "equipment.machineType.description" },
        { name: "Excluir", icon: "delete", action: (index) => this.removeEquipment(index) },
      ],

      tabs: [
        { name: "Dados Gerais", value: "info_main" },
        { name: "Equipamentos", value: "equipments" },
        { name: "Operações", value: "operations" },
      ]
    };

    // this.provider = new HandlerProvider(new UserProvider(), "usuário")
    this.provider = new HandlerProvider(new MaintenanceOrderProvider(), "ordem de manutenção")
    this.providerEquipment = new HandlerProvider(new MachineProvider(), "equipamento")
    this.providerArea = new HandlerProvider(new InstallationAreaProvider(), "área de instalação")
    // this.providerOrderType = new HandlerProvider(new OrderTypeProvider(), "tipo de ordem")
    // this.providerClassification = new HandlerProvider(new ClassificationProvider(), "classificação da ordem")
    this.providerLayout = new HandlerProvider(new OrderLayoutProvider(), "layout da ordem")
    this.providerUser = new HandlerProvider(new UserProvider(), "usuário")
    this.providerWorkcenter = new HandlerProvider(new WorkCenterProvider(), "centro de trabalho")

    this.loadingData();

    this.hideModal = this.hideModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
    this.clean = this.clean.bind(this);
    this.delete = this.delete.bind(this);
    this.orderComplete = this.orderComplete.bind(this);
    this.equipmentComplete = this.equipmentComplete.bind(this);
    this.areaComplete = this.areaComplete.bind(this);
    this.workcenterComplete = this.workcenterComplete.bind(this);
    this.getOrder = this.getOrder.bind(this);
    this.getEquipment = this.getEquipment.bind(this);

  }

  async loadingData() {
    this.loadOrders();
    this.loadEquipments();
    this.loadAreas();
    // this.loadTypes();
    // this.loadClassifications();
    this.loadLayouts();
    this.loadUsers();
    this.loadWorkCenters();
  }

  async loadWorkCenters() {
    let listWorkcenter = this.state.listWorkcenter
    let response = await this.providerWorkcenter.getList();
    // console.log("CreateMaintenanceOrder -> layouts -> response", response)
    if (response.success) {
      listWorkcenter = response.data
    }
    this.setState({ listWorkcenter })
  }

  async loadUsers() {
    let listUsers = this.state.listUsers
    let response = await this.providerUser.getList();
    // console.log("CreateMaintenanceOrder -> layouts -> response", response)
    if (response.success) {
      listUsers = response.data
    }
    this.setState({ listUsers })
  }

  async loadLayouts() {
    let layouts = this.state.layouts;
    let response = await this.providerLayout.getList();
    // console.log("CreateMaintenanceOrder -> layouts -> response", response)
    if (response.success) {
      layouts = response.data
    }
    this.setState({ layouts })
  }

  // async loadClassifications() {
  //   let classifications = []
  //   let response = await this.providerClassification.getList();
  //   console.log("CreateMaintenanceOrder -> listAreas -> response", response)
  //   if (response.success) {
  //     classifications = response.data
  //   }
  //   this.setState({ classifications })
  // }

  // async loadTypes() {
  //   let listTypes = []
  //   let response = await this.providerOrderType.getList();
  //   console.log("CreateMaintenanceOrder -> listAreas -> response", response)
  //   if (response.success) {
  //     listTypes = response.data
  //   }
  //   this.setState({ listTypes })
  // }

  async loadAreas() {
    let listAreas = []
    let response = await this.providerArea.getList();
    // console.log("CreateMaintenanceOrder -> listAreas -> response", response)
    if (response.success) {
      listAreas = response.data
    }
    this.setState({ listAreas })
  }

  async loadEquipments() {
    let listEquipments = []
    let response = await this.providerEquipment.getList();
    // console.log("CreateMaintenanceOrder -> loadEquipments -> response", response)
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
    this.setState({
      fields,
      order: {}, orderEquipments: [],
      completeEquipment: "", completeArea: "", completeOrder: "",
      completeOrderType: "", completeClassification: "", completeWorkcenter: ""
    }, () => this.loadingData());
  }

  removeEquipment(index) {
    // console.log("CreateMaintenanceOrder -> removeEquipment -> index", index)
    let { orderEquipments } = this.state
    orderEquipments.splice(index, 1)

    this.setState({orderEquipments})
  }

  delete() {
    let order = this.state.fields;
    this.provider.delete(order.id, this.clean)
  }

  checkData() {
    const { installationArea, orderEquipments, workCenter, fields } = this.state
    const errors = [];

    if (!fields.orderNumber) errors.push("Número da Ordem");
    if (!fields.orderLayout) errors.push("Layout da Ordem");
    if (!fields.priority) errors.push("Prioridade da Ordem");
    if (!fields.solicitationUser) errors.push("Solicitante da Ordem");
    if (!workCenter) errors.push("Centro de Trabalho");
    if (!installationArea) errors.push("Local de Instalação");
    if (orderEquipments.length <= 0) errors.push("Adicione no mínimo 1 Equipamento na Ordem");

    return errors;
  }

  save() {

    const errors = this.checkData();

    if (errors.length > 0) {
      MessageModal.informationList("Erro", "Informe os campos obrigatórios", errors, null)

      return
    }

    let fields = this.state.fields;

    let orderEquipments = this.state.orderEquipments;

    for (let i = 0; i < orderEquipments.length; i++) {
      orderEquipments[i].installationArea = { id: this.state.installationArea.id }
    }

    let order = {
      id: fields.id,
      orderNumber: fields.orderNumber,
      orderEquipment: orderEquipments,
      workCenter: this.state.workCenter,
      orderLayout: {
        id: fields.orderLayout,
        type: fields.orderType,
        classification: fields.orderClassification
      },
      solicitationUser: {
        id: fields.solicitationUser
      },
      priority: fields.priority,
      description: fields.description,
      openedDate: new Date(),
      needStopping: false
    }
    this.provider.save(order, this.clean)
  }


  onChange(e, name) {

    if (name === "id") {
      this.setState({ completeOrder: e })
      return
    }

    if (name === "orderEquipmentId") {
      this.setState({ completeEquipment: e })
      return
    }

    if (name === "installationArea") {
      this.setState({ completeArea: e })
      return
    }

    if (name === "workCenter") {
      this.setState({ completeWorkcenter: e })
      return
    }

    if (e.target.name === "orderLayout") {

      const layout = this.getOrderLayout(e.target.value)
      let layoutType = layout.orderLayout;

      let fields = {
        ...this.state.fields,
        orderLayout: layout.id,
        orderClassification: layout.classification,
        orderType: layout.type
      }

      this.setState({ fields, layoutType })
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
      // console.log("CreateMaintenanceOrder -> getOrder -> order", order)
    }

    let fields = {
      id: order.id,
      orderNumber: order.orderNumber,
      priority: order.priority,
      machine: order && order.orderEquipment[0] ? order.orderEquipment[0].equipment.description : "",
      descriptionArea: order && order.orderEquipment[0] ? order.orderEquipment[0].installationArea.description : "",
      superiorMachine: order && order.orderEquipment[0] && order.orderEquipment[0].superiorEquipment ? order.orderEquipment[0].superiorEquipment.description : "",
      orderLayout: order.orderLayout.id,
      orderType: order.orderLayout.type,
      orderClassification: order.orderLayout.classification,
      description: order.description,
      solicitationUser: order.solicitationUser ? order.solicitationUser.id : undefined,
      workCenter: order.workCenter ? order.workCenter.description : "",
    }

    let installationArea = order && order.orderEquipment[0] ? order.orderEquipment[0].installationArea : {}
    let layoutType = order.orderLayout.orderLayout;

    this.setState({
      fields, installationArea, orderEquipments: order.orderEquipment,
      completeArea: fields.descriptionArea, completeWorkcenter: fields.workCenter,
      layoutType
    })
  }

  async getEquipment(id) {
    let orderEquipments = this.state.orderEquipments;

    let response = await this.providerEquipment.get(id);

    if (response.success) {
      orderEquipments.push({ equipment: response.data, createdBy: 1, updatedBy: 1 })
    }

    this.setState({ orderEquipments });
  }

  workcenterComplete(id, name) {
    if (id === undefined) {
      this.clean()
      return
    }

    let workCenter = this.state.listWorkcenter.find(element => element.id === id)

    this.setState({ workCenter })
    return
  }

  // classificationComplete(id, name) {
  //   if (id === undefined) {
  //     this.clean()
  //     return
  //   }

  //   let orderClassification = this.state.classifications.find(element => element.id === id)

  //   this.setState({ orderClassification })
  //   return
  // }

  // orderTypeComplete(id, name) {
  //   if (id === undefined) {
  //     this.clean()
  //     return
  //   }

  //   let orderType = this.state.listTypes.find(element => element.id === id)

  //   this.setState({ orderType })
  //   return
  // }

  areaComplete(id, name) {
    if (id === undefined) {
      this.clean()
      return
    }

    let installationArea = this.state.listAreas.find(element => element.id === id)

    this.setState({ installationArea })
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
    // console.log("CreateMaintenanceOrder -> orderComplete -> id", id)

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

  getOrderLayout(id){
    const  { layouts } = this.state
    const index = layouts.findIndex(layout => id === layout.id)

   if(index == -1) return {};

   return layouts[index];
  }

  render() {

    // console.log("render -> STATE", this.state)
    var { layoutType, layouts, fields, orderEquipments, tabs } = this.state;

    return (
      <div>

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
          <section style={{ position: "relative" }} className="md-toolbar-relative">
            {this.state.layoutType ?
              <div className="slideInLeft">
                <span style={{fontWeight:"bold", fontStyle:"italic", padding:"2px 12px", minWidth:100, borderRadius: 10, top: 35, right: 0, position: "absolute", textAlign: "center", fontSize: 15, fontFamily: "sans-serif", backgroundColor: "#424242", color: "white" }}>
                  {HelperOM.translate("layout", this.state.layoutType)}
                </span>
              </div>
            : undefined}
            <C_Tabs tabs={tabs} onClick={(selectedTab) => this.setState({ selectedTab })}>
              <form ref={(el) => this.form = el} onSubmit={this.formPreventDefault}>
                {!this.state.selectedTab || this.state.selectedTab == "info_main" ?
                  <div>
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
                          required={true}
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
                        />
                      </div>
                      <div className="md-cell md-cell--6 md-cell--bottom">
                        <C_SelectField
                          name="orderLayout"
                          id="orderLayout"
                          value={this.state.fields.orderLayout}
                          onChange={this.onChange}
                          labelElement="classification"
                          valueElement="id"
                          label={"Layout da Ordem"}
                          placeholder={"Selecione"}
                          list={this.state.layouts}
                          required={true}
                          style={{ width: "100%" }}
                        />                        
                      </div>
                    </div>
                    <div className="md-grid">
                      <div className="md-cell md-cell--6 md-cell--bottom">
                        <C_TextField
                          id="orderType"
                          name="orderType"
                          onChange={this.onChange}
                          type="text"
                          label="Tipo da Ordem de Manutenção"
                          placeholder="Tipo da Ordem de Manutenção"
                          value={this.state.fields.orderType}
                          disabled={true}
                        />
                      </div>
                      <div className="md-cell md-cell--6 md-cell--bottom">
                        <C_TextField
                          id="orderClassification"
                          name="orderClassification"
                          onChange={this.onChange}
                          type="text"
                          label="Classificação da Ordem"
                          placeholder="Classificação da Ordem"
                          value={this.state.fields.orderClassification}
                          disabled={true}
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
                          required={true}
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
                          id="workCenter"
                          name="workCenter"
                          onChange={this.onChange}
                          type="search"
                          list={this.state.listWorkcenter}
                          label="Centro de Trabalho"
                          placeholder="Centro de Trabalho"
                          rightIcon={"search"}
                          value={this.state.completeWorkcenter}
                          dataSelected={this.workcenterComplete}
                          required={true}
                        />
                      </div>
                      <div className="md-cell md-cell--6 md-cell--bottom">
                        <C_SelectField
                          name="solicitationUser"
                          id="solicitationUser"
                          value={this.state.fields.solicitationUser}
                          onChange={this.onChange}
                          type="text"
                          labelElement="name"
                          valueElement="id"
                          label={"Solicitante"}
                          placeholder={"Selecione"}
                          list={this.state.listUsers}
                          required={true}
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                    <div className="md-grid">
                      <div className="md-cell md-cell--12 md-cell--bottom">
                        <C_TextField
                          id="description"
                          name="description"
                          value={this.state.fields.description}
                          onChange={this.onChange}
                          type="text"
                          label="Descrição do Problema"
                          placeholder="Descrição do Problema"
                          required={false}
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                : undefined}

                {this.state.selectedTab == "equipments" ?
                  <div className="md-grid">
                    <div className="md-cell md-cell--6 md-cell--bottom">
                      <C_Button
                        secondary={true}
                        label="Adicionar Equipamentos"
                        action={() => {
                          this.setState({ addEquiments: true })
                        }}
                      />
                    </div>
                    <div className="md-cell md-cell--12 md-cell--bottom">
                      <C_Table
                        titleSize={16}
                        fontSize={14}
                        columns={this.state.columns}
                        showPagination={true}
                        rowsPerPage={5}
                        content={orderEquipments}
                        onClick={() => { return }}
                        textAlign="center"
                      />
                    </div>
                  </div>
                : undefined}
              </form>
            </C_Tabs>
          </section>
          <C_CrudButtons
            onSave={this.save}
            onClean={this.clean}
            onDelete={this.delete}
            crudLevel={!!this.state.fields.id}
          />

          {this.state.addEquiments ?
            <div style={this.state.backgroundModal}>
              <div style={{width:"100%", display: "flex", justifyContent: "center", position: "fixed", top: "20%", right: 0 }}>
                <AddEquipments
                  onClose={() => this.setState({addEquiments:false})}
                />
              </div>
            </div>
          : undefined}
        </DialogContainer>
      </div>
    );
  }
}
export class AddEquipments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render(){
    console.log("Chamou o AddEquipments");
    
    return (
      <Card style={{width:"90%", padding: 20, borderRadius: 5}}>
        <div style={{ position: "relative" }}>
          <div>
            <C_Icon
              style={{ cursor: "pointer", position: "absolute", right: 0 }}
              icon="close" iconSize={25}
              action={() => this.props.onClose()}
            />
          </div>
          <div>
            <span style={{ fontSize: 24, fontWeight: "bold" }}>{'EQUIPAMENTOS'}</span>
          </div>
        </div>
      </Card>
    )
  }
}

/* <div className="md-cell md-cell--6 md-cell--bottom">
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
    />
  </div> */
/* <div className="md-grid">
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
    <div className="md-cell md-cell--12 md-cell--bottom">
      <C_AutoComplete
        id="orderEquipmentId"
        name="orderEquipmentId"
        onChange={this.onChange}
        style={{ pointerEvents: layoutType === "default" && orderEquipments.length >= 1 ? "none" : undefined}}
        type="search"
        disabled={layoutType === "default" && orderEquipments.length >= 1}
        list={this.state.listEquipments}
        label="Adicionar Equipamento"
        placeholder="Adicionar Equipamento"
        rightIcon={"search"}
        value={this.state.completeEquipment}
        dataSelected={this.equipmentComplete}
      />
    </div>

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
</div> */
