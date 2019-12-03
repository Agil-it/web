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
import { UnitMeasurementProvider } from '../providers/UnitMeasurement';
import { PartProvider } from '../providers/Part';
import { ObjectHelper } from '../helpers/Object';
import C_AutoComplete from '../components/AutoComplete';


class CreateParts extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      autocomplete: '',
      measurementUnit: '',
      fields: {},
      list: [],
      unitMeasurementList: []
    };

    this.provider = new HandlerProvider(new PartProvider(), "peça")
    this.unitProvider = new HandlerProvider(new UnitMeasurementProvider(), "unidade de medida");
    this.loadList();

    this.hideModal = this.hideModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
    this.clean = this.clean.bind(this);
    this.delete = this.delete.bind(this);
    this.loadListUnits = this.loadListUnits.bind(this);
    this.autocompleteSelect = this.autocompleteSelect.bind(this);
    this.autocompleteId = this.autocompleteId.bind(this);
    this.autocompleteUnit = this.autocompleteUnit.bind(this);
  }

  async loadList() {
    let list = []
    let response = await this.provider.getList();
    if (response.success) {
      list = response.data
    }
    this.setState({ list })
  }

  async loadListUnits() {
    let unitMeasurementList = []
    let response = await this.unitProvider.getList();
    if (response.success) {
      unitMeasurementList = response.data
    }
    this.setState({ unitMeasurementList })
  }

  hideModal() {
    this.setState({ visible: false })
    this.props.onClose()
  }

  clean() {
    var fields = this.state.fields;
    let autocomplete = ''
    let measurementUnit = ''

    ObjectHelper.clearFields(fields);

    this.setState({ fields, autocomplete, measurementUnit });
    this.loadList()
    this.loadListUnits()
  }

  delete() {
    let part = this.state.fields;
    this.provider.delete(part.id, this.clean)
  }

  save() {
    let part = this.state.fields;
    this.provider.save(part, this.clean)
  }

  onChange(e, name) {

    if (name === "id") {
      this.setState({ autocomplete: e })
      return
    } else if (name === "measurementUnit") {
      this.setState({ measurementUnit: e })
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
    console.log("TCL: CreateParts -> autocompleteSelect -> id", id)
    console.log("TCL: CreateParts -> autocompleteSelect -> inputName", inputName)

    if (inputName === "id") {
      this.autocompleteId(id)
    } else if (inputName === "measurementUnit") {
      this.autocompleteUnit(id)
    }

    return
  }

  autocompleteId(id) {

    if (id === undefined) {
      this.clean()
      return
    }

    let item = this.state.list.find(element => element.id === id)
    console.log("TCL: CreateParts -> autocompleteId -> item", item)

    let fields = {
      id: item.id,
      description: item.description,
      measurementUnit: item.measurementUnit.id
    }

    let measurementUnit = item.measurementUnit.description
    this.setState({ fields, measurementUnit })
    return
  }

  autocompleteUnit(id) {
    console.log("TCL: CreateParts -> autocompleteUnit -> id", id)

    if (id === undefined) {
      this.setState({ measurementUnit: '' })
      return
    }

    let fields = this.state.fields
    fields.measurementUnit = id

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
          title="Cadastrar Peças"
          style={{borderRadius:5}}
          actions={<FontIcon style={{ cursor: "pointer" }} onClick={() => this.hideModal()}>close</FontIcon>}
        />
        <section className="md-toolbar-relative">
          <form ref={(el) => this.form = el} onSubmit={this.formPreventDefault}>
            <C_AutoComplete
              id="id"
              name="id"
              value={this.state.autocomplete}
              onChange={this.onChange}
              type="search"
              label="Código da Peça"
              placeholder="Código da Peça"
              rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
              list={this.state.list}
              dataSelected={this.autocompleteSelect}
              onChange={this.onChange}
            /><br></br>
            <C_AutoComplete
              id="measurementUnit"
              name="measurementUnit"
              value={this.state.measurementUnit}
              onChange={this.onChange}
              type="search"
              label="Unidade de Medida"
              placeholder="Unidade de Medida"
              rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
              list={this.state.unitMeasurementList}
              dataSelected={this.autocompleteSelect}
              onChange={this.onChange}
            /><br></br>
            <C_TextField
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