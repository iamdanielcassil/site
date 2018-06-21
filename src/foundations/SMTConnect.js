import actions from 'actions/*.js';

function init(CMS, Config) {
	this.CMS = CMS;
	this.Config = Config;

	// Ensure we have a valid site_id
	if (!this.Config.site_id) {
		throw new Error("CMS config site_id was empty. Please ensure the 'cms_config' variable is present and has a 'site_id' key.");
	}

	CMS.api.getLandingPages({
		success: function (data) {
			actions.pages.setSMTPages(data);
		}
	});

	CMS.api.getCategories({
		view: 'list',
		success: function (data) {
			actions.pages.setSMTCategories(data);
		}
	});

	initSMTListners();
}

function initSMTListners() {
	let CMS = this.CMS;

	CMS.on('config:get', (promise) => {
		// Config values the adapter can give the cms on startup.
		promise.resolve(actions.app.getSMTConfig());
	});

	CMS.on('context:get', (promise) => {
		let selectedPage = actions.pages.selected;
		var context = {
			page_type: selectedPage.pageType || 'default',
			path: selectedPage.path || window.location.pathname,
			site_id: this.Config.site_id,
		};

		promise.resolve(context);
	});

	CMS.on('page:content:set', (promise, contents) => {
		this.Renderer.renderContents(contents).done( function (response) {
			promise.resolve();
		}).fail( function (error) {
			promise.reject(error);
		});
	});
}
