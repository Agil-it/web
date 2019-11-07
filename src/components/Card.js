
import { Card, CardTitle, CardText, Avatar } from 'react-md';
import React, { Component } from 'react';
import '../index.css';

class C_Card extends Component {

    render() {
      return (
        <Card 
          style={this.props.style}
          className={this.props.className} 
          onClick={this.props.onClick}
          onMouseLeave={this.props.onMouseLeave}>
            <CardTitle
             title={this.props.title} 
             subtitle={this.props.subtitle} 
             avatar={<Avatar contentStyle={this.props.avatarStyle} icon={this.props.icon} role="presentation" />}
            />
        </Card>
      );
    }
}
  
export default C_Card;