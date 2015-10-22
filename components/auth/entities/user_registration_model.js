'use strict';
require('backbone-rails-sync');

var UserRegistrationModel = Backbone.Model.extend({
	/*urlRoot: 'http://hackdashboard.herokuapp.com/api/v1/users',*/
	urlRoot: 'http://localhost:3002/people',
	paramRoot: 'user',

	defaults: {
		email: '',
		full_name: '',
		password: '',
		password_confirmation: '',
		invite_token: ''
	}
});

module.exports = UserRegistrationModel;