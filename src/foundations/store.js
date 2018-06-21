const toystore = require('toystore');
const toystoreReact = require('toystore-react');

const keys = {
	app: {
		config: {
			screen_preview: {
				override_defaults: false,
				sizes: {
					desktop: [{
						name: 'XL',
						width: 2000,
						height: 3000
					}, {
						name: 'Jumbotron',
						width: 3000,
						height: 4000
					}],
					tablet: [{
						name: 'Huge',
						width: 1300,
						height: 2000
					}],
					phone: [{
						name: 'Massive',
						width: 1400,
						height: 2400
					}],
				}
			},
			esc_to_login_disabled: false,
			templates: [
				'main',
				'alt',
			],
		},
		navigation: [
			{name: 'Cart', path: '/cart'},
			{name: 'Test', path: '/test'},
			{name: 'Home', path: '/'},
		],
	},
	layouts: {
		selected: 'midnight',
		selectedOptions: {},
	},
	pages: {
		app: [],
		smtPages: [],
		smtCategories: [],
		selectedPath: '/',
		selectedOptions: {},
	}
};

let store = toystore.create(keys);

store.keys = keys;

// Use partial application to add the 'subscribe' method from toystore-react, bound to this store
store.subscribe = (Component, mapping) => toystoreReact.subscribe(store, Component, mapping);

module.exports = store;
