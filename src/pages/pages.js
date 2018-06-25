import React from 'react';
import foundations from 'foundations/*.js';
import actions from 'actions/*.js';
import Loading from 'pages/loading/loading';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { Switch } from 'react-router';

class Main extends React.Component {
	componentDidMount() {
		actions.pages.fetchAppPages();
	}
	renderPage(pages) {
		return (
			<Switch>
				{pages.map(page => { 
						return <Route key={page.path} exact path={page.path} component={actions.pages.getPageComponentByPath(page.path)} /> 
					})}
					<Route path="/" component={pages['404'] } /> 
				</Switch>
		);
	}
	renderLoading() {
		return (<Route key="loading" path="/" component={Loading} />)
	}
	render() {
		let pages = this.props.pages;
		let componenetToRender = pages.isLoading ? this.renderLoading() : this.renderPage(pages.data);

		return (
			<div className="main-wrapper">
			 {componenetToRender}
			</div>
		);
	}
}

export default foundations.store.subscribe(Main, {
	pages: 'pages.app',
	screen: 'pages.selectedPath',
	layoutKey: 'layouts.selected',
});

