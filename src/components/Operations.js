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
      viewOperations: true,
      orderId: this.props.orderId,
      operations: [],
    }

    this.createOperation = this.createOperation.bind(this);
    // this.updateOperatio
  }

  componentDidMount() {

  }

  createOperation(operation) {
    var operations = this.state.operations;

    operations.push(operation);

    this.setState({ operations, operation })
  }

  render() {

    console.log("state", this.state)


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
                style={{ display: "flex", width: "auto", height: "auto" }}
                icon={this.state.viewOperations ? "add" : "visibility"} action={() => this.setState({ viewOperations: !this.state.viewOperations ? true : false, isEditing: false })}
              />
            </C_ToolTip>
          </div>

          <div style={{ fontSize: 20, color: "#424242" }}>
            {this.state.viewOperations ? "Operações realizadas na Ordem." : (this.state.isEditing ? "Editar Operação" : "Cadastrar Nova Operação")}
          </div>
          {this.state.viewOperations ?
            <ViewOperations
              orderId={this.state.orderId}
              operations={this.state.operations}
              isEditing={(item) => this.setState({ isEditing: true, viewOperations: false, operation : item})}
            />
            :
            <CrudOperation
              showOperations={() => this.setState({viewOperations:true})}
              equipments={this.props.equipments}
              edit={this.state.isEditing}
              operation={this.state.operation}
              save={(operation) => this.state.isEditing ? this.createOperation(operation) : this.createOperation(operation)}
            />
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
      operations: this.props.operations ? this.props.operations : undefined,
      orderId: this.props.orderId
    }
    console.log("ViewOperations -> constructor -> this.props", this.props)
  }

  componentDidMount() {


  }


  render() {

    let operations = this.state.operations;

    return (
      <div>

        {!operations || operations.length == 0 ?
          <div style={{ textAlign: "center", marginTop: 50 }}>
            <h1>Nenhuma Operação Realizada.</h1>
          </div>
          : undefined}

        <div style={{ marginTop: 20 }}>
          {operations && operations.map((operation, i) =>
            <div>
              <div className="md-grid">
                <div className="effectfront" style={{ marginRight: 20, cursor: "pointer", padding: 5, backgroundColor: "#A40003", color: "white", width: 30, height: 30, borderRadius: 22 }}>
                  <div style={{ fontSize: 16, textAlign: "center" }}>{i + 1}</div>
                </div>
                <div className="md-cell md-cell--10 md-cell--bottom">
                  <C_TextField id="description" name="description"
                    value={operation.description} onChange={this.onChange}
                    type="text" label="Descrição" required={false}
                    icon="description" disabled={true}
                  />
                </div>
                <div style={{ display: "flex", position:"absolute", right:0, margin:20, alignItems: "center" }}>
                  <div>
                    <C_Icon style={{ cursor: "pointer", fontSize: 25, paddingRight: 20 }} icon="edit"
                      action={() => this.props.isEditing(operation)}
                    />
                  </div>
                  <div>
                    <C_Icon style={{ cursor: "pointer", fontSize: 25, }} icon="delete" 
                      action={() => {
                          this.props.delete(operation)
                        }
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}


export class CrudOperation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedEquipment: this.props.equipments[0].equipment.id,
      equipments: this.props.equipments,
      operation: this.props.edit ? this.props.operation : {},
    }

    this.onChange = this.onChange.bind(this);
    this.sendOperation = this.sendOperation.bind(this);

    console.log("CrudOperation -> constructor -> this.props", this.props)
  }

  sendOperation() {
    let operation = this.state.operation;
    let listEquipments = this.state.listEquipments
    console.log("CreateOperation -> sendOperation -> listEquipments", listEquipments)
    let descriptionEquipment = "";

    for (let i = 0; i < listEquipments.length; i++) {
      if (listEquipments[i].value == this.state.selectedEquipment)
        descriptionEquipment = listEquipments[i].label
    }

    operation.orderEquipment = {
      id: this.state.selectedEquipment,
      description: descriptionEquipment
    }

    this.props.save(operation);

    this.setState({operation:{}})

  }

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

    let operation = this.state.operation;

    operation[e.target.name] = e.target.value;
    this.setState({ operation })

  }

  render() {

    console.log("list de operações", this.state.listOperations);


    return (
      <div>
        <div className="md-cell md-cell--12 md-cell--bottom">
          <C_SelectField name="orderEquipament" id="orderEquipament"
            value={this.state.selectedEquipment} onChange={(e) => this.setState({ selectedEquipment: e.target.value })} type="text"
            label={"Selecione o Equipamento"} placeholder={"Selecionar"}
            list={this.state.listEquipments} required={true}
            style={{ width: "100%" }} disabled={this.props.edit}
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
            icon="access_time" disabled={this.props.edit}
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
          <C_Switch id="executed" name="executed" className="md-cell md-cell--6"
            value={this.state.operation.executed} onChange={this.onChange}
            type="switch" label="Marcar como Executado" checked={this.state.operation.executed}
          />
          <C_Button
            secondary={true}
            label="CANCELAR"
            className="md-cell md-cell--3 md-cell--bottom"
            action={() => { this.props.showOperations() }}
          />
          <C_Button
            className="md-cell md-cell--3 md-cell--bottom"
            primary={true}
            label="SALVAR"
            action={() => this.sendOperation()}
          />
        </div>
      </div>
    );
  }
}