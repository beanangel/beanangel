define([
	'backbone',
	'communicator',
	'layouts/mapLayout',
	'hbs!tmpl/welcome'
],

function( Backbone, Communicator, MapApp, Welcome_tmpl ) {
    'use strict';

	var welcomeTmpl = Welcome_tmpl;

	var App = new Backbone.Marionette.Application();

	/* Add application regions here */
	App.addRegions({
		map: "#map-app"
	});

	App.MapApp = new MapApp();

	/* Add initializers here */
	App.addInitializer( function () {
		document.body.innerHTML = welcomeTmpl({ success: "CONGRATS!" });
		Communicator.mediator.trigger("APP:START");
		App.map.show(App.MapApp);
		App.MapApp.start();
	});

	return App;
});
