'use strict';
require('backbone-rails-sync');

var SummaryModel = Backbone.Model.extend({
	urlRoot: 'http://hackdashboard.herokuapp.com/api/v1/stand_up_summaries',
    // urlRoot: 'http://localhost:3000/api/v1/stand_up_summaries',
    paramRoot: 'stand_up_summary',

    defaults: {
        text: '',
        noted_date: '',
        stand_ups: '',
        id: null
    }
    
});

module.exports = SummaryModel;