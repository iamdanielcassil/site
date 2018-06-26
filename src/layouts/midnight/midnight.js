import React from 'react';
import foundations from 'foundations/';
import actions from 'actions/';
import styles from 'layouts/midnight/midnight.css';
import Top from 'layouts/midnight/midnightTop.js';
import Body from 'layouts/midnight/midnightBody.js';
import Footer from 'layouts/midnight/midnightFooter.js';

const render = () => {
	return (
		<div className={styles.wrapper}>
			<Top />
			<Body />
			<Footer />
		</div>
	);
};

const renderTop = () => {
	return <Top />;
};

const renderBody = () => {
	return <Body />;
};

const renderFooter = () => {
	return <Footer />;
};

module.exports = {
	render,
	renderTop,
	renderBody,
	renderFooter,
}
