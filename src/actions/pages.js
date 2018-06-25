import foundations from 'foundations/*.js';
import main from 'pages/main/main';
import test from 'pages/test/test';

const store = foundations.store;

// temp pages
const pages = [
	{path: '/'},
	{path: '/main'},
	{path: '/test'},
	{path: '/404'},
];

function getAppPages() {
	return store.get('pages.app');
}

function fetchAppPages() {
	let pagesPromise = new Promise((resolve, reject) => {
		window.setTimeout(() => {
			resolve(pages)
		}, 2000)
	});

	store.asyncSet('pages.app', pagesPromise)
}

function getPageComponentByPath(path) {
	switch (path) {
		case '/':
			return main
			break;
		case '/main':
			return main
			break;
		default:
			return test
			break;
	}
}

function getScreenByName(name) {
	return pages[name] || 'div';
}

function getCurrentOptions() {
	return foundations.store.get('pages.selectedOptions');
}

function setSelected(name, options) {
	let mockPromise = new Promise((resolve, reject) => {
		window.setTimeout(() => {
			resolve(name);
		}, 2000)
	});

	store.set('pages.selectedOptions', options);
	store.asyncSet('pages.selectedPath', mockPromise);
}

module.exports = {
	fetchAppPages,
	getAppPages,
	getPageComponentByPath,
	getScreenByName,
	getCurrentOptions,
	setSelected,
};


