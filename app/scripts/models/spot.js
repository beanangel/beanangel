define([
	'backbone',
	'communicator'
],
function( Backbone, Communicator ) {
    'use strict';

	/* Return a model class definition */
	return Backbone.Model.extend({
		urlRoot: Communicator.backendURL + "/spots",

		defaults: {
			// as per http://geojson.org/geojson-spec.html#feature-objects
			geometry: null,
			properties: null
		},

		getName: function() {
			if(!this.get('properties')) {
				return null;
			}
			return this.get('properties').name;
		}
	});
});
