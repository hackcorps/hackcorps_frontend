'use strict';

var Backbone = require('backbone'),
	Marionette = require('backbone.marionette'),
	template = require('../templates/recovery_password_create_template.html'),
	headerView = require ('../../layout/header/views/header_view.js'),
	RecoveryPasswordCreateModel = require('../entities/recovery_password_create_model.js');

var RecoveryPasswordCreateView = Marionette.ItemView.extend({

	className: 'recovery_password_create_container',

	template: template,

	model: new RecoveryPasswordCreateModel(),

	events: {
		'focusin input': 'focusedInput',
		'focusout input': 'validateRecovery',
		'click .send_recovery': 'recoveryPassword'
	},

	focusedInput: function(e) {
		e.preventDefault();

		var selector = '.' + e.target.id + '_error';
		$(selector).css('visibility', 'hidden');
	},

	validateRecovery: function() {
		
		var regExPassword = /^.{8,}$/,
			password = $('#password').val(),
			confirm = $('#confirm').val();


			if(!regExPassword.test(password)) {
				$('.password_error').css('visibility', 'visible');
				return false;
			} else if(password !== confirm) {
				$('.confirm_error').css('visibility', 'visible');
				return false;
			} else {
				return true;
			}

	},

	recoveryPassword: function () {

		var recoveryToken = window.localStorage.getItem('recovery_token'),
			self = this;

		if(this.validateRecovery()) {

			this.model.set({
				password: this.$('#password').val(),
				password_confirmation: this.$('#confirm').val(),
				recovery_token: recoveryToken
			});

			this.model.save({}, {
				success: function(model, response, options) {

					console.log(response);
					
					window.localStorage.setItem('auth_token', 'bbbbbbbbbbbbbbbbbbb');

					window.location.replace('/#');
					window.location.reload();
				},
				error: function (model, xhr, options) {
					console.log(xhr);
				}
			});
		}
	},
	
});

var recoveryPasswordCreateView = new RecoveryPasswordCreateView();
module.exports = recoveryPasswordCreateView;