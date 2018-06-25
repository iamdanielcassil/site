import React from 'react';
import foundations from 'foundations/*.js';
import actions from 'actions/*.js';
import 'pages/loading/loading.css';

class Main extends React.Component {
	render() {
		let Layout = actions.layouts.getLayoutPieceByName(this.props.layoutKey, 'top');
		return (
			<div className="MNG-main--wrapper">
				<Layout />
				loading
			</div>
		);
	}
}

export default foundations.store.subscribe(Main, {
	layoutKey: 'layouts.selected',
});

