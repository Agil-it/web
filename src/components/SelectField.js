import React, { Component } from 'react';
import { SelectField, FontIcon } from 'react-md';
import PropTypes from 'prop-types';
import '../index.css';

class C_SelectField extends Component {

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

    var inputStyle = this.props.inputStyle;
    var listStyle = this.props.listStyle;

    if (!listStyle) listStyle = {};
    if (!listStyle.fontSize) listStyle.fontSize = 16;

    if (!inputStyle) inputStyle = { overflow: "hidden" };

    if (!inputStyle.fontSize) inputStyle.fontSize = 16;

    var style = this.props.style;

    if (!style) style = {};

    if (!style.fontSize) style.fontSize = 16;

    return (
      <div>
        <SelectField
          id={this.props.name}
          // position={this.props.position ? this.props.position : SelectField.Positions.BOTTOM_LEFT}
          key={this.props.key}
          name={this.props.name}
          label={this.props.label}
          inputStyle={inputStyle}
          listStyle={listStyle}
          style={style}
          disabled={this.props.disabled}
          placeholder={this.props.placeholder}
          menuItems={this.props.list}
          value={this.props.value}
          onChange={this.onChange}
          required={this.props.required}
          errorText={this.props.errorText}
          helpText={this.props.helpText}
          className={this.props.className}
          itemLabel={this.props.labelElement}
          error={(this.props.errorText && this.props.errorText.length > 0)}
          itemValue={this.props.valueElement}
          simplifiedMenu={this.props.simplifiedMenu}
          sameWidth={true}
          toggleStyle={this.props.toggleStyle}
          onClick={this.props.onClick}
          onBlur={this.props.onBlur}
          onFocus={this.props.onFocus}
          onKeyDown={this.props.onKeyDown}
        />
      </div>
      
    );
  }
}

export default C_SelectField;