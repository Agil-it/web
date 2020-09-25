import React, { Component } from 'react';
import '../index.css';
import { C_Icon } from './Icon';

class C_Header extends Component {

  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <div>
        <div style={{ backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : "#db3d44", 
          marginTop: this.props.noMargin ? undefined : 10, 
          padding: 10, width: "100%", borderRadius: 5, border: "1px solid silver" }}
        >
          <div style={{
            display: "flex", justifyContent: "space-between", color: "white", fontWeight: "bold",
            fontSize: 20, fontFamily: 'Arial', alignItems: "center"
          }}
          >
            {this.props.title}
            <C_Icon action={() => this.props.onClick ? this.props.onClick() : undefined} style={{ cursor: "pointer", fontSize: 25, color: "white", }} icon={this.props.icon}
            />
          </div>
        </div>
          {this.props.children}
      </div>
    );
  }
}

export default C_Header;