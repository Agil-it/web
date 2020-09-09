import React, { PureComponent } from 'react';
import '../index.css';
import { DialogContainer, Toolbar, FontIcon, Card } from 'react-md';
import C_TextField from '../components/TextField';
import C_CrudButtons from '../components/CrudButtons';
import C_SelectField from '../components/SelectField';
import { HandlerProvider } from '../providers/handler';
import { ObjectHelper } from '../helpers/Object';
import { MaintenanceOrderHelper as HelperOM } from '../helpers/MaintenanceOrder';
import C_AutoComplete from '../components/AutoComplete';
import { CauseProvider } from '../providers/Cause';
import { DiagnosticProvider } from '../providers/Diagnostic';
import { MaintenanceOrderProvider } from '../providers/MaintenanceOrder';
import { InstallationAreaProvider } from '../providers/InstallationArea';
import { SuperiorMachineProvider } from '../providers/SuperiorMachine';
import { MachineProvider } from '../providers/Machine';
import { OrderLayoutProvider } from '../providers/OrderLayout';
import { WorkCenterProvider } from '../providers/WorkCenter';
import { UserProvider } from '../providers/User';
import { OrderOperationProvider } from '../providers/OrderOperation';
import { C_Tabs } from '../components/Tabs';
import { MessageModal } from '../components/Message';
import { C_Operations } from '../components/Operations';
import { C_Table } from '../components/Table';
import { C_Button } from '../components/Button'
import { StringHelper } from '../helpers/String';
import { C_Modal } from './Modal';
import C_RadioGroup from '../components/RadioGroup';

export default class CreateMaintenanceOrder extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      backgroundModal: StringHelper.backgroundModal(),
      styleMessage: StringHelper.styleMessage(),
      visible: true,
      completeOrder: '',
      completeWorkcenter: '',
      listWorkcenter: [],
      listOrders: [],
      fields: {
        orderEquipment: [],
      },
      priority: [
        { label: 'Urgente', value: 'urgent' },
        { label: 'Alta', value: 'high' },
        { label: 'Média', value: 'medium' },
        { label: 'Baixa', value: 'low' },

      ],
      columns: [
        { name: "Equipamento", property: "equipment.description" },
        { name: "Tipo Máquina", property: "equipment.machineType.description" },
        { name: "Local Inst.", property: "installationArea.description" },
        { name: "Setor.", property: "installationArea.sector.description" },
        { name: "Excluir", icon: "delete", action: (index) => this.removeEquipment(index) },
      ],

      tabs: [
        { name: "Dados Gerais", value: "info_main" },
        { name: "Equipamentos", value: "equipments" },
        { name: "Operações", value: "operations" },
      ]
    };

    this.provider = new HandlerProvider(new MaintenanceOrderProvider(), "ordem de manutenção")
    this.providerLayout = new HandlerProvider(new OrderLayoutProvider(), "layout da ordem")
    this.providerUser = new HandlerProvider(new UserProvider(), "usuário")
    this.providerWorkcenter = new HandlerProvider(new WorkCenterProvider(), "centro de trabalho")
    this.providerOperation = new HandlerProvider(new OrderOperationProvider(), "operações");

    this.loadingData();

    this.hideModal = this.hideModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
    this.clean = this.clean.bind(this);
    this.delete = this.delete.bind(this);
    this.completeField = this.completeField.bind(this);
    this.getOrder = this.getOrder.bind(this);
    this.saveOperation = this.saveOperation.bind(this);
    this.saveEquipment = this.saveEquipment.bind(this);

  }

  async loadingData() {
    let listWorkcenter = [];
    let listUsers = []
    let layouts = []
    let listOrders = []

    let res = await this.providerWorkcenter.getList();
    if (res.success) listWorkcenter = res.data

    let res2 = await this.providerUser.getList();
    if (res2.success) listUsers = res2.data

    let res3 = await this.providerLayout.getList();
    if (res3.success) layouts = res3.data

    let res4 = await this.provider.getList();
    if (res4.success) listOrders = res4.data

    this.setState({ listWorkcenter, listUsers, layouts, listOrders })
  }

  hideModal() {
    this.setState({ visible: false })
    this.props.onClose()
  }

  clean() {
    var fields = this.state.fields;

    ObjectHelper.clearFields(fields);
    fields.orderEquipment = [];

    this.setState({
      fields,
      order: {},
      completeOrder: "",
      completeEquipment: "",
      completeWorkcenter: "",
    }, () => this.loadingData());
  }

  removeEquipment(index) {
    // console.log("CreateMaintenanceOrder -> removeEquipment -> index", index)
    let { fields } = this.state

    fields.orderEquipment.splice(index, 1)

    this.setState({ fields })
  }

  delete() {
    let { id } = this.state.order;
    this.provider.delete(id, this.clean)
  }

  checkData(params) {
    const { workCenter, fields } = this.state
    const errors = [];

    if (params) {
      console.log("CreateMaintenanceOrder -> checkData -> params", params)
      if (!params.equipment) errors.push("Equipamento");
      if (params.equipment && !params.installationArea) errors.push("Local de Instalação");
    }
    else {
      if (!fields.orderNumber) errors.push("Número da Ordem");
      if (!fields.orderLayout) errors.push("Layout da Ordem");
      if (!fields.priority) errors.push("Prioridade da Ordem");
      if (!fields.solicitationUser) errors.push("Solicitante da Ordem");
      if (!workCenter) errors.push("Centro de Trabalho");
    }

    return errors;
  }

  save() {

    const errors = this.checkData();

    if (errors.length > 0) {
      MessageModal.informationList("Erro", "Informe os campos obrigatórios", errors, null)

      return
    }

    let fields = this.state.fields;

    let order = {
      id: fields.id,
      orderNumber: fields.orderNumber,
      orderEquipment: fields.orderEquipment,
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
    }
    this.provider.save(order, this.clean)
  }


  onChange(e, name) {
    console.log("CreateMaintenanceOrder -> onChange -> e", e)
    console.log("CreateMaintenanceOrder -> onChange -> name", name)

    if (name === "id") this.setState({ completeOrder: e })
    else if (name === "workCenter") this.setState({ completeWorkcenter: e })
    else if (e.target.name === "orderLayout") {

      const layout = this.getOrderLayout(e.target.value)
      let layoutType = layout.orderLayout;

      let fields = {
        ...this.state.fields,
        orderLayout: layout.id,
        orderClassification: layout.classification,
        orderType: layout.type
      }

      this.setState({ fields, layoutType })
    }
    else {
      console.log("Entrou");

      let fields = this.state.fields;

      fields[e.target.name] = e.target.value;
      this.setState({ fields })
    }
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
      orderEquipment: order.orderEquipment || [],
      priority: order.priority,
      machine: order && order.orderEquipment[0] ? order.orderEquipment[0].equipment.description : "",
      superiorMachine: order && order.orderEquipment[0] && order.orderEquipment[0].superiorEquipment ? order.orderEquipment[0].superiorEquipment.description : "",
      orderLayout: order.orderLayout.id,
      orderType: order.orderLayout.type,
      orderClassification: order.orderLayout.classification,
      description: order.description,
      solicitationUser: order.solicitationUser ? order.solicitationUser.id : undefined,
      workCenter: order.workCenter ? order.workCenter.description : "",
    }

    let layoutType = order.orderLayout.orderLayout;

    this.setState({
      order,
      fields,
      layoutType,
      completeWorkcenter: fields.workCenter,
    })
  }

  completeField(id, name) {
    if (id === undefined) {
      this.clean()
      return
    }

    if (name == "workCenter") {
      let workCenter = this.state.listWorkcenter.find(element => element.id === id)
      this.setState({ workCenter })
    }

    if (name == "id") {
      let item = this.state.listOrders.find(element => element.id === id)
      this.getOrder(item.id)
    }
  }

  formPreventDefault(event) {
    event.preventDefault()
  }

  getOrderLayout(id) {
    const { layouts } = this.state
    const index = layouts.findIndex(layout => id === layout.id)

    if (index == -1) return {};

    return layouts[index];
  }
  
  saveEquipment(index, orderEquipment) {
    const { fields } = this.state;

    fields.orderEquipment.splice(index, 1, orderEquipment);

    this.setState({ fields });
  }

  saveOperation(indexEquipment, indexOperation, operation) {
    const { fields } = this.state;
    const { orderEquipment: orderEquipments } = fields;

    var orderEquipment = orderEquipments[indexEquipment];
    if (!orderEquipment) return;

    if (!Array.isArray(orderEquipment.orderOperation)) orderEquipment.orderOperation = [];

    if (indexOperation >= 0) {
      orderEquipment.orderOperation.splice(indexOperation, 1, operation);
    } else {
      orderEquipment.orderOperation.push(operation);
    }

    orderEquipments.splice(indexEquipment, 1, orderEquipment);

    fields.orderEquipment = orderEquipments;
    this.setState({ fields });
  }

  render() {

    console.log("render -> STATE", this.state)
    console.log("render -> STATE -> orderEquipment", this.state.fields.orderEquipment)
    var {addOperation, addEquiment, showSuccess, layoutType, layouts, fields, tabs } = this.state;

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
            {layoutType ?
              <div className="slideInLeft">
                <span style={{ fontWeight: "bold", fontStyle: "italic", padding: "2px 12px", minWidth: 100, borderRadius: 10, top: 35, right: 0, position: "absolute", textAlign: "center", fontSize: 15, fontFamily: "sans-serif", backgroundColor: "#424242", color: "white" }}>
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
                          dataSelected={this.completeField}
                          required={true}
                        />
                      </div>
                      <div className="md-cell md-cell--6 md-cell--bottom">
                        <C_TextField
                          id="orderNumber"
                          name="orderNumber"
                          value={fields.orderNumber}
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
                          value={fields.orderLayout}
                          onChange={this.onChange}
                          labelElement="classification"
                          valueElement="id"
                          label={"Layout da Ordem"}
                          placeholder={"Selecione"}
                          list={layouts}
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
                          value={fields.orderType}
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
                          value={fields.orderClassification}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="md-grid">
                      <div className="md-cell md-cell--12 md-cell--bottom">
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
                          dataSelected={this.completeField}
                          required={true}
                        />
                      </div>
                    </div>
                    <div className="md-grid">
                      <div className="md-cell md-cell--6 md-cell--bottom">
                        <C_SelectField
                          id="priority"
                          name="priority"
                          value={fields.priority}
                          onChange={this.onChange}
                          type="text"
                          label={"Prioridade"}
                          placeholder={"Selecione"}
                          list={this.state.priority}
                          required={true}
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div className="md-cell md-cell--6 md-cell--bottom">
                        <C_SelectField
                          name="solicitationUser"
                          id="solicitationUser"
                          value={fields.solicitationUser}
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
                          value={fields.description}
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
                          this.setState({ addEquiment: true })
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
                        content={fields.orderEquipment}
                        onClick={() => { return }}
                        textAlign="center"
                      />
                    </div>
                  </div>
                  : undefined}

                {this.state.selectedTab == "operations" ?
                  <div className="md-grid">
                    <div className="md-cell md-cell--6 md-cell--bottom">
                      <C_Button
                        secondary={true}
                        label="Inserir Operações"
                        action={() => {
                          this.setState({ addOperation: true })
                        }}
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
            crudLevel={!!fields.id}
          />

          {addEquiment ?
            <div style={this.state.backgroundModal}>
              <div style={{ width: "100%", display: "flex", justifyContent: "center", position: "fixed", top: "15%", right: 0 }}>
                <AddEquipments
                  pushEquipment={(equipment, showMessage) => {
                    var showSuccess = showMessage
                    console.log("CreateMaintenanceOrder -> render -> showMessage", showMessage)
                    console.log("CreateMaintenanceOrder -> render -> equipment", equipment)
                    if (!equipment) return

                    const errors = this.checkData(equipment);

                    if (errors.length > 0) {
                      MessageModal.informationList("Erro", "Informe os campos obrigatórios", errors, null)
                      return
                    }

                    const { fields } = this.state;
                    console.log("CreateMaintenanceOrder -> render -> fields", fields)
                    fields.orderEquipment.push(equipment);

                    this.setState({ fields, showSuccess })

                    if (showSuccess) {
                      setTimeout(() => {
                        this.setState({ showSuccess: false })
                      }, 1000);
                    }
                  }}
                  

                  checkData={() => this.checkData()}
                  onCloseEquipment={() => this.setState({ addEquiment: false })}
                />
              </div>
            </div>
          : undefined}

          { addOperation ? 
            <div style={this.state.backgroundModal}>
              <div style={{ width: "100%", display: "flex", justifyContent: "center", position: "fixed", top: "5%" }}>
                <C_Operations
                  style={{ width: "50%", maxHeight: '80vh', overflowY: 'scroll', marginTop:30, padding: 20, borderRadius: 5 }}
                  equipments={fields.orderEquipment}
                  saveEquipment={(index, orderEquipment) => this.saveEquipment(index, orderEquipment)}
                  saveOperation={(indexEquipment, indexOperation, operation) => this.saveOperation(indexEquipment, indexOperation, operation)}
                  title="OPERAÇÕES"
                  onCloseOperation={() => this.setState({ addOperation: false })}
                />
              </div>
            </div>
          : undefined }

          {showSuccess ?
            <div className="slideInLeft" style={this.state.styleMessage}>
              {"Equipamento adicionado com sucesso!"}
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
      layoutType: this.props.layoutType,
      orderEquipment: {
        needStopping: false,
        isStopped: false
      },
      completeSymptom: '',
      completeCause: '',
      completeEquipment: '',
      completeSuperiorEquipment: '',
      completeArea: ''
    }

    this.providerEquipment = new HandlerProvider(new MachineProvider(), "equipamento")
    this.providerSuperiorEquipment = new HandlerProvider(new (SuperiorMachineProvider), "equipamento superior")
    this.providerArea = new HandlerProvider(new (InstallationAreaProvider), "área de instalação")
    this.providerCause = new HandlerProvider(new (CauseProvider), "Causa do Defeito")
    this.providerSypmtom = new HandlerProvider(new (DiagnosticProvider), "Sintoma do Defeito")
    this.completeField = this.completeField.bind(this);
    this.getEquipment = this.getEquipment.bind(this);
    this.onChange = this.onChange.bind(this);
    this.clean = this.clean.bind(this);
    this.loadingData();
  }

  async loadingData() {
    let listEquipments = []
    let listSuperiorEquipments = []
    let listAreas = []
    let listCauses = []
    let listSymptoms = []

    let res = await this.providerEquipment.getList();
    if (res.success) listEquipments = res.data

    let res2 = await this.providerSuperiorEquipment.getList();
    if (res2.success) listSuperiorEquipments = res2.data

    let res3 = await this.providerArea.getList();
    if (res3.success) listAreas = res3.data

    let res4 = await this.providerCause.getList();
    if (res4.success) listCauses = res4.data

    let res5 = await this.providerSypmtom.getList();
    if (res5.success) listSymptoms = res5.data

    this.setState({ listEquipments, listSuperiorEquipments, listAreas, listCauses, listSymptoms })
  }

  async getEquipment(id) {
    let orderEquipment = this.state.orderEquipment;

    let response = await this.providerEquipment.get(id);

    if (response.success) orderEquipment.equipment = response.data

    this.setState({ orderEquipment });
  }


  completeField(id, name) {
    // console.log("AddEquipments -> completeField -> name", name)

    const { orderEquipment } = this.state
    if (id === undefined) {
      this.clean()
      return
    }

    if (name == "orderEquipmentId") {
      let equipment = this.state.listEquipments.find(element => element.id === id)
      this.getEquipment(equipment.id)
    }

    if (name == "superiorEquipment") {
      let superiorEquipment = this.state.listSuperiorEquipments.find(element => element.id === id)

      orderEquipment.superiorEquipment = superiorEquipment;
      this.setState({ orderEquipment })
    }

    if (name == "installationArea") {
      let installationArea = this.state.listAreas.find(element => element.id === id)

      orderEquipment.installationArea = installationArea;
      this.setState({ orderEquipment })
    }

    if (name == "defectOrigin") {
      let defectOrigin = this.state.listCauses.find(element => element.id === id)

      orderEquipment.defectOrigin = defectOrigin;
      this.setState({ orderEquipment })
    }

    if (name == "defectSymptom") {
      let defectSymptom = this.state.listSymptoms.find(element => element.id === id)

      orderEquipment.defectSymptom = defectSymptom;
      this.setState({ orderEquipment })
    }
  }

  clean() { }

  onChange(e, name) {

    if (name === "orderEquipmentId") this.setState({ completeEquipment: e })
    else if (name === "superiorEquipment") this.setState({ completeSuperiorEquipment: e })
    else if (name === "installationArea") this.setState({ completeArea: e })
    else if (name === "defectOrigin") this.setState({ completeCause: e })
    else if (name === "defectSymptom") this.setState({ completeSymptom: e })
    else {
      let orderEquipment = this.state.orderEquipment;

      orderEquipment[e.target.name] = e.target.value;
      this.setState({ orderEquipment })
    }
  }

  render() {
    const { orderEquipment, layoutType } = this.state
    console.log("AddEquipments -> render -> this.state", this.state)

    return (
      <C_Modal style={{ maxHeight: "36vw", overflowX: "hidden", width: "90%", padding: 20, borderRadius: 5 }} titleSize={20} title="EQUIPAMENTOS" onClose={() => this.props.onCloseEquipment()}>
        <div className="md-grid">
          <div className="md-cell md-cell--6 md-cell--bottom">
            <C_AutoComplete
              id="superiorEquipment"
              name="superiorEquipment"
              onChange={this.onChange}
              type="search"
              list={this.state.listSuperiorEquipments}
              label="Equipamento Superior"
              placeholder="Equipamento Superior"
              rightIcon={"search"}
              value={this.state.completeSuperiorEquipment}
              dataSelected={this.completeField}
            />
          </div>
          <div className="md-cell md-cell--6 md-cell--bottom">
            <C_AutoComplete
              id="orderEquipmentId"
              name="orderEquipmentId"
              onChange={this.onChange}
              type="search"
              list={this.state.listEquipments}
              label="Equipamento"
              placeholder="Equipamento"
              rightIcon={"search"}
              value={this.state.completeEquipment}
              dataSelected={this.completeField}
            />
          </div>
          <div className="md-cell md-cell--6 md-cell--bottom">
            <C_TextField
              id="code"
              name="code"
              type="text"
              label="Código do Equipamento"
              placeholder="Código do Equipamento"
              value={orderEquipment.equipment ? orderEquipment.equipment.code : undefined}
              disabled={true}
            />
          </div>
          <div className="md-cell md-cell--6 md-cell--bottom">
            <C_TextField
              id="machineType"
              name="machineType"
              type="text"
              label="Tipo de Máquina"
              placeholder="Tipo de Máquina"
              value={orderEquipment.equipment ? orderEquipment.equipment.machineType.description : undefined}
              disabled={true}
            />
          </div>
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
              dataSelected={this.completeField}
            />
          </div>
          <div className="md-cell md-cell--6 md-cell--bottom">
            <C_TextField
              id="sector"
              name="sector"
              type="text"
              label="Setor"
              placeholder="Setor"
              value={orderEquipment.installationArea ? orderEquipment.installationArea.sector.description : undefined}
              disabled={true}
            />
          </div>
          <div className="md-cell md-cell--6 md-cell--bottom">
            <C_AutoComplete
              id="defectOrigin"
              name="defectOrigin"
              onChange={this.onChange}
              type="search"
              list={this.state.listCauses}
              label="Causa do Defeito"
              placeholder="Causa do Defeito"
              rightIcon={"search"}
              value={this.state.completeCause}
              dataSelected={this.completeField}
            />
          </div>
          <div className="md-cell md-cell--6 md-cell--bottom">
            <C_TextField
              id="defectOriginNote"
              name="defectOriginNote"
              onChange={this.onChange}
              type="text"
              label="Obs. Causa do Defeito"
              placeholder="Obs. Causa do Defeito"
              value={orderEquipment.defectOriginNote}
            />
          </div>
          <div className="md-cell md-cell--6 md-cell--bottom">
            <C_AutoComplete
              id="defectSymptom"
              name="defectSymptom"
              onChange={this.onChange}
              type="search"
              list={this.state.listSymptoms}
              label="Sintoma do Defeito"
              placeholder="Sintoma do Defeito"
              rightIcon={"search"}
              value={this.state.completeSymptom}
              dataSelected={this.completeField}
            />
          </div>
          <div className="md-cell md-cell--6 md-cell--bottom">
            <C_TextField
              id="defectSymptomNote"
              name="defectSymptomNote"
              onChange={this.onChange}
              type="text"
              label="Obs. Sintoma do Defeito"
              placeholder="Obs. Sintoma do Defeito"
              value={orderEquipment.defectSymptomNote}
            />
          </div>
          <div className="md-cell md-cell--6 md-cell--bottom">
            <fieldset style={{ borderRadius: 5, border: "1px solid silver", padding: 10 }}>
              <legend style={{ width: "auto", border: "none", paddingRight: 5, paddingLeft: 5, color: "#666666", fontSize: 13 }}>Requer Parada?</legend>
              <C_RadioGroup
                id="needStopping"
                name="needStopping"
                value={orderEquipment.needStopping}
                onChange={(e) => {
                  var orderEquipment = this.state.orderEquipment;
                  orderEquipment[e.target.name] = e.target.value == "true" ? true : false;

                  this.setState({orderEquipment})
                }}
                options={[{ label: "Sim", value: true }, { label: 'Não', value: false }]}
              />
            </fieldset>
          </div>
          <div className="md-cell md-cell--6 md-cell--bottom">
            <fieldset style={{ borderRadius: 5, border: "1px solid silver", padding: 10 }}>
              <legend style={{ width: "auto", border: "none", paddingRight: 5, paddingLeft: 5, color: "#666666", fontSize: 13 }}>Está parado?</legend>
              <C_RadioGroup
                id="isStopped"
                name="isStopped"
                value={orderEquipment.isStopped}
                onChange={(e) => {
                  var orderEquipment = this.state.orderEquipment;
                  orderEquipment[e.target.name] = e.target.value == "true" ? true : false;

                  this.setState({ orderEquipment })
                }}
                options={[{ label: "Sim", value: true }, { label: 'Não', value: false }]}
              />
            </fieldset>
          </div>
          <div className="md-cell md-cell--12 md-cell--bottom" style={{ marginTop: 30 }}>
            <C_Button className="md-cell md-cell--6 md-cell--bottom" label="FECHAR"
              secondary={true}  action={() => this.props.onCloseEquipment()}
            />
            <C_Button className="md-cell md-cell--6 md-cell--bottom" primary={true}
              label="ADICIONAR" action={() => this.props.pushEquipment(orderEquipment, true)}
            />
          </div>
        </div>
      </C_Modal>
    )
  }
}

