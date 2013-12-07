define([
	'backbone',
	'communicator',
	'hbs!tmpl/map_app'
],

function( Backbone, Communicator, Map_tmpl ) {
	return Backbone.Marionette.Layout.extend({
		template: Map_tmpl,
		id: "map-app",

		regions: {
			search: "#search",
			map: "#map"
		},

		onShow: function() {
			$('#main').append(this.$el);
		},

		start: function() {
			Communicator.mediator.trigger("MAP:START");
		}
	});
});