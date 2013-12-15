define([
	'backbone',
	'models/spot',
	'communicator'
],
function( Backbone, Spot, Communicator ) {
    'use strict';

	/* Return a collection class definition */
	return Backbone.Collection.extend({
		model: Spot,
		url: Communicator.backendURL + "/spots",

		parse: function(response) {
			return response.spots;
		}
	});
});
