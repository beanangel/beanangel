define([
	'backbone',
	'leaflet',
	'communicator',
	'underscore',
	'vendor/leaflet-providers'
],
function( Backbone, Leaflet, Communicator, _ ){
    'use strict';

	return Backbone.View.extend({

		id: 'map',

		onShow: function() {
			this.setupMap();
			this.registerEvents();

		},

		locate: function() {
			this.map.locate();
		},

		mark: function() {
			this.map.once('moveend', this.setMarkerAtCurPos, this);
			this.map.locate();
		},

		setMarkerAtCurPos: function(e) {
			var curPos = this.map.getCenter();
			new Leaflet.Marker(curPos).addTo(this.map);
		},

		onLocationFound: function(e) {
			// animate to that location at closest zoom level
			this.map.setView(e.latlng, Infinity, {animate: true});
		},

		onLocationError: function(e) {
			alert(e.message);
			console.log(e.message, e.code);
		},


		// TODO make private
		setupMap: function() {
			var location = [50.13, 8.67]; // Frankfurt
			this.map = Leaflet.map('map');
			this.map.setView(location, 13);
			Leaflet.tileLayer.provider("Esri.WorldStreetMap").addTo(this.map);
		},

		registerEvents: function() {
			this.map.on('locationfound', this.onLocationFound, this);
			this.map.on('locationerror', this.onLocationError, this);
			Communicator.mediator.on("LOCATOR:CLICK", this.locate, this);
			Communicator.mediator.on("MARK_POSITION:CLICK", this.mark, this);
		}
	});
});
