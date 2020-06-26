import React, { PureComponent } from 'react';
import '../index.css';
import { C_ButtonFloat, C_MenuButton } from "./Button";
import { C_Icon } from "./Icon";
import { MaintenanceOrderHelper as HelperOM } from '../helpers/MaintenanceOrder';
import { HandlerProvider } from '../providers/handler';
import { MaintenanceOrderProvider } from '../providers/MaintenanceOrder';
import { C_Loading } from './Loading';
import { C_Operations } from './Operations';
import { C_ToolTip } from './ToolTip';
import C_ExpansiveHeader from './ExpansiveHeader';

export class C_MaintenanceOrder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orderId: this.props.orderId,
      order: undefined,
    }

    this.provider = new HandlerProvider(new MaintenanceOrderProvider(), "ordem de manutenção")
    this.getOrder();
  }

  async getOrder() {

    let order = {};
    let response = await this.provider.get(this.state.orderId);
    console.log("C_MaintenanceOrder -> getOrder -> response", response)

    if (response.success) {
      order = response.data
    }

    this.setState({ order })
  }

  render() {

    var order = this.state.order;
    console.log("C_MaintenanceOrder -> render -> order", order)

    const configOptions = [
      { value: "assume", name: "ASSUMIR ORDEM", icon: "touch_app", disabled: false },
      { value: "play", name: "INICIAR ORDEM", icon: "play_circle_filled", disabled: true },
      { value: "pause", name: "PAUSAR ORDEM", icon: "pause_circle_filled", disabled: true },
      { value: "delegate", name: "DELEGAR ORDEM", icon: "person_add", disabled: false },
      { value: "invite", name: "CONVIDAR TÉCNICO", icon: "group", disabled: true },
      { value: "request", name: "SOLICITAR PARTICIPAÇÃO", icon: "group_add", disabled: true },
      { value: "appointments", name: "APONTAMENTOS", icon: "assignment", disabled: true },
      { value: "status_equipment", name: "STATUS EQUIPAMENTO", icon: "swap_vert", disabled: true },
      { value: "check_list", name: "CHECK-LIST ORDEM", icon: "done_all", disabled: true },
      { value: "operations", name: "OPERAÇÕES", icon: "build", disabled: true },
      { value: "sign", name: "ASSINATURA", icon: "fingerprint", disabled: true },
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
        <div style={{ width: "100%", backgroundColor: this.state.showBackgroundColor ? "#858585" : undefined, padding: 20 }}>
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
          <C_ExpansiveHeader onClick={() => this.setState({ expandedDetails: !this.state.expandedDetails ? true : false })} icon={!this.state.expandedDetails ? "expand_less" : "expand_more"} title="Detalhes da Ordem">
            {this.state.expandedDetails ?
              <div style={{ borderRadius: 5, padding: 10, border: "1px solid silver" }}>
                <div style={{ marginTop: 10 }}>
                  <strong>{"Descrição do Problema: "}</strong>
                  <span style={{ color: "#3a3939" }}>{order.description}</span>
                </div>
                <div style={{ marginTop: 10 }}>
                  <strong>{"Centro de Trabalho: "}</strong>
                  <span style={{ color: "#3a3939" }}>{order.workCenter.description}</span>
                </div>
              </div>
              : undefined}
          </C_ExpansiveHeader>

          <C_ExpansiveHeader onClick={() => this.setState({ expandedEquipments: !this.state.expandedEquipments ? true : false })} icon={!this.state.expandedEquipments ? "expand_less" : "expand_more"} title="Equipamentos">
            {this.state.expandedEquipments ?
              <div style={{ borderRadius: 5, padding: 10, border: "1px solid silver" }}>
                {order.orderEquipment.map(item => (
                  <div>
                    <div style={{ marginTop: 10 }}>
                      <strong>{"Código: "}</strong>
                      <span style={{ color: "#3a3939" }}>{item.equipment.code}</span>
                    </div>
                    <div style={{ marginTop: 10 }}>
                      <strong>{"Descrição do Equipamento: "}</strong>
                      <span style={{ color: "#3a3939" }}>{item.equipment.description}</span>
                    </div>
                    <div style={{ marginTop: 10 }}>
                      <strong>{"Tipo de Máquina: "}</strong>
                      <span style={{ color: "#3a3939" }}>{item.equipment.machineType.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            : undefined}
          </C_ExpansiveHeader>

          {this.state.itemSelected == "operations" ?
            <div style={{ width: "97%", display: "flex", justifyContent: "center", position: "fixed", top: "10%", right: 0 }}>
              <C_Operations
                style={{ width: "50%", padding: 20 }}
                orderId={order.id}
                equipments={order.orderEquipment}
                title="OPERAÇÕES"
                onClose={() => this.setState({ itemSelected: "", showBackgroundColor: false })}
              />
            </div>
            : undefined}
        </div>
    );
  }
}