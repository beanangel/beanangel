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
			form: "#spot_form", // this doesn't have a div rendered by the Map_tmpl, instead it uses a div that mapView will create
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
			this.mapView = new MapView({formRegion: this.form});
			this.mapView.spotsRequest = deferred.promise();
			this.map.show(this.mapView);

			// setup map tools
			this.toolView = new ToolView();
			this.tools.show(this.toolView);

			// publish
			Communicator.mediator.trigger("MAP:START");

			this.registerEvents();
		},

		registerEvents: function() {
			Communicator.mediator.on("FORM:OPEN", this.toolView.toggle, this.toolView);
			Communicator.mediator.on("FORM:CLOSE", this.toolView.toggle, this.toolView);
		}
	});
});