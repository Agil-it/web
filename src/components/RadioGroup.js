import React, { Component } from 'react';
import Radio from 'react-md/lib/SelectionControls/Radio';
import '../index.css';

class C_RadioGroup extends Component {

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
        {this.props.options.map((option, i) =>
          <Radio
            key={i}
            inline
            style={this.props.style}
            name={this.props.name}
            id={this.props.name + "_" + i}
            value={option.value}
            label={option.label ? option.label : ""}
            checked={this.props.value == option.value}
            disabled={this.props.disabled}
            onChange={this.onChange}
          />
        )}
      </div>
      
    );
  }
}

export default C_RadioGroup;