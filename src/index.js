import React, { Component } from "react";
import ReactDOM from 'react-dom';
import './index.css';
// import './index.scss';
import WebFontLoader from 'webfontloader';
import App from './app'

WebFontLoader.load({
    google: {
        families: ['Roboto:300,400,500,700', 'Material Icons'],
    },
});

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

