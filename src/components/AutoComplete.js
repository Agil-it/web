import React, { Component } from 'react';
import { FontIcon, Autocomplete } from 'react-md';
import Fuse from 'fuse.js';
import '../index.css';

class C_AutoComplete extends Component {

  constructor(props) {
    super(props);
    this.filter = this.filter.bind(this);

  }

  componentDidUpdate() {
    this.indexer = new Fuse(this.props.list.map((data) => ({ primaryText: data })), {
      keys: [{ name: 'primaryText', weight: 1 }],
    });
  }

  filter = (data, filterText, dataLabel) => {
    return this.indexer.search(filterText);
  };

  render() {

    return (
      <div>
        <Autocomplete
          id={this.props.name}
          name={this.props.name}
          disabled={this.props.disabled}
          value={this.props.value}
          label={this.props.label}
          dataLabel={this.props.dataLabel}
          className={this.props.className}
          data={this.props.list}
          filter={this.filter}
          onAutocomplete={this.props.onAutocomplete}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          style={this.props.style}
          deleteKeys={this.props.deleteKeys}
          rightIcon={this.props.rightIcon}
        />
      </div>

    );
  }
}

export default C_AutoComplete;