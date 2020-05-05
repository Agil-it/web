import React, { PureComponent } from 'react';
import '../index.css';
import { C_ButtonFloat, C_MenuButton } from "./Button";
import { C_Icon } from "./Icon";
import { MaintenanceOrderHelper as HelperOM } from '../helpers/MaintenanceOrder';

export class C_MaintenanceOrder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: this.props.order
    }

    console.log("C_MaintenanceOrder -> render -> this.state", this.state)
  }

  render() {

    var order = this.state.order;
    var configOptions = [
      { value:"assume", name: "ASSUMIR ORDEM", icon: "touch_app" },
      { value:"play", name: "INICIAR ORDEM", icon: "play_circle_filled" },
      { value:"pause", name: "PAUSAR ORDEM", icon: "pause_circle_filled" },
      { value:"delegate", name: "DELEGAR ORDEM", icon: "person_add" },
      { value:"invite", name: "CONVIDAR TÉCNICO", icon: "group" },
      { value:"request", name: "SOLICITAR PARTICIPAÇÃO", icon: "group_add" },
      { value:"appointments", name: "APONTAMENTOS", icon: "assignment" },
      { value:"status_equipment", name: "STATUS EQUIPAMENTO", icon: "swap_vert" },
      { value:"check_list", name: "CHECK-LIST ORDEM", icon: "done_all" },
      { value:"operations", name: "OPERAÇÕES", icon: "build" },
      { value:"sign", name: "ASSINATURA", icon: "fingerprint" },
    ]

    return (
      <div style={{ width: "100%", marginTop: 20 }}>
        <div style={{position:"relative", display: "flex", justifyContent: "space-between", width: "95%", margin: "auto" }}>
          <C_ButtonFloat
            icon={"keyboard_backspace"}
            tooltipLabel={"Voltar"}
            tooltipPosition="right"
            style={{ width: 54, height: 54 }}
            iconSize={27}
            secondary
            action={() => this.props.onClose()}
          />
          <h1 style={{ fontSize: "3em", fontWeight: "bold" }}>{order.orderNumber}</h1>
          <C_MenuButton
            style={{backgroundColor:'#424242', color:"white", width:54, height:54}}
            listStyle={{position: "fixed", top: 20, right:20}}
            icon="settings"
            options={configOptions}
          />
        </div>
        <div>
          <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <C_Icon style={{ fontSize: 60, color: HelperOM.translate("color", order.priority) }} icon="bookmark" />
            <span style={{fontSize:18, fontWeight:"bold", color:"#424242"}}>{`Prioridade ${HelperOM.translate("priority", order.priority)}`}</span>
          </div>
        </div>
      </div>
    );
  }
}