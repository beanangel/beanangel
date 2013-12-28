(function() {
	'use strict';

	var root = this;

	root.define([
		'models/search'
		],
		function( Search ) {

			describe('Search Model', function () {

				it('should be an instance of Search Model', function () {
					var search = new Search();
					expect( search ).to.be.an.instanceof( Search );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );