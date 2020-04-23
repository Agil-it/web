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

export class C_Table extends React.Component {
    constructor(props) {
        super(props);
        console.log("C_Table -> constructor -> props", this.props)


        this.state = {
            columns : this.props.columns,
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
            fontSize:16,
        }
        console.log("C_Table -> render -> columns", columns);

        return (
            <div style={{border:"1px solid silver", borderRadius:5}}>
                <DataTable style={{}} baseId="simple-pagination">
                    <TableHeader>
                        <TableRow selectable={false}>
                            {columns && columns.map((colum) => (
                                <TableColumn grow={true} style={{color:"black", textAlign: "left", fontSize: 22 }}>{colum.name ? colum.name : ""}</TableColumn>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {content && content.map((content) => (
                            <TableRow key={content.id} selectable={false}>
                                <TableColumn header={true} grow={true} style={defaultStyleRows}>{content.OpenDate ? content.OpenDate : ""}</TableColumn>
                                <TableColumn header={true} grow={true} style={defaultStyleRows}>{content.OrderNumber ? content.OrderNumber : ""}</TableColumn>
                                <TableColumn header={true} grow={true} style={defaultStyleRows}>{content.Type ? content.Type : ""}</TableColumn>
                                <TableColumn header={true} grow={true} style={defaultStyleRows}>{content.Equipment ? content.Equipment : ""}</TableColumn>
                                <TableColumn header={true} grow={true} style={defaultStyleRows}> {content.Priority ? content.Priority : ""}</TableColumn>
                                <TableColumn header={true} grow={true} style={defaultStyleRows}> {content.Status ? content.Status : ""}</TableColumn>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TablePagination rows={1} rowsPerPageLabel={1} onPagination={this.handlePagination} />
                </DataTable>
            </div>
        );
    }
}