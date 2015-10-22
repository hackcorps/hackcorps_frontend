'use strict';
require('backbone-rails-sync');

var RecoveryPasswordModel = Backbone.Model.extend({
/*	urlRoot: 'http://hackdashboard.herokuapp.com/api/v1/users/sign_out',*/
	urlRoot: 'http://localhost:3002/people',
	paramRoot: 'user',

	defaults: {
		email: '',
		auth_token: ''
	}
});

module.exports = RecoveryPasswordModel;