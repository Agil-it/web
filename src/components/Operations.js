import { Card, CardTitle, CardText, Avatar } from 'react-md';
import React, { PureComponent } from 'react';
import '../index.css';
import C_SelectField from './SelectField';
import C_TextField from './TextField';
import { C_TimePicker } from "./Calendar"
import { C_Icon } from './Icon';
import { C_Switch } from './CheckBox'
import { C_Button, C_ButtonFloat } from './Button'
import { C_ToolTip } from './ToolTip'

export class C_Operations extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      viewOperations: true
    }
  }

  componentDidMount() { }

  render() {

    console.log("state operations", this.state)


    return (

      <Card
        style={this.props.style}
        className={this.props.className}
        title={this.props.title}
      >
        <div style={{ position: "relative" }}>
          <div>
            <C_Icon
              style={{ cursor: "pointer", position: "absolute", right: 0 }}
              icon="close" iconSize={25}
              action={() => this.props.onClose()}
            />
          </div>
          <div style={{ width: "80%", justifyContent: "space-between", display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: 24, fontWeight: "bold" }}>{this.props.title}</span>
            <C_ToolTip
              position="left"
              tooltipStyle={{ fontSize: 15 }}
              tooltip={this.state.viewOperations ? "Cadastrar Operação" : "Visualizar Operações"}
            >
              <C_ButtonFloat
                iconSize={30} primary
                style={{display:"flex", width:"auto", height:"auto"}}
                icon={this.state.viewOperations ? "add" : "visibility"} action={() => this.setState({ viewOperations: !this.state.viewOperations ? true : false })}
              />
            </C_ToolTip>
          </div>
          <div style={{ fontSize: 20, color: "#424242" }}>{this.state.viewOperations ? "Operações realizadas na Ordem." : "Cadastrar Nova Operação"}</div>
          {this.state.viewOperations ?
            <ViewOperations />
            :
            <CreateOperation equipments={this.props.equipments} />
          }
        </div>
      </Card>
    );
  }
}


export class ViewOperations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      operations: this.props.operations,
    }
  }

  componentDidMount() {

  }


  render() {

    return (
      <div>
        <h3>Component ViewOperations works</h3>
      </div>
    );
  }
}


export class CreateOperation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedEquipment: this.props.equipments[0].equipment.id,
      equipments: this.props.equipments,
      operation: {},
    }

    this.onChange = this.onChange.bind(this);
    this.saveOperation = this.saveOperation.bind(this);
  }

  saveOperation() { }

  componentDidMount() {

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

    this.setState({ listEquipments })
  }

  onChange(e, name) {
    console.log("C_Operations -> onChange -> name", name)
    console.log("C_Operations -> onChange -> e", e)

    let operation = this.state.operation;

    operation[e.target.name] = e.target.value;
    this.setState({ operation })

  }

  render() {

    return (
      <div>
        <div className="md-cell md-cell--12 md-cell--bottom">
          <C_SelectField name="orderEquipament" id="orderEquipament"
            value={this.state.selectedEquipment} onChange={(e) => this.setState({ selectedEquipment: e.target.value })} type="text"
            label={"Selecione o Equipamento"} placeholder={"Selecionar"}
            list={this.state.listEquipments} required={true}
            style={{ width: "100%" }}
          />
        </div>
        <div className="md-cell md-cell--12 md-cell--bottom">
          <C_TextField id="description" name="description"
            value={this.state.operation.description} onChange={this.onChange}
            type="text" label="Descrição" placeholder="Descrição"
            icon="description" required={true}
          />
        </div>
        <div className="md-cell md-cell--12 md-cell--bottom">
          <C_TextField id="planningTime" name="planningTime"
            value={this.state.operation.planningTime} onChange={this.onChange}
            type="number" label="Tempo Planejado" placeholder="Informe o tempo em minutos" required={false}
            icon="access_time"
          />
        </div>
        <div className="md-cell md-cell--12 md-cell--bottom">
          <C_TextField id="executeTime" name="executeTime"
            value={this.state.operation.executeTime} onChange={this.onChange}
            type="number" label="Tempo Executado" placeholder="Informe o tempo em minutos" required={false}
            icon="add_alarm"
          />
        </div>
        <div className="md-cell md-cell--12 md-cell--bottom">
          <C_TextField id="note" name="note"
            value={this.state.operation.note} onChange={this.onChange}
            type="text" label="Observações" placeholder="Observações" required={false}
            icon="comment" rows={2}
          />
        </div>
        <div style={{ margin: 0, paddingTop: 20 }} className="md-grid">
          <div className="md-cell md-cell--8 md-cell--bottom">
            <C_Switch id="executed" name="executed"
              value={this.state.operation.executed} onChange={this.onChange}
              type="switch" label="Marcar como Executado" checked={this.state.operation.executed}
            />
          </div>
          <div className="md-cell md-cell--2 md-cell--bottom">
            <C_Button
              secondary={true}
              label="CANCELAR"
              action={() => {
                this.setState({ viewOperations: true })
              }}
            />
          </div>
          <div className="md-cell md-cell--2 md-cell--bottom">
            <C_Button
              primary={true}
              label="SALVAR"
              action={() => {
                this.saveOperation();
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}