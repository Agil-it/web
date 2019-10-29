import React, { Component } from "react";
import ReactDOM from 'react-dom';
import './index.css';
import Login from './login/Login';
import WebFontLoader from 'webfontloader';

WebFontLoader.load({
    google: {
        families: ['Roboto:300,400,500,700', 'Material Icons'],
    },
});

ReactDOM.render(
    <Login
    />, 
    document.getElementById('root')
);

