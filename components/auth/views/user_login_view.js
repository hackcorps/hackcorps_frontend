'use strict';

var Backbone = require('backbone'),
	Marionette = require('backbone.marionette'),
	template = require('../templates/user_login_template.html'),
	headerView = require ('../../layout/header/views/header_view.js'),
	recoveryPasswordView = require ('./recovery_password_view.js'),
	UserLoginModel = require('../entities/user_login_model.js');

var UserLoginView = Marionette.ItemView.extend({

	className: 'user_login_container',

	template: template,

	model: new UserLoginModel(),

	events: {
		'focusin input': 'focusedInput',
		'focusout input': 'validateLogin',
		'click .submit_button': 'loginUser',
		'click .close_modal': 'hideLoginModal',
		'click .forgot_link': 'showRecoveryModal'
	},

	focusedInput: function(e) {
		e.preventDefault();

		var selector = '.' + e.target.id + '_error';
		$(selector).css('visibility', 'hidden');
	},

	validateLogin: function() {

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

	loginUser: function() {

		if(this.validateLogin()) {

			this.model.set({
				email: this.$('#email_login').val(),
				password: this.$('#password_login').val()
			});

			this.model.save({}, {
				success: function(model, response, options) {
					console.log(response);

					window.localStorage.setItem('auth_token', 'nnnnnnnnnnnnnnnnnnn');
					window.localStorage.setItem('email', 'vitalik@');

					App.vent.trigger("authentication:logged_in");

					window.location.replace('/#');
					window.location.reload();
				},
				error: function (model, xhr, options) {
					console.log(xhr);
				}
			});
		}
	},

	hideLoginModal: function(e) {
		e.preventDefault();
		App.regions.auth.empty({preventDestroy: true});
	},

	showRecoveryModal: function(e) {
		e.preventDefault();
		App.regions.auth.show(recoveryPasswordView, {preventDestroy: true});
	}
	
});

var userLoginView = new UserLoginView();
module.exports = userLoginView;