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

// import './Login.css';

class ShowCards extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <span id="cardList"></span>
                <div style={{marginTop:"2%", width:"50%"}}>
                    <h1 style={{color:"#A40003", fontWeight:"bold", textAlign:"center"}}>Geral</h1>
                    <hr/>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <C_Card
                        icon={<FontIcon>open_in_new</FontIcon>}
                        style={{ marginLeft: 20, backgroundColor: "#79777745", marginTop: "3%", width: "20%", borderRadius: 10, cursor: "pointer" }}
                        title={<div style={{ fontWeight: "bold" }}>CADASTRO</div>}
                        className={"effectfront"}
                        subtitle={"Centro de Trabalho"}
                        onClick={() => {
                            ReactDOM.render(<CreateWorkCenter visible={true} />, document.getElementById('cardList'))
                        }}
                    />
                    <C_Card
                        icon={<FontIcon>open_in_new</FontIcon>}
                        style={{ marginLeft: 20, backgroundColor: "#79777745", marginTop: "3%", width: "20%", borderRadius: 10, cursor: "pointer" }}
                        title={<div style={{ fontWeight: "bold" }}>CADASTRO</div>}
                        className={"effectfront"}
                        subtitle={"Setor"}
                        onClick={() => {
                            ReactDOM.render(<CreateSector visible={true} />, document.getElementById('cardList'))
                        }}
                    />
                    <C_Card
                        icon={<FontIcon>open_in_new</FontIcon>}
                        style={{ marginLeft: 20, backgroundColor: "#79777745", marginTop: "3%", width: "20%", borderRadius: 10, cursor: "pointer" }}
                        title={<div style={{ fontWeight: "bold" }}>CADASTRO</div>}
                        className={"effectfront"}
                        subtitle={"Usuários"}
                        onClick={() => alert('teste')}
                    />
                </div>
                <div style={{display:"flex", justifyContent:"center"}}> 
                    <C_Card
                        icon={<FontIcon>open_in_new</FontIcon>}
                        style={{ marginLeft: 20, backgroundColor: "#79777745", marginTop: "3%", width: "20%", borderRadius: 10, cursor: "pointer" }}
                        title={<div style={{ fontWeight: "bold" }}>CADASTRO</div>}
                        className={"effectfront"}
                        subtitle={"Local de Instalação"}
                        onClick={() => {
                            ReactDOM.render(<CreateInstallationArea visible={true} />, document.getElementById('cardList'))
                        }}
                    />
                    <C_Card
                        icon={<FontIcon>open_in_new</FontIcon>}
                        style={{ marginLeft: 20, backgroundColor: "#79777745", marginTop: "3%", width: "20%", borderRadius: 10, cursor: "pointer" }}
                        title={<div style={{ fontWeight: "bold" }}>CADASTRO</div>}
                        className={"effectfront"}
                        subtitle={"Parametrização Segurança"}
                        onClick={() => alert('teste')}
                    />
                    <div style={{ marginLeft: 20, marginTop: "3%", width: "20%"}}></div>
                </div>
                <div style={{ marginTop: "4%", width: "50%" }}>
                    <h1 style={{color:"#A40003", fontWeight:"bold", textAlign:"center" }}>Equipamento</h1>
                    <hr />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <C_Card
                        icon={<FontIcon>open_in_new</FontIcon>}
                        style={{ marginLeft: 20, backgroundColor: "#79777745", marginTop: "3%", width: "20%", borderRadius: 10, cursor: "pointer" }}
                        title={<div style={{ fontWeight: "bold" }}>CADASTRO</div>}
                        className={"effectfront"}
                        subtitle={"Tipo de Máquina"}
                        onClick={() => {
                            ReactDOM.render(<CreateMachineType visible={true} />, document.getElementById('cardList'))
                        }}
                    />
                    <C_Card
                        icon={<FontIcon>open_in_new</FontIcon>}
                        style={{ marginLeft: 20, backgroundColor: "#79777745", marginTop: "3%", width: "20%", borderRadius: 10, cursor: "pointer" }}
                        title={<div style={{ fontWeight: "bold" }}>CADASTRO</div>}
                        className={"effectfront"}
                        subtitle={"Unidade de Medida"}
                        onClick={() => {
                            ReactDOM.render(<CreateUnitMeasurement visible={true} />, document.getElementById('cardList'))
                        }}
                    />
                    <C_Card
                        icon={<FontIcon>open_in_new</FontIcon>}
                        style={{ marginLeft: 20, backgroundColor: "#79777745", marginTop: "3%", width: "20%", borderRadius: 10, cursor: "pointer" }}
                        title={<div style={{ fontWeight: "bold" }}>CADASTRO</div>}
                        className={"effectfront"}
                        subtitle={"Componente de Máquina"}
                        onClick={() => {
                            ReactDOM.render(<CreateMachineComponents visible={true} />, document.getElementById('cardList'))
                        }}
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
                        onClick={() => {
                            ReactDOM.render(<CreateParts visible={true} />, document.getElementById('cardList'))
                        }}
                    />
                    <C_Card
                        icon={<FontIcon>open_in_new</FontIcon>}
                        avatarStyle={{ backgroundColor: "" }}
                        style={{ marginLeft: 20, backgroundColor: "#79777745", marginTop: "3%", width: "20%", borderRadius: 10, cursor: "pointer" }}
                        title={<div style={{ fontWeight: "bold" }}>CADASTRO</div>}
                        className={"effectfront"}
                        subtitle={"Equipamento"}
                        onClick={() => {
                            ReactDOM.render(<CreateMachine visible={true} />, document.getElementById('cardList'))
                        }}
                    />
                    <C_Card
                        icon={<FontIcon>open_in_new</FontIcon>}
                        avatarStyle={{ backgroundColor: "" }}
                        style={{ marginLeft: 20, backgroundColor: "#79777745", marginTop: "3%", width: "20%", borderRadius: 10, cursor: "pointer" }}
                        title={<div style={{ fontWeight: "bold" }}>CADASTRO</div>}
                        className={"effectfront"}
                        subtitle={"Equipamento Superior"}
                        onClick={() => {
                            ReactDOM.render(<CreateSuperiorMachine visible={true} />, document.getElementById('cardList'))
                        }}
                    />
                </div>
                <div style={{ marginTop: "4%", width: "50%" }}>
                    <h1 style={{color:"#A40003", fontWeight:"bold", textAlign:"center"}}>Ordem de Manutenção</h1>
                    <hr />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <C_Card
                        icon={<FontIcon>open_in_new</FontIcon>}
                        style={{ marginLeft: 20, backgroundColor: "#79777745", marginTop: "3%", width: "20%", borderRadius: 10, cursor: "pointer" }}
                        title={<div style={{ fontWeight: "bold" }}>CADASTRO</div>}
                        className={"effectfront"}
                        subtitle={"Classificação da Ordem"}
                        onClick={() => {
                            ReactDOM.render(<CreateClassification visible={true} />, document.getElementById('cardList'))
                        }}
                    />
                    <C_Card
                        icon={<FontIcon>open_in_new</FontIcon>}
                        style={{ marginLeft: 20, backgroundColor: "#79777745", marginTop: "3%", width: "20%", borderRadius: 10, cursor: "pointer" }}
                        title={<div style={{ fontWeight: "bold" }}>CADASTRO</div>}
                        className={"effectfront"}
                        subtitle={"Causa do Defeito"}
                        onClick={() => {
                            ReactDOM.render(<CreateDefectCause visible={true} />, document.getElementById('cardList'))
                        }}
                    />
                    <C_Card
                        icon={<FontIcon>open_in_new</FontIcon>}
                        style={{ marginLeft: 20, backgroundColor: "#79777745", marginTop: "3%", width: "20%", borderRadius: 10, cursor: "pointer" }}
                        title={<div style={{ fontWeight: "bold" }}>CADASTRO</div>}
                        className={"effectfront"}
                        subtitle={"Sintoma do Defeito"}
                        onClick={() => {
                            ReactDOM.render(<CreateDefectDiagnostic visible={true} />, document.getElementById('cardList'))
                        }}
                    />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <C_Card
                        icon={<FontIcon>open_in_new</FontIcon>}
                        avatarStyle={{ backgroundColor: "" }}
                        style={{ marginLeft: 20, backgroundColor: "#79777745", marginTop: "3%", width: "20%", borderRadius: 10, cursor: "pointer" }}
                        title={<div style={{ fontWeight: "bold" }}>CADASTRO</div>}
                        className={"effectfront"}
                        subtitle={"Tipo de Ordem"}
                        onClick={() => {
                            ReactDOM.render(<CreateOrderType visible={true} />, document.getElementById('cardList'))
                        }}
                    />
                    <C_Card
                        icon={<FontIcon>open_in_new</FontIcon>}
                        avatarStyle={{ backgroundColor: "" }}
                        style={{ marginLeft: 20, backgroundColor: "#79777745", marginTop: "3%", width: "20%", borderRadius: 10, cursor: "pointer" }}
                        title={<div style={{ fontWeight: "bold" }}>CADASTRO</div>}
                        className={"effectfront"}
                        subtitle={"Observação Padrão"}
                        onClick={() => {
                            ReactDOM.render(<CreateDefaultNote visible={true} />, document.getElementById('cardList'))
                        }}
                    />
                    <C_Card
                        icon={<FontIcon>open_in_new</FontIcon>}
                        avatarStyle={{ backgroundColor: "" }}
                        style={{ marginLeft: 20, backgroundColor: "#79777745", marginTop: "3%", width: "20%", borderRadius: 10, cursor: "pointer" }}
                        title={<div style={{ fontWeight: "bold" }}>CADASTRO</div>}
                        className={"effectfront"}
                        subtitle={"Operação Padrão"}
                        onClick={() => {
                            ReactDOM.render(<CreateDefaultOperation visible={true} />, document.getElementById('cardList'))
                        }}
                    />
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <C_Card
                        icon={<FontIcon>open_in_new</FontIcon>}
                        style={{ marginLeft: 20, backgroundColor: "#79777745", marginTop: "3%", width: "20%", borderRadius: 10, cursor: "pointer" }}
                        title={<div style={{ fontWeight: "bold" }}>CADASTRO</div>}
                        className={"effectfront"}
                        subtitle={"Ordem de Manutenção"}
                        onClick={() => alert('teste')}
                    />
                    <div style={{ marginLeft: 20, marginTop: "3%", width: "20%"}}></div>
                    <div style={{ marginLeft: 20, marginTop: "3%", width: "20%"}}></div>
                </div>
            </div>

        );
    }
}

export default ShowCards;