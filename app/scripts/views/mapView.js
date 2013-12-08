define([
	'backbone',
	'leaflet',
	'underscore',
	'vendor/leaflet-providers'
],
function( Backbone, Leaflet, _ ){
    'use strict';

	return Backbone.View.extend({

		id: 'map',

		onShow: function() {
			// setup map
			var location = [50.13, 8.67]; // Frankfurt
			this.map = Leaflet.map('map');
			this.map.setView(location, 13);
			Leaflet.tileLayer.provider("Esri.WorldStreetMap").addTo(this.map);

			// register events
			this.map.on('locationfound', _.bind(this.onLocationFound, this));
		},

		locate: function() {
			this.map.locate();
		},

		onLocationFound: function(e) {
			// animate to that location at closest zoom level
			this.map.setView(e.latlng, Infinity, {animate: true});
		}
	});
});
