import React from 'react';
import foundations from 'foundations/*.js';
import actions from 'actions/*.js';
import styles from 'layouts/midnight/midnight.css';
import Top from 'layouts/midnight/midnightTop.js';
import Body from 'layouts/midnight/midnightBody.js';
import Footer from 'layouts/midnight/midnightFooter.js';

class Test extends React.Component {
	constructor() {
		super();

		this.top = Top;
		this.body = Body;
		this.footer = Footer;
	}
	render() {
		return (
			<div className={styles.wrapper}>
				<Top />
				<Body />
				<Footer />
			</div>
		);
	}
}

export default foundations.store.subscribe(Test, {
});

