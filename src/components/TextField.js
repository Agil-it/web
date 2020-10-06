import React, { Component } from 'react';
import TextField from 'react-md/lib/TextFields';
import '../index.css';
import { FontIcon } from 'react-md';

class C_TextField extends Component {

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
        <TextField
          id={this.props.name}
          errorText={this.props.showError}
          label={this.props.label}
          placeholder={this.props.placeholder}
          leftIcon={this.props.icon ? <FontIcon style={{ fontSize: 25, cursor: "pointer" }}>{this.props.icon}</FontIcon> : undefined}
          inputStyle={this.props.style}
          type={this.props.type}
          rightIcon={this.props.rightIcon ? <FontIcon style={{ fontSize: 30, cursor: "pointer" }}>{this.props.rightIcon}</FontIcon> : undefined}
          className={this.props.className}
          rows={this.props.rows}
          onChange={this.onChange}
          required={this.props.required}
          disabled={this.props.disabled}
          style={this.props.css}
          value={this.props.value}
        />
      </div>
      
    );
  }
}

export default C_TextField;