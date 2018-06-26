import React from 'react';
import foundations from 'foundations/';
import actions from 'actions/';
import styles from 'components/smt/content-area/content-area.css';

class Content extends React.Component {
	render() {
		let content = this.props.content;
		return (
			<div className={`cms-content cms-content-${content.type} cms-content-selector-${content.type}-${content.id}`}/>
		);
	}
}

export default foundations.store.subscribe(Content, {
});

