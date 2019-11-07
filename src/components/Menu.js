import React, { Component } from 'react';
import { FontIcon } from 'react-md';
import '../index.css';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { Route, BrowserRouter  } from 'react-router-dom'
import C_Button from './Button';

class C_Menu extends Component {


    render() {

        let menuItens = [
            {
                name:'Monitor',
                icon:'dvr',
                route:'orders',
                key:'home'
            },
            {
                name:'Cadastros',
                icon:'edit',
                route:'',
                key:'create'
            },
            {
                name:'Relatórios',
                icon:'description',
                route:'',
                key: 'reports'
            },
            {
                name:'Configurações',
                icon:'settings_applications',
                route:'',
                key:'config'
            },
            {
                name:'Notificações',
                icon:'notifications',
                route:'',
                key:'notification',
            },
            {
                name:'Sair',
                icon:'reply',
                route:'',
                key:'logout',
            }
        ]

        let menu = menuItens.map((menuItem,key) => 
            <NavItem eventKey={key} style={{marginTop:60}}>
                <NavIcon>
                    <FontIcon style={{fontSize:35, marginTop:"10%"}}>{menuItem.icon}</FontIcon>
                </NavIcon>
                <NavText style={{fontSize:20,float:"right", width:"75%"}}>
                    {menuItem.name}
                </NavText>
            </NavItem>
        );

      return (

        <BrowserRouter>
            <Route render={({ location, history }) => (
                <React.Fragment>
                    <SideNav style={{position:"fixed"}}>   
                        <SideNav.Toggle />
                        <SideNav.Nav defaultSelected="monitor">
                            {menu}
                        </SideNav.Nav>
                    </SideNav>
                    {/* <main>
                        <Route path="/" exact component={props => <C_Button/>} />
                        <Route path="/create" component={props => <C_Button />} />
                        <Route path="/reports" component={props => <C_Button />} />
                    </main> */}
                </React.Fragment>
            )}/>
        </BrowserRouter>  
      );
    }
}

export default C_Menu;