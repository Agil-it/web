import React, { Component } from 'react';
import { DatePicker, FontIcon } from 'react-md';
import '../index.css';
// import './Button.css';

class C_Calendar extends Component {

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
        <DatePicker
            id={this.props.name}
            label={this.props.label}
            className={this.props.className}
            showAllDays={this.props.allDays}
            inputStyle={this.props.css}
            rightIcon={this.props.rightIcon}
            cancelLabel={this.props.cancelLabel}
            onChange={this.onChange}
            style={this.props.style}
            fullWidth={false}
            icon={false}
            yearsDisplayed={239}
            portal
            lastChild
            renderNode={null}
            disableScrollLocking
        />
    );
  }
}

export default C_Calendar;