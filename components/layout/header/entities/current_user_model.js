'use strict';

var CurrentUserModel = Backbone.Model.extend({
/*	urlRoot: 'http://hackdashboard.herokuapp.com/api/v1/users/sign_out',*/
	urlRoot: 'http://localhost:3002/people',

	defaults: {
		email: '',
		password: '',
		auth_token: '',
		id: 2
	}
});

module.exports = CurrentUserModel;