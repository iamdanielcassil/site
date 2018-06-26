import React from 'react';
import foundations from 'foundations/';
import actions from 'actions/';
import Loading from 'pages/loading/loading';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { Switch } from 'react-router';
import styles from 'pages/pages.css'

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
					<Route path="/" component={pages['/404'] } /> 
				</Switch>
		);
	}
	renderLoading() {
		return (<Route key="loading" path="/" component={Loading} isLoading="true" />)
	}
	render() {
		let appPages = this.props.appPages;
		let SMTPages = this.props.SMTPages;
		let pagesData = [].concat(appPages.data).concat(SMTPages.data);
		let isLoading = appPages.isLoading || SMTPages.isLoading;
		let componenetToRender = isLoading ? this.renderLoading() : this.renderPage(pagesData);

		return (
			<div className={styles.wrapper}>
			 {componenetToRender}
			</div>
		);
	}
}

export default foundations.store.subscribe(Main, {
	appPages: 'pages.app',
	SMTPages: 'pages.smt',
	screen: 'pages.selectedPath',
	layoutKey: 'layouts.selected',
});

