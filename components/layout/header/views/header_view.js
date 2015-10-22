'use strict';

var Backbone = require('backbone'),
	Marionette = require('backbone.marionette'),
	template = require('../templates/header_template.html'),
	userRegistrationView = require ('../../../auth/views/user_registration_view.js'),
	userLoginView = require ('../../../auth/views/user_login_view.js');
	
var HeaderView = Marionette.ItemView.extend({

	template: template,

	events: {
		'click .login_link': 'showLoginModal',
		'click .logout_link': 'logoutUser'
	},

	showLoginModal: function (e) {
		e.preventDefault();
		App.regions.auth.show(userLoginView);
	},

	logoutUser: function (e) {
		debugger;
		e.preventDefault();

		var auth_token = window.localStorage.getItem('auth_token'),
			email = window.localStorage.getItem('email');

			console.log(auth_token);

		$.ajax({
			type: 'DELETE',
			/*url: 'http://hackdashboard.herokuapp.com/api/v1/users/sign_out',*/
			url: 'http://localhost:3002/people/4',
			dataType: 'json',
			crossDomain: true,
			xhrFields: {withCredentials: false},
			data: {
				auth_token: auth_token,
				email: email
			},
			success: function (data) {
				debugger;
				console.log(data);

				window.localStorage.setItem('auth_token', ' ');
				window.localStorage.setItem('email', ' ');

				console.log(window.localStorage.auth_token);

				App.vent.trigger("authentication:logged_out");
			},
			error: function (data) {
				debugger;
				console.log(data);

				window.localStorage.setItem('auth_token', '');
				window.localStorage.setItem('email', '');

				console.log(window.localStorage.auth_token);
			}
		});

	}

});

var headerView = new HeaderView();
module.exports = headerView;