import React from 'react';
import foundations from 'foundations/';
import actions from 'actions/';
import styles from 'layouts/midnight/midnight.css';

class Test extends React.Component {
	render() {
		return (
			<div className="MNG--midnight-footer">

			</div>
		);
	}
}

export default foundations.store.subscribe(Test, {
});

