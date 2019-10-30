import React, { Component } from "react";
import ReactDOM from 'react-dom';
import './index.css';
import C_Menu from '../src/components/Menu';
import WebFontLoader from 'webfontloader';

WebFontLoader.load({
    google: {
        families: ['Roboto:300,400,500,700', 'Material Icons'],
    },
});

ReactDOM.render(
    <C_Menu
    />,
    document.getElementById('root')
);

