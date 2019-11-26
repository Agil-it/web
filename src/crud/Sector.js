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
import { SectorProvider } from '../providers/Sector';
import { ObjectHelper } from '../helpers/Object';
import C_AutoComplete from '../components/AutoComplete';

class CreateSector extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      fields: {},
      autocomplete: '',
      list: []
    };

    this.provider = new HandlerProvider(new SectorProvider(), "setor")

    this.loadList();

    this.hideModal = this.hideModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
    this.clean = this.clean.bind(this);
    this.delete = this.delete.bind(this);
    this.autocompleteSelect = this.autocompleteSelect.bind(this);

  }

  async loadList() {
    let list = []
    let response = await this.provider.getList();
    if (response.success) {
      list = response.data
    }
    this.setState({ list })
  }

  hideModal() {
    this.setState({ visible: false })
    this.props.onClose()
  }

  clean() {
    let fields = this.state.fields;
    let autocomplete = ''

    ObjectHelper.clearFields(fields);

    this.setState({ fields, autocomplete });
    this.loadList()
  }

  delete() {
    let sector = this.state.fields;
    this.provider.delete(sector.id, this.clean)
  }

  save() {
    let sector = this.state.fields;
    this.provider.save(sector, this.clean)
  }

  onChange(e, name) {
    if (name === "id") {
      this.setState({ autocomplete: e })
      return
    }

    let fields = this.state.fields;

    fields[e.target.name] = e.target.value;
    this.setState({ fields })

  }

  autocompleteSelect(id, name) {

    if (id === undefined) {
      this.clean()
      return
    }

    let item = this.state.list.find(element => element.id === id)

    let fields = {
      id: item.id,
      description: item.description
    }

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
        width="40%"
        height="60%"
        dialogStyle={{borderRadius:5}}
        onHide={this.hideModal}
        aria-labelledby="simple-full-page-dialog-title"
      >
        <Toolbar
          fixed
          colored
          title="Cadastrar Setor"
          style={{borderRadius:5}}
          actions={<FontIcon style={{ cursor: "pointer" }} onClick={this.hideModal}>close</FontIcon>}
        />
        <section className="md-toolbar-relative">
          <form ref={(el) => this.form = el} onSubmit={this.formPreventDefault}>
            <C_AutoComplete
              id="id"
              name="id"
              type="search"
              label="Código do Setor"
              placeholder="Código do Setor"
              rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
              list={this.state.list}
              onChange={this.onChange}
              value={this.state.autocomplete}
              dataSelected={this.autocompleteSelect}
            /><br></br>
            <C_TextField
              name="description"
              id="description"
              type="text"
              label="Descrição"
              placeholder="Descrição"
              value={this.state.fields.description}
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