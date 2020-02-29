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
import { SuperiorMachineProvider } from '../providers/SuperiorMachine';
import { InstallationAreaProvider } from '../providers/InstallationArea';
import { ObjectHelper } from '../helpers/Object';
import C_AutoComplete from '../components/AutoComplete';

class CreateSuperiorMachine extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      autocomplete: '',
      installationArea: '',
      fields: {},
      list: [],
      areasList: []
    };

    this.provider = new HandlerProvider(new SuperiorMachineProvider(), "equipamento superior")
    this.areaProvider = new HandlerProvider(new InstallationAreaProvider(), "local de instalação")
    
    this.loadList();

    this.hideModal = this.hideModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
    this.clean = this.clean.bind(this);
    this.delete = this.delete.bind(this);
    this.autocompleteSelect = this.autocompleteSelect.bind(this);
    this.loadListArea = this.loadListArea.bind(this);
    this.autocompleteSelect = this.autocompleteSelect.bind(this);
    this.autocompleteId = this.autocompleteId.bind(this);
    this.autocompleteArea = this.autocompleteArea.bind(this);
  }

  async loadList() {
    let list = []
    let response = await this.provider.getList();
    if (response.success) {
      list = response.data
    }
    this.setState({ list })
  }

  async loadListArea() {
    let areasList = []
    let response = await this.areaProvider.getList();
    if (response.success) {
      areasList = response.data
    }
    this.setState({ areasList })
  }


  hideModal() {
    this.setState({ visible: false })
    this.props.onClose()
  }

  clean() {
    var fields = this.state.fields;
    let autocomplete = ''
    let installationArea = ''

    ObjectHelper.clearFields(fields);

    this.setState({ fields, autocomplete, installationArea });
    this.loadList()
    this.loadListArea()
  }

  delete() {
    let superiorMachine = this.state.fields;
    this.provider.delete(superiorMachine.id, this.clean)
  }

  save() {
    let superiorMachine = this.state.fields;
    this.provider.save(superiorMachine, this.clean)
  }

  onChange(e, name) {

    if (name === "id") {
      this.setState({ autocomplete: e })
      return
    } else if (name === "installationArea") {
      this.setState({ installationArea: e })
      return
    }

    let fields = this.state.fields;

    fields[e.target.name] = e.target.value;
    this.setState({ fields });
  }

  formPreventDefault(event) {
    event.preventDefault()
  }

  autocompleteSelect(id, inputName) {

    if (inputName === "id") {
      this.autocompleteId(id)
    } else if (inputName === "installationArea") {
      this.autocompleteArea(id)
    }

    return
  }

  autocompleteId(id) {

    if (id === undefined) {
      this.clean()
      return
    }

    let item = this.state.list.find(element => element.id === id)
    console.log("TCL: Installation -> autocompleteId -> item", item)

    let fields = {
      id: item.id,
      description: item.description,
      installationArea: item.installationArea.id
    }

    let installationArea = item.installationArea.description
    this.setState({ fields, installationArea })
    return
  }

  autocompleteArea(id) {

    if (id === undefined) {
      this.setState({ installationArea: '' })
      return
    }

    let fields = this.state.fields
    fields.installationArea = id

    this.setState({ fields })
    return
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
          title="Cadastrar Equipamento Superior"
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
              label="Equipamento Superior"
              placeholder="Equipamento Superior"
              rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
            /><br></br>
            <C_AutoComplete
              id="installationArea"
              name="installationArea"
              value={this.state.installationArea}
              onChange={this.onChange}
              type="search"
              label="Local de Instalação"
              placeholder="Local de Instalação"
              rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
              dataSelected={this.autocompleteSelect}
              list={this.state.areasList}
            /><br></br>
            <C_TextField
              id="description"
              name="description"
              value={this.state.fields.description}
              onChange={this.onChange}
              type="text"
              label="Descrição do Equipamento Superior"
              placeholder="Descrição do Equipamento Superior"
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

export default CreateSuperiorMachine;