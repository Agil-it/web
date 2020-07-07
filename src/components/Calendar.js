import React, { PureComponent } from 'react';
import { DatePicker, TimePicker} from 'react-md/lib/Pickers';
import '../index.css';
import { FontIcon } from 'react-md';
// import './Button.css';

export class C_Calendar extends React.Component {

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(stringV, pValue) {

    if (this.props.onChange)
      this.props.onChange({ target: { name: this.props.name, value: pValue } });
  }


  render() {
    var inputStyle = this.props.inputStyle;

    if (!inputStyle) inputStyle = {};

    if (!inputStyle.fontSize) inputStyle.fontSize = 15;

    return (
      <DatePicker
        id={this.props.name}
        displayMode={this.props.displayMode}
        name={this.props.name}
        label={this.props.label}
        inline={this.props.notInline ? undefined : true}
        lineDirection={this.props.lineDirection ? this.props.lineDirection : "center"}
        className={this.props.className}
        inputStyle={this.props.inputStyle}
        cancelLabel={this.props.cancelLabel}
        onChange={this.onChange}
        style={this.props.style}
        value={this.props.value}
        fullWidth={this.props.fullWidth}
        autoOk={true}
        locales="pt-BR"
        defaultValue={this.props.defaultValue}
      />
    );
  }
}

export class C_TimePicker extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);

    console.log("C_TimePicker -> constructor -> this.props", this.props)
  }

  onChange(pValue) {

    if (this.props.onChange)
      this.props.onChange({ target: { name: this.props.name, value: pValue } });
  }


  render() {
    return (
      <TimePicker
        icon={this.props.icon ? <FontIcon style={{ fontSize: 25, cursor: "pointer" }}>{this.props.icon}</FontIcon> : undefined}
        onChange={this.onChange}
        id={this.props.name}
        name={this.props.name}
        label={this.props.label}
        value={this.props.value}
        className={this.props.className}
        displayMode="portrait"
        showSeconds
      />
    );
  }
}
