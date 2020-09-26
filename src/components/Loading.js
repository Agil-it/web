import React, { PureComponent } from 'react';
// import Button from 'react-md/lib/Buttons/Button';
import { CircularProgress } from 'react-md';
import '../index.css';

export class C_Loading extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <CircularProgress
          id={`CircularProgress-${new Date().getTime()}`}
          scale={this.props.scale ? this.props.scale : 2}
        />
        {this.props.footer ?
          <span style={{ textAlign: "center", fontSize: 17, fontWeight: "bold" }}>{this.props.message ? this.props.message : "Carregando..."}</span>
        : undefined}
        
      </div>
      
    );
  }
}
