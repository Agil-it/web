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
import { ClassificationProvider } from '../providers/Classification';
import { ObjectHelper } from '../helpers/Object';


class CreateClassification extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      fields: {}
    };

    this.provider = new HandlerProvider(new ClassificationProvider(), "classificação da ordem")

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
    let classification = this.state.fields;
    this.provider.delete(classification.id,this.clean())
  }

  save() {
    let classification = this.state.fields;
    this.provider.save(classification,this.clean())
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
        height="60%"
        dialogStyle={{borderRadius:5}}
        aria-labelledby="simple-full-page-dialog-title"
      >
        <Toolbar
          fixed
          colored
          title="Cadastrar Classificação da Ordem"
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
              label="Classificação"
              placeholder="Classificação"
              rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
              block paddedBlock
            /><br></br>
            <C_TextField
              id="description"
              name="description"
              value={this.state.fields.description}
              onChange={this.onChange}
              type="text"
              label="Descrição"
              placeholder="Descrição"
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

export default CreateClassification;