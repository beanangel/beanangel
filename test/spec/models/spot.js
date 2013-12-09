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

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );