import React, { Component } from 'react';
import C_Card from './components/Card';
import C_Menu from './components/Menu';
import { FontIcon } from 'react-md';
import CreateMachineType from './crud/MachineType';
import './index.css';

// import './Login.css';

class ShowCards extends Component {
    
    constructor(props){
        super(props);
    }

    render() {

        return (
            <div>
                <div style={{display:"flex", justifyContent:"center"}}>
                    <C_Card 
                        icon={<FontIcon></FontIcon>}
                        style={{marginLeft:20, backgroundColor:"#79777745",marginTop:"3%", width:"20%", borderRadius:10, cursor:"pointer"}}
                        title={<div style={{fontWeight:"bold"}}>CADASTRO</div>}
                        className={"effectfront"}
                        subtitle={"Usuários"}
                        onClick={() => <CreateMachineType visible={true}/>}
                    />
                    <C_Card 
                        style={{marginLeft:20, backgroundColor:"#79777745",marginTop:"3%", width:"20%", borderRadius:10, cursor:"pointer"}}
                        title={<div style={{fontWeight:"bold"}}>CADASTRO</div>}
                        className={"effectfront"}
                        subtitle={"Tipo de Máquina"}
                        onClick={() => alert('teste')}
                    />
                    <C_Card 
                        style={{marginLeft:20, backgroundColor:"#79777745",marginTop:"3%", width:"20%", borderRadius:10, cursor:"pointer"}}
                        title={<div style={{fontWeight:"bold"}}>CADASTRO</div>}
                        className={"effectfront"}
                        subtitle={"Componente de Máquina"}
                        onClick={() => alert('teste')}
                    />
                </div>
                <div style={{display:"flex", justifyContent:"center"}}>
                    <C_Card 
                        avatarStyle={{backgroundColor:"#A40003"}}
                        icon={<FontIcon></FontIcon>}
                        style={{marginLeft:20, backgroundColor:"#79777745",marginTop:"3%", width:"20%", borderRadius:10, cursor:"pointer"}}
                        title={<div style={{fontWeight:"bold"}}>CADASTRO</div>}
                        className={"effectfront"}
                        subtitle={"Setor"}
                        onClick={() => alert('teste')}
                    />
                    <C_Card 
                        avatarStyle={{backgroundColor:"#A40003"}}
                        style={{marginLeft:20, backgroundColor:"#79777745",marginTop:"3%", width:"20%", borderRadius:10, cursor:"pointer"}}
                        title={<div style={{fontWeight:"bold"}}>CADASTRO</div>}
                        className={"effectfront"}
                        subtitle={"Local de Instalação"}
                        onClick={() => alert('teste')}
                    />
                    <C_Card 
                        avatarStyle={{backgroundColor:"#A40003"}}
                        style={{marginLeft:20, backgroundColor:"#79777745",marginTop:"3%", width:"20%", borderRadius:10, cursor:"pointer"}}
                        title={<div style={{fontWeight:"bold"}}>CADASTRO</div>}
                        className={"effectfront"}
                        subtitle={"Unidade de Medida"}
                        onClick={() => alert('teste')}
                    />
                </div>
                <div style={{display:"flex", justifyContent:"center"}}>
                    <C_Card 
                        avatarStyle={{backgroundColor:""}}
                        icon={<FontIcon></FontIcon>}
                        style={{marginLeft:20, backgroundColor:"#79777745",marginTop:"3%", width:"20%", borderRadius:10, cursor:"pointer"}}
                        title={<div style={{fontWeight:"bold"}}>CADASTRO</div>}
                        className={"effectfront"}
                        subtitle={"Peça"}
                        onClick={() => alert('teste')}
                    />
                    <C_Card 
                        avatarStyle={{backgroundColor:""}}
                        style={{marginLeft:20, backgroundColor:"#79777745",marginTop:"3%", width:"20%", borderRadius:10, cursor:"pointer"}}
                        title={<div style={{fontWeight:"bold"}}>CADASTRO</div>}
                        className={"effectfront"}
                        subtitle={"Equipamento"}
                        onClick={() => alert('teste')}
                    />
                    <C_Card 
                        avatarStyle={{backgroundColor:""}}
                        style={{marginLeft:20, backgroundColor:"#79777745",marginTop:"3%", width:"20%", borderRadius:10, cursor:"pointer"}}
                        title={<div style={{fontWeight:"bold"}}>CADASTRO</div>}
                        className={"effectfront"}
                        subtitle={"Equipamento Superior"}
                        onClick={() => alert('teste')}
                    />
                </div>
                <div style={{display:"flex", justifyContent:"center"}}>
                    <C_Card 
                        avatarStyle={{backgroundColor:"#A40003"}}
                        icon={<FontIcon></FontIcon>}
                        style={{marginLeft:20, backgroundColor:"#79777745",marginTop:"3%", width:"20%", borderRadius:10, cursor:"pointer"}}
                        title={<div style={{fontWeight:"bold"}}>CADASTRO</div>}
                        className={"effectfront"}
                        subtitle={"Classificação da Ordem"}
                        onClick={() => alert('teste')}
                    />
                    <C_Card 
                        avatarStyle={{backgroundColor:"#A40003"}}
                        style={{marginLeft:20, backgroundColor:"#79777745",marginTop:"3%", width:"20%", borderRadius:10, cursor:"pointer"}}
                        title={<div style={{fontWeight:"bold"}}>CADASTRO</div>}
                        className={"effectfront"}
                        subtitle={"Causa do Defeito"}
                        onClick={() => alert('teste')}
                    />
                    <C_Card 
                        avatarStyle={{backgroundColor:"#A40003"}}
                        style={{marginLeft:20, backgroundColor:"#79777745",marginTop:"3%", width:"20%", borderRadius:10, cursor:"pointer"}}
                        title={<div style={{fontWeight:"bold"}}>CADASTRO</div>}
                        className={"effectfront"}
                        subtitle={"Sintoma do Defeito"}
                        onClick={() => alert('teste')}
                    />
                </div>
                <div style={{display:"flex", justifyContent:"center"}}>
                    <C_Card 
                        avatarStyle={{backgroundColor:""}}
                        icon={<FontIcon></FontIcon>}
                        style={{marginLeft:20, backgroundColor:"#79777745",marginTop:"3%", width:"20%", borderRadius:10, cursor:"pointer"}}
                        title={<div style={{fontWeight:"bold"}}>CADASTRO</div>}
                        className={"effectfront"}
                        subtitle={"Tipo de Ordem"}
                        onClick={() => alert('teste')}
                    />
                    <C_Card 
                        avatarStyle={{backgroundColor:""}}
                        style={{marginLeft:20, backgroundColor:"#79777745",marginTop:"3%", width:"20%", borderRadius:10, cursor:"pointer"}}
                        title={<div style={{fontWeight:"bold"}}>CADASTRO</div>}
                        className={"effectfront"}
                        subtitle={"Observação Padrão"}
                        onClick={() => alert('teste')}
                    />
                    <C_Card 
                        avatarStyle={{backgroundColor:""}}
                        style={{marginLeft:20, backgroundColor:"#79777745",marginTop:"3%", width:"20%", borderRadius:10, cursor:"pointer"}}
                        title={<div style={{fontWeight:"bold"}}>CADASTRO</div>}
                        className={"effectfront"}
                        subtitle={"Operação Padrão"}
                        onClick={() => alert('teste')}
                    />
                </div>
                <div style={{display:"flex", justifyContent:"center"}}>
                    <C_Card 
                        avatarStyle={{backgroundColor:"#A40003"}}
                        icon={<FontIcon></FontIcon>}
                        style={{marginLeft:20, backgroundColor:"#79777745",marginTop:"3%", width:"30%", borderRadius:10, cursor:"pointer"}}
                        title={<div style={{fontWeight:"bold"}}>CADASTRO</div>}
                        className={"effectfront"}
                        subtitle={"Parametrização Segurança"}
                        onClick={() => alert('teste')}
                    />
                    <C_Card 
                        avatarStyle={{backgroundColor:"#A40003"}}
                        style={{marginLeft:40, backgroundColor:"#79777745",marginTop:"3%", width:"30%", borderRadius:10, cursor:"pointer"}}
                        title={<div style={{fontWeight:"bold"}}>CADASTRO</div>}
                        className={"effectfront"}
                        subtitle={"Ordem de Manutenção"}
                        onClick={() => alert('teste')}
                    />
                </div>
            </div>
        
        );
    }
}

export default ShowCards;