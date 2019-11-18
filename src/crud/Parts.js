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
import { HandlerProvider } from '../providers/handler';
import { PartProvider } from '../providers/Part';


class CreateParts extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      fields: {}
    };

    this.provider = new HandlerProvider(new PartProvider(), "peça")

    this.hideModal = this.hideModal.bind(this);
    this.clearFields = this.clearFields.bind(this);
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
    this.setState({ fields: {} })
    this.clearFields()
  }

  clearFields() {
    this.form.reset()
  }

  delete() {
    let part = this.state.fields;
    this.provider.delete(part.id, this.clean)
  }

  save() {
    let part = this.state.fields;
    this.provider.save(part, this.clean)
  }

  onChange(e) {
    let fields = this.state.fields;

    fields[e.target.name] = e.target.value;
    this.setState({ fields })
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
        // fullPage
        width="40%"
        height="80%"
        // onHide={false}
        aria-labelledby="simple-full-page-dialog-title"
      >
        <Toolbar
          // fixed
          colored
          title="Cadastrar Peças"
          // nav={<FontIcon icon onClick={this.hide}>close</FontIcon>}
          actions={<FontIcon style={{ cursor: "pointer" }} onClick={() => this.hideModal()}>close</FontIcon>}
        />
        <section className="md-toolbar-relative">
          <form ref={(el) => this.form = el} onSubmit={this.formPreventDefault}>
            <C_TextField
              style={{ fontSize: 17 }}
              id="id"
              name="id"
              value={this.state.fields.id}
              onChange={this.onChange}
              type="search"
              label="Código da Peça"
              placeholder="Código da Peça"
              rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
              block paddedBlock
            /><br></br>
            <C_TextField
              style={{ fontSize: 17 }}
              id="measurementUnit"
              name="measurementUnit"
              value={this.state.fields.measurementUnit}
              onChange={this.onChange}
              type="search"
              label="Unidade de Medida"
              placeholder="Unidade de Medida"
              rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
              block paddedBlock
            /><br></br>
            <C_TextField
              style={{ fontSize: 17 }}
              id="description"
              name="description"
              value={this.state.fields.description}
              onChange={this.onChange}
              type="text"
              label="Descrição da Peça"
              placeholder="Descrição da Peça"
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

export default CreateParts;