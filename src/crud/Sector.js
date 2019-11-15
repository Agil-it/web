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


import { SectorProvider } from '../providers/Sector'

class CreateSector extends Component {

 constructor(props) {
  super(props);

  this.state = {
   visible: this.props.visible,
   sector : {
      id: undefined,
      description: ''
   }
  };

  this.hideModal = this.hideModal.bind(this);
  this.clearFields = this.clearFields.bind(this);
  this.onChange = this.onChange.bind(this);
  this.save = this.save.bind(this);

 }

 componentDidMount() {
  this.setState({ visible: true });
 }

 hideModal() {
  this.setState({ visible: false });
 }

 async save(){
  let sector = this.state.sector;

  console.log("sector", sector);

  let sectorProvider = new SectorProvider();
  let response = await sectorProvider.create(sector)
  console.log("TCL: CreateSector -> save -> response", response)
   
   if (response === undefined) {
     alert('Ocorreu um erro! se persistir fazer entrar em contato com o departamento de TI.')
     return
   }
  
   if (!response.success) {
     alert(`Não deu sucesso. Mensagem: ${response.error}`)
    return
  }

  console.log("TCL: CreateSector -> save -> message", response.message)
  alert('deu certo!')
 }

 clearFields(e){

 }

 onChange(e){
  var sector = this.state.sector;

  sector[e.target.name] = e.target.value;

  this.setState({ sector })
   
 }

 render() {
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
      title="Cadastrar Setor"
      // nav={<FontIcon icon onClick={this.hide}>close</FontIcon>}
      actions={<FontIcon style={{ cursor: "pointer" }} onClick={() => this.hideModal()}>close</FontIcon>}
     />
     <section className="md-toolbar-relative">
      <C_TextField
       style={{ fontSize: 17 }}
       id="SectorId"
       type="search"
       placeholder="Código do Setor"
       rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
       name="id"
       onChange={this.onChange}
      /><br></br>
      <C_TextField
       name="description"
       style={{ fontSize: 17 }}
       id="description"
       type="text"
       placeholder="Descrição"
       onChange={this.onChange}
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
       <C_Button 
        action={(e) => this.clearFields(e)} 
        secondary={true} 
        label={"Limpar"} 
        />
       <C_Button 
         style={{ marginLeft: 20 }} 
         primary={true} 
         label={"Salvar"} 
         action={() => this.save()}
       />
      </div>
     </div>
    </DialogContainer>
   </div>
  );
 }
}

export default CreateSector;