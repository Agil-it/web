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
import { MachineProvider } from '../providers/Machine';
import { MachineTypeProvider } from '../providers/MachineType';
import { ObjectHelper } from '../helpers/Object';
import { machineTypeColumns, equipmentColumns } from '../helpers/SearchModel';
import C_AutoComplete from '../components/AutoComplete';


class CreateMachine extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      autocomplete: '',
      machineType: '',
      fields: {},
      list: [],
      machineTypeList: [],
      equipmentColumns: equipmentColumns(),
      machineTypeColumns: machineTypeColumns(),
    };

    this.provider = new HandlerProvider(new MachineProvider(), "equipamento")
    this.machineTypeProvider = new HandlerProvider(new MachineTypeProvider(), "Tipo de Máquina")
    this.loadList()

    this.hideModal = this.hideModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
    this.clean = this.clean.bind(this);
    this.delete = this.delete.bind(this);
    this.loadListMachineType = this.loadListMachineType.bind(this);
    this.autocompleteSelect = this.autocompleteSelect.bind(this);
    this.autocompleteId = this.autocompleteId.bind(this);
    this.autocompleteMachineType = this.autocompleteMachineType.bind(this);
  }

  async loadList() {
    let list = []
    let response = await this.provider.getList();
    if (response.success) {
      list = response.data
      console.log("TCL: CreateDefectCause -> loadList -> list", list)
    }
    this.setState({ list })
  }

  async loadListMachineType() {
    let machineTypeList = []
    let response = await this.machineTypeProvider.getList();
    if (response.success) {
      machineTypeList = response.data
    }
    this.setState({ machineTypeList })
  }

  hideModal() {
    this.setState({ visible: false })
    this.props.onClose()
  }

  clean() {
    var fields = this.state.fields;
    let autocomplete = ''
    let machineType = ''

    ObjectHelper.clearFields(fields);

    this.setState({ fields, autocomplete, machineType });
    this.loadList()
    this.loadListMachineType()
  }

  delete() {
    let machine = this.state.fields;
    this.provider.delete(machine.id,this.clean)
  }

  save() {
    let machine = this.state.fields;
    this.provider.save(machine,this.clean)
  }

  onChange(e, name) {

    if (name === "id") {
      this.setState({ autocomplete: e })
      return
    } else if (name === "machineType") {
      this.setState({ machineType: e })
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
    } else if (inputName === "machineType") {
      this.autocompleteMachineType(id)
    }

    return
  }

  autocompleteId(id) {

    if (id === undefined) {
      this.clean()
      return
    }

    let item = this.state.list.find(element => element.id === id)

    let fields = {
      id: item.id,
      description: item.description,
      machineType: item.machineType.id
    }

    let machineType = item.machineType.description
    this.setState({ fields, machineType })
    return
  }

  autocompleteMachineType(id) {

    if (id === undefined) {
      this.setState({ machineType: '' })
      return
    }

    let fields = this.state.fields
    fields.machineType = id

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
          title="Cadastrar Equipamento"
          style={{borderRadius:5}}
          actions={<FontIcon style={{ cursor: "pointer" }} onClick={() => this.hideModal()}>close</FontIcon>}
        />
        <section className="md-toolbar-relative">
          <form ref={(el) => this.form = el} onSubmit={this.formPreventDefault}>
            <C_AutoComplete
              id="id"
              name="id"
              value={this.state.autocomplete}
              label={"Equipamento"}
              placeholder="Equipamento"
              rightIcon={"search"}
              block paddedBlock
              list={this.state.list}
              dataSelected={this.autocompleteSelect}
              onChange={this.onChange}
              searchColumns={this.state.equipmentColumns}
            /><br></br>
            <C_AutoComplete
              id="machineType"
              name="machineType"
              value={this.state.machineType}
              label={"Tipo de Máquina"}
              placeholder="Tipo de Máquina"
              rightIcon={"search"}
              block paddedBlock
              list={this.state.machineTypeList}
              dataSelected={this.autocompleteSelect}
              onChange={this.onChange}
              searchColumns={this.state.machineTypeColumns}
            /><br></br>
            <C_TextField
              id="description"
              name="description"
              value={this.state.fields.description}
              onChange={this.onChange}
              type="text"
              label="Descrição do Equipamento"
              placeholder="Descrição do Equipamento"
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

export default CreateMachine;