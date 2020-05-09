import React, { Component } from 'react';
import {C_Button} from '../components/Button';
import '../index.css';

class C_CrudButtons extends Component {

  render() {
    return (
      <div className="md-grid">
        <div className="md-cell md-cell--6 md-cell--bottom">
          <C_Button
            secondary={true}
            label={"Deletar"}
            disabled={!this.props.crudLevel}
            action={this.props.onDelete}
            style={{width:"70%"}}
          />
        </div>
        <div className="md-cell md-cell--3 md-cell--bottom">
          <C_Button
            secondary={true}
            label={"Limpar"}
            action={this.props.onClean}
            style={{ width: "100%" }}
          />
        </div>
        <div className="md-cell md-cell--3 md-cell--bottom">
          <C_Button
            // style={{ marginLeft: 20 }}
            primary={true}
            label={"Salvar"}
            action={this.props.onSave}
            style={{ width: "100%" }}
          />
        </div>
      </div>
    );
  }
}

export default C_CrudButtons;