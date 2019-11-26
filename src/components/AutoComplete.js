import React, { Component } from 'react';
import { FontIcon, Autocomplete } from 'react-md';
import Fuse from 'fuse.js';
import '../index.css';

class C_AutoComplete extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list: [],
      value: this.props.value
    }

    this.filter = this.filter.bind(this);
    this.onAutocomplete = this.onAutocomplete.bind(this);
    this.onChangeAutoComplete = this.onChangeAutoComplete.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  componentDidUpdate() {
    let list = this.props.list.map((item => item.description ))

    if (JSON.stringify(list) !== JSON.stringify(this.state.list)) {
      console.log(this.props.list)
      console.log(this.props.list)
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
    let item = this.props.list.find(element => element.description === value)

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
          rightIcon={this.props.rightIcon}
        />
      </div>

    );
  }
}

export default C_AutoComplete;