import React, { PureComponent } from 'react';
import Button from 'react-md/lib/Buttons/Button';
import { SVGIcon } from 'react-md';
import '../index.css';
// import './Button.css';

export class C_MaintenanceOrder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            order: this.props.order
        }

        console.log("C_MaintenanceOrder -> render -> this.state", this.state)
    }

    render() {

        var order = this.state.order;

        return (
            <div id="order">
                <h1 style={{ width: "100%", fontWeight: "bold" }}>{order.Type}</h1>
            </div>
        );
    } 
}