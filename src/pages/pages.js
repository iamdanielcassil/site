import React from 'react';
import foundations from 'foundations/*.js';
import actions from 'actions/*.js';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { Switch } from 'react-router';

class Main extends React.Component {
	render() {
		// let Screeen = actions.screens.getScreenByName(this.props.screen);
		let pages = actions.pages.getAll();
		return (
			<div className="main-wrapper">
				{/* <Screeen layoutKey={this.props.layoutKey} /> */}
				<Switch>
					{pages.map(page => { 
						return <Route key={page.path} exact path={page.path} component={page.component} /> 
					})}
					<Route path="/" component={pages['404'] } /> 
				</Switch>
			</div>
		);
	}
}

export default foundations.store.subscribe(Main, {
	screen: 'pages.selectedPath',
	layoutKey: 'layouts.selected',
});

