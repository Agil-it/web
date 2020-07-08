import React, { Component } from 'react';
import C_SelectField from './components/SelectField';
import {C_Calendar} from './components/Calendar';
import { HandlerProvider } from './providers/handler';
import { MaintenanceOrderProvider } from './providers/MaintenanceOrder';
import { C_Button, C_ButtonFloat, C_MenuButton } from './components/Button';
import { C_Table } from './components/Table';
import { C_MaintenanceOrder } from './components/Order';
import { C_Loading } from './components/Loading';
import { MaintenanceOrderHelper as HelperOM } from './helpers/MaintenanceOrder';
import { StringHelper } from './helpers/String';
import { DateHelper } from './helpers/Date';
import { C_ToolTip } from './components/ToolTip';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listStatus: [
        { label: "TODOS", value: "all" },
        { label: "ABERTA", value: "created" },
        { label: "ASSINADA", value: "signatured" },
        { label: "ASSINATURA PENDENTE", value: "signature_pending" },
        { label: "ASSUMIDA", value: "assumed" },
        { label: "CANCELADA", value: "canceled" },
        { label: "FINALIZADA", value: "finished" },
        { label: "INICIADA", value: "started" },
        { label: "PARADA", value: "stopped" },
        { label: "PAUSADA", value: "paused" },
      ],

      listPriority: [
        { label: "TODAS", value: "all" },
        { label: "URGENTE", value: "urgent" },
        { label: "ALTA", value: "high" },
        { label: "MÉDIA", value: "medium" },
        { label: "BAIXA", value: "low" },
      ],

      fields: {
        to: new Date(),
        from: new Date()
      },
      selectedStatus: "created",
      selectedPriority: "all",
      showOrdersList: false
    }

    this.onChange = this.onChange.bind(this);
    this.listOrders = this.listOrders.bind(this);
    this.calculateHeight = this.calculateHeight.bind(this);
    this.provider = new HandlerProvider(new MaintenanceOrderProvider(), "ordem de manutenção")
  }

  calculateHeight() {
    const height = document.getElementById('searchTable').clientHeight;

    const rowsPerPage = Math.round(height/60)-2;

    // this.setState({ height, rowsPerPage });

    return rowsPerPage;
  }

  onChange(e, name) {

    let fields = this.state.fields;

    fields[e.target.name] = e.target.value;

    this.setState({ fields })
  }

  async listOrders() {
    let sendData = {}

    if (this.state.selectedPriority != "all") sendData.priority = this.state.selectedPriority;
    if (this.state.selectedStatus != "all") sendData.orderStatus  = this.state.selectedStatus;
    
    let response = await this.provider.getList(sendData);
    let list = []
    // console.log("Dashboard -> listOrders -> response", response)
    if (response.success) {
      list = response.data
    }

    var orders = HelperOM.sortOrders(list) 
    // console.log("Dashboard -> listOrders -> orders", orders)

    this.setState({ orders , showLoading: false })

  }

  render() {
    // console.log("Dashboard -> render -> fields", this.state)
    var orders = this.state.orders
    var orderDetails = this.state.orderDetails;
    // console.log("Dashboard -> render -> orders", orders)

    const columns = [
      { name: "Abertura", property: "openedDate", defaultValue: "Não identificado", format: (value) => DateHelper.formatDate(value) },
      { name: "Descrição", property:"description", defaultValue: "Sem Descrição" },
      { name: "Equipamento", property:"orderEquipment[0].equipment.description", defaultValue: "Sem Equipamento" },
      { name: "Prioridade", property: "priority", defaultValue: "Sem Prioridade", format: (value) => HelperOM.translate("priority", value) },
      { name: "Status", property: "orderStatus", defaultValue: "Sem Status", format: (value) => HelperOM.translate("status", value) },
    ]

    return (
      this.state.showOrderDetails ?
        <div id="order" style={{ width: "100%" }}>
          <C_MaintenanceOrder
            orderId={orderDetails.id}
            onClose={() => this.setState({ showOrderDetails: false })}
          />
        </div>
        :
        <div style={{ width: "100%" }}>
          <div style={{ padding: "15px 0px 2px 20px", borderBottom: "2px solid silver", position: "fixed", width: "100%", backgroundColor: "#fafafa", zIndex: 2 }}>
            <h1 style={{ width: "100%", color: "black" }}>Monitor de Ordens de Manutenção</h1>
            <div className="md-grid" style={{ padding: 0 }}>
                <C_Calendar className="md-cell md-cell--2"
                  id="from" name="from"
                  value={this.state.fields.from} onChange={this.onChange}
                  label={"De"} inputStyle={{ width: 200, }}
                />
                <C_Calendar
                  className="md-cell md-cell--2"
                  id="to" name="to"
                  value={this.state.fields.to} onChange={this.onChange}
                  label={"Até"} inputStyle={{ width: 200 }}
                />
                <C_SelectField
                  id="orderStatus" name="orderStatus"
                  onChange={(e) => this.setState({selectedStatus: e.target.value})}
                  value={this.state.selectedStatus} label={"Status"}
                  list={this.state.listStatus}
                  labelElement="label" valueElement="value"
                  style={{ width: 200 }} className="md-cell md-cell--2 md-cell--bottom"
                />

                <C_SelectField
                  id="priority" name="priority"
                  onChange={(e) => this.setState({selectedPriority: e.target.value})}
                  value={this.state.selectedPriority}
                  label={"Prioridade"}
                  list={this.state.listPriority}
                  labelElement="label" valueElement="value"
                  style={{ width: 200 }} className="md-cell md-cell--3 md-cell--bottom"
                />
              <C_Button
                secondary={true}
                className="md-cell md-cell--middle md-cell--2"
                style={{ width: 130, marginTop: 30, fontSize: 16 }}
                label={"LISTAR"}
                action={() => {
                  this.listOrders();
                  this.setState({ showLoading: true })
                }}
              />
            </div>
          </div>
          <div style={{ width: "100%", paddingBottom: !this.state.showOrdersList ? 160 : 150 }}> </div>
          <div style={{ position: "relative", alignItems: "center", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            <div style={{ position: "absolute", top: !this.state.showOrdersList ? -5 : 10, right: 12 }}>
              {orders && orders.length > 0 ?
                <C_ToolTip position="left" tooltip={!this.state.showOrdersList ? "Exibir como Lista" : "Exibir como Cartões"}>
                  <C_ButtonFloat
                    icon={!this.state.showOrdersList ? "reorder" : "view_module"}
                    secondary
                    style={{ width: 51, height: 51 }}
                    iconSize={25}
                    action={() => this.setState({ showOrdersList: !this.state.showOrdersList ? true : false })}
                  />
                </C_ToolTip>
                : undefined}
            </div>

            {this.state.showOrdersList && !this.state.showLoading ?
              <div id="searchTable" style={{ marginTop: 40, width: "100%", boxShadow: "1px 3px 12px 1px #918f8e" }}>
                <C_Table
                  columns={columns}
                  content={this.state.orders}
                  onClick={(event) => {
                    this.setState({ showOrderDetails: true, orderDetails: event })
                  }}
                  showEffect={true}
                  showPagination={true}
                  hasFilter={true}
                  rowsPerPage={10}
                >
                </C_Table>
              </div>

              : undefined}

            {this.state.showLoading ?
              <div style={{ marginTop: "10%" }}>
                <C_Loading
                  scale={4}
                  footer={true}
                  message={"Carregando Ordens..."}
                />
              </div>
              : undefined}

            {orders && !this.state.showLoading && orders.map((order, i) => {
              return (
                !this.state.showOrdersList ?
                  <fieldset onClick={() => { this.setState({ showOrderDetails: true, orderDetails: order }) }} className={"effectfront"} style={{ cursor: "pointer", position: "relative", width:"30%",minWidth: "30%", borderRadius: 5, border: "1px solid silver", marginBottom: 20, padding: 10, marginTop: 40, marginRight: 20 }}>
                    <legend style={{ width: "auto", border: "none", paddingRight: 5, paddingLeft: 5, marginLeft: 10, marginBottom: 0, color: "#666666a6", fontWeight: "bold", fontSize: 25, marginTop: 100 }}>{order.orderNumber ? order.orderNumber : "SEM TÍTULO"}</legend>
                    <div style={{}}>
                      <div style={{ borderRadius: 5, top: 16, right: 0, position: "absolute", height: 194, width: 40, backgroundColor: HelperOM.translate("color", order.priority) }}></div>
                      <div style={{ width: '90%',display: "flex" }}>
                        <strong style={{ marginRight: 5, fontSize: 16 }}>Descrição:</strong>
                        <p style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", width: "auto", overflow: "hidden", fontSize: 15, marginTop: 1 }}>{order.description}</p>
                      </div>
                      <div style={{ width:'90%', display: "flex" }}>
                        <strong style={{ marginRight: 5, fontSize: 16 }}>Equipamento:</strong>
                        <p style={{whiteSpace:"nowrap", textOverflow:"ellipsis", overflow:"hidden", fontSize: 15, marginTop: 1 }}>
                          {order.orderEquipment[0] ? order.orderEquipment[0].equipment.description : "Sem Equipamento"}
                        </p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <strong style={{ marginRight: 5, fontSize: 16 }}>Prioridade:</strong><p style={{ fontSize: 15, marginTop: 1 }}>{HelperOM.translate("priority", order.priority)}</p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <strong style={{ marginRight: 5, fontSize: 16 }}>Abertura:</strong><p style={{ fontSize: 15, marginTop: 1 }}>{DateHelper.formatDate(order.openedDate)}</p>
                      </div>
                      <div style={{ display: "flex" }}>
                        <strong style={{ marginRight: 5, fontSize: 16 }}>Status:</strong><p style={{ fontSize: 15, marginTop: 1 }}>{HelperOM.translate("status", order.orderStatus ? order.orderStatus : "no_status")}</p>
                      </div>
                    </div>
                  </fieldset>
                  : undefined
              )
            })
            }
          </div>
        </div>
    )
  }
}

export default Dashboard;