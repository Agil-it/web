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

        var defaultStyleColumns = {
            border: "1px solid silver",
            textAlign: "left",
            padding: 8,
            width: this.props.widthColumns ? this.props.widthColumns : 300,
            fontSize:15,
        }
        console.log("C_Table -> render -> columns", columns);

        return (
            <div style={{border:"1px solid black", borderRadius: 5}}>
                <table style={defaultStyleTable}>
                    <tr>
                        {columns && columns.map((colum) => (
                            <th style={defaultStyleColumns}>{colum.name ? colum.name : ""}</th>
                        ))}
                    </tr>
 
                    {content && content.map((content) => (
                        <tr style={{ }}>
                            <td style={defaultStyleColumns}>{content.OpenDate ? content.OpenDate : ""}</td>
                            <td style={defaultStyleColumns}>{content.OrderNumber ? content.OrderNumber : ""}</td>
                            <td style={defaultStyleColumns}>{content.Type ? content.Type : ""}</td>
                            <td style={defaultStyleColumns}>{content.Equipment ? content.Equipment : ""}</td>
                            <td style={defaultStyleColumns}>{content.Priority ? content.Priority : ""}</td>
                        </tr>
                    ))}
                </table>
            </div>
        );
    }
}