define([
	'backbone',
	'communicator',
	'hbs!tmpl/map_tools'
],
function( Backbone, Communicator, MapTools_tmpl ){
    'use strict';

	return Backbone.Marionette.View.extend({

		events: {
			"click #locator": "onLocatorClick"
		},

		onShow: function() {
			this.el.innerHTML = MapTools_tmpl();
		},

		onLocatorClick: function() {
			Communicator.mediator.trigger("LOCATOR:CLICK");
		}
	});
});
