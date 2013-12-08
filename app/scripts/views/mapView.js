define([
	'backbone',
	'leaflet',
	'leaflet_providers'
],
function( Backbone, Leaflet ){
    'use strict';

	return Backbone.View.extend({

		id: 'map',

		onShow: function() {
			var map = Leaflet.map('map').setView([50.117716, 8.679543], 13);
			Leaflet.tileLayer.provider("Esri.WorldStreetMap").addTo(map);
		}
	});
});
