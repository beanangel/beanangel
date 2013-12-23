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

		initialize: function() {
			this.setAttachmentsAssociation();
			this.on('sync', this.setAttachmentsAssociation, this);
		},

		// Setting a property directly on the model to hold the attachments.
		// This way we don't have to filter out the attachments anytime we're
		// submitting the model to the server.
		setAttachmentsAssociation: function(model, response, options) {
			function parseOnSync() {
				if (response && response.result && !_.isEmpty(response.result.spot)) {
					this.set(this.parse(response.result));
				}
			}
			parseOnSync.call(this);
			this.attachments = this.get('properties').attachments;
			delete this.get('properties').attachments;
		},

		// @override of Backbone.Model#parse
		// The server conforms to the JSON-API spec and thus wraps objects into
		// a root key with the object's class name
		parse: function(response) {
			if(!_.isEmpty(response.spot)) {
				return response.spot;
			} else {
				// this code path is for when a collection already parsed for us.
				return response;
			}
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
			if(_.isEmpty(this.attachments)) {
				return null;
			}
			return _.pluck(this.attachments, 'thumb');
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
