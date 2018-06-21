import React from 'react';
import foundations from 'foundations/*.js';
import actions from 'actions/*.js';
import styles from 'layouts/midnight/midnight.css';

class Test extends React.Component {
	render() {
		return (
			<div className="MNG--midnight-body">

			</div>
		);
	}
}

export default foundations.store.subscribe(Test, {
});

