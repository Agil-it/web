import { Card } from 'react-md';
import React, { PureComponent } from 'react';
import '../index.css';
import C_SelectField from './SelectField';
import C_TextField from './TextField';
import { OrderOperationProvider } from '../providers/OrderOperation'
import { HandlerProvider } from '../providers/handler';
import { C_Icon } from './Icon';
import { C_Label } from './Label';
import { C_Switch } from './CheckBox'
import { C_Button, C_ButtonFloat } from './Button'
import { C_ToolTip } from './ToolTip'

export class C_Operations extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      viewOperations: true,
      order: this.props.order,
    }
  }

  componentDidMount() { }

  render() {


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
              action={() => this.props.onCloseOperation()}
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
              equipments={this.props.equipments}
              onUpdate={(index, orderEquipment) => this.props.saveEquipment(index, orderEquipment)}
              isEditing={(indexEquipment, indexOperation, operation) => this.setState({ isEditing: true, viewOperations: false, operation, indexOperation, indexEquipment })}
            />
            :
            <CrudOperation
              showOperations={() => this.setState({ viewOperations: true })}
              equipments={this.props.equipments}
              edit={this.state.isEditing}
              selectedEquipment={this.state.indexEquipment}
              operation={this.state.operation}
              save={(operation, equipmentIndex) => this.props.saveOperation(equipmentIndex, this.state.isEditing ? this.state.indexOperation : -1, operation)}
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
      orderEquipment: this.props.equipments || [],
      hasOperations: false,
      equipments: [],
    }

    this.providerOperation = new HandlerProvider(new OrderOperationProvider(), "operação da ordem");
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
    this.refreshEquipments();
  }

  refreshEquipments() {
    const { orderEquipment } = this.state;
    let hasOperations = false;


    const equipments = orderEquipment.reduce((acc, equipment, index) => {
      const operations = equipment.orderOperation || [];
      acc[index] = [...operations];
      if (operations.length) hasOperations = true;

      return acc;
    }, {});

    this.setState({ equipments, hasOperations });
  }

  async delete(seqEquipment, seqOperation, operation) {
    const { orderEquipment } = this.state;
    console.log("ViewOperations -> delete 1 -> orderEquipment", orderEquipment)

    if (operation.id) {
      const deleted = await this.providerOperation.deleteObject(operation.id)

      if (!deleted) {
        return;
      }
    }

    orderEquipment[seqEquipment].orderOperation.splice(seqOperation, 1);
    console.log("ViewOperations -> delete 2 -> orderEquipment", orderEquipment)

    this.setState({ orderEquipment }, () => {
      this.props.onUpdate(seqEquipment, orderEquipment);
      this.refreshEquipments();
    });
  }


  render() {
    const { equipments, hasOperations, orderEquipment } = this.state;
    console.log("ViewOperations -> render -> this.state", this.state)
    const equipmentEntries = Object.entries(equipments || {});

    return (
      <div>

        {!hasOperations ?
          <div style={{ textAlign: "center", marginTop: 50 }}>
            <h1>Nenhuma Operação Realizada.</h1>
          </div>
          : undefined}

        <div style={{ marginTop: 20 }}>
          {hasOperations && equipmentEntries.map(([seqEquipment, operations]) =>
            <div>

              <C_Label
                icon="info_outline"
                iconDescription={orderEquipment[seqEquipment].equipment.description}
                tooltip="Equipamento"
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontWeight: 'bold',
                }}
                iconStyle={{
                  cursor: "pointer",
                  color: '#3177E8',
                  fontSize: 25,
                  display: 'flex',
                }}
              />
              {operations.map((operation, seqOperation) =>
                <div>
                  <div className="md-grid">
                    <div className="effectfront" style={{ marginRight: 20, cursor: "pointer", padding: 5, backgroundColor: "#A40003", color: "white", width: 30, height: 30, borderRadius: 22 }}>
                      <div style={{ fontSize: 16, textAlign: "center" }}>{seqOperation + 1}</div>
                    </div>
                    <div className="md-cell md-cell--10 md-cell--bottom">
                      <C_TextField id="description" name="description"
                        value={operation.description} onChange={this.onChange}
                        type="text" label="Descrição" required={false}
                        icon={operation.isDisapproved ? "warning" : "description"} disabled={true}
                      />
                    </div>
                    <div style={{ display: "flex", position: "absolute", right: 0, margin: 20, alignItems: "center" }}>
                      <div>
                        <C_Icon style={{ cursor: "pointer", fontSize: 25, paddingRight: 20 }} icon="edit"
                          action={() => this.props.isEditing(seqEquipment, seqOperation, operation)}
                        />
                      </div>
                      <div>
                        <C_Icon style={{ cursor: "pointer", fontSize: 25, }} icon="delete"
                          action={() => this.delete(seqEquipment, seqOperation, operation)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
      orderEquipments: this.props.equipments || [],
      operation: this.props.edit ? this.props.operation : {},
    }

    this.onChange = this.onChange.bind(this);
    this.sendOperation = this.sendOperation.bind(this);
  }

  sendOperation() {
    let operation = this.state.operation;

    this.props.save(operation, this.state.selectedEquipment);

    this.setState({ operation: {} })
  }

  componentDidMount() {
    const { orderEquipments } = this.state;

    let selectedEquipment = undefined;
    let listEquipments = [];
    
    if (this.props.edit && this.props.selectedEquipment) {
     
      selectedEquipment = this.props.selectedEquipment;
      let orderEquipment = orderEquipments[selectedEquipment];

      listEquipments.push({
        label: orderEquipment.equipment.description,
        value: selectedEquipment,
      })
    }
    else {
      listEquipments = orderEquipments.map((item, i) => ({
        label: item.equipment.description,
        value: i,
      }))

      selectedEquipment = listEquipments[0] && listEquipments[0].value ? listEquipments[0].value : undefined
    }

    this.setState({ listEquipments, selectedEquipment })
  }

  onChange(e, name) {

    let operation = this.state.operation;

    operation[e.target.name] = e.target.value;
    this.setState({ operation })

  }

  render() {


    return (
      <div>
        <div className="md-cell md-cell--12 md-cell--bottom">
          <C_SelectField name="orderEquipament" id="orderEquipament"
            type="text"
            label={"Selecione o Equipamento"}
            placeholder={"Selecionar"}
            list={this.state.listEquipments}
            required={true}
            value={this.state.selectedEquipment}
            onChange={(e) => this.setState({ selectedEquipment: e.target.value })}
            style={{ width: "100%" }} disabled={this.props.edit}
          />
        </div>
        <div className="md-cell md-cell--12 md-cell--bottom">
          <C_TextField id="operationNumber" name="operationNumber"
            value={this.state.operation.operationNumber} onChange={this.onChange}
            type="number" label="Número Operação" placeholder="Número Operação" required={false}
            icon="keyboard_arrow_right"
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