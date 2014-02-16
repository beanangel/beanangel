define([
	'jquery',
	'backbone',
	'communicator',
	'models/search',
	'collections/spots',
	'views/mapView',
	'views/toolView',
	'hbs!tmpl/map_app'
],

function( $, Backbone, Communicator, Search, Spots, MapView, ToolView, Map_tmpl ) {
	return Backbone.Marionette.Layout.extend({
		template: Map_tmpl,
		id: "map-app",

		regions: {
			search: "#search-region",
			map: "#map-region",
			tools: "#tools-region"
		},

		events: {
			"submit #search-region form": "onSearch"
		},

		onShow: function() {
			$('#main').prepend(this.$el);
		},

		onSearch: function(event) {
			event.preventDefault();

			var query = this.$el.find('input#search').val();

			var search = new Search({query: query});
			search.save([], {success: function(model, response, options) {
				Communicator.mediator.trigger("SEARCH:STOP", model);
			}});

			Communicator.mediator.trigger("SEARCH:START", query);
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

			this.registerEvents();
		},

		registerEvents: function() {
			Communicator.mediator.on("FORM:OPEN", this.toolView.toggle, this.toolView);
			Communicator.mediator.on("FORM:CLOSE", this.toolView.toggle, this.toolView);
		},

		serializeData: function() {
			return {url: Search.prototype.url()};
		}
	});
});