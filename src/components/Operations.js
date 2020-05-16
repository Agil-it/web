import { Card, CardTitle, CardText, Avatar } from 'react-md';
import React, { Component } from 'react';
import '../index.css';

class C_Operations extends Component {

  render() {
    return (
      <Card
        style={this.props.style}
        className={this.props.className}
        onClick={this.props.onClick}
        onMouseLeave={this.props.onMouseLeave}
      >
        <div>
          <h3>{this.props.title}</h3>
        </div>
      </Card>
    );
  }
}

export default C_Operations;