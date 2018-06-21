import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import style from "./index.css";
import Pages from "pages/pages";
import actions from 'actions/*.js';

const Index = () => {
	return <div><Pages /></div>;
	
};

ReactDOM.render((<Router><Index /></Router>), document.getElementById("index"));