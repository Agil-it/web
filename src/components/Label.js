import React, { PureComponent } from 'react';
import { CardTitle, CardText } from 'react-md';
import '../index.css';
import { C_Icon } from './Icon';
import { C_ToolTip } from './ToolTip';
// import './Button.css';

export class C_Label extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      style: this.props.style
    }
  }

  render() {

    console.log("C_Label -> render -> this.props", this.props)

    let style = this.state.style;

    if (!style) style = {maxWidth: this.props.maxWidth ? this.props.maxWidth : undefined, textAlign:"justify", display:"flex", marginLeft: 20, fontFamily: 'sans-serif'};

    return (
      <div className={this.props.className}>
        <CardTitle subtitle={this.props.label}/>
        {this.props.icon ?
          <C_ToolTip position="right" tooltip={this.props.tooltip}>
            <C_Icon style={this.props.iconStyle} icon={this.props.icon}/>
          </C_ToolTip>
        : <span style={style}>{this.props.value}</span>
        }
      </div>  
    );
  }
}