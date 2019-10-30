import React, { Component } from 'react';
import { Button, FontIcon } from 'react-md';
// import './Button.css';

class C_Button extends Component {
  render() {
    return (
      <Button raised primary
        label={this.props.label}
        style={this.props.style}
        onClick={this.props.action}
      />
    );
  }
}

export default C_Button;