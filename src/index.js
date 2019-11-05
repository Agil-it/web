import React, { Component } from "react";
import ReactDOM from 'react-dom';
import './index.css';
import C_Menu from './components/Menu';
import Login from './login/Login'
import ShowCards from './ShowCards';
import WebFontLoader from 'webfontloader';
import CreateMachineType from './crud/MachineType';

WebFontLoader.load({
    google: {
        families: ['Roboto:300,400,500,700', 'Material Icons'],
    },
});

ReactDOM.render(
    <div>
       <C_Menu>
       </C_Menu> 
        <ShowCards
        />
        {/* <CreateMachineType/> */}
    </div>,
    document.getElementById('root')
);

