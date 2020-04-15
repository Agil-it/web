import React, { Component } from 'react';
import C_SelectField from './components/SelectField';
import C_Calendar from './components/Calendar';
import C_Button from './components/Button';


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
      selectedPriority: "ALL"
    }

    this.onChange = this.onChange.bind(this);
    this.listOrders = this.listOrders.bind(this);

  }

  onChange(e, name) {

    let fields = this.state.fields;

    fields[e.target.name] = e.target.value;

    this.setState({ fields })
  }

  listOrders(){
    let orders = [
      {
        id: 1,
        OrderNumber: "OM - 445588/D37",
        Type: "Preventiva",
        Priority: "Alta",
        Equipment: "JDB388/32",
        OpenDate: "09/05/2019 ás 23:53"
      },
      {
        id: 2,
        OrderNumber: "OM - 986/IRH34",
        Type: "Corretiva",
        Priority: "Média",
        Equipment: "JDB388/32",
        OpenDate: "23/06/2019 ás 06:25"
      },
      {
        id: 3,
        OrderNumber: "OM - 87745/GU2",
        Type: "Corretiva",
        Priority: "Baixa",
        Equipment: "JDB388/32",
        OpenDate: "23/06/2019 ás 06:25"
      },
      {
        id: 4,
        OrderNumber: "OM - 87745/GU2",
        Type: "Preventiva",
        Priority: "Urgente",
        Equipment: "JDB388/32",
        OpenDate: "23/06/2019 ás 06:25"
      },
      {
        id: 5,
        OrderNumber: "OM - 445588/D37",
        Type: "Preventiva",
        Priority: "Alta",
        Equipment: "JDB388/32",
        OpenDate: "09/05/2019 ás 23:53"
      },
      {
        id: 6,
        OrderNumber: "OM - 986/IRH34",
        Type: "Corretiva",
        Priority: "Média",
        Equipment: "JDB388/32",
        OpenDate: "23/06/2019 ás 06:25"
      },
      {
        id: 7,
        OrderNumber: "OM - 87745/GU2",
        Type: "Corretiva",
        Priority: "Baixa",
        Equipment: "JDB388/32",
        OpenDate: "23/06/2019 ás 06:25"
      },
      {
        id: 8,
        OrderNumber: "OM - 87745/GU2",
        Type: "Preventiva",
        Priority: "Urgente",
        Equipment: "JDB388/32",
        OpenDate: "23/06/2019 ás 06:25"
      }
    ]

    this.setState({orders});
  }

  render() {
    console.log("Dashboard -> render -> fields", this.state)
    var orders = this.state.orders
    console.log("Dashboard -> render -> orders", orders)
    return (
      <div>
        <h1>Monitor de Ordens de Manutenção</h1>
        <div className="md-grid" style={{ padding: 0 }}>
          <C_Calendar
            id="from"
            name="from"
            value={new Date()}
            onChange={this.onChange}
            label={"De"}
            allDay
            style={{ marginTop:8, marginRight: 20}}
          />
          <C_Calendar
            id="to"
            name="to"
            value={new Date()}
            onChange={this.onChange}
            label={"Até"}
            allDay
            style={{marginTop:8, marginRight: 20}}
          />
          <C_SelectField
            id="status"
            name="status"
            onChange={this.onChange}
            value={this.state.selectedStatus}
            label={"Status"}
            list={this.state.listStatus}
            labelElement="label"
            valueElement="value"
            style={{width:200, marginTop:8, marginRight: 20}}
          />
           <C_SelectField
            id="priority"
            name="priority"
            onChange={this.onChange}
            value={this.state.selectedPriority}
            label={"Prioridade"}
            list={this.state.listPriority}
            labelElement="label"
            valueElement="value"
            style={{ marginRight: 30, width:200, marginTop:8}}
          />
          <C_Button
            primary={true}
            style={{ marginTop:30, fontSize: 16, width: "10%"}}
            label={"LISTAR"}
            action={() => this.listOrders()}
          />
        </div>
        <div style={{display:"flex", flexWrap: "wrap"}}>
          { orders && orders.map((order) => {

            var colorPriority; 

            if (order.Priority == "Urgente") colorPriority = "red"
            if (order.Priority == "Alta") colorPriority = "#ffd300"
            if (order.Priority == "Média") colorPriority = "#3177e8"
            if (order.Priority == "Baixa") colorPriority = "#03a140"

            return (
              <fieldset style={{position:"relative", width:"30%", borderRadius: 5, border: "1px solid silver", marginBottom: 40, padding:10, marginTop:40, marginRight: 20}}>
                <legend style={{width: "auto", border: "none", paddingRight: 5, paddingLeft: 5, marginLeft: 10, marginBottom: 0,color: "#666666a6", fontWeight: "bold", fontSize: 25, marginTop: 100}}>{order.OrderNumber}</legend>
                <div style={{}}>
                  <div style={{borderRadius: 5, top:16, right:0, position:"absolute", height:158, width:60, backgroundColor: colorPriority}}></div>
                  <div style={{display:"flex"}}> 
                    <strong style={{marginRight:5}}>Tipo:</strong><p>{order.Type}</p>
                  </div>
                  <div style={{display:"flex"}}> 
                    <strong style={{marginRight:5}}>Equipamento:</strong><p>{order.Equipment}</p>
                  </div>
                  <div style={{display:"flex"}}> 
                    <strong style={{marginRight:5}}>Prioridade:</strong><p>{order.Priority}</p>
                  </div>
                  <div style={{display:"flex"}}> 
                    <strong style={{marginRight:5}}>Abertura:</strong><p>{order.OpenDate}</p>
                  </div>
                </div>
              </fieldset>            
            )
            })
          }
        </div>
      </div>
    )
  }
}

export default Dashboard;