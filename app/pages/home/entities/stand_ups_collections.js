'use strict';
require('backbone-rails-sync');

var StandUpModel = require('./stand_up_model.js');

var StandUpsCollection = Backbone.Collection.extend({
	url: 'http://hackdashboard.herokuapp.com/api/v1/stand_ups',
	// url: 'http://localhost:3000/api/v1/stand_ups',
	model: StandUpModel,

	parse: function(response) {
		return response.stand_ups;
	}

});

var API = {
	getStandUpEntities: function() {
	    var standups = new StandUpsCollection();
	    var defer = $.Deferred();
	      
		standups.fetch({
		    success: function(data, response){
		        defer.resolve(data);
		    },
		    error: function(data, response) {
	            alert('some error');
	        }
		});
	      
	    var promise = defer.promise();
	    return promise;
	}
};

App.reqres.setHandler('standup:entities', function() {
	return API.getStandUpEntities();
});

module.exports = StandUpsCollection;