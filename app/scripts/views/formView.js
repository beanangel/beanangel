define([
	'backbone',
	'communicator',
	'underscore',
	'leaflet',
	'hbs!tmpl/form',
	'backbone.syphon',
	'jquery.iframe-transport',
	'bootstrap-file-input'
],
function( Backbone, Communicator, _, L, Form_tmpl ){
    'use strict';

	return Backbone.Marionette.ItemView.extend({
		template: Form_tmpl,

		ui: {
			form: "form"
		},

		events: {
			"submit form": "onSubmit"
		},

		initialize: function(options) {
			this.model = options.model;
			this.layerSpot = options.layerSpot;
		},

		onSubmit: function(event) {
			event.preventDefault();
			var data = Backbone.Syphon.serialize(this);
			this.model.set(data);

			// now serialize the data and set the flags the way
			// jquery.iframe-transport expects it.
			// Otherwise AJAX file upload wouldn't work.
			data = this.ui.form.find('input:not(:file)').serializeArray();

			data['X-HTTP-Accept'] = 'application/json';

			this.model.save([], {
				data: data,
				files: this.ui.form.find(':file'),
				iframe: true,
				processData: false,
				accepts: {
					json: data['X-HTTP-Accept']
				},
				dataType: 'json',
				headers: {
					"HTTP_ORIGIN": location.host,
					"X-HTTP-Accept": data['X-HTTP-Accept']
				}
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

			// enhancing the file input styling has to be done on every render
			this.ui.form.find('input[type=file]').bootstrapFileInput();

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
