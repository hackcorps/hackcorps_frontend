'use strict';
require('backbone-rails-sync');

var RecoveryPasswordCreateModel = Backbone.Model.extend({
/*	urlRoot: 'http://hackdashboard.herokuapp.com/api/v1/users/sign_out',*/
	urlRoot: 'http://localhost:3002/people',
	paramRoot: 'user',

	defaults: {
		password: '',
		password_confirmation: '',
		recovery_token: ''
	}
});

module.exports = RecoveryPasswordCreateModel;