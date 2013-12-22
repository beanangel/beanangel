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
				uploadUrl: null,
				templates: {
					main: 'upload-manager.main.tmpl',
					file: 'upload-manager.file.tmpl'
				}
			});
		},

		onSubmit: function(event) {
			event.preventDefault();

			// Update the model attributes.
			var data = Backbone.Syphon.serialize(this);
			this.model.set(data);

			// If files were added, submit the form through Backbone Upload Manager
			// along with its other fields.
			if(this.uploadManager.files.length) {
				this.uploadManager.files.each(function(file) {
					file.start();
				});
			} else if(!_.isEmpty(this.model.getThumbs())) {
				// This is an update request where files already exist
				// so submit the data via Backbone.sync.
				this.model.save();
			} else {
				// no files are present anywhere
				this.ui.uploadArea.find('#uploader-feedback').html('Bitte ein Foto hinzufügen');
			}
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
			var thumbs = this.model.getThumbs();
			var additionalData = {
				url: this.model.url(),
				isNew: this.model.isNew(),
				hasPhotos: !_.isEmpty(thumbs),
				thumbs: thumbs
			};
			return _.extend(data, additionalData);
		}
	});
});
