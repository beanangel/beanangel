define([
	'backbone',
	'views/mapView',
	'communicator',
	'hbs!tmpl/map_app'
],

function( Backbone, MapView, Communicator, Map_tmpl ) {
	return Backbone.Marionette.Layout.extend({
		template: Map_tmpl,
		id: "map-app",

		regions: {
			search: "#search-region",
			map: "#map-region"
		},

		events: {
			"click #locator": "onLocatorClick"
		},

		onShow: function() {
			$('#main').prepend(this.$el);
		},

		start: function() {
			// setup map
			this.mapView = new MapView();
			this.map.show(this.mapView);

			// place locator button
			this.mapView.$el.after('<div id="locator">');

			// publish
			Communicator.mediator.trigger("MAP:START");
		},

		onLocatorClick: function() {
			this.mapView.locate();
		}
	});
});