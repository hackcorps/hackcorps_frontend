'use strict';
require('backbone-rails-sync');

var StandUpModel = require('./stand_up_model.js');

var StandUpsCollection = Backbone.Collection.extend({
	// url: 'http://hackdashboard.herokuapp.com/api/v1/stand_ups',
	url: 'http://localhost:3000/api/v1/stand_ups',
	model: StandUpModel,

	parse: function(response) {
		return response.stand_ups;
	}

});

module.exports = StandUpsCollection;