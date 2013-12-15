(function() {
	'use strict';

	var root = this;

	root.define([
		'views/toolView'
		],
		function( ToolView ) {

			describe('ToolView View', function () {

				it('should be an instance of ToolView View', function () {
					var ToolView = new ToolView();
					expect( ToolView ).to.be.an.instanceof( Toolview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );