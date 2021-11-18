import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";

import './assets/index.css';
import "antd/dist/antd.less";
import reportWebVitals from './reportWebVitals';
import App from "./App";
import './util/traductor';

import {ConfigProvider} from 'antd';
import esEs from 'antd/lib/locale/es_ES';

ReactDOM.render(
    <BrowserRouter>
        <ConfigProvider locale={esEs}>
            <App/>
        </ConfigProvider>
    </BrowserRouter>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();





