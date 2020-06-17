import React, { PureComponent } from 'react';
import Checkbox  from 'react-md/lib/SelectionControls/Checkbox';
import Switch from 'react-md/lib/SelectionControls/Switch';
import '../index.css';

export class C_CheckBox extends React.Component {

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

export class C_Switch extends React.Component {

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);

  }

  onChange(pValue) {
    console.log("pValue", pValue);

    if (this.props.onChange)
      this.props.onChange({ target: { name: this.props.name, value: pValue } });
  }

  render() {

    return (
      <div>
        <Switch
          id={this.props.name}
          type={this.props.type}
          label={<div style={{ color: '#0000008a' }}>{this.props.label}</div>}
          name={this.props.name}
          value={this.props.value}
          className={this.props.className}
          checked={this.props.checked}
          onChange={this.onChange}
          style={this.props.style}
        />
      </div>

    );
  }
}
