'use strict';
require('backbone-rails-sync');

var StandUpModel = Backbone.Model.extend({
	// urlRoot: 'http://hackdashboard.herokuapp.com/api/v1/stand_ups',
    urlRoot: 'http://localhost:3000/api/v1/stand_ups',
    paramRoot: 'stand_up',

    defaults: {
        update_text: '',
        noted_at: '',
        user_id: '',
        milestone_id: '', 
        stand_up_summary_id: null,
        id: null
    }
    
});

module.exports = StandUpModel;