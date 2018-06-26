import foundations from 'foundations/';

const store = foundations.store;

function getSMTConfig() {
	return store.get('app.config');
}

const contents = {
	set: function (conents) {
		store.set('app.contents.data', contents);
	},
	getAreaContent: function (area) {
		let contents = store.get('app.contents.data');

		return contents.filter(content => {
			return content.areaName === area;
		});
	}
}

module.exports = {
	getSMTConfig,
	contents,
}


