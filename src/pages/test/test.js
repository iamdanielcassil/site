import React from 'react';
import foundations from 'foundations/*.js';
import actions from 'actions/*.js';
import 'pages/test/test.css';

class Test extends React.Component {
	render() {
		return (
			<div className="main-wrapper">
				llama poo
			</div>
		);
	}
}

export default foundations.store.subscribe(Test, {
});

