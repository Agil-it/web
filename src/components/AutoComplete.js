import React, { Component } from 'react';
import { FontIcon, Autocomplete } from 'react-md';
import Fuse from 'fuse.js';
import '../index.css';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import C_SearchTable from './SearchTable';

class C_AutoComplete extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list: [],
      value: this.props.value,
      description: this.props.description,
      toggleIcon: false,
    }

    this.filter = this.filter.bind(this);
    this.onAutocomplete = this.onAutocomplete.bind(this);
    this.onChangeAutoComplete = this.onChangeAutoComplete.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onClickIcon = this.onClickIcon.bind(this);
    this.tableSelected = this.tableSelected.bind(this);
  }

  componentDidUpdate() {

    this.state.description = this.props.description || "description";

    let list = this.props.list.map((item => item[this.state.description] ))
  
    if (JSON.stringify(list) !== JSON.stringify(this.state.list)) {
      this.setState({ list })
    }
      

    this.indexer = new Fuse(list.map((data) => ({ primaryText: data })), {
      keys: [{ name: 'primaryText', weight: 1 }],
    });
  }

  filter = (data, filterText, dataLabel) => {
    return this.indexer.search(filterText);
  };

  onAutocomplete(suggestion, suggestionIndex, matches) {
    let matched=matches[suggestionIndex]
    let value = matched? matched.primaryText : ""
    this.setState({ value })
    this.props.onChange(value, this.props.name)
  }

  onChangeAutoComplete(value, event) {
    this.setState({ value })
    this.props.onChange(value, this.props.name)
  }

  onBlur() {
    let value = this.state.value
    let item = this.props.list.find(element => element[this.state.description] === value)

    if( item === undefined) {
      value = ""
      this.setState({ value })
      this.props.onChange(value, this.props.name)
      this.props.dataSelected(undefined, this.props.name)
      return
    }

    this.props.onChange(value, this.props.name)
    this.props.dataSelected(item.id, this.props.name)
  }

  onClickIcon() {
    if (!Array.isArray(this.props.searchColumns)) return;

    confirmAlert({
      customUI: ({ onClose }) => (
        <C_SearchTable
          columns={this.props.searchColumns}
          content={this.props.list}
          onClick={this.tableSelected}
          extraFunction={onClose}
        />
      )
    });
  }

  tableSelected(objectValue) {
    // console.log('tableSelected', objectValue);

    if (!objectValue) return

    const value = objectValue[this.state.description]
    this.setState({ value })
    
    this.props.onChange(value, this.props.name)
    this.props.dataSelected(objectValue.id, this.props.name)

    // this.onClickIcon();
  }

  render() {

    return (
      <div>
        <Autocomplete
          id={this.props.name}
          required={this.props.required}
          name={this.props.name}
          disabled={this.props.disabled}
          value={this.state.value}
          label={this.props.label}
          placeholder={this.props.placeholder}
          dataLabel={this.props.dataLabel}
          className={this.props.className}
          data={this.state.list}
          filter={this.filter}
          onAutocomplete={this.onAutocomplete}
          onChange={this.onChangeAutoComplete}
          onBlur={this.onBlur}
          style={this.props.style}
          deleteKeys={this.props.deleteKeys}
          rightIcon={this.props.rightIcon &&
            <FontIcon
              style={{ fontSize: 30, cursor: "pointer" }}
              onClick={this.onClickIcon}
            >
              {this.props.rightIcon}
          </FontIcon>
          }
          description={this.props.description}
        />
      </div>

    );
  }
}

export default C_AutoComplete;