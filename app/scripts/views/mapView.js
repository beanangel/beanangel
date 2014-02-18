define([
	'backbone',
	'communicator',
	'underscore',
	'leaflet',
	'leaflet_providers',
	'collections/spots',
	'models/spot',
	'views/formView'
],
function( Backbone, Communicator, _, L, LeafletProviders, Spots, Spot, FormView ){
	'use strict';

	return Backbone.View.extend({

		id: 'map',

		initialize: function() {
			this.collection = new Spots();
		},

		onShow: function() {
			this.setupMap();
			this.registerEvents();
			this.placeRequestedMarkers();
		},

		setLocation: function(latLng) {
			// animate to that location at closest zoom level
			this.map.setView(latLng, Infinity, {animate: true});
		},

		setBounds: function(bounds) {
			if(_.isObject(bounds)) {
				var southWest = [bounds['SW'].Latitude, bounds['SW'].Longitude];
				var northEast = [bounds['NE'].Latitude, bounds['NE'].Longitude];
				this.map.fitBounds([southWest, northEast]);
			} else {
				this.map.fitBounds(bounds);
			}
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
			var spot = Spot.fromLatLng(curPos);
			this.addSpots(spot);
		},

		onLocationFound: function(e) {
			this.setLocation(e.latlng);
		},

		onLocationError: function(e) {
			// make sure a marker is not set for the case where mark() was called and locate() failed
			this.map.off('moveend', this.setMarkerAtCurPos, this);

			alert(e.message);
			console.log(e.message, e.code);
		},

		addSpots: function(spots) {
			var toAdd = (spots instanceof Backbone.Collection) ? spots.models : spots;
			this.collection.add(toAdd);
			this.geoJSON.addData(spots.toJSON());
		},


		// TODO make private
		setupMap: function() {
			// configure Leaflet
			L.Icon.Default.imagePath = 'bower_components/leaflet/images';

			// configure map and view
			this.map = L.map('map');
//			var location = [50.119, 8.685]; // Frankfurt
			var location = [16.50, 18.5794645]; // World
			var height = $(window).height();
			var zoom = 3;
			if (height < 500) {
				zoom = 1;
			} else if (height < 800) {
				zoom = 2;
			}
			this.map.setView(location, zoom);

			// configure tile provider
			L.tileLayer.provider("Nokia.normalDay").addTo(this.map);

			// add a GeoJSON layer
			this.geoJSON = L.geoJson([], {
				onEachFeature: _.bind(this.onEachFeatureSetupPopup, this)
			}).addTo(this.map);
		},

		openPopup: function(layeredSpot) {
			var feature = layeredSpot.feature;
			var spot = null;
			if(feature.id) {
				spot = this.collection.get(feature.id);
			} else {
				spot = this.collection.findWhere({geometry: feature.geometry});
			}
			var formView = new FormView({
				model: spot,
				layerSpot: layeredSpot
			});
			formView.openPopup();
		},

		onSearchSuccess: function(searchModel) {
			var result = searchModel.get('results')[0];
			if(!_.isEmpty(result) && !_.isEmpty(result.bounds)) {
				this.setBounds(result.bounds);
			}
		},

		onEachFeatureSetupPopup: function(feature, layer) {
			if (feature && layer) {
				var mapView = this;
				layer.on('click', function() {
					mapView.openPopup(layer);
				});
			}
		},

		registerEvents: function() {
			this.map.on('locationfound', this.onLocationFound, this);
			this.map.on('locationerror', this.onLocationError, this);
			Communicator.mediator.on("SEARCH:STOP", this.onSearchSuccess, this);
			Communicator.mediator.on("LOCATOR:CLICK", this.locate, this);
			Communicator.mediator.on("MARK_POSITION:CLICK", this.mark, this);
		},

		placeRequestedMarkers: function() {
			this.spotsRequest.done(_.bind(this.addSpots, this));
		}
	});
});
