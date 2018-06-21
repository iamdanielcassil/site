import React from 'react';
import foundations from 'foundations/*.js';
import actions from 'actions/*.js';
import 'layouts/mngold/mngold.css';

class Main extends React.Component {
	render() {
		let Layout = actions.layouts.getDefaultLayout(this.props.layoutKey);
		return (
			<div className="MNG-main--wrapper">
				<Layout />
			</div>
		);
	}
}

export default foundations.store.subscribe(Main, {
});

