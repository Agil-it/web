import React, { PureComponent } from 'react';
import '../index.css';
import { C_ButtonFloat, C_MenuButton } from "./Button";
import { C_Icon } from "./Icon";
import { MaintenanceOrderHelper as HelperOM } from '../helpers/MaintenanceOrder';
import { StringHelper } from '../helpers/String';
import {DateHelper} from '../helpers/Date';
import { HandlerProvider } from '../providers/handler';
import { MaintenanceOrderProvider } from '../providers/MaintenanceOrder';
import { OrderOperationProvider } from '../providers/OrderOperation';
import { C_Loading } from './Loading';
import { C_Operations } from './Operations';
import { C_Signature } from './Signature';
import { C_ToolTip } from './ToolTip';
import C_Header from './Header';
import { C_Label } from './Label';
import { C_Appointments } from './Appointments';
export class C_MaintenanceOrder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orderId: this.props.orderId,
      order: undefined,
      expandedDetails: true,
      expandedEquipments: true,
      expandEquipment: {},
      backgroundModal: StringHelper.backgroundModal(),
      backgroundDefault: {
        width: "100%", 
        padding: 20
      }
    }

    this.provider = new HandlerProvider(new MaintenanceOrderProvider(), "ordem de manutenção")
    this.providerOperation = new HandlerProvider(new OrderOperationProvider(), "operação da ordem")

    this.saveEquipment = this.saveEquipment.bind(this);
    this.saveOperation = this.saveOperation.bind(this);
    this.getOrder();
  }

  async getOrder() {

    let order = {};
    let response = await this.provider.get(this.state.orderId);

    if (response.success) {
      order = response.data
    }

    this.setState({ order })
  }

  saveOperation(indexEquipment, indexOperation, operation) {
    debugger;
    const { order } = this.state;

    var orderEquipment = order.orderEquipment[indexEquipment];
    if (!orderEquipment) return;

    var component = this;

    operation.orderEquipment = {
      id: orderEquipment.id,
    }

    this.providerOperation.save(operation, (newOperation) => {

      if (!Array.isArray(orderEquipment.orderOperation)) orderEquipment.orderOperation = [];

      if (indexOperation >= 0) orderEquipment.orderOperation.splice(indexOperation, 1, newOperation);
      else orderEquipment.orderOperation.push(newOperation);
  
      order.orderEquipment.splice(indexEquipment, 1, orderEquipment);

      component.setState({ order })
    })
  }

  saveEquipment(index, orderEquipment) {
    const { order } = this.state;

    order.orderEquipment.splice(index, 1, orderEquipment);

    this.setState({ order });
  }

  render() {

    var order = this.state.order;
    console.log("C_MaintenanceOrder -> render -> order", this.state)

    const configOptions = [
      { value: "assume", name: "ASSUMIR ORDEM", icon: "touch_app", disabled: false },
      { value: "play", name: "INICIAR ORDEM", icon: "play_circle_filled", disabled: true },
      { value: "pause", name: "PAUSAR ORDEM", icon: "pause_circle_filled", disabled: true },
      { value: "delegate", name: "DELEGAR ORDEM", icon: "person_add", disabled: false },
      { value: "invite", name: "CONVIDAR TÉCNICO", icon: "group", disabled: true },
      { value: "request", name: "SOLICITAR PARTICIPAÇÃO", icon: "group_add", disabled: true },
      { value: "appointments", name: "APONTAMENTOS", icon: "assignment", disabled: false },
      { value: "status_equipment", name: "STATUS EQUIPAMENTO", icon: "swap_vert", disabled: true },
      { value: "check_list", name: "CHECK-LIST ORDEM", icon: "done_all", disabled: true },
      { value: "operations", name: "OPERAÇÕES", icon: "build", disabled: false },
      { value: "sign", name: "ASSINATURA", icon: "fingerprint", disabled: false },
    ]

    return (

      !this.state.order ?
        <div style={{ marginTop: "10%", alignItems: "center", display: "flex", justifyContent: "center" }}>
          <C_Loading
            scale={3}
            footer={true}
            message={"Carregando Ordem..."}
          />
        </div>
        :
        <div style={this.state.backgroundDefault}>
          <div style={{ position: "relative", display: "flex", justifyContent: "space-between", width: "95%", margin: "auto" }}>
            <C_ToolTip tooltip="Voltar" position="right">
              <C_ButtonFloat
                icon={"keyboard_backspace"}
                style={{ display: "flex", width: "auto", height: "auto" }}
                iconSize={30}
                secondary
                action={() => this.props.onClose()}
              />
            </C_ToolTip>
            <h1 style={{ fontSize: "3em", fontWeight: "bold" }}>{order.orderNumber}</h1>
            <C_MenuButton
              style={{ backgroundColor: '#424242', color: "white", display: "flex", width: "auto", height: "auto" }}
              listStyle={{ position: "fixed", top: 20, right: 20 }}
              icon="settings"
              options={configOptions}
              onClickItem={(item) => this.setState({ itemSelected: item, showBackgroundColor: true })}
            />
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <C_Icon style={{ fontSize: 60, color: HelperOM.translate("color", order.priority) }} icon="bookmark" />
              <span style={{ fontSize: 18, fontWeight: "bold", color: "#424242" }}>{`Prioridade ${HelperOM.translate("priority", order.priority)}`}</span>
            </div>
            <div style={{ marginTop: "2%", padding: 10, width: "100%", borderRadius: 5, border: "1px solid silver" }}>
              <div style={{ fontStyle: 'oblique', display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                <span style={{ fontWeight: "bold", fontSize: 18 }}>{`ORDEM DE MANUTENÇÃO`}</span>
                <span style={{ fontSize: 18 }}>{order.orderLayout.classification}</span>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ fontWeight: "bold", fontSize: 18 }}>{`STATUS:`}</span>
                  <span style={{ fontSize: 18, marginLeft: 5 }}>{HelperOM.translate("status", order.orderStatus)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="slideInUp">
            <C_Header onClick={() => this.setState({ expandedDetails: !this.state.expandedDetails ? true : false })} icon={!this.state.expandedDetails ? "expand_less" : "expand_more"} title="Detalhes da Ordem">
              {this.state.expandedDetails ?
                <div style={{ borderRadius: 5, border: "1px solid silver" }}>
                  <div className="md-grid">
                    <C_Label maxWidth="80%" className="md-cell md-cell--6 md-cell--bottom" label="Descrição do Problema" value={order.description}/>
                    <C_Label className="md-cell md-cell--2 md-cell--bottom" label="Solicitante" value={order.solicitationUser.name} />
                    <C_Label className="md-cell md-cell--3 md-cell--bottom" label="Centro de Trabalho" value={order.workCenter.description} />
                    <C_Label className="md-cell md-cell--1 md-cell--bottom" label="Tipo" value={order.orderLayout.type} />
                    <div style={{ margin: 10, position: "absolute", right: 0 }}>
                      <C_ToolTip position="left" 
                      tooltip={
                        <div>                          
                          <div>Aberto em:</div>
                          <div>{DateHelper.formatDateTime(order.openedDate)}</div>
                        </div>
                      }>
                        <C_Icon style={{cursor:"pointer", fontSize: 30, color:"#3177e8"}} icon="access_time" />
                      </C_ToolTip>
                    </div>
                  </div>
                </div>
                : undefined}
            </C_Header>

            <C_Header onClick={() => this.setState({ expandedEquipments: !this.state.expandedEquipments ? true : false })} icon={!this.state.expandedEquipments ? "expand_less" : "expand_more"} title="Equipamentos">
              {this.state.expandedEquipments ?
                <div style={{ borderRadius: 5, padding: 10, border: "1px solid silver" }}>
                  {order.orderEquipment && order.orderEquipment.length > 0 && order.orderEquipment.map((item, i) => (
                    <C_Header backgroundColor="#847f7f" icon={!this.state.expandEquipment[i] ? "expand_less" : "expand_more"} title={item.equipment.code} noMargin={true}
                      onClick={() => {
                        let expandEquipment = this.state.expandEquipment;
                        expandEquipment[i] = !expandEquipment[i];
                        this.setState({ expandEquipment })
                      }} 
                    >
                      {this.state.expandEquipment[i] ? 
                      <div key={i}>
                        <div className="md-grid" >
                          <C_Label className="md-cell md-cell--5 md-cell--bottom" label="Equipamento Superior" value={item.superiorEquipment ? item.superiorEquipment.description : ""} />
                          <C_Label className="md-cell md-cell--5 md-cell--bottom" label="Equipamento" value={item.equipment.description} />
                          <C_Label className="md-cell md-cell--2 md-cell--bottom" 
                            iconStyle={{ cursor: "pointer", fontSize: 30, marginLeft: 20, color: item.isStopped ? "#ff7700" : "#03a140"}}
                            label="Status" icon={item.isStopped ? "error" : "check_circle"} 
                            tooltip={item.isStopped ? "Parado" : "Em Execução"} 
                          />
                        </div>
                        <div className="md-grid" >
                          <C_Label className="md-cell md-cell--5 md-cell--bottom" label="Local de Instalação" value={item.installationArea.description} />
                          <C_Label className="md-cell md-cell--5 md-cell--bottom" label="Setor" value={item.installationArea.sector.description} />   
                          <C_Label className="md-cell md-cell--2 md-cell--bottom" label="Tipo de Máquina" value={item.equipment.machineType.description} />   
                                                
                        </div>
                        <div className="md-grid" >
                          <C_Label className="md-cell md-cell--5 md-cell--bottom" label="Causa do Defeito" value={item.defectOrigin ? item.defectOrigin.description : ""} />
                          <C_Label className="md-cell md-cell--5 md-cell--bottom" label="Sintoma do Defeito" value={item.defectSymptom ? item.defectSymptom.description: ""} />
                          <C_Label className="md-cell md-cell--2 md-cell--bottom" label="Requer Parada?" value={item.needStopping ? "SIM" : "NÃO"} />  
                        </div>
                      </div>
                      : undefined }
                    </C_Header>
                  ))}
                </div>
              : undefined}
            </C_Header>
          </div>

          {this.state.itemSelected == "operations" ?
            <div style={this.state.backgroundModal}>
              <div style={{ width: "100%", display: "flex", justifyContent: "center", position: "fixed", top: "5%"}}>
                <C_Operations
                  style={{ width: "50%", padding: 20, borderRadius:5 }}
                  saveEquipment={(index, orderEquipment) => this.saveEquipment(index, orderEquipment)}
                  saveOperation={(indexEquipment, indexOperation, operation) => this.saveOperation(indexEquipment, indexOperation, operation)}
                  equipments={order.orderEquipment}
                  title="OPERAÇÕES"
                  onCloseOperation={() => this.setState({ itemSelected: "", showBackgroundColor: false })}
                />
              </div>
            </div>
          : undefined}

          {this.state.itemSelected == "sign" ?
            <div style={this.state.backgroundModal}>
              <div style={{ width: "100%", display: "flex", justifyContent: "center", position: "fixed", top: "5%" }}>
                <C_Signature
                  style={{ width: "50%", padding: 20, borderRadius: 5 }}
                  title="ASSINATURA"
                  orderId={this.state.orderId}
                  onClose={(cb) => this.setState({ itemSelected: "", showBackgroundColor: false }, cb ? this.getOrder : undefined )}
                />
              </div>
            </div>
          : undefined}

          {this.state.itemSelected == "appointments" ?
            <div style={this.state.backgroundModal}>
              <div style={{ width: "100%", display: "flex", justifyContent: "center", position: "fixed", top: "5%" }}>
                <C_Appointments
                  orderId={this.state.orderId}
                  orderNumber={this.state.order.orderNumber}
                  onClose={() => this.setState({ itemSelected: "", showBackgroundColor: false })}
                />
              </div>
            </div>
          : undefined}
        </div>
    );
  }
}
