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
		url: Spot.prototype.urlRoot,

		parse: function(response) {
			return response.spots;
		}
	});
});
