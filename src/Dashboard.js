import React, { Component } from 'react';
import C_SelectField from './components/SelectField'

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listStatus: [{
        name: "Todos",
        id: "ALL"
      },
      {
        name: "Abertas",
        id: "OPEN"
      },
      {
        name: "Pendentes",
        id: "PENDING"
      },
      {
        name: "Em Andamento",
        id: "IN_PROGRESS"
      },
      {
        name: "Finalizadas",
        id: "FINISHED"
      }],

      fields: {},
      selectedStatus: "ALL"
    }

    this.onChange = this.onChange.bind(this);

  }

  onChange(e, name) {

    let fields = this.state.fields;

    fields[e.target.name] = e.target.value;

    this.setState({ fields })
  }

  render() {
    console.log("Dashboard -> render -> fields", this.state)
    return (
      <div>
        <h1>Monitor de Ordens de Manutenção</h1>
        <div style={{zIndex:1}}>
          <C_SelectField
            id="status"
            name="status"
            onChange={this.onChange}
            value={this.state.selectedStatus}
            label={"Status"}
            list={this.state.listStatus}
            labelElement="name"
            valueElement="id"
            required={false}
            style={{ width: 200}}
            listStyle={{width:200}}
          />
        </div>
      </div>
    )
  }
}

export default Dashboard;