'use strict';
require('backbone-rails-sync');

var StandUpModel = Backbone.Model.extend({
	urlRoot: 'http://hackdashboard.herokuapp.com/api/v1/stand_ups',
    // urlRoot: 'http://localhost:3000/api/v1/stand_ups',
    paramRoot: 'stand_up',

    defaults: {
        update_text: '',
        noted_at: '',
        milestone_id: '', 
        id: null
    }
    
});

module.exports = StandUpModel;