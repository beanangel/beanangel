Be An Angel
===========

Milestones
----------

### Baklava (2014-03-31) :hourglass_flowing_sand: ####

Will have a nicer dialog with space for all those fields and (scrollable?) information. Might include a tiny gallery on the spot detail dialog.


### Apples and Honey (2013-12-21) :white_check_mark: ####

Will support the following: Map is displayed, let the app locate you (or pull up an address form), optionally upload a photo.


Install
-------
First make sure you have MongoDB, Node.js, npm, Yeoman, Bower and Grunt installed.

Install MongoDB with:

	$ brew install mongodb

Visit http://nodejs.org/ to install node and npm.


Install phantomJS with:

	$ brew install phantomjs

Or visit http://phantomjs.org/


To install Yeoman, Bower and Grunt run:

	$ npm install -g yo grunt-cli bower


Install mocha-phantomjs:

	$ npm install (-g) mocha-phantomjs


Install mocha generator:

	$ npm install (-g) generator-mocha-amd


Install marionette generator

	$ npm install (-g) generator-marionette

Finally install the local npm and bower dependencies

	$ npm install
	$ bower update


Run
---
To start the project simply run:

	$ grunt
