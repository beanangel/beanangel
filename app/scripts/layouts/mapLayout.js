define([
	'jquery',
	'backbone',
	'collections/spots',
	'views/mapView',
	'views/toolView',
	'communicator',
	'hbs!tmpl/map_app'
],

function( $, Backbone, Spots, MapView, ToolView, Communicator, Map_tmpl ) {
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
			// get data in a deferred fashion
			var spots = new Spots();
			var deferred = $.Deferred();
			spots.fetch({
				success: deferred.resolve
			});

			// setup map
			this.mapView = new MapView();
			this.mapView.spotsRequest = deferred.promise();
			this.map.show(this.mapView);

			// setup map tools
			this.toolView = new ToolView();
			this.tools.show(this.toolView);

			// publish
			Communicator.mediator.trigger("MAP:START");
		}
	});
});