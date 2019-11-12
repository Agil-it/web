import React, { Component } from 'react';
import { TextField, FontIcon } from 'react-md';
import '../index.css';

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
          placeholder={this.props.placeholder}
          leftIcon={this.props.icon}
          inputStyle={this.props.style}
          type={this.props.type}
          rightIcon={this.props.rightIcon}
          className={this.props.className}
          rows={this.props.rows}
          onChange={this.onChange}
        />
      </div>
      
    );
  }
}

export default C_TextField;