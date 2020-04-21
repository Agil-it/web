import React, { PureComponent } from 'react';
import Button from 'react-md/lib/Buttons/Button';
import { SVGIcon } from 'react-md';
import '../index.css';
// import './Button.css';

export class C_Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Button raised
        primary={this.props.primary}
        secondary={this.props.secondary}
        label={this.props.label}
        style={this.props.style}
        onClick={this.props.action}
        disabled={this.props.disabled}
        iconEl={this.props.icon}
        name={this.props.name}
      />
    );
  }
}

export class C_ButtonFloat extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render(){
    return (
      <Button floating
        label={this.props.label}
        tooltipLabel={this.props.tooltipLabel}
        tooltipPosition={this.props.tooltipPosition}
        primary={this.props.primary}
        secondary={this.props.secondary}
        className={this.props.className}
        style={this.props.style}
        onClick={this.props.action}
        forceIconFontSize={this.props.iconSize ? true : undefined}
        secondary={this.props.secondary}
        forceIconSize={this.props.iconSize}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
      >
        {this.props.icon}
      </Button>
    );
  }
}
