import React, { PureComponent } from 'react';
import { FontIcon } from 'react-md';
import '../index.css';
// import './Button.css';

export class C_Icon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <FontIcon 
        className={this.props.className}
        primary={this.props.primary}
        forceFontSize={!!this.props.iconSize}
        secondary={this.props.secondary}
        forceSize={this.props.iconSize}
        label={this.props.label}
        style={this.props.style}
        onClick={this.props.action}
        disabled={this.props.disabled}
        name={this.props.name}
      >{this.props.icon}</FontIcon>
    );
  }
}