import React, { PureComponent } from 'react';
import {DataTable,TableHeader,TableBody,TableRow,TableColumn,TablePagination} from 'react-md';
import '../index.css';
import { ObjectHelper } from "../helpers/Object"
import {C_Icon} from "./Icon";


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

  getValueProperty(object = {}, {property = "", defaultValue = "", format} = {}){
    let value = ObjectHelper.getPropertys(object, property, defaultValue)

    if(value == defaultValue) return value;

    if(typeof format == "function") value = format(value);

    return value
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
      textAlign: this.props.textAlign ? this.props.textAlign : "left",
      fontSize: 16,
    }

    return (
      <div style={{ border: "1px solid silver", borderRadius: 5 }}>
        <DataTable style={{}} baseId="simple-pagination">
          <TableHeader>
            <TableRow selectable={false}>
              {columns && columns.map((colum) => (
                <TableColumn style={{ color: "black", textAlign: this.props.textAlign ? this.props.textAlign : "left", fontSize: 20 }}>{colum.name ? colum.name : ""}</TableColumn>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {content && content.map((content, i) => (
              <TableRow style={{ cursor: "pointer" }} onClick={() => this.props.onClick(content)} className={this.props.showEffect ? "effectfrontSmall" : ""} key={content.id} selectable={false}>
                {columns && columns.map((colum) => (
                  <TableColumn header={true} style={defaultStyleRows}>
                    {colum.icon ? 
                      <C_Icon icon={colum.icon} action={() => colum.action(i)}/>
                      : this.getValueProperty(content, colum)
                    }
                  </TableColumn>
                ))}
              </TableRow>
            ))}
          </TableBody>
          {this.props.showPagination ? <TablePagination rows={1} rowsPerPageLabel={1} onPagination={this.handlePagination} /> : undefined }
        </DataTable>
      </div>
    );
  }
}