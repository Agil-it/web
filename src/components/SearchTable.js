import React, { Component } from 'react';
import '../index.css';

import { C_Table } from './Table';

class C_SearchTable extends Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);

  }

  onClick(event) {

    if (this.props.onClick)
      this.props.onClick(event);
  }

  render() {

    return (
      <div>
        <C_Table
          columns={this.props.columns}
          content={this.props.content}
          onClick={this.onClick}
          showEffect={true}
        >
        </C_Table>
      </div>
    );
  }
}

export default C_SearchTable;