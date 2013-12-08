define([
	'backbone',
	'leaflet',
	'vendor/leaflet-providers'
],
function( Backbone, Leaflet ){
    'use strict';

	return Backbone.View.extend({

		id: 'map',

		onShow: function() {
			var location = [50.13, 8.67]; // Frankfurt
			var map = Leaflet.map('map').setView(location, 13);
			Leaflet.tileLayer.provider("Esri.WorldStreetMap").addTo(map);
		}
	});
});
