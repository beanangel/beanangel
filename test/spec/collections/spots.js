(function() {
	'use strict';

	var root = this;

	root.define([
		'collections/spots'
		],
		function( Spots ) {

			describe('Spots Collection', function () {

				it('should be an instance of Spots Collection', function () {
					var spots = new Spots();
					expect( spots ).to.be.an.instanceof( Spots );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );