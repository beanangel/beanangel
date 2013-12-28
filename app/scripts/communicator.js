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

			// see TODO on the function itself
			this.initBackendURL();

			this.mediator.on('all', this.logMediatorEvents, this);
		},

		logMediatorEvents: function(eventName, options) {
			if(_.isEmpty(options) || _.isObject(options)) {
				console.log(eventName);
			} else {
				console.log(eventName, options);
			}
		},

		// TODO re-evaluate whether this is a good place, maybe we'll have a config on the application or something
		// like that. But there where articles recommending against a centralized app instance that get's required
		// too often.
		initBackendURL: function() {
			this.backendURL = "http://" + location.hostname;
			var isLocalNetwork = location.hostname === "localhost" ||
								 location.hostname.substr(0, 8) == "192.168." ||
								 location.hostname.substr(0, 5) == "10.0.";
			if(isLocalNetwork) {
				this.backendURL += ":3000";
			}
		}
	});

	return new Communicator();
});
