import React, { Component } from 'react';
import {
  Button,
  DialogContainer,
  Divider,
  Toolbar,
  FontIcon,
} from 'react-md';

import C_TextField from '../components/TextField';
import C_SelectField from '../components/SelectField';
import C_CrudButtons from '../components/CrudButtons';
import { HandlerProvider } from '../providers/handler';
import { OrderLayoutProvider } from '../providers/OrderLayout';


class CreateOrderLayout extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      fields: {},
      layouts: [{
        label: 'Corretiva / Preventiva',
        value: 'default',
      },
      {
        label: 'Rota',
        value: 'route',
      },
      {
        label: 'Lista',
        value: 'list',
      }]
    };

    this.provider = new HandlerProvider(new OrderLayoutProvider(), "tipo de ordem de manutenção")

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
    let orderLayout = this.state.fields;
    this.provider.delete(orderLayout.id, this.clean)
  }

  save() {
    let orderLayout = this.state.fields;
    this.provider.save(orderLayout, this.clean)
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
        width="40%"
        height="75%"
        dialogStyle={{borderRadius:5}}
        aria-labelledby="simple-full-page-dialog-title"
      >
        <Toolbar
          fixed
          colored
          title="Cadastrar Layout de Ordem de Manutenção"
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
              label="Tipo de Ordem"
              placeholder="Tipo de Ordem"
              rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
              block paddedBlock
            /><br></br>
            <C_SelectField
              id="orderLayout"
              name="orderLayout"
              value={this.state.fields.orderLayout}
              onChange={this.onChange}
              type="text"
              label="Layout da Ordem"
              list={this.state.layouts}
              required={true}
              style={{ width: "100%" }}
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

export default CreateOrderLayout;