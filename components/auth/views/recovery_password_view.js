'use strict';

var Backbone = require('backbone'),
	Marionette = require('backbone.marionette'),
	template = require('../templates/recovery_password_template.html'),
	headerView = require ('../../layout/header/views/header_view.js'),
	RecoveryPasswordModel = require('../entities/recovery_password_model.js');

var RecoveryPasswordView = Marionette.ItemView.extend({

	className: 'recovery_password_container',

	template: template,

	model: new RecoveryPasswordModel(),

	events: {
		'focusin input': 'focusedInput',
		'focusout input': 'validateRecovery',
		'click .close_recovery': 'hideRecoveryModal',
		'click .send_recovery': 'recoveryPassword',
	},

	focusedInput: function(e) {
		e.preventDefault();

		var selector = '.' + e.target.id + '_error';
		$(selector).css('visibility', 'hidden');
	},

	validateRecovery: function() {
		
		var regExEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
			email = $('.email_recovery').val();

			if(!regExEmail.test(email)) {
				this.$('.email_error').css('visibility', 'visible');
				return false; 
			} else {
				return true;
			}
	},

	recoveryPassword: function () {

		var authToken = window.localStorage.getItem('auth_token');
		
		if(this.validateRecovery()) {

			this.model.set({
				email: this.$('.email_recovery').val(),
				auth_token: authToken
			});

			this.model.save({}, {
				success: function(model, response, options) {

					window.location.replace('/#');
					window.location.reload();
				},
				error: function (model, xhr, options) {
					console.log(xhr);
				}
			});
		}
	},

	hideRecoveryModal: function(e) {
		e.preventDefault();
		App.regions.auth.empty({preventDestroy: true});
	}
	
});

var recoveryPasswordView = new RecoveryPasswordView();
module.exports = recoveryPasswordView;