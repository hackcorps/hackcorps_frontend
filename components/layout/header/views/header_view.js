'use strict';

var Backbone = require('backbone'),
	Marionette = require('backbone.marionette'),
	CurrentUserModel = require('../entities/current_user_model.js'),
	template = require('../templates/header_template.html'),
	userRegistrationView = require ('../../../auth/views/user_registration_view.js');
	
var HeaderView = Marionette.ItemView.extend({

	className: 'user_login_container',

	template: template,

	model: new CurrentUserModel(),

	events: {
		'focusin input': 'focusedInput',
		'focusout input': 'validateLogin',
		'click .login_link': 'showLoginModal',
		'click .close_modal': 'hideLoginModal',
		'click .submit_button': 'loginUser',
		'click .forgot_link': 'showRecoveryModal',
		'click .close_recovery': 'hideRecoveryModal',
		'click .send_recovery': 'recoveryPassword',
		'click .logout_link': 'logoutUser'
	},

	showLoginModal: function (e) {
		e.preventDefault();

		$('.login_modal').show();
	},

	hideLoginModal: function(e) {
		e.preventDefault();

		$('.login_modal').hide();
	},

	showRecoveryModal: function(e) {
		e.preventDefault();

		$('.login_modal').hide();

		$('.recovery_modal').show();
	},

	hideRecoveryModal: function(e) {
		e.preventDefault();

		$('.recovery_modal').hide();
	},

	recoveryPassword: function (e) {
		e.preventDefault();
	},

	focusedInput: function(e) {
		e.preventDefault();

		var selector = '.' + e.target.id + '_error';
		$(selector).css('visibility', 'hidden');

	},

	validateLogin: function(e) {
		/*	e.preventDefault();*/
		
		var regExEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
			regExPassword = /^.{8,}$/, //1 digit, 1 small char, 1 big char, 8 char min
			email = $('#email_login').val(),
			password = $('#password_login').val();

			if(!regExEmail.test(email)) {
				this.$('.email_login_error').css('visibility', 'visible');
				return false;
			} else if(!regExPassword.test(password)) {
				this.$('.password_login_error').css('visibility', 'visible');
				return false;   
			} else {
				return true;
			}
	},

	loginUser: function(e) {
		/*	e.preventDefault();*/

		if(this.validateLogin()) {

			this.model.set({
				email: this.$('#email_login').val(),
				password: this.$('#password_login').val()
			});

			console.log(this.model);

			var self = this;

			this.model.save({}, {
				success: function(response) {
					console.log(response);
				},
				error: function (model, xhr, options) {
					console.log(xhr);
				}
			});
		}
	},

	logoutUser: function (e) {

		e.preventDefault();

		var auth_token = window.localStorage.getItem('auth_token'),
			email = window.localStorage.getItem('email');

		this.model.set({
			auth_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0N…oyMX0.vb5PXAnIkVqSeJ9SDer72YjxtSwC3Y1FT9BPeqCp-bQ',
		});

		console.log(this.model);

		/*App.vent.trigger("authentication:logged_out");*/

		$.ajax({
			type: 'DELETE',
			url: 'http://hackdashboard.herokuapp.com/api/v1/users/sign_out',
		/*	url: 'http://localhost:3002/people/1',*/
			dataType: 'json',
			crossDomain: true,
			xhrFields: {withCredentials: false},
			data: {
				auth_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0NDYwMzQ4ODAsImlkIjoyNH0.Zhm5iAZPbYsFOp_GC1c4Ysmg5VZwxaKA42chCwWwXr8'
			},
			success: function (data) {
				console.log(data);
			},
			error: function (data) {
				console.log(data);
			}
		});

/*		this.model.destroy({
			success: function(response) {
				console.log(response);

				window.localStorage.setItem('auth_token', self.currentUser.auth_token);
				window.localStorage.setItem('email', self.currentUser.email);

			},
			error: function (model, xhr, options) {
				console.log(xhr);
			}
		});*/

	},

});

var headerView = new HeaderView();
module.exports = headerView;