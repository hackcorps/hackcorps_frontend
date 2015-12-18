'use strict';
require('backbone-rails-sync');

var SummaryModel = require('./summary_model.js');

var SummariesCollection = Backbone.Collection.extend({
	url: 'http://hackdashboard.herokuapp.com/api/v1/stand_up_summaries',
	// url: 'http://localhost:3000/api/v1/stand_up_summaries',
	model: SummaryModel,

	parse: function(response) {
		return response.stand_up_summaries;
	}

});

module.exports = SummariesCollection;