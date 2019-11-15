import React, { Component } from 'react';
import {
    Button,
    DialogContainer,
    Divider,
    Toolbar,
    FontIcon,
} from 'react-md';

import C_TextField from '../components/TextField';
import C_Button from '../components/Button';
import C_SelectField from '../components/SelectField';
import C_CheckBox from '../components/CheckBox';
import C_Calendar from '../components/Calendar';
import C_RadioGroup from '../components/RadioGroup';

class CreateUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedProfile: undefined,
            visible: this.props.visible,

            genders :[{
                label: 'Feminino',
                value: 'female',
            }, 
            {
                label: 'Masculino',
                value: 'male',
            }],

            types: [{
                label: 'Componente',
                value: 'A',
            },
            {
                label: 'Setor',
                value: 'B',
            },
            {
                label: 'Equipamento',
                value: 'C',
            },
            {
                label: 'Tipo de Máquina',
                value: 'D',
            },
            {
                label: 'Equipamento Superior',
                value: 'E',
            }],

            user: {
                userId: undefined,
                username : undefined,
                userRole: undefined,
                sectorName: "",
                isFirstLogin : false,
                password: undefined,
                email: "",
                contact: undefined,
                birthDate: undefined,
                gender: undefined,
            },

            profiles:  [{
                label: 'Líder de Setor',
                value: 'SECTOR_LEADER',
            },
            {
                label: 'Técnico',
                value: 'TECHNICAL',
            },
            {
                label: 'Admin',
                value: 'ADMIN',
            }]
        };

        

        this.hideModal = this.hideModal.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        console.log("Chamou", this.state.visible);
        this.setState({ visible: true });
    }

    // show = (e) => {
    //     this.setState({ visible: true});
    // };

    hideModal() {
        this.setState({ visible: false });
    };

    onChange(e){
        var user = this.state.user;

        user[e.target.name] = e.target.value;

        this.setState({user})
    }

    render() {
        const { user } = this.state;
        console.log("user",user);
        return (
            <div style={{ border: "none" }}>
                <DialogContainer
                    id="simple-full-page-dialog"
                    visible={this.state.visible}
                    // fullPage
                    width="60%"
                    height="100%"
                    // onHide={false}
                    aria-labelledby="simple-full-page-dialog-title"
                >
                    <Toolbar
                        // fixed
                        colored
                        title="Cadastrar Usuários"
                        // nav={<FontIcon icon onClick={this.hide}>close</FontIcon>}
                        actions={<FontIcon style={{ cursor: "pointer" }} onClick={() => this.hideModal()}>close</FontIcon>}
                    />
                    <section className="md-toolbar-relative">
                        <div style={{display:"flex", justifyContent:"left"}}>
                            <C_TextField
                                style={{ fontSize: 17 }}
                                name="userId"
                                type="search"
                                placeholder="Código do Usuário"
                                rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
                                required={true}
                                onChange={this.onChange}
                                css={{ width: 350 }}
                            />
                            <C_TextField
                                style={{ fontSize: 17 }}
                                name="username"
                                placeholder="Nome do Usuário"
                                onChange={this.onChange}
                                css={{ width: 350, marginLeft:30 }}
                            />
                        </div><br></br>
                        <div style={{ display: "flex", justifyContent: "left" }}>
                            <C_SelectField
                                name="userRole"
                                type="text"
                                label={<div style={{ fontSize: 17 }}>Perfil de Usuário</div>}
                                list={this.state.profiles}
                                required={false}
                                onChange={this.onChange}
                                value={this.state.selectedProfile}
                                style={{ width: 350 }}
                            />
                            {this.state.user.userRole == "SECTOR_LEADER" ?
                                <C_TextField
                                    style={{ fontSize: 17 }}
                                    name="sectorName"
                                    type="search"
                                    placeholder="Setor"
                                    rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
                                    block paddedBlock
                                    required={true}
                                    onChange={this.onChange}
                                    css={{ width: 350, marginLeft: 30, marginTop:20 }}
                                />
                                : (this.state.user.userRole == "TECHNICAL" ?
                                    <C_TextField
                                        style={{ fontSize: 17 }}
                                        name="workCenter"
                                        type="search"
                                        placeholder="Centro de Trabalho"
                                        rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
                                        block paddedBlock
                                        required={true}
                                        onChange={this.onChange}
                                        css={{ width: 350, marginLeft: 30, marginTop: 20 }}
                                    /> : undefined )
                                }
                        </div><br></br>
                        <div style={{display:"flex"}}>
                            <div style={{width:"50%", marginLeft:20}}>
                                <C_Button 
                                    style={{height:50, width:"50%", display:"flex", justifyContent:"center", fontSize:15}} 
                                    primary={true} 
                                    label={"Gerar senha"} 
                                    icon={<FontIcon>lock</FontIcon>}
                                />
                            </div>
                            <C_CheckBox
                                name="isFirstLogin"
                                label={<div style={{ fontSize: 17, color:"#616161d9" }}>Alterar Senha no Primeiro Acesso</div>}
                                type="checkbox"
                                style={{}}  
                                onChange={this.onChange}
                            />
                        </div><br/><br/>
                        <div style={{ display: "flex", justifyContent: "left" }}>
                            <C_TextField
                                style={{ fontSize: 17 }}
                                name="email"
                                placeholder="Email"
                                required={true}
                                onChange={this.onChange}
                                css={{ width: 350 }}
                            />
                            <C_TextField
                                style={{ fontSize: 17 }}
                                name="username"
                                type="password"
                                placeholder="Password"
                                onChange={this.onChange}
                                css={{ width: 350, marginLeft: 30 }}
                            />
                        </div><br></br>
                        <div style={{ display: "flex", justifyContent: "left" }}>
                            <C_Calendar
                                name="birthDate"
                                label={<div style={{ fontSize: 17 }}>Data de Nascimento</div>}
                                onChange={this.onChange}
                                allDay
                                cancelLabel={"Cancelar"}
                                css={{ width: 350}}    
                            />
                            <C_TextField
                                style={{ fontSize: 17 }}
                                name="contact"
                                placeholder="Contato"
                                required={true}
                                onChange={this.onChange}
                                css={{ width: 350, marginLeft: 30, marginTop:16 }}
                            />
                        </div><br></br>
                        <C_RadioGroup
                            name="gender"
                            label={<div style={{ fontSize: 17, color:"#616161d9" }}>Gênero</div>}
                            type="radio"
                            style={{}}  
                            onChange={this.onChange}
                            list={this.state.genders}
                        />
                    </section>
                    <div style={{ display: "flex" }}>
                        <div style={{ width: "45%" }}>
                            <C_Button style={{}}
                                secondary={true}
                                label={"Deletar"}
                                disabled={true}
                            />
                        </div>
                        <div>
                            <C_Button style={{}} secondary={true} label={"Limpar"} />
                            <C_Button style={{ marginLeft: 20, }} primary={true} label={"Salvar"} />
                        </div>
                    </div>
                </DialogContainer>
            </div>
        );
    }
}

export default CreateUser;