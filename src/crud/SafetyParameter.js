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

class CreateSafetyParameter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: this.props.visible,
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

            safetyParameter: {
                safetyStatus: undefined,
                useInAll : false,
                registerType: undefined,
                register: undefined
            }
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
        var safetyParameter = this.state.safetyParameter;

        safetyParameter[e.target.name] = e.target.value;

        this.setState({safetyParameter})
    }

    render() {
        const { safetyParameter } = this.state;
        console.log("safetyParameter",safetyParameter);
        return (
            <div style={{ border: "none" }}>
                <DialogContainer
                    id="simple-full-page-dialog"
                    visible={this.state.visible}
                    // fullPage
                    width="40%"
                    height="80%"
                    // onHide={false}
                    aria-labelledby="simple-full-page-dialog-title"
                >
                    <Toolbar
                        // fixed
                        colored
                        title="Cadastrar Parametrização de Segurança"
                        // nav={<FontIcon icon onClick={this.hide}>close</FontIcon>}
                        actions={<FontIcon style={{ cursor: "pointer" }} onClick={() => this.hideModal()}>close</FontIcon>}
                    />
                    <section className="md-toolbar-relative">
                        <C_TextField
                            style={{ fontSize: 17 }}
                            name="safetyStatus"
                            type="search"
                            placeholder="Status de Segurança"
                            rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
                            block paddedBlock
                            required={true}
                            onChange={this.onChange}
                        /><br></br>
                        <C_CheckBox
                            name="useInAll"
                            label={<div style={{ fontSize: 15, color:"#616161d9" }}>Usar em todas as Ordens de Manutenção</div>}
                            type="checkbox"
                            style={{}}  
                            onChange={this.onChange}
                        /><br></br>
                        <C_SelectField
                            name="registerType"
                            type="text"
                            className="md-cell md-cell--12"
                            label={<div style={{ fontSize: 17 }}>Tipo de Registro</div>}
                            list={this.state.types}
                            required={false}
                            disabled={this.state.safetyParameter.useInAll}
                            onChange={this.onChange}
                        /><br></br>
                        <C_TextField
                            style={{ fontSize: 17 }}
                            name="register"
                            type="search"
                            placeholder="Registro"
                            rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
                            block paddedBlock
                            disabled={this.state.safetyParameter.useInAll}
                            onChange={this.onChange}
                        /><br></br>
                    </section>
                    <div style={{ display: "flex", marginTop: "10%" }}>
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

export default CreateSafetyParameter;