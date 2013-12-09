define([
	'backbone',
	'models/spot'
],
function( Backbone, Spot ) {
    'use strict';

	/* Return a collection class definition */
	return Backbone.Collection.extend({
		model: Spot,
		url: "http://localhost:3000/spots",

		parse: function(response) {
			return response.spots;
		}
	});
});
