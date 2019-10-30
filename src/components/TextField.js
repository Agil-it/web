import React, { Component } from 'react';
import { TextField, FontIcon } from 'react-md';
import '../index.css';

class C_TextField extends Component {
    render() {
      return (
        <div>
          <TextField 
            placeholder={this.props.placeholder}
            leftIcon={this.props.icon}
            inputStyle={this.props.style}
            type={this.props.type}
          />
        </div>
        
      );
    }
}

export default C_TextField;