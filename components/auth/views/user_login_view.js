'use strict';

var Backbone = require('backbone'),
	Marionette = require('backbone.marionette'),
	template = require('../templates/user_login_template.html'),
	UserLoginModel = require('../entities/user_login_model.js');

var UserLoginView = Marionette.ItemView.extend({

	className: 'row user_login_container',

	template: template,

	model: new UserLoginModel(),

	events: {
		'focusin input': 'focusedInput',
		'focusout input': 'validateLogin',
		'click .submit_button': 'loginUser',
		'click .close_modal': 'hideLoginModal',
		'click .forgot_link': 'showRecoveryModal',
		'click .send_recovery': 'recoveryPassword'
	},

	onDomRefresh: function() {
        $('.user_login_container').css('height', window.innerHeight);
  	},

  	focusedInput: function(e) {

		var selector = '.' + e.target.id;

		if (selector == '.email_login') {
			this.$(selector + '_error').css('visibility', 'hidden').text('Enter a valid Email!');
		} else if (selector == '.password_login') {
			this.$(selector + '_error').css('visibility', 'hidden').text('Pis more then 8 symbols!');
		}
	},

	validateLogin: function(e) {
		var regExEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
			regExPassword = /^.{8,}$/, //1 digit, 1 small char, 1 big char, 8 char min
			email = $('#email_login').val(),
			password = $('#password_login').val();

			if(email === '') {
			  	this.$('.email_login_error').css('visibility', 'visible').text('Field is required!');
			  	return false;
			} else if(!regExEmail.test(email)) {
				this.$('.email_login_error').css('visibility', 'visible');
				return false;
			} else if(password === '') {
			 	this.$('.password_login_error').css('visibility', 'visible').text('Field is required!');
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

					window.localStorage.setItem('auth_token', response.user.auth_token);
					window.localStorage.setItem('email', response.user.email);
					window.localStorage.setItem('role', response.user.role);
					
					window.location.reload();

				},
				error: function (model, xhr, options) {

					alert('Some error!');

					window.location.replace('#');
					window.location.reload();
				}
			});
		}
	},

	hideLoginModal: function(e) {
		e.preventDefault();
		App.regions.auth.empty({preventDestroy: true});
		App.vent.trigger('hack:home');
	},

	showRecoveryModal: function(e) {
		e.preventDefault();
		App.execute('show:recovery:modal');
	}
	
});

module.exports = UserLoginView;