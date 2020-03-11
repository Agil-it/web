import React, { Component } from 'react';
import { SelectField, FontIcon } from 'react-md';
import PropTypes from 'prop-types';
import '../index.css';

class C_SelectField extends Component {

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);

  }

  onChange(pValue) {
    console.log("pValue",pValue);

    if (this.props.onChange)
      this.props.onChange({ target: { name: this.props.name, value: pValue } });
  }

  render() {

    return (
      <div>
        <SelectField
          label={this.props.label}
          onChange={this.onChange}
          onClick={this.props.action}
          style={this.props.style}
          required={this.props.required}
          id={this.props.id}
          value={this.props.value}
          name={this.props.name}
          itemValue={this.props.valueElement}
          itemLabel={this.props.labelElement}
          placeholder={this.props.placeholder}
          className={this.props.className}
          menuItems={this.props.list}
          disabled={this.props.disabled}
          errorText={this.props.errorText}
          listStyle={this.props.listStyle}
          fullWidth={this.props.fullWidth}
        />
      </div>
      
    );
  }
}

export default C_SelectField;