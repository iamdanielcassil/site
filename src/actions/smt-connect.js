import actions from 'actions/';

const initApp = function init(CMS, Config) {
	this.Config = Config;

	// Ensure we have a valid site_id
	if (!Config.site_id) {
		throw new Error("CMS config site_id was empty. Please ensure the 'cms_config' variable is present and has a 'site_id' key.");
	}

	CMS.trigger('app:ready', { dontSpamConfigGet: true });

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

	initSMTListners(Config.site_id);
}

function initSMTListners(site_id) {
	let CMS = window.CMS;

	CMS.on('config:get', (promise) => {
		// Config values the adapter can give the cms on startup.
		promise.resolve(actions.app.getSMTConfig());
	});

	CMS.on('context:get', (promise) => {
		let selectedPage = actions.pages.getSelectetd();
		var context = {
			page_type: selectedPage.pageType || 'default',
			path: selectedPage.path || window.location.pathname,
			site_id,
		};

		promise.resolve(context);
	});

	CMS.on('page:content:set', (promise, contents) => {
		actions.app.contents.set(contents);
		promise.resolve();
	});
}




	// // CMS listeners - CMS tells us to do something, could fire anytime.
	// CMS.on('config:get', (promise) => {
	// 	// Config values the adapter can give the cms on startup.
	// 	let config = {
	// 		// Screen size preview override/extension
	// 		screen_preview: {
	// 			override_defaults: false,
	// 			sizes: {
	// 				desktop: [{
	// 					name: 'XL',
	// 					width: 2000,
	// 					height: 3000
	// 				}, {
	// 					name: 'Jumbotron',
	// 					width: 3000,
	// 					height: 4000
	// 				}],
	// 				tablet: [{
	// 					name: 'Huge',
	// 					width: 1300,
	// 					height: 2000
	// 				}],
	// 				phone: [{
	// 					name: 'Massive',
	// 					width: 1400,
	// 					height: 2400
	// 				}],
	// 			}
	// 		},
	// 		esc_to_login_disabled: false,
	// 	};

	// 	promise.resolve(config);
	// });

	// CMS.on('context:get', (promise) => {
	// 	var context = this.getCurrentPageContext();

	// 	promise.resolve(context);
	// });

	// CMS.on('page:content:set', (promise, contents) => {
	// 	this.Renderer.renderContents(contents).done( function (response) {
	// 		promise.resolve();
	// 	}).fail( function (error) {
	// 		promise.reject(error);
	// 	});
	// });

	// CMS.on('content:types:get', (promise) => {
	// 	var content_types = [];

	// 	// Tell CXM that we know how to render core 4 content.
	// 	content_types.push({type: 'cms'});

	// 	_.each(MNG.cct, function (cct, key) {
	// 		content_types.push({type: key.toLowerCase()});
	// 	});

	// 	promise.resolve(content_types);
	// });

	// CMS.on('content:add', (promise, content) => {
	// 	this.Renderer.renderContent(content).done( function (response) {
	// 		promise.resolve();
	// 	}).fail( function (error) {
	// 		promise.reject(error);
	// 	});
	// });

	// CMS.on('content:update', (promise, content) => {
	// 	this.Renderer.renderContent(content).done( function (response) {
	// 		promise.resolve();
	// 	}).fail( function (error) {
	// 		promise.reject(error);
	// 	});
	// });

	// CMS.on('content:remove', (promise, content) => {
	// 	this.Renderer.removeContent(content).done( function () {
	// 		promise.resolve();
	// 	}).fail( function (error) {
	// 		promise.reject(error);
	// 	});
	// });

	// CMS.on('content:hide', (promise, selector) => {
	// 	this.Renderer.hideContent(selector).done( function () {
	// 		promise.resolve();
	// 	}).fail( function (error) {
	// 		promise.reject(error);
	// 	});
	// });

	// CMS.on('content:show', (promise, selector) => {
	// 	this.Renderer.showContent(selector).done( function () {
	// 		promise.resolve();
	// 	}).fail( function (error) {
	// 		promise.reject(error);
	// 	});
	// });

	// // Landing Pages
	// CMS.on('landing-pages:add', (promise, data) => {
	// 	promise.resolve(this.addAndNavigatePage(this.Pages.types.CMS_LANDING, data.page, data.trigger || false));
	// 	// TODO GRM - this is never called!
	// });

	// CMS.on('landing-pages:remove', (promise, page) => {
	// 	promise.resolve(this.Pages.removePage(this.Pages.types.CMS_LANDING, page));
	// 	// TODO GRM - this is never called!
	// });

	// CMS.on('landing-pages:reload', (promise, data) => {
	// 	promise.resolve(this.Pages.resetPages(data.pages));
	// 	this.Router.navigate(window.location.pathname);
	// });

	// CMS.on('landing-pages:navigate', (promise, data) => {
	// 	promise.resolve(this.Router.navigate(data.url));
	// });

	// CMS.on('landing-pages:update', (promise, data) => {
	// 	promise.resolve(this.updateLandingPage(data));
	// });

	// // Categories
	// CMS.on('category:add', (promise, data) => {
	// 	promise.resolve(this.addAndNavigatePage(this.Pages.types.CMS_CATEGORY, data.category, data.trigger || false));
	// });

	// CMS.on('category:reload', (promise, data) => {
	// 	promise.resolve(this.Pages.resetCategoriesFromTree(data.categories));
	// });

	// // TODO GRM - add these
	// // adapter:category:hierarchy:change
	// // TODO!!! Change this to just reload items with given data. Page refresh is for demo.
	// CMS.on('adapter:category:item:update', (data, callback) => {
	// 	let page = this.Pages.findPageInCollectionByUrl(this.Pages.category_pages, window.location.pathname);

	// 	if (page) {
	// 		page.items = data.items;
	// 	}
	// 	if (data.reload) {
	// 		this.Router.navigate(window.location.pathname);
	// 	}
	// });

	// CMS.on('adapter:category:update', (data, callback) => {
	// 	callback(this.updateCategory(data));
	// });

	// CMS.on('adapter:category:remove', (data, callback) => {
	// 	this.Pages.removePage(this.Pages.types.CMS_CATEGORY, data);
	// });

	// CMS.on('categories:navigate', (promise, data) => {
	// 	promise.resolve(this.Router.navigate(data.url));
	// });

	// CMS.on('items:search', (promise, filters) => {
	// 	var self = this,
	// 		query_params = {
	// 			fieldset: 'search',
	// 			country: 'US',
	// 			currency: 'USD',
	// 			language: 'en'
	// 		};

	// 		// Add in search filters
	// 		filters = self.formatSearchFilters(filters);
	// 		_.extend(query_params, filters);

	// 		MNG.items.getItems(query_params).then(function(items) {
	// 			items = self.formatItemsForCategories(items);

	// 			// This promise needs to be resolved by customer with formatted items data
	// 			promise.resolve(items);
	// 		});
	// });

	// CMS.on('theme:styles:overrideCss', function (promise, editedSettings) {
	// 	ignoreCompilePreviewUpdate = false;
	// 	theme_customization.fetchCssFileContents('/MNG/css/mng_styles.css').then(function (cssText) {
	// 		var newCSS = theme_customization.generateThemeCSS(editedSettings);
	// 		var stylesheet = theme_customization.createLivePreviewStyleSheet(newCSS);

	// 		if (editedSettings.$emailInputSize && !editedSettings.$emailInputSize.toLowerCase().match(/[0-9]+em/)) {
	// 			promise.reject({ errors: 'There were validation concerns' });
	// 		} else {
	// 			let currentSettings = theme_customization.calculateCurrentSettings(editedSettings);

	// 			promise.resolve(currentSettings);
	// 		}
	// 	});

	// 	// For SCA the compile does not happen on restore defaults
	// 	if (Object.keys(editedSettings).length > 0) {
	// 		setTimeout(() => {
	// 			theme_customization.compileStyles({ editedSettings })
	// 				.then(response => {
	// 					if (!ignoreCompilePreviewUpdate) {
	// 						theme_customization.createLivePreviewStyleSheet(response.css);
	// 					}
	// 					CMS.trigger('theme:styles:reloadValues', { errors: null, values: response.json.values });
	// 				})
	// 				.catch(err => {
	// 					CMS.trigger('theme:styles:reloadValues', { errors: err.json.message });
	// 				});
	// 		}, 2000);
	// 	}
	// });

	// CMS.on('theme:styles:save', (promise, editedSettings) => {
	// 	ignoreCompilePreviewUpdate = false;
	// 	theme_customization.fetchCssFileContents('/MNG/css/mng_styles.css').then(function (cssText) {
	// 		var newCSS = theme_customization.generateThemeCSS(editedSettings);
	// 		var stylesheet = theme_customization.createLivePreviewStyleSheet(newCSS);

	// 		if (editedSettings.$emailInputSize && !editedSettings.$emailInputSize.toLowerCase().match(/[0-9]+em/)) {
	// 			promise.reject({ errors: 'There were validation concerns' });
	// 		} else {
	// 			let currentSettings = theme_customization.calculateCurrentSettings(editedSettings);

	// 			promise.resolve(currentSettings);
	// 		}
	// 	});

	// 	theme_customization.compileStyles({ editedSettings }, true)
	// 		.then(response => {
	// 			theme_customization.createLivePreviewStyleSheet(response.css);
	// 			CMS.trigger('theme:styles:reloadValues', { errors: null, values: response.json.values });
	// 		})
	// 		.catch(err => {
	// 			CMS.trigger('theme:styles:reloadValues', { errors: err.json.message });
	// 		});
	// });

	// CMS.on('theme:styles:revertCss', function (promise) {
	// 	ignoreCompilePreviewUpdate = true;
	// 	theme_customization.fetchInitialStyles().then(function (initialThemeData) {
	// 		var cssText = theme_customization.generateThemeCSS(initialThemeData.currentSettings);
	// 		theme_customization.createLivePreviewStyleSheet(cssText);
	// 		promise.resolve(initialThemeData.currentSettings);
	// 	});
	// });

	// CMS.on('theme:config:get', function (promise) {
	// 	let currentThemeSettings = {};
	// 	let editedThemeSettings = {};
	// 	// Dirty place for a theme call
	// 	let themeCallPromise = theme_customization.fetchInitialStyles()
	// 		.then(initialThemeData => {
	// 			currentThemeSettings = initialThemeData.currentSettings;
	// 			editedThemeSettings = initialThemeData.editedSettings;
	// 		}, () => {
	// 			console.log('Error fetching initial theme settings. Is the theme backend node server running?');
	// 			console.log('Start the MNG theme server using these commands');
	// 			console.log('cd /webdev/Platform_Solutions/ECommerce/CMS/Custom App - MNG/v3/theme-backend/');
	// 			console.log('npm start');
	// 		});

	// 	let themeConfig = {
	// 		formData: { // JSON Metadata passed in from preprocessor and passed through SC* app. Includes variables, form structure, and precompiler error messages
	// 			values: [
	// 				{
	// 					name: '$emailButtonStyle', // unique field key that will be used to pass values later
	// 					expr: '0px', // ignored by SMT. SASS function used for this variable.
	// 					editable: true, // tells SMT to show an input
	// 					args: {
	// 						type: 'text', // data type. Can be text or color, possibly dimension later
	// 						label: 'Email Button Style', // label text. TODO: figure out translations
	// 						options: [ // presence of options makes this render a drop down list in SMT
	// 							{ text: 'Square', value: '0px' },
	// 							{ text: 'Rounded', value: '5px' },
	// 							{ text: 'Oval', value: '12px' }
	// 						]
	// 					}
	// 				},
	// 				{
	// 					name: '$navigationColor',
	// 					expr: '#878787',
	// 					editable: true,
	// 					args: {
	// 						type: 'color', // color picker field type
	// 						label: 'Navigation Color'
	// 					}
	// 				},
	// 				{
	// 					name: '$emailButtonBackgroundColor',
	// 					expr: '#FF0000',
	// 					editable: true,
	// 					args: {
	// 						type: 'color',
	// 						label: 'Email Button Background Color'
	// 					},
	// 					derived: [{
	// 						name: '$emailInputColor',
	// 						expr: 'lighten($emailButtonBackgroundColor, 30)',
	// 						editable: true,
	// 						args: {
	// 							type: 'color',
	// 							label: 'Email Input Color'
	// 						}
	// 					}]
	// 				},
	// 				{
	// 					name: '$navigationFontSize',
	// 					expr: '1.3em',
	// 					editable: true,
	// 					args: {
	// 						type: 'string', // text input field type
	// 						label: 'Navigation Font Size'
	// 					}
	// 				},
	// 				{
	// 					name: '$navigationFontWeight',
	// 					expr: 'normal',
	// 					editable: true,
	// 					args: {
	// 						type: 'string',
	// 						label: 'Navigation Font Weight',
	// 						options: [
	// 							{ text: 'Plain', value: 'normal' },
	// 							{ text: 'Bold', value: 'bold' },
	// 						]
	// 					}
	// 				},
	// 				{
	// 					name: '$emailInputSize',
	// 					expr: '',
	// 					editable: true,
	// 					args: {
	// 						type: 'string',
	// 						label: 'Email Input Font Size'
	// 					}
	// 				},
	// 				{
	// 					name: '$siteBackgroundColor',
	// 					expr: '',
	// 					editable: true,
	// 					args: {
	// 						type: 'color',
	// 						label: 'Site Background Color'
	// 					}
	// 				},
	// 				{
	// 					name: '$topBarBackgroundColor',
	// 					expr: '',
	// 					editable: true,
	// 					args: {
	// 						type: 'color',
	// 						label: 'Top Bar Background Color'
	// 					}
	// 				},
	// 				{
	// 					name: '$topBarColor',
	// 					expr: '',
	// 					editable: true,
	// 					args: {
	// 						type: 'color',
	// 						label: 'Top Bar Color'
	// 					}
	// 				}
	// 			],
	// 			structure: [ // This is generated by group() calls within the sass and passed directly through app.
	// 				{
	// 					id: 'buttons',
	// 					args: {
	// 						label: 'Buttons', // optional section display title
	// 						children: ['$emailButtonStyle'], // required field and subsection collection
	// 					}
	// 				},
	// 				{
	// 					id: 'colors',
	// 					args: {
	// 						label: 'Colors',
	// 						children: [
	// 							'$navigationColor',
	// 							'$emailButtonBackgroundColor',
	// 							'$emailInputColor',
	// 							'$siteBackgroundColor',
	// 							'$topBarBackgroundColor',
	// 							'$topBarColor',
	// 						],
	// 					},
	// 				},
	// 				{
	// 					id: 'typography',
	// 					args: {
	// 						label: 'Typography',
	// 						children: [
	// 							'navigation-typography',
	// 							'$emailInputSize',
	// 						]
	// 					}
	// 				},
	// 				{
	// 					id: 'navigation-typography',
	// 					args: {
	// 						label: 'Navigation',
	// 						children: [
	// 							'$navigationFontSize',
	// 							'$navigationFontWeight',
	// 							'$nonExistentNavigation',
	// 						],
	// 					},
	// 				},
	// 			],
	// 			// Optional string for errors
	// 			errors: 'This is a theme error message for testing.',
	// 			// optional string for warnings
	// 			warnings: 'This is a theme warning message for testing.',
	// 		},
	// 		skins: THEME_SKINS,
	// 		currentSettings: {},
	// 		editedSettings: {},
	// 	};

	// 	themeCallPromise.then(function() {
	// 		themeConfig.currentSettings = currentThemeSettings;
	// 		themeConfig.editedSettings = editedThemeSettings;
	// 		if (location.href.includes('/cart')) {
	// 			themeConfig.formData.values = [
	// 				{
	// 					name: '$navigationFontStyle',
	// 					expr: 'normal',
	// 					editable: true,
	// 					args: {
	// 						type: 'string',
	// 						label: 'Navigation Font Style',
	// 						options: [
	// 							{ text: 'Plain', value: 'normal' },
	// 							{ text: 'Italic', value: 'italic' },
	// 						]
	// 					}
	// 				}
	// 			];
	// 			themeConfig.formData.structure = [];
	// 		}

	// 		promise.resolve(themeConfig);
	// 	});
	// });

module.exports = { initApp }
