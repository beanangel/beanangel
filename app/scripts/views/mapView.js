define([
	'backbone',
	'communicator',
	'underscore',
	'leaflet-providers'
],
function( Backbone, Communicator, _, LeafletProviders ){
    'use strict';

	return Backbone.View.extend({

		id: 'map',

		onShow: function() {
			this.setupMap();
			this.registerEvents();
			this.placeRequestedMarkers();
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
			new L.Marker(curPos).addTo(this.map);
		},

		onLocationFound: function(e) {
			// animate to that location at closest zoom level
			this.map.setView(e.latlng, Infinity, {animate: true});
		},

		onLocationError: function(e) {
			// make sure a marker is not set for the case where mark() was called and locate() failed
			this.map.off('moveend', this.setMarkerAtCurPos, this);

			alert(e.message);
			console.log(e.message, e.code);
		},

		addSpots: function(spots) {
			this.geoJSON.addData(spots.toJSON());
		},


		// TODO make private
		setupMap: function() {
			var location = [50.11, 8.67]; // Frankfurt
			this.map = L.map('map');
			this.map.setView(location, 13);
			L.tileLayer.provider("Nokia.normalDay").addTo(this.map);

			// add a GeoJSON layer
			this.geoJSON = L.geoJson().addTo(this.map);
		},

		registerEvents: function() {
			this.map.on('locationfound', this.onLocationFound, this);
			this.map.on('locationerror', this.onLocationError, this);
			Communicator.mediator.on("LOCATOR:CLICK", this.locate, this);
			Communicator.mediator.on("MARK_POSITION:CLICK", this.mark, this);
		},

		placeRequestedMarkers: function() {
			this.spotsRequest.done(_.bind(this.addSpots, this));
		}
	});
});
