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
import C_SelectField from '../components/SelectField';
import C_CheckBox from '../components/CheckBox';
import { HandlerProvider } from '../providers/handler';
import { SafetyParameterProvider } from '../providers/SafetyParameter';


class CreateSafetyParameter extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: true,
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
      fields: {}
    };

    this.provider = new HandlerProvider(new SafetyParameterProvider(), "parametro de segurança")

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
    let safetyParameter = this.state.fields;
    this.provider.delete(safetyParameter.id, this.clean)
  }

  save() {
    let safetyParameter = this.state.fields;
    this.provider.save(safetyParameter, this.clean)
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
    const { fields } = this.state;
    return (
      <DialogContainer
        id="simple-full-page-dialog"
        visible={this.state.visible}
        // fullPage
        width="40%"
        height="100%"
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
          <form ref={(el) => this.form = el} onSubmit={this.formPreventDefault}>
            <C_TextField
              style={{ fontSize: 17 }}
              id="id"
              name="id"
              value={this.state.fields.id}
              onChange={this.onChange}
              type="search"
              label="Status de Segurança"
              placeholder="Status de Segurança"
              rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
              block paddedBlock
              required={true}
              onChange={this.onChange}
            /><br></br>
            <C_CheckBox
              id="useAlways"
              name="useAlways"
              value={this.state.fields.useAlways}
              onChange={this.onChange}
              label={<div style={{ fontSize: 15, color: "#616161d9" }}>Usar em todas as Ordens de Manutenção</div>}
              type="checkbox"
              style={{}}
              onChange={this.onChange}
            /><br></br>
            <C_SelectField
              id="entityClass"
              name="entityClass"
              value={this.state.fields.entityClass}
              type="text"
              className="md-cell md-cell--12"
              label={<div style={{ fontSize: 17 }}>Tipo de Registro</div>}
              list={this.state.types}
              required={false}
              disabled={this.state.fields.useAlways}
              onChange={this.onChange}
            /><br></br>
            <C_TextField
              style={{ fontSize: 17 }}
              id="entityId"
              name="entityId"
              value={this.state.fields.entityId}
              type="search"
              label="Registro"
              placeholder="Registro"
              rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
              block paddedBlock
              disabled={this.state.fields.useAlways}
              onChange={this.onChange}
            /><br></br>
            <C_TextField
              style={{ fontSize: 17 }}
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

export default CreateSafetyParameter;