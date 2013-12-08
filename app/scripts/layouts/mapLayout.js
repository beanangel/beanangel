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

		onShow: function() {
			$('#main').prepend(this.$el);
		},

		start: function() {
			var mapView = new MapView();
			this.map.show(mapView);
			Communicator.mediator.trigger("MAP:START");
		}
	});
});