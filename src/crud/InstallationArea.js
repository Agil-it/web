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
import { InstallationAreaProvider } from '../providers/InstallationArea';
import { ObjectHelper } from '../helpers/Object';
import C_AutoComplete from '../components/AutoComplete';


class CreateInstallationArea extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      fields: {},
      autocomplete: '',
      list: []
    };

    this.provider = new HandlerProvider(new InstallationAreaProvider(), "local de instalação")

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
    let installationArea = this.state.fields;
    this.provider.delete(installationArea.id,this.clean)
  }

  save() {
    let installationArea = this.state.fields;
    this.provider.save(installationArea,this.clean)
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
          title="Cadastrar Local de Instalação"
          style={{borderRadius:5}}
          actions={<FontIcon style={{ cursor: "pointer" }} onClick={() => this.hideModal()}>close</FontIcon>}
        />
        <section className="md-toolbar-relative">
          <form ref={(el) => this.form = el} onSubmit={this.formPreventDefault}>
            <C_AutoComplete
              id="id"
              name="id"
              value={this.state.autocomplete}
              dataSelected={this.autocompleteSelect}
              list={this.state.list}
              onChange={this.onChange}
              type="search"
              label="Código Local de Instalação"
              placeholder="Código Local de Instalação"
              rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
              block paddedBlock
            /><br></br>
            <C_AutoComplete
              id="secor"
              name="sector"
              value={this.state.fields.sector}
              onChange={this.onChange}
              type="search"
              label="Setor"
              placeholder="Setor"
              rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
              block paddedBlock
            /><br></br>
            <C_TextField
              id="description"
              name="description"
              value={this.state.fields.description}
              onChange={this.onChange}
              type="text"
              label="Descrição do Local"
              placeholder="Descrição do Local"
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

export default CreateInstallationArea;