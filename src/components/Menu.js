import React, { Component } from 'react';
import { FontIcon } from 'react-md';
import '../index.css';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { Route, BrowserRouter } from 'react-router-dom'
import styled from 'styled-components';
import Dashboard from '../Dashboard'
import ShowCards from '../ShowCards'
import Logout from '../login/Logout'

const Main = styled.main`
  position: relative;
  overflow: hidden;
  transition: all .15s;
  margin-left: ${props => (props.expanded ? 240 : 64)}px;
`;
class C_Menu extends Component {

  constructor() {
    super();

    this.state = {
      selected: 'create',
      expanded: false
    };

    this.onSelect = this.onSelect.bind(this);
    this.onToggle = this.onToggle.bind(this);

  }
  
  onSelect = (selected) => {
    this.setState({ selected: selected });
  };

  onToggle = (expanded) => {
    this.setState({ expanded: expanded });
  };

  renderSelectedItem() {
    const { selected } = this.state;

    if (selected == 'home') {
      return (<Dashboard/>)
    } else if(selected == 'create') {
      return (<ShowCards/>)
    } else if(selected == 'logout') {
      return (<Logout logout={this.props.onLogout} />)
    } else {
      return(<p>Item {selected} not found 🤔</p>)
    }

  }
  render() {

    const { expanded, selected } = this.state;

    let menuItens = [
      {
        name: 'Monitor',
        icon: 'dvr',
        key: 'home'
      },
      {
        name: 'Cadastros',
        icon: 'edit',
        key: 'create'
      },
      {
        name: 'Relatórios',
        icon: 'description',
        key: 'reports'
      },
      {
        name: 'Configurações',
        icon: 'settings_applications',
        key: 'config'
      },
      {
        name: 'Notificações',
        icon: 'notifications',
        key: 'notification',
      },
      {
        name: 'Sair',
        icon: 'reply',
        key: 'logout'
      }
    ]

    let menu = menuItens.map((menuItem, key) =>
      <NavItem key={key} eventKey={menuItem.key} style={{ marginTop: 40 }}>
        <NavIcon>
          <FontIcon style={{ fontSize: 35, marginTop: "10%" }}>{menuItem.icon}</FontIcon>
        </NavIcon>
        <NavText style={{ fontSize: 20, float: "right", width: "75%" }}>
          {menuItem.name}
        </NavText>
      </NavItem>
    );

    return (
      <div>
        <div style={{
          marginLeft: expanded ? 240 : 64,
          paddingRight: '20px'
        }}/>
        <BrowserRouter>
          <Route render={({ location, history }) => (
            <React.Fragment>
              <SideNav onSelect={this.onSelect} onToggle={this.onToggle} style={{position:"fixed"}}>
                <SideNav.Toggle />
                <SideNav.Nav selected={selected}>
                  {menu}
                </SideNav.Nav>
              </SideNav>
              <Main expanded={expanded}>
                {this.renderSelectedItem()}
              </Main>
            </React.Fragment>
          )} />
        </BrowserRouter>
      </div>
    );
  }
}

export default C_Menu;