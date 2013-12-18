(function() {
	'use strict';

	var root = this;

	root.define([
		'models/spot'
		],
		function( Spot ) {
			// @see http://geojson.org/geojson-spec.html#feature-objects
			var geoJSONKeys = ['type', 'geometry', 'properties'];

			describe('Spot Model', function () {

				it('should be an instance of Spot Model', function () {
					var spot = new Spot();
					expect( spot ).to.be.an.instanceof( Spot );
				});

				it('should have the defaults at least be GeoJSON Feature spec compliant', function () {
					var spot = new Spot();
					expect( spot.attributes ).to.contain.keys(geoJSONKeys);
				});

				it('should return GeoJSON compliant attributes from the static function fromLatLng()', function () {
					expect( Spot.fromLatLng({lat: 1, lng: 1}).attributes ).to.contain.keys(geoJSONKeys);
				});

				it('should not throw when getName() is called without properties', function () {
					var spot = new Spot();
					expect( spot.getName ).to.not.throw();
				});
			});

		});

}).call( this );