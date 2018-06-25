import React from 'react';
import foundations from 'foundations/*.js';
import actions from 'actions/*.js';
import 'pages/test/test.css';

class Test extends React.Component {
	render() {
		let Layout = actions.layouts.getLayoutByName(this.props.layoutKey);
		return (
			<div className="MNG-main--wrapper">
				<Layout />
			</div>
		);
	}
}

export default foundations.store.subscribe(Test, {
	layoutKey: 'layouts.selected',
});

