import React from 'react';
import foundations from 'foundations/';
import actions from 'actions/';
import styles from 'components/navigation/navigation.css';

class Test extends React.Component {
	render() {
		return (
			<div className={styles.wrapper} id="main-nav">
				{this.props.navigationList.map(nav => <span key={nav.path+nav.name} className={styles.listItem}>
					<a href={`#${nav.path}`}>{nav.name}</a>
				</span>)}
			</div>
		);
	}
}

export default foundations.store.subscribe(Test, {
	navigationList: 'app.navigation'
});

