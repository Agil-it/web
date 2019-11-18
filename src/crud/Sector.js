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
import { SectorProvider } from '../providers/Sector';


class CreateSector extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      fields: {}
    };

    this.provider = new HandlerProvider(new SectorProvider(), "setor")

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
    let sector = this.state.fields;
    this.provider.delete(sector.id, this.clean)
  }

  save() {
    let sector = this.state.fields;
    this.provider.save(sector, this.clean)
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
    return (
      <DialogContainer
        id="simple-full-page-dialog"
        visible={this.state.visible}
        // fullPage
        width="40%"
        height="80%"
        //onHide={this.hideModal}
        onHide={this.hideModal}
        aria-labelledby="simple-full-page-dialog-title"
      >
        <Toolbar
          // fixed
          colored
          title="Cadastrar Setor"
          // nav={<FontIcon icon onClick={this.hide}>close</FontIcon>}
          actions={<FontIcon style={{ cursor: "pointer" }} onClick={this.hideModal}>close</FontIcon>}
        />
        <section className="md-toolbar-relative">
          <form ref={(el) => this.form = el} onSubmit={this.formPreventDefault}>
            <C_TextField
              style={{ fontSize: 17 }}
              id="SectorId"
              type="search"
              label="Código do Setor"
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
              label="Descrição"
              placeholder="Descrição"
              onChange={this.onChange}
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

export default CreateSector;