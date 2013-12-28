define([
	'backbone',
	'communicator',
	'models/spot'
],
function( Backbone, Communicator, Spot ) {
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
