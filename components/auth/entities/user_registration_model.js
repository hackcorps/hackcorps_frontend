'use strict';
require('backbone-rails-sync');

var UserRegistrationModel = Backbone.Model.extend({
	urlRoot: 'http://hackdashboard.herokuapp.com/api/v1/users',
	/*urlRoot: 'http://localhost:3000/api/v1/users',*/
	paramRoot: 'user',

	defaults: {
		full_name: '',
		password: '',
		password_confirmation: '',
		invite_token: '',
		org_name: ''
	}
});

module.exports = UserRegistrationModel;