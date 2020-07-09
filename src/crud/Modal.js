import React, { PureComponent } from 'react';
import { Card } from 'react-md';
import '../index.css';
import { C_Icon } from '../components/Icon';
// import './Button.css';

export class C_Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <Card style={this.props.style}>
        <div>
          <div style={{ position: "relative" }}>
            <div>
              <C_Icon
                style={{ cursor: "pointer", position: "absolute", right: 0 }}
                icon="close" iconSize={25}
                action={() => this.props.onClose()}
              />
            </div>
            <div>
              <span style={{ fontSize: this.props.titleSize ? this.props.titleSize : 24, fontWeight: "bold" }}>
                {this.props.title}
              </span>
            </div>
          </div>
          {this.props.children}
        </div>
      </Card>
    );
  }
}

