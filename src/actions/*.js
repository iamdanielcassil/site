import * as animate from 'actions/animate';
import * as debug from 'actions/debug';
import * as layouts from 'actions/layouts';
import * as pages from 'actions/pages';
import * as app from 'actions/app';

const actions = { 
	app,
	debug,
	pages,
	animate,
	layouts,
};

for (let key in actions) {
	let action = actions[key];

	// Some base actions files like logic and cookies don't use other actions so they won't have init
	if (typeof action.init === 'function') {
		action.init(actions);
	}
}

document.ACTIONS_API = actions;
export default actions;
	
