import React from 'react';
import foundations from 'foundations/*.js';
import actions from 'actions/*.js';
import 'screens/main/main.css';

class Main extends React.Component {
	render() {
		let Layout = actions.layouts.getLayoutByName(this.props.layoutKey);
		return (
			<div className="MNG-main--wrapper">
				<Layout />
			</div>
		);
	}
}

export default foundations.store.subscribe(Main, {
	layoutKey: 'layouts.selected',
});

