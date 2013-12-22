define([
	'backbone',
	'communicator',
	'underscore'
],
function( Backbone, Communicator, _ ) {
    'use strict';

	/* Return a model class definition */
	return Backbone.Model.extend({
		urlRoot: Communicator.backendURL + "/spots",

		defaults: {
			// as per http://geojson.org/geojson-spec.html#feature-objects
			type: "Feature",
			geometry: null,
			properties: null
		},

		isNew: function() {
			return _.isEmpty(this.get('id'));
		},

		// @param coords in longitude latitude order as per GeoJSON spec
		setCoords: function(coords) {
			if(arguments.length == 2) {
				coords = [coords[0], coords[1]];
			}

			var geo = this.get('geometry');
			if(_.isEmpty(geo)) {
				geo = {type: "Point", coordinates: null};
			}
			geo.coordinates = coords;
			this.set(geo);
		},

		getThumbs: function() {
			var properties = this.get('properties');
			if(!properties || properties.attachments.length === 0) {
				return null;
			}
			return _.pluck(properties.attachments, 'thumb');
		},

		getName: function() {
			if(!this.get('properties')) {
				return null;
			}
			return this.get('properties').name;
		}
	},
	// class properties
	{
		fromLatLng: function (latLng) {
			// GeoJSON has lngLat, so reverse order
			var coords = [latLng.lng, latLng.lat];
			return new this({
				geometry: {
					type: "Point",
					coordinates: coords
				}
			});
		}
	});
});
