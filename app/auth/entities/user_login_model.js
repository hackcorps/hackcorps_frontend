'use strict';
require('backbone-rails-sync');

var UserLoginModel = Backbone.Model.extend({
	urlRoot: 'http://hackdashboard.herokuapp.com/api/v1/users/sign_in',
	// urlRoot: 'http://localhost:3000/api/v1/users/sign_in',
	paramRoot: 'user',

	defaults: {
		email: '',
		password: ''
	}
});

module.exports = UserLoginModel;