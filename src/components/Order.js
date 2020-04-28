import React, { PureComponent } from 'react';
import Button from 'react-md/lib/Buttons/Button';
import '../index.css';
import {C_ButtonFloat, C_MenuButton} from "./Button";
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
            <div style={{ width: "100%", marginTop: 20 }}>
                <div style={{ display:"flex", justifyContent: "space-between", width: "95%", margin:"auto" }}>
                    <C_ButtonFloat
                        icon={"keyboard_backspace"}
                        tooltipLabel={"Voltar"}
                        tooltipPosition="right"
                        style={{ width: 54, height: 54 }}
                        iconSize={27}
                        secondary
                        action={() => this.props.onClose()}
                    />
                    <h1 style={{ fontSize: "3em", fontWeight: "bold" }}>{order.OrderNumber}</h1>
                    <C_MenuButton 
                        icon="settings" 
                        options={[{name:"Assumir Ordem", icon:"home"}]}
                    />
                    {/* <C_ButtonFloat
                        icon={"settings"}
                        tooltipLabel={"Configurações"}
                        style={{ width: 54, height: 54 }}
                        iconSize={27}
                        tooltipPosition="left"
                        secondary
                        action={() => this.props.onClick()}
                    /> */}
                </div>
            </div>
        );
    } 
}