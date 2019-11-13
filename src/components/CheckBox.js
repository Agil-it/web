import React, { Component } from 'react';
import { Checkbox, FontIcon } from 'react-md';
import '../index.css';

class C_Checkbox extends Component {

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
        <Checkbox
            label={this.props.label}
            onChange={this.onChange}
            onClick={this.props.action}
            style={this.props.style}
            id={this.props.name}
            className={this.props.className}
            disabled={this.props.disabled}
            checked={this.props.checked}
            type={this.props.type}
        />
      </div>
      
    );
  }
}

export default C_Checkbox;