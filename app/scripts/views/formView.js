define([
	'backbone',
	'models/spot',
	'communicator',
	'underscore',
	'leaflet',
	'hbs!tmpl/form',
	'bootstrap-fancyfile'
],
function( Backbone, Spot, Communicator, _, L, Form_tmpl ){
    'use strict';

	return Backbone.Marionette.ItemView.extend({
		template: Form_tmpl,

		initialize: function(options) {
			this.model = new Spot(options.feature);
			this.layerSpot = options.layerSpot;
		},

		onShow: function() {
			// if the popup hasn't been initialized, do it now
			if (_.isEmpty(this.layerSpot.getPopup())) {
				this.layerSpot.bindPopup(this.$el.html());
				this.layerSpot.getPopup().on('close', this.onClose, this);
				this.layerSpot.openPopup();
			} else {
				this.layerSpot.setPopupContent(this.$el.html());
			}

			// enhancing the file input styling has to be done on every render
			$('input[type=file]').fancyfile({
				placeholder: "Durchsuchen ...",
				text: '',
				icon: false
			});

			Communicator.mediator.trigger("FORM:OPEN", this.model.getName());
		},

		onClose: function() {
			Communicator.mediator.trigger("FORM:CLOSE", this.model.getName());
		}
	});
});
