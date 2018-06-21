import main from 'pages/main/main';
import test from 'pages/test/test';
import foundations from 'foundations/*.js';

// let actions;

// /**
//  * Called by actions.js to avoid circular dependencies.
//  */
// function init(actionsRef) {
// 	actions = actionsRef;
// }

const store = foundations.store;
const pages = [
	{path: '/', component: main},
	{path: '/main', component: main},
	{path: '/test', component: test},
	{path: '/404', component: main},
];

function getAll() {
	return pages;
}
function getScreenByName(name) {
	return pages[name] || 'div';
}

function getCurrentOptions() {
	return foundations.store.get('pages.selectedOptions');
}

function setSelected(name, options) {
	store.set('pages.selectedOptions', options);
	store.set('pages.selectedPath', name);
}

module.exports = {
	getAll,
	getScreenByName,
	getCurrentOptions,
	setSelected,
};


