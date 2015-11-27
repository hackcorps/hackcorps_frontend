'use strict';
require('backbone-rails-sync');

var MilestoneModel = Backbone.Model.extend({
	 urlRoot: 'http://hackdashboard.herokuapp.com/api/v1/milestones',
  /*urlRoot: 'http://localhost:3000/api/v1/milestones',*/
  paramRoot: 'milestone',

    defaults: {
        name: '',
        percent_complete: '', 
        data_started: '', 
        due_date: '', 
        cost: '', 
        id: null
    }
});

var MilestonesCollection = Backbone.Collection.extend({
	url: 'http://hackdashboard.herokuapp.com/api/v1/milestones',
  /*url: 'http://localhost:3000/api/v1/milestones',*/
  model: MilestoneModel,

  parse: function(response) {
    return response.milestones;
  }

});

module.exports = MilestonesCollection;