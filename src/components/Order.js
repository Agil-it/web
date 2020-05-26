import React, { PureComponent } from 'react';
import '../index.css';
import { C_ButtonFloat, C_MenuButton } from "./Button";
import { C_Icon } from "./Icon";
import { MaintenanceOrderHelper as HelperOM } from '../helpers/MaintenanceOrder';
import { HandlerProvider } from '../providers/handler';
import { MaintenanceOrderProvider } from '../providers/MaintenanceOrder';
import { DateHelper } from '../helpers/Date';
import { C_Loading } from './Loading';
import { MenuButton } from 'react-md';
import {C_Operations} from './Operations';

export class C_MaintenanceOrder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orderId: this.props.orderId,
      order: undefined,
      configOptions : [
        { value: "assume", name: "ASSUMIR ORDEM", icon: "touch_app" },
        { value: "play", name: "INICIAR ORDEM", icon: "play_circle_filled" },
        { value: "pause", name: "PAUSAR ORDEM", icon: "pause_circle_filled" },
        { value: "delegate", name: "DELEGAR ORDEM", icon: "person_add" },
        { value: "invite", name: "CONVIDAR TÉCNICO", icon: "group" },
        { value: "request", name: "SOLICITAR PARTICIPAÇÃO", icon: "group_add" },
        { value: "appointments", name: "APONTAMENTOS", icon: "assignment" },
        { value: "status_equipment", name: "STATUS EQUIPAMENTO", icon: "swap_vert" },
        { value: "check_list", name: "CHECK-LIST ORDEM", icon: "done_all" },
        { value: "operations", name: "OPERAÇÕES", icon: "build" },
        { value: "sign", name: "ASSINATURA", icon: "fingerprint" },
      ]
    }

    this.provider = new HandlerProvider(new MaintenanceOrderProvider(), "ordem de manutenção")
    this.getOrder();
  }

  async getOrder() {

    let order = {};
    let response = await this.provider.get(this.state.orderId);

    if (response.success) {
      order = response.data
    }

    this.setState({ order })
    // let orders = [
    //   {
    //     id: 1,
    //     OrderNumber: "OM - 445588/D37",
    //     Type: "Preventiva",
    //     Priority: "Alta",
    //     Equipment: "JDB388/32",
    //     OpenDate: "09/05/2019 ás 23:53",
    //     Status: "Aberta",
    //   },
  }


  render() {

    var order = this.state.order;
    console.log("C_MaintenanceOrder -> render -> order", order)


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
            <C_ButtonFloat
              icon={"keyboard_backspace"}
              tooltipLabel={"Voltar"}
              tooltipPosition="right"
              style={{ display:"flex", width: "auto", height: "auto" }}
              iconSize={30}
              secondary
              action={() => this.props.onClose()}
            />
            <h1 style={{ fontSize: "3em", fontWeight: "bold" }}>{order.orderNumber}</h1>
            <C_MenuButton
              style={{ backgroundColor: '#424242', color: "white", display:"flex", width: "auto", height: "auto" }}
              listStyle={{ position: "fixed", top: 20, right: 20 }}
              icon="settings"
              options={this.state.configOptions}
              onClickItem={(item) => this.setState({ itemSelected : item, showBackgroundColor:true})}
            />
              
          </div>
          <div>
            <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <C_Icon style={{ fontSize: 60, color: HelperOM.translate("color", order.priority) }} icon="bookmark" />
              <span style={{ fontSize: 18, fontWeight: "bold", color: "#424242" }}>{`Prioridade ${HelperOM.translate("priority", order.priority)}`}</span>
              <div style={{ padding: 10, width: "25%", borderRadius: 5, border: "1px solid silver", position: "absolute", top: 0, right: "12%" }}>
                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                  <span style={{ fontWeight: "bold", fontSize: 16 }}>{`Manutenção ${order.orderLayout.description}`}</span>
                  <span>{order.orderType.description}</span>
                  <span>{order.orderClassification.description}</span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "baseline", width: "80%", marginTop: 10 }}>
            <h3 style={{ fontWeight: "bold" }}>{`STATUS:`}</h3>
            <div style={{ fontSize: 18, marginLeft: 5 }}>{HelperOM.translate("status", order.orderStatus)}</div>
          </div>
          <div className="slideInLeft" style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <fieldset style={{ paddingTop: 10, paddingBottom: 10, width: "50%", borderRadius: 5, border: "1px solid silver" }}>
              <legend style={{ paddingRight: 10, paddingLeft: 10, marginLeft: 10, color: "#666666a6", fontWeight: "bold", fontSize: 30 }}>{`Informações`}</legend>
              <div className="md-grid" style={{ justifyContent:"space-around"}}>
                <div style={{textAlign:"center"}}>
                  <C_Icon style={{ fontSize: 100 }} icon="build" />
                  <div style={{ }}>
                    <div style={{ fontSize: 18, fontWeight: "bold" }}>{`Equipamento Superior`}</div>
                    <div style={{ fontSize: 16 }}>{order.orderEquipment[0] ? order.orderEquipment[0].superiorEquipment.description : "Não informado"}</div>
                    <hr />
                    <div style={{ fontSize: 18, fontWeight: "bold" }}>{`Equipamento`}</div>
                    <div style={{ fontSize: 16 }}>{order.orderEquipment[0] ? order.orderEquipment[0].equipment.description : "Não informado"}</div>
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <C_Icon style={{ fontSize: 100, color: "#03a140"}} icon="location_on" />
                  <div style={{}}>
                    <div style={{ fontSize: 18, fontWeight: "bold" }}>{`Localização`}</div>
                    <div style={{ fontSize: 23, color: "#424242", marginTop: 15 }}>{order.orderEquipment[0] ? order.orderEquipment[0].installationArea.description : "Não informado"}</div>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
          <div className="slideInRight" style={{ marginTop: 10, position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <fieldset style={{ paddingTop: 10, paddingBottom: 10, width: "50%", borderRadius: 5, border: "1px solid silver" }}>
              <legend style={{ paddingRight: 10, paddingLeft: 10, marginLeft: 10, color: "#666666a6", fontWeight: "bold", fontSize: 30 }}>{`Abertura`}</legend>
              <div className="md-grid" style={{ justifyContent: "space-around" }}>
                <div style={{ textAlign: "center" }}>
                  <C_Icon style={{ fontSize: 100 }} icon="calendar_today" />
                  <div style={{}}>
                    <div style={{ fontSize: 20, fontWeight: "bold" }}>{`Criada em`}</div>
                    <div style={{ fontSize: 18 }}>{ DateHelper.formatDate(order.openedDate)}</div>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
          <div className="slideInDown" style={{ marginTop: 10, position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <fieldset style={{ paddingTop: 10, paddingBottom: 10, width: "50%", borderRadius: 5, border: "1px solid silver" }}>
              <legend style={{ paddingRight: 10, paddingLeft: 10, marginLeft: 10, color: "#666666a6", fontWeight: "bold", fontSize: 30 }}>{`Info. Adicionais`}</legend>
              <div className="md-grid" style={{ justifyContent: "space-around" }}>
                <div style={{ textAlign: "center" }}>
                  <C_Icon style={{ fontSize: 100, color: order.isStopped ? "red" : "#03a140" }} icon="not_interested" />
                  <div style={{ fontSize: 20, fontWeight: "bold" }}>{`Está parada?`}</div>
                  <div style={{ fontSize: 18 }}>{order.isStopped ? "SIM" : "NÃO"}</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <C_Icon style={{ fontSize: 100, color: order.needStopping ? "red" : "#03a140" }} icon="pan_tool" />
                  <div style={{ fontSize: 20, fontWeight: "bold" }}>{`Requer parada?`}</div>
                  <div style={{ fontSize: 18 }}>{order.needStopping ? "SIM" : "NÃO"}</div>
                </div>
              </div>
            </fieldset>
          </div>
          
          {this.state.itemSelected == "operations" ?
            <div style={{width:"97%",display:"flex", justifyContent:"center", position:"fixed", top:"10%", right:0}}>
              <C_Operations
                style={{width:"50%", padding:20}}
                orderId={order.id}
                equipments={order.orderEquipment}
                title="OPERAÇÕES"
                onClose={() => this.setState({itemSelected: "", showBackgroundColor: false})}
              />
            </div>
          : undefined }
        </div>
    );
  }
}