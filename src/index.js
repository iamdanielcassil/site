import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import style from "./index.css";
import Pages from "pages/pages";
import actions from 'actions/';

let CMS = window.CMS || {}
let CONFIG = window.cms_config || {}

actions.smtConnect.initApp(CMS, CONFIG);

ReactDOM.render((<Router><Pages /></Router>), document.getElementById("index"));