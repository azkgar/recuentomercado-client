import React from 'react';
import ReactDOM from 'react-dom';
import "antd/dist/antd.css"
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "./fonts/Objektiv Mk1 W03 Black.ttf";
import "./fonts/Objektiv Mk1 W03 Regular.ttf";
import "./fonts/Objektiv Mk1 W03 XBold.ttf";

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
