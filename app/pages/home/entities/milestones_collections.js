'use strict';
require('backbone-rails-sync');

var MilestoneModel = require('./milestone_model.js');

var MilestonesCollection = Backbone.Collection.extend({
	// url: 'http://hackdashboard.herokuapp.com/api/v1/milestones',
	url: 'http://localhost:3000/api/v1/milestones',
	model: MilestoneModel,

	parse: function(response) {
		return response.milestones;
	}

});

var API = {
	getMilestoneEntities: function() {
	    var milestones = new MilestonesCollection();
	    var defer = $.Deferred();
	      
	    milestones.fetch({
	      	success: function(data){
	        	defer.resolve(data);
	        },
	        error: function() {
                alert('some error');
            }
	    });
	      
	    var promise = defer.promise();
	    return promise;
	}
};

App.reqres.setHandler('milestone:entities', function(){
	return API.getMilestoneEntities();
});

module.exports = MilestonesCollection;



