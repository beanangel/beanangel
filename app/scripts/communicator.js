define([
	'backbone',
	'backbone.marionette'
],
function( Backbone ) {
    'use strict';

	var Communicator = Backbone.Marionette.Controller.extend({
		initialize: function( options ) {
			console.log("initialize a Communicator");

			// create a pub sub
			this.mediator = new Backbone.Wreqr.EventAggregator();

			//create a req/res
			this.reqres = new Backbone.Wreqr.RequestResponse();

			// create commands
			this.command = new Backbone.Wreqr.Commands();

			// TODO re-evaluate whether this is a good place, maybe we'll have a config on the application or something
			// like that. But there where articles recommending against a centralized app instance that get's required
			// too often.
			this.backendURL = "http://" + location.hostname + ":3000";
		}
	});

	return new Communicator();
});
