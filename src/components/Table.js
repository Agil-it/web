import React, { PureComponent } from 'react';
import {DataTable,TableHeader,TableBody,TableRow,TableColumn,TablePagination} from 'react-md';
import '../index.css';
import { ObjectHelper } from "../helpers/Object"
import {C_Icon} from "./Icon";

import C_TextField from './TextField';

export class C_Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fontSize: this.props.fontSize,
      titleSize: this.props.titleSize,
      content: this.props.content,
      columns: this.props.columns,
      hasFilter: this.props.hasFilter,
      showPagination: this.props.showPagination,
      showEffect: this.props.showEffect,
      filter: '',
      paginatedData: [],
      textAlign: this.props.textAlign,
      pagination: 0,
      rowsPerPage: this.props.rowsPerPage,
      currentRowsPerPage: this.props.rowsPerPage || this.props.content.length,
    }

    
    this.handlePagination = this.handlePagination.bind(this);
  }

  componentDidUpdate() {
    let { content, rowsPerPage, paginatedData, currentRowsPerPage } = this.state;
   
    if (paginatedData.length || content.length == 0) return;
    
    if (this.state.showPagination) {
      if (!rowsPerPage) return;
      
      currentRowsPerPage = rowsPerPage
      paginatedData = this.filterData().slice(0, currentRowsPerPage);

    } else paginatedData = this.filterData();
    
    this.setState({ paginatedData, currentRowsPerPage });
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  filterData() {
    const { content, filter } = this.state;

    if(!filter || filter == '') return content;

    const filtered = content.filter(field => this.filterField(field, filter))

    return filtered;
  }

  filterField(field, filter) {

    if (!field) return false

    if (typeof field === "object" && field != null) {

      let isValid = false;
      const entries = Object.entries(field)

      for (let [key, value] of entries) {
        isValid = this.filterField(value, filter)
        if (isValid) break;
      }

      return isValid;
      
    } else return this.filterValue(field.toString(), filter.toString());
    
  }

  filterValue(contentRaw, filterRaw) {
    const content = contentRaw.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    const filter = filterRaw.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    if (content == "") return false;
    if (filter == "") return false;
    
    return (
      content.includes(filter) ||
      filter.includes(content)
    );
  }

  getPaginatedData() {
    const { pagination, currentRowsPerPage } = this.state;
    return this.filterData().slice(pagination, pagination + currentRowsPerPage)
  }

  getValueProperty(object = {}, {property = "", defaultValue = "", format} = {}){
    let value = ObjectHelper.getPropertys(object, property, defaultValue)

    if(value == defaultValue) return value;

    if(typeof format == "function") value = format(value);

    return value
  }

  handlePagination = (start, rowsPerPage) => {
    this.setState({ pagination: start, currentRowsPerPage: rowsPerPage })
  };

  render() {
    
    var columns = this.state.columns;
    var content = this.getPaginatedData();

    var defaultStyleRows = {
      textAlign: this.state.textAlign ? this.state.textAlign : "left",
      fontSize: this.state.fontSize ? this.state.fontSize : 16,
    }

    return (
      <div style={{ border: "1px solid silver", borderRadius: 5 }}>
        <DataTable style={{}} baseId="simple-pagination">
          <TableHeader>
            <TableRow selectable={false}>
              {columns && columns.map((colum) => (
                <TableColumn
                  style={{ 
                    color: "black", 
                    textAlign: this.state.textAlign ? this.state.textAlign : "left", 
                    fontSize: this.state.titleSize ? this.state.titleSize : 20
                  }}
                  key={colum.name || ""}
                >
                  {colum.name ? colum.name : ""}
                </TableColumn>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {content && content.map((content, i) => (
              <TableRow key={i} style={{ cursor: "pointer" }} onClick={() => this.props.onClick(content)} className={this.state.showEffect ? "effectfrontSmall" : ""} key={content.id} selectable={false}>
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
          {this.state.showPagination
            ? <div style={{ position: "relative", className: "md-grid" }}>
                { this.state.hasFilter ?
                  <div style={{ position: "absolute", bottom: 0, left: 10, width: 500 }}>
                    <C_TextField
                      id="filter"
                      name="filter"
                      value={this.state.filter}
                      onChange={(e) => this.setState({ filter: e.target.value })}
                      type="text"
                      placeholder="Filtrar tabela"
                    />
                  </div>
                : undefined
                }
                <TablePagination
                  rows={this.state.content.length}
                  rowsPerPage={this.state.rowsPerPage}
                  rowsPerPageLabel={'Linhas'}
                  onPagination={this.handlePagination}
                />
              </div>
            : undefined
          }
        </DataTable>
        
        { this.state.hasFilter && !this.state.showPagination ?
          <div style={{width: "95%", margin: "0 auto"}}>
            <C_TextField
              id="filter"
              name="filter"
              value={this.state.filter}
              onChange={(e) => this.setState({ filter: e.target.value })}
              type="text"
              placeholder="Filtrar tabela"
            />
          </div>
        : undefined
        }
      </div>
    );
  }
}