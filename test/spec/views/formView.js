(function() {
	'use strict';

	var root = this;

	root.define([
		'views/formView'
		],
		function( FormView ) {

			describe('FormView View', function () {

				it('should be an instance of FormView View', function () {
					var formView = new FormView();
					expect( formView ).to.be.an.instanceof( FormView );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );