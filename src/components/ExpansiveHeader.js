import React, { Component } from 'react';
import '../index.css';
import { C_Icon } from './Icon';

class C_ExpansiveHeader extends Component {

  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    return (
      <div>
        <div style={{ backgroundColor: "#db3d44", marginTop: 10, padding: 10, width: "100%", borderRadius: 5, border: "1px solid silver" }}>
          <div style={{
            display: "flex", justifyContent: "space-between", color: "white", fontWeight: "bold",
            fontSize: 18, fontStyle: 'oblique', alignItems: "center"
          }}
          >
            {this.props.title}
            <C_Icon action={() => this.props.onClick()} style={{ cursor: "pointer", fontSize: 25, color: "white", }} icon={this.props.icon}
            />
          </div>
        </div>
        <div className="slideInDown">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default C_ExpansiveHeader;