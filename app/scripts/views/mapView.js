define([
	'backbone',
	'communicator',
	'underscore',
	'leaflet',
	'leaflet_providers',
	'hbs!tmpl/form',
	'bootstrap-fancyfile'
],
function( Backbone, Communicator, _, L, LeafletProviders, Form_tmpl ){
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
			var location = [50.119, 8.685]; // Frankfurt
			this.map = L.map('map');
			this.map.setView(location, 13);
			L.tileLayer.provider("Nokia.normalDay").addTo(this.map);

			// add a GeoJSON layer
			this.geoJSON = L.geoJson([], {
				onEachFeature: this.onEachFeatureSetupPopup
			}).addTo(this.map);
		},

		onEachFeatureSetupPopup: function(feature, layer) {
			if (feature.properties) {
				layer.bindPopup(Form_tmpl(feature.properties));
			}
		},

		onFormOpen: function() {
			$('input[type=file]').fancyfile({
				placeholder: "Durchsuchen ...",
				text: '',
				icon: false
			});
			Communicator.mediator.trigger("FORM:OPEN");
		},

		onFormClose: function() {
			Communicator.mediator.trigger("FORM:CLOSE");
		},

		registerEvents: function() {
			this.map.on('locationfound', this.onLocationFound, this);
			this.map.on('locationerror', this.onLocationError, this);
			this.map.on('popupopen', this.onFormOpen, this);
			this.map.on('popupclose', this.onFormClose, this);
			Communicator.mediator.on("LOCATOR:CLICK", this.locate, this);
			Communicator.mediator.on("MARK_POSITION:CLICK", this.mark, this);
		},

		placeRequestedMarkers: function() {
			this.spotsRequest.done(_.bind(this.addSpots, this));
		}
	});
});
