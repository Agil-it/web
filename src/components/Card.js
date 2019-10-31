
import { Card, CardTitle, CardText, Avatar } from 'react-md';
import React, { Component } from 'react';

class C_Card extends Component {

    render() {
      return (
        <Card style={this.props.style}>
            
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