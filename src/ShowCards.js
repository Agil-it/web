import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import C_Card from './components/Card';
import { FontIcon, Subheader, Divider } from 'react-md';
import './index.css';
import CreateMachineType from './crud/MachineType';
import CreateMachineComponents from './crud/MachineComponents';
import CreateSector from './crud/Sector';
import CreateInstallationArea from './crud/InstallationArea';
import CreateUnitMeasurement from './crud/UnitMeasurement';
import CreateParts from './crud/Parts';
import CreateDefaultNote from './crud/Note';
import CreateDefaultOperation from './crud/Operation';
import CreateOrderType from './crud/OrderType';
import CreateDefectCause from './crud/Cause';
import CreateDefectDiagnostic from './crud/Diagnostic';
import CreateClassification from './crud/Classification';
import CreateMachine from './crud/Machine';
import CreateSuperiorMachine from './crud/SuperiorMachine';
import CreateWorkCenter from './crud/WorkCenter';
import CreateSafetyParameter from './crud/SafetyParameter';
import CreateUser from './crud/User';
import CreateOrderLayout from './crud/OrderLayout'
import CreateMaintenanceOrder from './crud/MaintenanceOrder';

// import './Login.css';

class ShowCards extends Component {

  constructor(props) {
    super(props);
    
    this.unmountModal = this.unmountModal.bind(this);
  }

  renderComponent(component) {

    if (component === "work center") {
      return ReactDOM.render(<CreateWorkCenter onClose={this.unmountModal}/>, this.getDOMToRender())

    } else if (component === "sector") {
      return ReactDOM.render(<CreateSector onClose={this.unmountModal}/>, this.getDOMToRender())

    } else if(component === "user") {
      ReactDOM.render(<CreateUser onClose={this.unmountModal}/>, this.getDOMToRender())
    
    } else if (component === "installation area") {
      return ReactDOM.render(<CreateInstallationArea onClose={this.unmountModal}/>, this.getDOMToRender())

    } else if (component === "safety parameter") {
      return ReactDOM.render(<CreateSafetyParameter onClose={this.unmountModal}/>, this.getDOMToRender())

    } else if (component === "machine type") {
      return ReactDOM.render(<CreateMachineType onClose={this.unmountModal}/>, this.getDOMToRender())

    } else if (component === "unit measurement") {
      return ReactDOM.render(<CreateUnitMeasurement onClose={this.unmountModal}/>, this.getDOMToRender())

    } else if (component === "machine components") {
      return ReactDOM.render(<CreateMachineComponents onClose={this.unmountModal}/>, this.getDOMToRender())

    } else if (component === "parts") {
      return ReactDOM.render(<CreateParts onClose={this.unmountModal}/>, this.getDOMToRender())

    } else if (component === "machine") {
      return ReactDOM.render(<CreateMachine onClose={this.unmountModal}/>, this.getDOMToRender())

    } else if (component === "superior machine") {
      return ReactDOM.render(<CreateSuperiorMachine onClose={this.unmountModal}/>, this.getDOMToRender())

    // } else if (component === "classification") {
    //   return ReactDOM.render(<CreateClassification onClose={this.unmountModal}/>, this.getDOMToRender())

    // } 
    } else if (component === "defect cause") {
      return ReactDOM.render(<CreateDefectCause onClose={this.unmountModal}/>, this.getDOMToRender())

    } else if (component === "defect diagnostic") {
      return ReactDOM.render(<CreateDefectDiagnostic onClose={this.unmountModal}/>, this.getDOMToRender())

    // } else if (component === "order type") {
    //   return ReactDOM.render(<CreateOrderType onClose={this.unmountModal}/>, this.getDOMToRender())

    } else if (component === "default note") {
      return ReactDOM.render(<CreateDefaultNote onClose={this.unmountModal}/>, this.getDOMToRender())

    } else if (component === "default operation") {
      return ReactDOM.render(<CreateDefaultOperation onClose={this.unmountModal}/>, this.getDOMToRender())

    } else if (component === "order layout") {
      return ReactDOM.render(<CreateOrderLayout onClose={this.unmountModal}/>, this.getDOMToRender())

    } else if (component === "maintenance order") {

      return ReactDOM.render(<CreateMaintenanceOrder onClose={this.unmountModal}/>, this.getDOMToRender())

    } else {
      console.log("TCL: ShowCards -> renderComponent -> else -> component", component)
      this.unmountModal()
    }
    
  }

  unmountModal() {
    ReactDOM.unmountComponentAtNode(this.getDOMToRender());
  }

  getDOMToRender() {
    return document.getElementById('cardList')
  }

  render() {

    return (
      <div style={{paddingBottom: 20}}>
        <span id="cardList"></span>
        <div style={{ marginTop: "2%", width: "50%" }}>
          <h2 style={{ color: "#A40003", fontWeight: "bold", textAlign: "left", marginLeft:"5%"}}>GERAL</h2>
          <hr />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <C_Card
            icon={<FontIcon>open_in_new</FontIcon>}
            style={{ marginLeft: 20, backgroundColor: "#79777745", marginTop: "3%", width: "20%", borderRadius: 10, cursor: "pointer" }}
            title={<div style={{ fontWeight: "bold" }}>CADASTRO</div>}
            className={"effectfront"}
            subtitle={"Centro de Trabalho"}
            onClick={() => this.renderComponent("work center")}
          />
          <C_Card
            icon={<FontIcon>open_in_new</FontIcon>}
            style={{ marginLeft: 20, backgroundColor: "#79777745", marginTop: "3%", width: "20%", borderRadius: 10, cursor: "pointer" }}
            title={<div style={{ fontWeight: "bold" }}>CADASTRO</div>}
            className={"effectfront"}
            subtitle={"Setor"}
            onClick={() => this.renderComponent("sector")}
          />
          <C_Card
            icon={<FontIcon>open_in_new</FontIcon>}
            style={{ marginLeft: 20, backgroundColor: "#79777745", marginTop: "3%", width: "20%", borderRadius: 10, cursor: "pointer" }}
            title={<div style={{ fontWeight: "bold" }}>CADASTRO</div>}
            className={"effectfront"}
            subtitle={"Usuários"}
            onClick={() => this.renderComponent("user")}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <C_Card
            icon={<FontIcon>open_in_new</FontIcon>}
            style={{ marginLeft: 20, backgroundColor: "#79777745", marginTop: "3%", width: "20%", borderRadius: 10, cursor: "pointer" }}
            title={<div style={{ fontWeight: "bold" }}>CADASTRO</div>}
            className={"effectfront"}
            subtitle={"Local de Instalação"}
            onClick={() => this.renderComponent("installation area")}
          />
          <C_Card
            icon={<FontIcon>open_in_new</FontIcon>}
            style={{ marginLeft: 20, backgroundColor: "#79777745", marginTop: "3%", width: "20%", borderRadius: 10, cursor: "pointer" }}
            title={<div style={{ fontWeight: "bold" }}>CADASTRO</div>}
            className={"effectfront"}
            subtitle={"Parametrização Segurança"}
            onClick={() => this.renderComponent("safety parameter")}
          />
          <div style={{ marginLeft: 20, marginTop: "3%", width: "20%" }}></div>
        </div>
        <div style={{ marginTop: "4%", width: "50%" }}>
          <h2 style={{ color: "#A40003", fontWeight: "bold", textAlign: "left", marginLeft:"5%"}}>EQUIPAMENTO</h2>
          <hr />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <C_Card
            icon={<FontIcon>open_in_new</FontIcon>}
            style={{ marginLeft: 20, backgroundColor: "#79777745", marginTop: "3%", width: "20%", borderRadius: 10, cursor: "pointer" }}
            title={<div style={{ fontWeight: "bold" }}>CADASTRO</div>}
            className={"effectfront"}
            subtitle={"Tipo de Máquina"}
            onClick={() => this.renderComponent("machine type")}
          />
          <C_Card
            icon={<FontIcon>open_in_new</FontIcon>}
            style={{ marginLeft: 20, backgroundColor: "#79777745", marginTop: "3%", width: "20%", borderRadius: 10, cursor: "pointer" }}
            title={<div style={{ fontWeight: "bold" }}>CADASTRO</div>}
            className={"effectfront"}
            subtitle={"Unidade de Medida"}
            onClick={() => this.renderComponent("unit measurement")}
          />
          <C_Card
            icon={<FontIcon>open_in_new</FontIcon>}
            style={{ marginLeft: 20, backgroundColor: "#79777745", marginTop: "3%", width: "20%", borderRadius: 10, cursor: "pointer" }}
            title={<div style={{ fontWeight: "bold" }}>CADASTRO</div>}
            className={"effectfront"}
            subtitle={"Componente de Máquina"}
            onClick={() => this.renderComponent("machine components")}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <C_Card
            icon={<FontIcon>open_in_new</FontIcon>}
            avatarStyle={{ backgroundColor: "" }}
            style={{ marginLeft: 20, backgroundColor: "#79777745", marginTop: "3%", width: "20%", borderRadius: 10, cursor: "pointer" }}
            title={<div style={{ fontWeight: "bold" }}>CADASTRO</div>}
            className={"effectfront"}
            subtitle={"Peças"}
            onClick={() => this.renderComponent("parts")}
          />
          <C_Card
            icon={<FontIcon>open_in_new</FontIcon>}
            avatarStyle={{ backgroundColor: "" }}
            style={{ marginLeft: 20, backgroundColor: "#79777745", marginTop: "3%", width: "20%", borderRadius: 10, cursor: "pointer" }}
            title={<div style={{ fontWeight: "bold" }}>CADASTRO</div>}
            className={"effectfront"}
            subtitle={"Equipamento"}
            onClick={() => this.renderComponent("machine")}
          />
          <C_Card
            icon={<FontIcon>open_in_new</FontIcon>}
            avatarStyle={{ backgroundColor: "" }}
            style={{ marginLeft: 20, backgroundColor: "#79777745", marginTop: "3%", width: "20%", borderRadius: 10, cursor: "pointer" }}
            title={<div style={{ fontWeight: "bold" }}>CADASTRO</div>}
            className={"effectfront"}
            subtitle={"Equipamento Superior"}
            onClick={() => this.renderComponent("superior machine")}
          />
        </div>
        <div style={{ marginTop: "4%", width: "50%" }}>
          <h2 style={{ color: "#A40003", fontWeight: "bold", textAlign: "left", marginLeft:"5%"}}>ORDEM DE MANUTENÇÃO</h2>
          <hr />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <C_Card
            icon={<FontIcon>open_in_new</FontIcon>}
            style={{ marginLeft: 20, backgroundColor: "#79777745", marginTop: "3%", width: "20%", borderRadius: 10, cursor: "pointer" }}
            title={<div style={{ fontWeight: "bold" }}>CADASTRO</div>}
            className={"effectfront"}
            subtitle={"Layout de Ordem de Manutenção"}
            onClick={() => this.renderComponent("order layout")}
          />
          {/* <C_Card
            icon={<FontIcon>open_in_new</FontIcon>}
            style={{ marginLeft: 20, backgroundColor: "#79777745", marginTop: "3%", width: "20%", borderRadius: 10, cursor: "pointer" }}
            title={<div style={{ fontWeight: "bold" }}>CADASTRO</div>}
            className={"effectfront"}
            subtitle={"Classificação da Ordem"}
            onClick={() => this.renderComponent("classification")}
          /> */}
          <C_Card
            icon={<FontIcon>open_in_new</FontIcon>}
            style={{ marginLeft: 20, backgroundColor: "#79777745", marginTop: "3%", width: "20%", borderRadius: 10, cursor: "pointer" }}
            title={<div style={{ fontWeight: "bold" }}>CADASTRO</div>}
            className={"effectfront"}
            subtitle={"Causa do Defeito"}
            onClick={() => this.renderComponent("defect cause")}
          />
          <C_Card
            icon={<FontIcon>open_in_new</FontIcon>}
            style={{ marginLeft: 20, backgroundColor: "#79777745", marginTop: "3%", width: "20%", borderRadius: 10, cursor: "pointer" }}
            title={<div style={{ fontWeight: "bold" }}>CADASTRO</div>}
            className={"effectfront"}
            subtitle={"Sintoma do Defeito"}
            onClick={() => this.renderComponent("defect diagnostic")}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <C_Card
            icon={<FontIcon>open_in_new</FontIcon>}
            avatarStyle={{ backgroundColor: "" }}
            style={{ marginLeft: 20, backgroundColor: "#79777745", marginTop: "3%", width: "20%", borderRadius: 10, cursor: "pointer" }}
            title={<div style={{ fontWeight: "bold" }}>CADASTRO</div>}
            className={"effectfront"}
            subtitle={"Observação Padrão"}
            onClick={() => this.renderComponent("default note")}
          />
          <C_Card
            icon={<FontIcon>open_in_new</FontIcon>}
            avatarStyle={{ backgroundColor: "" }}
            style={{ marginLeft: 20, backgroundColor: "#79777745", marginTop: "3%", width: "20%", borderRadius: 10, cursor: "pointer" }}
            title={<div style={{ fontWeight: "bold" }}>CADASTRO</div>}
            className={"effectfront"}
            subtitle={"Operação Padrão"}
            onClick={() => this.renderComponent("default operation")}
          />
          <C_Card
            icon={<FontIcon>open_in_new</FontIcon>}
            style={{ marginLeft: 20, backgroundColor: "#79777745", marginTop: "3%", width: "20%", borderRadius: 10, cursor: "pointer" }}
            title={<div style={{ fontWeight: "bold" }}>CADASTRO</div>}
            className={"effectfront"}
            subtitle={"Ordem de Manutenção"}
            onClick={() => this.renderComponent("maintenance order")}
          />
        </div>
      </div>
    );
  }
}

export default ShowCards;