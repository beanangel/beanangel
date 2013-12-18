(function() {
	'use strict';

	var root = this;

	root.define([
		'models/spot'
		],
		function( Spot ) {

			describe('Spot Model', function () {

				it('should be an instance of Spot Model', function () {
					var spot = new Spot();
					expect( spot ).to.be.an.instanceof( Spot );
				});

				// @see http://geojson.org/geojson-spec.html#feature-objects
				it('should have the defaults at least be GeoJSON Feature spec compliant', function () {
					var spot = new Spot();
					expect( spot.attributes ).to.contain.keys('geometry', 'properties');
				});

				it('should not throw when getName() is called without properties', function () {
					var spot = new Spot();
					expect( spot.getName ).to.not.throw();
				});
			});

		});

}).call( this );