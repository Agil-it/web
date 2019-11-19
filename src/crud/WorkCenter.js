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
import { WorkCenterProvider } from '../providers/WorkCenter';
import { ObjectHelper } from '../helpers/Object';
import C_AutoComplete from '../components/AutoComplete';


class CreateWorkCenter extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      fields: {}
    };

    this.provider = new HandlerProvider(new WorkCenterProvider(), "centro de trabalho")

    this.loadList()

    this.hideModal = this.hideModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
    this.clean = this.clean.bind(this);
    this.delete = this.delete.bind(this);
    this.onAutocomplete = this.onAutocomplete.bind(this)
  }

  async loadList() {
    this.list = []
    let response = await this.provider.getList();
    if (response.success) {
      this.list = response.data
      this.listName = response.data.map((item => item.description))
    }
    console.log("TCL: CreateWorkCenter -> constructor -> this.list", this.list)
  }

  onAutocomplete(data, filterText, dataLabel) {

    let workCenter = this.state.fields;
    console.log("TCL: CreateWorkCenter -> onAutocomplete -> workCenter", workCenter)
    
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
    let workCenter = this.state.fields;
    this.provider.delete(workCenter.id, this.clean)
  }

  save() {
    let workCenter = this.state.fields;
    this.provider.save(workCenter, this.clean)
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
        // fullPage
        width="40%"
        height="80%"
        // onHide={false}
        aria-labelledby="simple-full-page-dialog-title"
      >
        <Toolbar
          // fixed
          colored
          title="Cadastrar Centro de Trabalho"
          // nav={<FontIcon icon onClick={this.hide}>close</FontIcon>}
          actions={<FontIcon style={{ cursor: "pointer" }} onClick={() => this.hideModal()}>close</FontIcon>}
        />
        <section className="md-toolbar-relative">
          <form ref={(el) => this.form = el} onSubmit={this.formPreventDefault}>
            <C_AutoComplete
              style={{ fontSize: 17 }}
              id="id"
              name="id"
              onChange={this.onChange}
              placeholder="Código do Centro de Trabalho"
              rightIcon={<FontIcon style={{ fontSize: 30, cursor: "pointer" }}>search</FontIcon>}
              block paddedBlock
              list={this.listName}
              filter={this.onAutocomplete}
            /><br></br>
            <C_TextField
              style={{ fontSize: 17 }}
              id="description"
              name="description"
              value={this.state.fields.description}
              onChange={this.onChange}
              type="text"
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

export default CreateWorkCenter;