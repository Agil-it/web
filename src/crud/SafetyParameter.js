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
import C_AutoComplete from '../components/AutoComplete';
import C_SelectField from '../components/SelectField';
import {C_CheckBox} from '../components/CheckBox';
import { HandlerProvider } from '../providers/handler';
import { SafetyParameterProvider } from '../providers/SafetyParameter';
import { SectorProvider } from '../providers/Sector';
import { MachineProvider } from '../providers/Machine';
import { MachineTypeProvider } from '../providers/MachineType';
import { WorkCenterProvider } from '../providers/WorkCenter';
import { InstallationAreaProvider } from '../providers/InstallationArea';
import { SuperiorMachineProvider } from '../providers/SuperiorMachine';
import { ObjectHelper } from '../helpers/Object';
import {
  sectorColumns,
  equipmentColumns,
  workCenterColumns,
  machineTypeColumns,
  installationAreaColumns,
  superiorEquipmentColumns,
  safetyParametersColumns,
} from '../helpers/SearchModel';

class CreateSafetyParameter extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      types: [{
        label: 'Local de Instalação',
        value: 'instalation-area',
      },
      {
        label: 'Setor',
        value: 'sector',
      },
      {
        label: 'Equipamento',
        value: 'equipment',
      },
      {
        label: 'Tipo de Máquina',
        value: 'machine-type',
      },
      {
        label: 'Equipamento Superior',
        value: 'superior-equipment',
      },
      {
        label: 'Centro de Trabalho',
        value: 'work-center',
      }],
      fields: {},
      entityLists: [],
      entityColumns: [],
      safetyParametersColumns: safetyParametersColumns(),
      safetyParametersList: [],
    };

    this.provider = new HandlerProvider(new SafetyParameterProvider(), "Parâmetro de segurança");

    this.entityProviders = {
      'sector': new HandlerProvider(new SectorProvider(), "Setor"),
      'equipment': new HandlerProvider(new MachineProvider(), "Equipamento"),
      'machine-type': new HandlerProvider(new MachineTypeProvider(), "Tipo de Máquina"),
      'work-center': new HandlerProvider(new WorkCenterProvider(), "Centro de Trabalho"),
      'instalation-area': new HandlerProvider(new InstallationAreaProvider(), "Centro de Trabalho"),
      'superior-equipment': new HandlerProvider(new SuperiorMachineProvider(), "Equipamento Superior"),
    };

    this.entityColumnsConfig = {
      'sector': sectorColumns(),
      'equipment': equipmentColumns(),
      'machine-type': machineTypeColumns(),
      'work-center': workCenterColumns(),
      'instalation-area': installationAreaColumns(),
      'superior-equipment': superiorEquipmentColumns(),
    };

    this.hideModal = this.hideModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
    this.clean = this.clean.bind(this);
    this.delete = this.delete.bind(this);
    this.completeField = this.completeField.bind(this);

    this.loadList();
  }

  async loadList() {
    let { data } = await this.provider.getList();
    this.setState({ safetyParametersList: Array.isArray(data) ? data : [] })
  }

  hideModal() {
    this.setState({ visible: false })
    this.props.onClose()
  }

  clean() {
    var fields = this.state.fields;
    ObjectHelper.clearFields(fields);

    this.setState({ fields }, () => this.loadList());
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
    const { name, value } = e.target;
    const { fields } = this.state;

    fields[name] = value;
    this.setState({ fields })

    if (name === 'entityClass')
      this.updateEntityIdField(value);
    else if (name === 'useAlways')
      this.clearEntityFields();

  }

  formPreventDefault(event) {
    event.preventDefault()
  }

  async updateEntityIdField(value) {
    let data;
    try {
      ({ data } = await this.entityProviders[value].getList());
    } catch(err) {
      data = [];
    }

    const { fields } = this.state;

    fields.entityId = '';

    this.setState({
      entityLists: data,
      entityColumns: this.entityColumnsConfig[value],
      fields,
    });
  }

  completeField(id, name) {
    const { fields } = this.state;

    fields[name] = id;

    this.setState({ fields })

    if (name === 'id')
      this.loadFields(id)
  }

  loadFields(safetyId) {
    const data = this.state.safetyParametersList.find(({ id }) => id === safetyId);
    if (!data) return;

    const fields = {
      useAlways: data.useAlways,
      entityClass: data.entityClass,
      entityId: data.entityId,
      description: data.description,
    }

    this.setState({ fields })
  }

  clearEntityFields() {
    const fields = {
      ...this.state.fields,
      entityId: undefined,
      entityClass: '',
    }

    this.setState({ fields });
  }

  render() {

    console.log("state", this.state);

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
            
          <C_AutoComplete
              id="id"
              name="id"
              type="search"
              list={this.state.safetyParametersList}
              label="Status de Segurança"
              placeholder="Status de Segurança"
              rightIcon={"search"}
              block paddedBlock
              value={this.state.fields.id}
              dataSelected={this.completeField}
              searchColumns={this.state.safetyParametersColumns}
              onChange={(val, name) => {}}
            /><br/>
            <C_CheckBox
              id="useAlways"
              name="useAlways"
              value={this.state.fields.useAlways}
              onChange={this.onChange}
              label={<div style={{ fontSize: 15, color: "#616161d9" }}>Usar em todas as Ordens de Manutenção</div>}
              type="checkbox"
              checked={this.state.fields.useAlways}
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
            <C_AutoComplete
              id="entityId"
              name="entityId"
              type="search"
              list={this.state.entityLists}
              label="Registro"
              placeholder="Registro"
              rightIcon={"search"}
              block paddedBlock
              value={this.state.fields.entityId}
              dataSelected={this.completeField}
              searchColumns={this.state.entityColumns}
              onChange={(val, name) => {}}
              disabled={this.state.fields.useAlways}
            />
            <br></br>
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