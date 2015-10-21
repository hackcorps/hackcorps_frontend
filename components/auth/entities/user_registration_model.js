'use strict';

var UserRegistrationModel = Backbone.Model.extend({
	urlRoot: 'http://hackdashboard.herokuapp.com/api/v1/users',
/*	urlRoot: 'http://localhost:3002/people',*/

	defaults: {
		email: 'vitalik@gmail.con',
		full_name: '',
		password: '',
		password_confirmation: '',
		invite_token: 'aQjfcNN1zw2InudTCO4olw'
	}
});

module.exports = UserRegistrationModel;