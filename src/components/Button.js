import React, { Component } from 'react';
import { Button, FontIcon } from 'react-md';
import '../index.css';
// import './Button.css';

class C_Button extends Component {
  render() {
    return (
      <Button raised
        primary={this.props.primary}
        secondary={this.props.secondary}
        label={this.props.label}
        style={this.props.style}
        onClick={this.props.action}
        disabled={this.props.disabled}
      />
    );
  }
}

export default C_Button;