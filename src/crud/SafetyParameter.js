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
import { ObjectHelper } from '../helpers/Object';


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
        width="40%"
        height="60%"
        dialogStyle={{borderRadius:5}}
        aria-labelledby="simple-full-page-dialog-title"
      >
        <Toolbar
          fixed
          colored
          title="Cadastrar Parametrização de Segurança"
          style={{borderRadius:5}}
          actions={<FontIcon style={{ cursor: "pointer" }} onClick={() => this.hideModal()}>close</FontIcon>}
        />
        <section className="md-toolbar-relative">
          <form ref={(el) => this.form = el} onSubmit={this.formPreventDefault}>
            <C_TextField
              id="id"
              name="id"
              value={this.state.fields.id}
              onChange={this.onChange}
              type="search"
              label="Status de Segurança"
              placeholder="Status de Segurança"
              rightIcon={"search"}
              block paddedBlock
              required={true}
              onChange={this.onChange}
            /><br/>
            <C_CheckBox
              id="useAlways"
              name="useAlways"
              value={this.state.fields.useAlways}
              onChange={this.onChange}
              label={<div style={{ fontSize: 15, color: "#616161d9" }}>Usar em todas as Ordens de Manutenção</div>}
              type="checkbox"
              style={{}}
              onChange={this.onChange}
            />
            <C_SelectField
              id="entityClass"
              name="entityClass"
              value={this.state.fields.entityClass}
              type="text"
              className="md-cell md-cell--12"
              label={"Tipo de Registro"}
              list={this.state.types}
              required={false}
              disabled={this.state.fields.useAlways}
              onChange={this.onChange}
            /><br></br>
            <C_TextField
              id="entityId"
              name="entityId"
              value={this.state.fields.entityId}
              type="search"
              label="Registro"
              placeholder="Registro"
              rightIcon={"search"}
              block paddedBlock
              disabled={this.state.fields.useAlways}
              onChange={this.onChange}
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

export default CreateSafetyParameter;