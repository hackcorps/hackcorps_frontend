'use strict';

var Marionette = require('backbone.marionette'),
	template = require('../templates/recovery_password_create_template.html'),
	RecoveryPasswordCreateModel = require('../entities/recovery_password_create_model.js'),
	loader = require('../../layout/loader.js');

var RecoveryPasswordCreateView = Marionette.ItemView.extend({

	className: 'row recovery_password_create_container',

	template: template,

	model: new RecoveryPasswordCreateModel(),

	events: {
		'focusin input': 'focusedInput',
		'focusout input': 'validateRecovery',
		'click .send_recovery': 'recoveryPassword'
	},

	onDomRefresh: function() {
        $('.recovery_password_create_container').css('height', window.innerHeight);
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
			loader.show();

		var recoveryToken = window.localStorage.getItem('reset_password_token'),
			password = this.$('#password').val(),
			password_confirmation = this.$('#confirm').val(),
			self = this;

		$.ajax({
			type: 'PUT',
			url: 'http://hackdashboard.herokuapp.com/api/v1/users/password',
			// url: 'http://localhost:3000/api/v1/users/password',
			dataType: 'json',
			crossDomain: true,
			xhrFields: {withCredentials: false},
			data: {
				user: {
					reset_password_token: recoveryToken,
					password: password,
					password_confirmation: password_confirmation
				}
			},
			headers: {
				'Authorization': window.localStorage.getItem('auth_token')
			},
			success: function (data) {

				window.location.replace('/#');
				window.location.reload();
				loader.hide();

			},
			error: function (data) {

				alert('Some error!');

				window.location.replace('/#');
				window.location.reload();
				loader.hide();
			}
		});
	},
	
});

module.exports = RecoveryPasswordCreateView;