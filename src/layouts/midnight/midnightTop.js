import React from 'react';
import foundations from 'foundations/*';
import actions from 'actions/*';
import Navigation from 'components/navigation/navigation'
import styles from 'layouts/midnight/midnight.css';

class Component extends React.Component {
	render() {
		return (
			<div className={styles.top}>
				<div className={styles.topHeader}>
						<div className={styles.topHeaderSection}>
							<a href="/">
								<img src="assets/img/advlogo.png" />
							</a>
						</div>
						<div className={styles.topHeaderSection}>
							<div data-cms-area="header" data-cms-area-filters="global"></div>
						</div>
					</div>
					<Navigation />
				</div>
		);
	}
}

export default foundations.store.subscribe(Component, {
});

