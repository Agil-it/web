import React, { Component } from 'react';
import C_SelectField from './components/SelectField'

class Dashboard extends Component {
 constructor(props) {
  super(props);

  this.state = {
    listStatus: [
      {
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
      }
    ],

    fields:{}
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
      <div>
        <C_SelectField
          id="status"
          name="status"
          onChange={this.onChange}
          label={"Status"}
          list={this.state.listStatus}
          // valueElement={"ALL"}
          required={false}
          style={{ width: 350 }}
        />
      </div>
    </div>
  )
 }
}

export default Dashboard;