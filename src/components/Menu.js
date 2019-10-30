import React, { Component } from 'react';
import {  
    FontIcon,
    AccessibleFakeButton,
    IconSeparator,
    DropdownMenu, 
} from 'react-md';
import '../index.css';

class C_Menu extends Component {
    render() {
      return (
        <DropdownMenu
            id={"avatar-dropdown-menu"}
            menuItems={['Ordem Manutenção', 'Cadastros', 'Relatórios', 'Configurações', { divider: true }, 'Sair']}
            anchor={{
            x: DropdownMenu.HorizontalAnchors.CENTER,
            y: DropdownMenu.VerticalAnchors.OVERLAP,
            }}
            position={DropdownMenu.Positions.TOP_LEFT}
            animationPosition="below"
            block={false}
        >
            <AccessibleFakeButton>
                <FontIcon>home</FontIcon>
            </AccessibleFakeButton>
        </DropdownMenu>
        
      );
    }
}

export default C_Menu;