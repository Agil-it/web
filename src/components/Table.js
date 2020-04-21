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
        console.log("C_Table -> render -> columns", columns);

        return (
            <DataTable fullWidth={true} 
                baseId="simple-pagination"
                fixedFooter={true}
            >
                <TableHeader>
                    <TableRow selectable={false}>
                        {columns && columns.map((colum) => (
                            <TableColumn style={columStyle}>{colum.name}</TableColumn>
                        ))   
                        }
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow selectable={false}>
                        {content && content.map((content) => (
                            <TableColumn style={this.props.style}>{content.id}</TableColumn>
                        ))
                        }
                    </TableRow>
                </TableBody>
                <TablePagination rows={1} rowsPerPageLabel={1} />
            </DataTable>
        );
    }
}