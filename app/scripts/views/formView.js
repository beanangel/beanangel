define([
	'backbone',
	'communicator',
	'underscore',
	'leaflet',
	'hbs!tmpl/form',
	'backbone_upload_manager',
	'backbone.syphon'
],
function( Backbone, Communicator, _, L, Form_tmpl ){
    'use strict';

	return Backbone.Marionette.ItemView.extend({
		template: Form_tmpl,

		ui: {
			form: "form",
			uploadArea: "div#upload-manager"
		},

		events: {
			"submit form": "onSubmit"
		},

		initialize: function(options) {
			this.model = options.model;
			this.layerSpot = options.layerSpot;

			// Create the upload manager
			this.uploadManager = new Backbone.UploadManager({
				uploadUrl: this.model.url(),
				templates: {
					main: 'upload-manager.main.tmpl',
					file: 'upload-manager.file.tmpl'
				}
			});
		},

		onSubmit: function(event) {
			event.preventDefault();
			var data = Backbone.Syphon.serialize(this);
			this.model.set(data);

			// now serialize the data and set the flags the way
			// jquery.iframe-transport expects it.
			// Otherwise AJAX file upload wouldn't work.
			data = this.ui.form.find('input:not(:file),textarea').serializeArray();

			// headers to set on the ajax transport
			var headers = {};

			// If this is not a new spot, we want to update it.
			// We tell the backend to use the HTTP verb PUT by mimicking the
			// HTTP method with "_method" and an "X-HTTP-Method-Override" header.
			if(!this.model.isNew()) {
				var method = "PUT";
				data.push({name: "_method", value: method});
				headers['X-HTTP-Method-Override'] = method;
			}

			this.model.save([], {
				data: data,
				files: this.ui.form.find(':file'),
				iframe: true,
				processData: false,
				accepts: {
					json: 'application/json'
				},
				dataType: 'json',
				headers: headers
			});
		},

		openPopup: function() {
			// if the popup hasn't been initialized, do it now
			if (_.isEmpty(this.layerSpot.getPopup())) {
				this.layerSpot.bindPopup(this.render().el);
				this.layerSpot.getPopup().on('close', this.onClose, this);
				this.layerSpot.openPopup();
			} else {
				this.layerSpot.setPopupContent(this.render().el);
			}

			// Render the upload manager. renderTo is a helper of Backbone.DeferedView
			// which Backbone.UploadManager (the plugin that we use for uploads) depends on
			// for its asynchronous loading of templates. We might bend that plugin to
			// remove that async loading as we'll always need our templates (photos are required).
			this.uploadManager.renderTo(this.ui.uploadArea);

			Communicator.mediator.trigger("FORM:OPEN", this.model.getName());
		},

		onClose: function() {
			Communicator.mediator.trigger("FORM:CLOSE", this.model.getName());
		},

		serializeData: function() {
			var data = this.model.toJSON();
			var additionalData = {isNew: this.model.isNew()};
			return _.extend(data, additionalData);
		}
	});
});
