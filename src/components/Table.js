import React, { PureComponent } from 'react';
import {
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  TablePagination,
} from 'react-md';
import '../index.css';
import { MaintenanceOrderHelper as HelperOM } from "../helpers/MaintenanceOrder"
import { DateHelper } from "../helpers/Date"


export class C_Table extends React.Component {
  constructor(props) {
    super(props);
    console.log("C_Table -> constructor -> props", this.props)


    this.state = {
      columns: this.props.columns,
      columStyle: this.props.style ? this.props.style : undefined,
      content: this.props.content,
    }
  }


  render() {
    var columns = this.state.columns;
    var columStyle = this.state.columStyle ? this.state.columStyle : {}
    var content = this.state.content

    var defaultStyleTable = {
      fontFamily: "arial, sans-serif",
      borderCollapse: "collapse",
      width: "100%"
    }

    var defaultStyleRows = {
      textAlign: "left",
      fontSize: 16,
    }
    console.log("C_Table -> render -> columns", columns);

    return (
      <div style={{ border: "1px solid silver", borderRadius: 5 }}>
        <DataTable style={{}} baseId="simple-pagination">
          <TableHeader>
            <TableRow selectable={false}>
              {columns && columns.map((colum) => (
                <TableColumn style={{ color: "black", textAlign: "left", fontSize: 20 }}>{colum.name ? colum.name : ""}</TableColumn>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {content && content.map((content) => (
              <TableRow style={{ cursor: "pointer" }} onClick={() => this.props.onClick(content)} className={"effectfrontSmall"} key={content.id} selectable={false}>
                <TableColumn header={true} style={defaultStyleRows}>{DateHelper.formatDate(content.openedDate)}</TableColumn>
                <TableColumn header={true} style={defaultStyleRows}>{content.orderNumber ? content.orderNumber : ""}</TableColumn>
                <TableColumn header={true} style={defaultStyleRows}>{content.orderLayout.description ? content.orderLayout.description : ""}</TableColumn>
                <TableColumn header={true} style={defaultStyleRows}>{content.orderEquipment[0].equipment.description ? content.orderEquipment[0].equipment.description : ""}</TableColumn>
                <TableColumn header={true} style={defaultStyleRows}> {HelperOM.translate("priority", content.priority)}</TableColumn>
                <TableColumn header={true} style={defaultStyleRows}> {HelperOM.translate("status", content.orderStatus)}</TableColumn>
              </TableRow>
            ))}
          </TableBody>
          <TablePagination rows={1} rowsPerPageLabel={1} onPagination={this.handlePagination} />
        </DataTable>
      </div>
    );
  }
}