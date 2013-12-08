define([
	'backbone',
	'communicator',
	'layouts/mapLayout',
	'hbs!tmpl/main'
],

function( Backbone, Communicator, MapApp, Main_tmpl ) {
    'use strict';

	var mainTmpl = Main_tmpl;

	var App = new Backbone.Marionette.Application();

	/* Add application regions here */
	App.addRegions({
		map: "#map-app"
	});

	App.MapApp = new MapApp();

	/* Add initializers here */
	App.addInitializer( function () {
		document.body.innerHTML = mainTmpl();
		Communicator.mediator.trigger("APP:START");
		App.map.show(App.MapApp);
		App.MapApp.start();
	});

	return App;
});
