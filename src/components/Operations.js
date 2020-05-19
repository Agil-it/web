import { Card, CardTitle, CardText, Avatar } from 'react-md';
import React, { Component } from 'react';
import '../index.css';
import C_SelectField from './SelectField';
import C_TextField from './TextField';
import { C_TimePicker } from "./Calendar"
import { C_Icon } from './Icon';
class C_Operations extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedEquipment: this.props.equipments[0].equipment.id,
      equipments: this.props.equipments,
      operation: {},
    }

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount(){

    let listEquipments = [];
    let equipments = this.state.equipments;

    for (let i = 0; i < equipments.length; i++) {
      var equipment = {
        label: equipments[i].equipment.description,
        value: equipments[i].equipment.id
      }
      listEquipments.push(equipment)
    }
    console.log("C_Operations -> componentDidMount -> listEquipments", listEquipments)

    this.setState({listEquipments})
  }

  onChange(e, name) {
  console.log("C_Operations -> onChange -> name", name)
  console.log("C_Operations -> onChange -> e", e)

    let operation = this.state.operation;

    operation[e.target.name] = e.target.value;
    this.setState({ operation })

  }

  render() {

    console.log("state operations", this.state)

    return (
      <Card
        style={this.props.style}
        className={this.props.className}
        onClick={this.props.onClick}
        onMouseLeave={this.props.onMouseLeave}
      >
        <div style={{position: "relative"}}>
          <div>
            <C_Icon
              style={{ cursor: "pointer", position: "absolute", right: 0 }}
              icon="close" iconSize={25}
              action={() => this.props.onClose()}
            />
          </div>
          <span style={{fontSize:24, fontWeight:"bold"}}>{this.props.title}</span>
          <div style={{fontSize:20, color:"#424242"}}>{`Cadastrar Nova Operação`}</div>
          <div>
            <div className="md-cell md-cell--12 md-cell--bottom">
              <C_SelectField name="orderEquipament" id="orderEquipament"
                value={this.state.selectedEquipment} onChange={(e) => this.setState({selectedEquipment: e.target.value})} type="text"
                label={"Selecione o Equipamento"} placeholder={"Selecionar"}
                list={this.state.listEquipments} required={true}
                style={{ width: "100%" }}
              />
            </div>
            <div className="md-cell md-cell--12 md-cell--bottom">
              <C_TextField id="description" name="description"
                value={this.state.operation.description} onChange={this.onChange}
                type="text"  label="Descrição" placeholder="Descrição"
                icon="description"  required={true}
              />
            </div>
            <div className="md-cell md-cell--12 md-cell--bottom">
              <C_TimePicker id="planningTime" name="planningTime"
                value={this.state.operation.planningTime} onChange={this.onChange}
                type="text" label="Tempo Planejado" placeholder="Tempo Planejado" required={true}
                icon="access_time"
              />
            </div>
            <div className="md-cell md-cell--12 md-cell--bottom">
              <C_TimePicker id="executeTime" name="executeTime"
                value={this.state.operation.executeTime} onChange={this.onChange}
                type="text" label="Tempo Executado" placeholder="Tempo Executado" required={true}
                icon="add_alarm"
              />
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default C_Operations;