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


class CreateInstallationArea extends Component {

 constructor(props) {
  super(props);

  this.state = {
   visible: this.props.visible
  };

  this.hideModal = this.hideModal.bind(this);
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

 render() {
  // const { visible } = this.state;
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
      title="Cadastrar Local de Instalação"
      // nav={<FontIcon icon onClick={this.hide}>close</FontIcon>}
      actions={<FontIcon style={{ cursor: "pointer" }} onClick={() => this.hideModal()}>close</FontIcon>}
     />
     <section className="md-toolbar-relative">
      <C_TextField
       style={{ fontSize: 17 }}
       id="type"
       type="search"
       placeholder="Código Local de Instalação"
       rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
       block paddedBlock
      /><br></br>
      <C_TextField
       style={{ fontSize: 17 }}
       id="type"
       type="search"
       placeholder="Setor"
       rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
       block paddedBlock
      /><br></br>
      <C_TextField
       style={{ fontSize: 17 }}
       id="description"
       type="text"
       placeholder="Descrição do Local"
       block paddedBlock
       rows={2}
      />
     </section>
     <div style={{ display: "flex", marginTop: "10%" }}>
      <div style={{ width: "45%" }}>
       <C_Button
        secondary={true}
        label={"Deletar"}
        disabled={true}
       />
      </div>
      <div>
       <C_Button secondary={true} label={"Limpar"} />
       <C_Button style={{ marginLeft: 20 }} primary={true} label={"Salvar"} />
      </div>
     </div>
    </DialogContainer>
   </div>
  );
 }
}

export default CreateInstallationArea;