import React, { Component } from 'react';
import { FontIcon, Autocomplete } from 'react-md';
import '../index.css';

class C_AutoComplete extends Component {

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);

  }

  onChange(pValue) {

    if (this.props.onChange)
      this.props.onChange({ target: { name: this.props.name, value: pValue } });
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
          dataLabel={this.props.dataLabel}
          className={this.props.className}
          data={this.props.list}
          filter={this.filter}
          onAutocomplete={this.onAutocomplete}
          onChange={this.onChange}
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