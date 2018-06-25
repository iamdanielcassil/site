const toystore = require('toystore');
const toystoreReact = require('toystore-react');
const toystoreState = require('toystore-state');

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
		app: _defaultAsyncData([]),
		smtPages: _defaultAsyncData([]),
		smtCategories: _defaultAsyncData([]),
		selectedPath: '/',
		selectedOptions: {},
	}
};

let store = toystore.create(keys);

store.asyncSet = function (key, dataPromise) {
	let storeData = store.get(key);

	storeData.isLoading = true;
	storeData.isBlankState = _isBlank(storeData);
	storeData.isError = false;

	dataPromise.then(data => {
		storeData.data = data;
		storeData.isLoading = false;
		storeData.isBlankState = _isBlank(data);

		store.set(key, storeData);
	}).catch(data => {
		storeData.data = data;
		storeData.isLoading = false;
		storeData.isBlankState = _isBlank(data);
		storeData.isError = true;

		store.set(key, storeData);
	});

	//do stuff
	store.set(key, storeData);
};

function _defaultAsyncData(data, isLoading = false, isError = false) {
	let isBlankState = _isBlank(data);

	return {
		data,
		isBlankState,
		isError,
	}
}

function _isBlank(data) {
	return data === undefined || data === null || data && data.length === 0;
}

store.keys = keys;

// Use partial application to add the 'subscribe' method from toystore-react, bound to this store
store.subscribe = (Component, mapping) => toystoreReact.subscribe(store, Component, mapping);

module.exports = store;
