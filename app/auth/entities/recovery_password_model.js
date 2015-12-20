'use strict';
require('backbone-rails-sync');

var RecoveryPasswordModel = Backbone.Model.extend({
	urlRoot: 'http://hackdashboard.herokuapp.com/api/v1/users/password',
	/*urlRoot: 'http://localhost:3000/api/v1/users/password',*/
	
	paramRoot: 'user',

	defaults: {
		email: '',
		auth_token: ''
	}
});

module.exports = RecoveryPasswordModel;