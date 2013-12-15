define([
	'backbone'
],
function( Backbone ) {
    'use strict';

	/* Return a model class definition */
	return Backbone.Model.extend({
		defaults: {},

		getName: function() {
			return this.get('properties').name;
		}
    });
});
