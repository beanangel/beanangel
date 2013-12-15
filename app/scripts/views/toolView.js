define([
	'backbone',
	'communicator',
	'hbs!tmpl/map_tools'
],
function( Backbone, Communicator, MapTools_tmpl ){
    'use strict';

	return Backbone.Marionette.View.extend({

		events: {
			"click #locate": "onLocatorClick",
			"click #mark_position": "onMarkPositionClick"
		},

		onShow: function() {
			this.el.innerHTML = MapTools_tmpl();
		},

		toggle: function() {
			this.$el.toggle();
		},

		onLocatorClick: function() {
			Communicator.mediator.trigger("LOCATOR:CLICK");
		},

		onMarkPositionClick: function() {
			Communicator.mediator.trigger("MARK_POSITION:CLICK");
		}
	});
});
