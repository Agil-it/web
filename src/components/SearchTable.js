import React, { Component } from 'react';
import '../index.css';

import { C_Table } from './Table';

class C_SearchTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      height: 0,
      rowsPerPage: 0,
    }

    this.onClick = this.onClick.bind(this);

  }

  onClick(event) {
    if (this.props.onClick)
      this.props.onClick(event);

    if (this.props.extraFunction)
      this.props.extraFunction();
  }

  componentDidMount() {
    const height = document.getElementById('searchTable').clientHeight;

    const rowsPerPage = Math.round(height/60)-2;

    this.setState({ height, rowsPerPage });
  }

  render() {

    return (
      <div id = "searchTable" style={{ backgroundColor: "white", minWidth: 400, width: "65vw", minHeight: 500, height: "76vh", borderRadius: 5 }}>
        <C_Table
          columns={this.props.columns}
          content={this.props.content}
          onClick={this.onClick}
          showEffect={true}
          showPagination={true}
          rowsPerPage={this.state.rowsPerPage}
          hasFilter={true}
          filterPadding={true}
        >
        </C_Table>
      </div>
    );
  }
}

export default C_SearchTable;