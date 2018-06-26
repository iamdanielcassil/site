import React from 'react';
import foundations from 'foundations/';
import actions from 'actions/';
import ContentArea from 'components/smt/content-area/content-area';
import styles from 'layouts/midnight/midnight.css';

class Test extends React.Component {
	render() {
		return (
			<div className="MNG--midnight-body">
				<ContentArea area="main" contents={this.props.contents}/>
			</div>
		);
	}
}

export default foundations.store.subscribe(Test, {
	contents: 'app.contents.data',
});

