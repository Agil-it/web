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
import { SectorProvider } from '../providers/Sector';
import { ObjectHelper } from '../helpers/Object';
import C_AutoComplete from '../components/AutoComplete';


class CreateInstallationArea extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      autocomplete: '',
      sector: '',
      fields: {},
      list: [],
      sectorList: []
    };

    this.provider = new HandlerProvider(new InstallationAreaProvider(), "local de instalação")
    this.sectorProvider = new HandlerProvider(new SectorProvider(), "setor")

    this.loadList();

    this.hideModal = this.hideModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
    this.clean = this.clean.bind(this);
    this.delete = this.delete.bind(this);
    this.autocompleteSelect = this.autocompleteSelect.bind(this);
    this.loadlListSector = this.loadlListSector.bind(this);
    this.autocompleteSelect = this.autocompleteSelect.bind(this);
    this.autocompleteId = this.autocompleteId.bind(this);
    this.autocompleteSector = this.autocompleteSector.bind(this);
  }

  async loadList() {
    let list = []
    let response = await this.provider.getList();
    if (response.success) {
      list = response.data
      console.log("TCL: Installation -> loadList -> list", list)
    }
    this.setState({ list })
  }

  async loadlListSector() {
    let sectorList = []
    let response = await this.sectorProvider.getList();
    if (response.success) {
      sectorList = response.data
    }
    this.setState({ sectorList })
  }

  hideModal() {
    this.setState({ visible: false })
    this.props.onClose()
  }

  clean() {
    var fields = this.state.fields;
    let autocomplete = ''
    let sector = ''

    ObjectHelper.clearFields(fields);

    this.setState({ fields, autocomplete, sector });
    this.loadList()
    this.loadlListSector()
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
    } else if (name === "sector") {
      this.setState({ sector: e })
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
    } else if (inputName === "sector") {
      this.autocompleteSector(id)
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
      sector: item.sector.id
    }

    let sector = item.sector.description
    this.setState({ fields, sector })
    return
  }

  autocompleteSector(id) {

    if (id === undefined) {
      this.setState({ sector: '' })
      return
    }

    let fields = this.state.fields
    fields.sector = id

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
            /><br></br>
            <C_AutoComplete
              id="secor"
              name="sector"
              value={this.state.sector}
              onChange={this.onChange}
              type="search"
              label="Setor"
              placeholder="Setor"
              rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
              dataSelected={this.autocompleteSelect}
              list={this.state.sectorList}
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