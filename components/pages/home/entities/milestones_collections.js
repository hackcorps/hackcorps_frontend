'use strict';
require('backbone-rails-sync');

var MilestoneModel = require('./milestone_model.js');

var MilestonesCollection = Backbone.Collection.extend({
	url: 'http://hackdashboard.herokuapp.com/api/v1/milestones',
	/*url: 'http://localhost:3000/api/v1/milestones',*/
	model: MilestoneModel,

	parse: function(response) {
		return response.milestones;
	}

});

module.exports = MilestonesCollection;