import foundations from 'foundations/*.js';

function getSMTConfig() {
	return foundations.store.get('app.config');
}

module.exports = {
	getSMTConfig,
}


