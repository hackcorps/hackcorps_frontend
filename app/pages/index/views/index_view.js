'use strict';

var Backbone = require('backbone'),
	Marionette = require('backbone.marionette'),
	template = require('../templates/index_template.html');
	
var IndexView = Marionette.ItemView.extend({

	template: template

});

module.exports = IndexView;