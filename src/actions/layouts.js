import mngold from 'layouts/mngold/mngold';
import midnight from 'layouts/midnight/midnight';
import foundations from 'foundations/';

// let actions;

// /**
//  * Called by actions.js to avoid circular dependencies.
//  */
// function init(actionsRef) {
// 	actions = actionsRef;
// }

const store = foundations.store;
const layouts = {
	mngold,
	midnight,
};

function fetchLayouts(delay = 200) {
	let layoutPromise = new Promise((resolve, reject) => {
		window.setTimeout(() => {
			resolve(layouts)
		}, delay)
	});

	store.asyncSet('layouts.app', layoutPromise)
}

function getLayoutByName(name) {
	let tempalte = layouts[name] || 'div';

	if (typeof tempalte.render !== 'function') {
		return tempalte;
	}

	return tempalte.render;
}

function getLayoutTopByName(name) {
	let tempalte = layouts[name] || 'div';

	if (typeof tempalte.renderTop !== 'function') {
		return tempalte;
	}

	return tempalte.renderTop;
}

function getLayoutBodyByName(name) {
	let tempalte = layouts[name] || 'div';

	if (typeof tempalte.renderBody !== 'function') {
		return tempalte;
	}

	return tempalte.renderBody;
}

function getLayoutFooterByName(name) {
	let tempalte = layouts[name] || 'div';

	if (typeof tempalte.renderFooter !== 'function') {
		return tempalte;
	}

	return tempalte.renderFooter;
}

function getCurrentOptions() {
	return store.get('layouts.selectedOptions');
}

function setSelected(name, options) {
	store.set('layouts.selectedOptions', options);
	store.set('layouts.selected', name);
}

module.exports = {
	fetchLayouts,
	getLayoutByName,
	getLayoutTopByName,
	getLayoutBodyByName,
	getLayoutFooterByName,
	getCurrentOptions,
	setSelected,
};


