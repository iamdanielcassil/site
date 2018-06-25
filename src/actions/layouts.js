import mngold from 'layouts/mngold/mngold';
import midnight from 'layouts/midnight/midnight';
import foundations from 'foundations/*.js';

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

function getLayoutByName(name) {
	return layouts[name] || 'div';
}

function getLayoutPieceByName(name, piece) {
	// happy path only
	let tempalte = layouts[name] || 'div';

	return tempalte[piece];
}

function getCurrentOptions() {
	return store.get('layouts.selectedOptions');
}

function setSelected(name, options) {
	store.set('layouts.selectedOptions', options);
	store.set('layouts.selected', name);
}

module.exports = {
	getLayoutByName,
	getLayoutPieceByName,
	getCurrentOptions,
	setSelected,
};


