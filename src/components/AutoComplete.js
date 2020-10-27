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
    this.onClickIcon = this.onClickIcon.bind(this);
    this.tableSelected = this.tableSelected.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const description = nextProps.description || 'description';
    const list = [...new Set((Array.isArray(nextProps.list) ? nextProps.list : []).map((item => item[description])))];

    this.indexer = new Fuse(list.map((data) => ({ primaryText: data })), {
      keys: [{ name: 'primaryText', weight: 1 }],
    });

    this.setState({ list })
  }

  filter = (data, filterText, dataLabel) => {
    return this.indexer?.search(typeof filterText === 'string' ? filterText : '') || [];
  };

  onAutocomplete(suggestion, suggestionIndex, matches) {
    const matched = matches[suggestionIndex];

    const value = matched ? matched.primaryText : '';

    const item = this.props.list.find(element => element[this.props.description] == value);

    if (item) {
      this.props.dataSelected(item.id, this.props.name);
    } else {
      this.props.onChange(value, this.props.name);
    }

    this.setState({ value });
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

    if (!objectValue) return

    const value = objectValue[this.props.description]
    this.setState({ value })

    this.props.dataSelected(objectValue.id, this.props.name)

    // this.onClickIcon();
  }

  render() {
    return (
      <div>
        <Autocomplete

          id={this.props.name}
          required={this.props.required}
          label={this.props.label}
          placeholder={this.props.placeholder}
          value={this.state.value}
          data={this.state.list}
          filter={this.filter}
          onAutocomplete={this.onAutocomplete}

          description={this.props.description}
          style={this.props.style}

          rightIcon={this.props.rightIcon &&
            <FontIcon
              style={{ fontSize: 30, cursor: "pointer" }}
              onClick={this.onClickIcon}
            >
              {this.props.rightIcon}
            </FontIcon>
          }
        />
        {/* <Autocomplete
          id={this.props.name}
          required={this.props.required}
          name={this.props.name}
          disabled={this.props.disabled}
          value={this.props.value}
          label={this.props.label}
          placeholder={this.props.placeholder}
          dataLabel={this.props.dataLabel}
          className={this.props.className}
          data={this.props.list}
          filter={this.filter}
          onAutocomplete={this.onAutocomplete}
          // onChange={this.onChangeAutoComplete}
          // onBlur={this.onBlur}
          style={this.props.style}
          // deleteKeys={this.props.deleteKeys}
          rightIcon={this.props.rightIcon &&
            <FontIcon
              style={{ fontSize: 30, cursor: "pointer" }}
              onClick={this.onClickIcon}
            >
              {this.props.rightIcon}
          </FontIcon>
          }
          description={this.props.description}
        /> */}
      </div>

    );
  }
}

export default C_AutoComplete;