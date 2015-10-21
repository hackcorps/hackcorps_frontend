'use strict';

var Backbone = require('backbone'),
	Marionette = require('backbone.marionette'),
	template = require('../templates/home_template.html');
	
var HomeView = Marionette.ItemView.extend({

	template: template

});

module.exports = HomeView;