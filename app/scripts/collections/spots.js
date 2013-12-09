define([
	'backbone'
],
function( Backbone ) {
    'use strict';

	/* Return a collection class definition */
	return Backbone.Collection.extend({
		url: "http://localhost:3000/spots",

		initialize: function() {
			console.log("initialize a Spots collection");
		}
	});
});
