import React from 'react';
import foundations from 'foundations/';
import actions from 'actions/';
import styles from 'components/smt/content-area/content-area.css';

class Test extends React.Component {
	render() {
		return (
			<div data-cms-area={this.props.area}>
				{actions.app.contents.getAreaContent(this.props.area).map(content => <Content content={content} />)}
			</div>
		);
	}
}

export default foundations.store.subscribe(Test, {
});

