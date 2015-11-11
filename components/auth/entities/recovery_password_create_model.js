'use strict';
require('backbone-rails-sync');

var RecoveryPasswordCreateModel = Backbone.Model.extend({
/*	urlRoot: 'http://hackdashboard.herokuapp.com/api/v1/users/sign_out',*/
	paramRoot: 'user',

	defaults: {
		password: '',
		password_confirmation: '',
		recovery_token: ''
	}
});

module.exports = RecoveryPasswordCreateModel;