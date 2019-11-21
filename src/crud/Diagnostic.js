import React, { Component } from 'react';
import {
  Button,
  DialogContainer,
  Divider,
  Toolbar,
  FontIcon,
} from 'react-md';

import C_TextField from '../components/TextField';
import C_CrudButtons from '../components/CrudButtons';
import { HandlerProvider } from '../providers/Handler';
import { DiagnosticProvider } from '../providers/Diagnostic';
import { ObjectHelper } from '../helpers/Object';

class CreateDefectDiagnostic extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      fields: {}
    };

    this.provider = new HandlerProvider(new DiagnosticProvider(), "sintoma do defeito")

    this.hideModal = this.hideModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
    this.clean = this.clean.bind(this);
    this.delete = this.delete.bind(this);
  }

  hideModal() {
    this.setState({ visible: false })
    this.props.onClose()
  }

  clean() {
    var fields = this.state.fields;

    ObjectHelper.clearFields(fields);

    this.setState({ fields });
  }

  delete() {
    let diagnostic = this.state.fields;
    this.provider.delete(diagnostic.id,this.clean)
  }

  save() {    
    let diagnostic = this.state.fields;
    this.provider.save(diagnostic,this.clean)
  }

  onChange(e) {
    let fields = this.state.fields;

    fields[e.target.name] = e.target.value;
    this.setState({ fields });
  }

  formPreventDefault(event) {
    event.preventDefault()
  }

  render() {
    // const { visible } = this.state;
    return (
      <DialogContainer
        id="simple-full-page-dialog"
        visible={this.state.visible}
        width="40%"
        height="70%"
        dialogStyle={{borderRadius:5}}
        aria-labelledby="simple-full-page-dialog-title"
      >
        <Toolbar
          fixed
          colored
          title="Cadastrar Sintoma do Defeito"
          style={{borderRadius:5}}
          actions={<FontIcon style={{ cursor: "pointer" }} onClick={() => this.hideModal()}>close</FontIcon>}
        />
        <section className="md-toolbar-relative">
          <form ref={(el) => this.form = el} onSubmit={this.formPreventDefault}>
            <C_TextField
              id="type"
              name="id"
              value={this.state.fields.id}
              onChange={this.onChange}
              type="search"
              label="Sintoma do Defeito"
              placeholder="Sintoma do Defeito"
              rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
              block paddedBlock
            /><br></br>
            <C_TextField
              id="type"
              name="machineType"
              value={this.state.fields.machineType}
              onChange={this.onChange}
              type="search"
              label="Tipo de Máquina"
              placeholder="Tipo de Máquina"
              rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
              block paddedBlock
            /><br></br>
            <C_TextField
              id="description"
              name="description"
              value={this.state.fields.description}
              onChange={this.onChange}
              type="text"
              label="Descrição do Sintoma"
              placeholder="Descrição do Sintoma"
              block paddedBlock
              rows={2}
            />
          </form>
        </section>
        <C_CrudButtons
          onSave={this.save}
          onClean={this.clean}
          onDelete={this.delete}
          crudLevel={!!this.state.fields.id}
        />
      </DialogContainer>
    );
  }
}

export default CreateDefectDiagnostic;