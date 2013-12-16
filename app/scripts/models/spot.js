define([
	'backbone',
	'communicator'
],
function( Backbone, Communicator ) {
    'use strict';

	/* Return a model class definition */
	return Backbone.Model.extend({
		urlRoot: Communicator.backendURL + "/spots",

		defaults: {},

		getName: function() {
			return this.get('properties').name;
		}
    });
});
