(function() {
	'use strict';

	var root = this;

	root.define([
		'views/mapView'
		],
		function( MapView ) {

			describe('MapView View', function () {

				it('should be an instance of MapView View', function () {
					var mapView = new MapView();
					expect( mapView ).to.be.an.instanceof( Mapview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );