import React, { Component } from 'react';
import C_SelectField from './components/SelectField';
import C_Calendar from './components/Calendar';
import { C_Button, C_ButtonFloat, C_MenuButton} from './components/Button';
import { C_Table } from './components/Table';
import { C_MaintenanceOrder } from './components/Order';
import ReactDOM from 'react-dom';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listStatus: [{
        label: "Todos",
        value: "ALL"
      },
      {
        label: "Abertas",
        value: "OPEN"
      },
      {
        label: "Pendentes",
        value: "PENDING"
      },
      {
        label: "Em Andamento",
        value: "IN_PROGRESS"
      },
      {
        label: "Finalizadas",
        value: "FINISHED"
      }],

      listPriority: [{
        label: "Todas",
        value: "ALL"
      },
      {
        label: "Urgente",
        value: "URGENT"
      },
      {
        label: "Alta",
        value: "HIGH"
      },
      {
        label: "Média",
        value: "MEDIUM"
      },
      {
        label: "Baixa",
        value: "LOW"
      }],

      fields: {},
      selectedStatus: "ALL",
      selectedPriority: "ALL",
      showOrdersList: false
    }

    this.onChange = this.onChange.bind(this);
    this.listOrders = this.listOrders.bind(this);
  }

  onChange(e, name) {

    let fields = this.state.fields;

    fields[e.target.name] = e.target.value;

    this.setState({ fields })
  }

  listOrders() {
    let orders = [
      {
        id: 1,
        OrderNumber: "OM - 445588/D37",
        Type: "Preventiva",
        Priority: "Alta",
        Equipment: "JDB388/32",
        OpenDate: "09/05/2019 ás 23:53",
        Status: "Aberta",
      },
      {
        id: 2,
        OrderNumber: "OM - 986/IRH34",
        Type: "Corretiva",
        Priority: "Média",
        Equipment: "JDB388/32",
        OpenDate: "23/06/2019 ás 06:25",
        Status: "Finalizada",
      },
      {
        id: 3,
        OrderNumber: "OM - 87745/GU2",
        Type: "Corretiva",
        Priority: "Baixa",
        Equipment: "JDB388/32",
        OpenDate: "23/06/2019 ás 06:25",
        Status: "Aberta",
      },
      {
        id: 4,
        OrderNumber: "OM - 87745/GU2",
        Type: "Preventiva",
        Priority: "Urgente",
        Equipment: "JDB388/32",
        OpenDate: "23/06/2019 ás 06:25",
        Status: "Finalizada",
      },
      {
        id: 5,
        OrderNumber: "OM - 445588/D37",
        Type: "Preventiva",
        Priority: "Alta",
        Equipment: "JDB388/32",
        OpenDate: "09/05/2019 ás 23:53",
        Status: "Em Andamento",
      },
      {
        id: 6,
        OrderNumber: "OM - 986/IRH34",
        Type: "Corretiva",
        Priority: "Média",
        Equipment: "JDB388/32",
        OpenDate: "23/06/2019 ás 06:25",
        Status: "Finalizada",
      },
      {
        id: 7,
        OrderNumber: "OM - 87745/GU2",
        Type: "Corretiva",
        Priority: "Baixa",
        Equipment: "JDB388/32",
        OpenDate: "23/06/2019 ás 06:25",
        Status: "Em Andamento",
      },
      {
        id: 8,
        OrderNumber: "OM - 87745/GU2",
        Type: "Preventiva",
        Priority: "Urgente",
        Equipment: "JDB388/32",
        OpenDate: "23/06/2019 ás 06:25",
        Status: "Pendente",
      },
      {
        id: 9,
        OrderNumber: "OM - 986/IRH34",
        Type: "Corretiva",
        Priority: "Média",
        Equipment: "JDB388/32",
        OpenDate: "23/06/2019 ás 06:25",
        Status: "Finalizada",
      },
      {
        id: 10,
        OrderNumber: "OM - 87745/GU2",
        Type: "Corretiva",
        Priority: "Baixa",
        Equipment: "JDB388/32",
        OpenDate: "23/06/2019 ás 06:25",
        Status: "Aberta",
      },
      {
        id: 11,
        OrderNumber: "OM - 87745/GU2",
        Type: "Preventiva",
        Priority: "Urgente",
        Equipment: "JDB388/32",
        OpenDate: "23/06/2019 ás 06:25",
        Status: "Finalizada",
      },
      {
        id: 12,
        OrderNumber: "OM - 445588/D37",
        Type: "Preventiva",
        Priority: "Alta",
        Equipment: "JDB388/32",
        OpenDate: "09/05/2019 ás 23:53",
        Status: "Em Andamento",
      },
      {
        id: 13,
        OrderNumber: "OM - 986/IRH34",
        Type: "Corretiva",
        Priority: "Média",
        Equipment: "JDB388/32",
        OpenDate: "23/06/2019 ás 06:25",
        Status: "Finalizada",
      },
      {
        id: 14,
        OrderNumber: "OM - 87745/GU2",
        Type: "Corretiva",
        Priority: "Baixa",
        Equipment: "JDB388/32",
        OpenDate: "23/06/2019 ás 06:25",
        Status: "Em Andamento",
      },
      {
        id: 15,
        OrderNumber: "OM - 87745/GU2",
        Type: "Preventiva",
        Priority: "Urgente",
        Equipment: "JDB388/32",
        OpenDate: "23/06/2019 ás 06:25",
        Status: "Pendente",
      }
    ]

    this.setState({ orders });
  }

  render() {
    console.log("Dashboard -> render -> fields", this.state)
    var orders = this.state.orders
    var orderDetails = this.state.orderDetails;
    console.log("Dashboard -> render -> orders", orders)

    const columns = [
      { name: "Abertura" },
      { name: "Ordem Manutenção" },
      { name: "Tipo Manutenção" },
      { name: "Equipamento" },
      { name: "Prioridade" },
      { name: "Status" },
    ]
    return (
      this.state.showOrderDetails ? 
        <div id="order" style={{ width: "100%" }}>
          <C_MaintenanceOrder 
            order={orderDetails} 
            onClose={() => this.setState({showOrderDetails:false})} 
          />
        </div>
      :
      <div style={{ width: "100%" }}>
        <div style={{ padding: "6px 0px 12px 20px", borderBottom: "3px solid silver", position: "fixed", width: "100%", backgroundColor: "#fafafa", zIndex: 2 }}>
          <h1 style={{ width: "100%", fontWeight:"bold" }}>Monitor de Ordens de Manutenção</h1>
          <div style={{ width: "100%", display: "flex" }}>
            <div style={{ width: "20%", marginTop: 8 }}>
              <C_Calendar
                id="from"
                name="from"
                value={new Date()}
                onChange={this.onChange}
                label={"De"}
                allDay
                inputStyle={{ width: 200, }}
              />
            </div>
            <div style={{ width: "20%", marginTop: 8 }}>
              <C_Calendar
                id="to"
                name="to"
                value={new Date()}
                onChange={this.onChange}
                label={"Até"}
                allDay
                inputStyle={{ width: 200 }}
              />
            </div>
            <div style={{ width: "20%" }}>
              <C_SelectField
                id="status"
                name="status"
                onChange={this.onChange}
                value={this.state.selectedStatus}
                label={"Status"}
                list={this.state.listStatus}
                labelElement="label"
                valueElement="value"
                listStyle={{ position: "fixed", width: 200 }}
                style={{ width: 200, marginTop: 8, marginRight: 20 }}
              />
            </div>
            <div style={{ width: "20%" }}>
              <C_SelectField
                id="priority"
                name="priority"
                onChange={this.onChange}
                value={this.state.selectedPriority}
                label={"Prioridade"}
                list={this.state.listPriority}
                labelElement="label"
                valueElement="value"
                listStyle={{ position: "fixed", width: 200 }}
                style={{ marginRight: 30, width: 200, marginTop: 8 }}
              />
            </div>
            <C_Button
              secondary={true}
              style={{ marginTop: 30, fontSize: 16, width: "10%" }}
              label={"LISTAR"}
              action={() => this.listOrders()}
            />
           
          </div>
        </div>
        <div style={{width: "100%", paddingBottom: !this.state.showOrdersList ? 160 : 150 }}> </div>
        <div style={{ position:"relative", alignItems: "center", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          <div style={{ position: "absolute", top: !this.state.showOrdersList ? -5 : 10, right: 12}}>
            {orders ?
              <C_ButtonFloat
                icon={!this.state.showOrdersList ? "reorder" : "view_module"}
                tooltipLabel={!this.state.showOrdersList ? "Exibir como Lista" : "Exibir como Cartões"}
                tooltipPosition="left"
                secondary
                style={{ width: 51, height: 51 }}
                iconSize={25}
                action={() => this.setState({ showOrdersList: !this.state.showOrdersList ? true : false })}
              />
              : undefined}
          </div>
          {this.state.showOrdersList ?
            <div style={{ marginTop: 40, width: "100%", boxShadow: "1px 3px 12px 1px #918f8e" }}>
              <C_Table
                columns={columns}
                content={this.state.orders}
                onClick={(event) => {
                  this.setState({ showOrderDetails: true, orderDetails: event })
                  }
                }
              >
              </C_Table>
            </div>

          : undefined}

          {orders && orders.map((order, i) => {

            var colorPriority;

            if (order.Priority == "Urgente") colorPriority = "red"
            if (order.Priority == "Alta") colorPriority = "#ffd300"
            if (order.Priority == "Média") colorPriority = "#3177e8"
            if (order.Priority == "Baixa") colorPriority = "#03a140"

            return (
              !this.state.showOrdersList ?
                <fieldset onClick={() => { this.setState({ showOrderDetails: true, orderDetails: order}) }} className={"effectfront"} style={{ cursor: "pointer", position: "relative", width: "30%", borderRadius: 5, border: "1px solid silver", marginBottom: 20, padding: 10, marginTop: 40, marginRight: 20 }}>
                  <legend style={{ width: "auto", border: "none", paddingRight: 5, paddingLeft: 5, marginLeft: 10, marginBottom: 0, color: "#666666a6", fontWeight: "bold", fontSize: 25, marginTop: 100 }}>{order.OrderNumber}</legend>
                  <div style={{}}>
                    <div style={{ borderRadius: 5, top: 16, right: 0, position: "absolute", height: 194, width: 40, backgroundColor: colorPriority }}></div>
                    <div style={{ display: "flex" }}>
                      <strong style={{ marginRight: 5, fontSize: 16 }}>Tipo:</strong><p style={{ fontSize: 15, marginTop: 1 }}>{order.Type}</p>
                    </div>
                    <div style={{ display: "flex" }}>
                      <strong style={{ marginRight: 5, fontSize: 16 }}>Equipamento:</strong><p style={{ fontSize: 15, marginTop: 1 }}>{order.Equipment}</p>
                    </div>
                    <div style={{ display: "flex" }}>
                      <strong style={{ marginRight: 5, fontSize: 16 }}>Prioridade:</strong><p style={{ fontSize: 15, marginTop: 1 }}>{order.Priority}</p>
                    </div>
                    <div style={{ display: "flex" }}>
                      <strong style={{ marginRight: 5, fontSize: 16 }}>Abertura:</strong><p style={{ fontSize: 15, marginTop: 1 }}>{order.OpenDate}</p>
                    </div>
                    <div style={{ display: "flex" }}>
                      <strong style={{ marginRight: 5, fontSize: 16 }}>Status:</strong><p style={{ fontSize: 15, marginTop: 1 }}>{order.Status}</p>
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