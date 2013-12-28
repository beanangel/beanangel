define([
	'backbone',
	'communicator'
],
function( Backbone, Communicator ) {
    'use strict';

	/* Return a model class definition */
	return Backbone.Model.extend({
		urlRoot: Communicator.backendURL + "/search",

		initialize: function() {
			console.log("initialize a Search model");
		},

		// @override of Backbone.Model#parse
		// The server conforms to the JSON-API spec and thus wraps objects into
		// a root key with the object's class name
		parse: function(response) {
			if(!_.isEmpty(response.search)) {
				return response.search;
			} else {
				// this code path is for when a collection already parsed for us.
				return response;
			}
		}
    });
});
