define([
	'backbone',
	'views/mapView',
	'views/toolView',
	'communicator',
	'hbs!tmpl/map_app'
],

function( Backbone, MapView, ToolView, Communicator, Map_tmpl ) {
	return Backbone.Marionette.Layout.extend({
		template: Map_tmpl,
		id: "map-app",

		regions: {
			search: "#search-region",
			map: "#map-region",
			tools: "#tools-region"
		},


		onShow: function() {
			$('#main').prepend(this.$el);
		},

		start: function() {
			// setup map
			this.mapView = new MapView();
			this.map.show(this.mapView);

			// setup map tools
			this.toolView = new ToolView();
			this.tools.show(this.toolView);

			// publish
			Communicator.mediator.trigger("MAP:START");
		}
	});
});