import React, { Component } from 'react';
import { FontIcon, Autocomplete } from 'react-md';
import Fuse from 'fuse.js';
import '../index.css';

class C_AutoComplete extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list: [],
      value: this.props.value,
      description: this.props.description,
    }

    this.filter = this.filter.bind(this);
    this.onAutocomplete = this.onAutocomplete.bind(this);
    this.onChangeAutoComplete = this.onChangeAutoComplete.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  componentDidUpdate() {
    this.state.description = this.props.description || "description";

    let list = this.props.list.map((item => item[this.state.description] ))
  
    if (JSON.stringify(list) !== JSON.stringify(this.state.list)) {
      console.log("C_AutoComplete -> componentDidUpdate -> list", list)
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

  render() {

    return (
      <div>
        <Autocomplete
          id={this.props.name}
          required={this.props.required}
          name={this.props.name}
          disabled={this.props.disabled}
          value={this.props.value}
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
          rightIcon={this.props.rightIcon ? <FontIcon style={{ fontSize: 30, cursor: "pointer" }}>{this.props.rightIcon}</FontIcon> : undefined}
          description={this.props.description}
        />
      </div>

    );
  }
}

export default C_AutoComplete;