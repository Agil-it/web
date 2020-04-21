import React, { Component } from 'react';
import {C_Button} from '../components/Button';
import '../index.css';

class C_CrudButtons extends Component {

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10%" }}>
        <div>
          <C_Button
            secondary={true}
            label={"Deletar"}
            disabled={!this.props.crudLevel}
            action={this.props.onDelete}
          />
        </div>
        <div>
          <C_Button
            secondary={true}
            label={"Limpar"}
            action={this.props.onClean}
          />
          <C_Button
            style={{ marginLeft: 20 }}
            primary={true}
            label={"Salvar"}
            action={this.props.onSave}
          />
        </div>
      </div>
    );
  }
}

export default C_CrudButtons;