'use strict';

var Marionette = require('backbone.marionette'),
	template = require('../templates/user_registration_template.hbs'),
	UserRegistrationModel = require('../entities/user_registration_model.js'),
	loader = require('../../layout/loader.js');

var UserRegistrationView = Marionette.ItemView.extend({

	className: 'row user_registration_container',

	template: template,

	model: new UserRegistrationModel(),

	events: {
		'focusin input': 'focusedInput',
		'focusout input': 'checkForm',
		'click #registerButton': 'registerUser'
	},

	onDomRefresh: function() {
        $('.user_registration_container').css('height', window.innerHeight);
  	},

	registerUser: function(e) {
		e.preventDefault;

		var self = this,
			inviteToken = window.localStorage.getItem('invite_token');

		if(this.validateForm('signup')) {
			loader.show();

			this.model.set({
				full_name: this.$('#username').val(),
				password: this.$('#password').val(),
				password_confirmation: this.$('#confirm').val(),
				invite_token: inviteToken
			});

			this.model.save({}, {
				wait: true,
				success: function(model, response, options) {
					
					window.localStorage.clear();
					window.localStorage.setItem('auth_token', response.user.auth_token);
					window.localStorage.setItem('email', response.user.email);
					window.localStorage.setItem('role', response.user.role);
					window.localStorage.setItem('organization', response.user.organization);

					window.location.replace('/#');
					window.location.reload();	
					loader.hide	();		
				},
				error: function (model, xhr, options) {
					
					alert('Some error!');

					window.location.replace('/#')
					window.location.reload();
					loader.hide();
				}
			});
		}
	},

	focusedInput: function(e) {

		var selector = '.' + e.target.id;

		if(selector == '.username') {
			this.$(selector + '_error').css('visibility', 'hidden').text('Enter a valid Full Name!');
		} else if (selector == '.password') {
			this.$(selector + '_error').css('visibility', 'hidden').text('Pis more then 8 symbols!');
		} else if (selector == '.confirm') {
			this.$(selector + '_error').css('visibility', 'hidden').text('Confirm should be the same!');
		}
	},

	validateForm: function(dataValidate, data) {

		var regexTextValid = /^([A-Z][a-z ,.'`-]{2,30})$/,
			regexPasswordValid = /^.{8,}$/,
			inputs;

		if(dataValidate === 'signup') {
			inputs =[
				{
					dataValidate: 'username',
					data: this.$('#username').val()
				},
				{
					dataValidate: 'password',
					data: this.$('#password').val()
				},
				{
					dataValidate: 'confirm',
					data: [
						this.$('#password').val(),
						this.$('#confirm').val(),
					]
				}	
			];

			for (var i = 0; i < inputs.length; i++) {
				if(!chooseValid(inputs[i].dataValidate, inputs[i].data)) {
					this.$('.' + inputs[i].dataValidate + '_error').css('visibility', 'visible');
					return false;
				}
			}

			return true;
		};

		function chooseValid (choose, data) {

			switch(choose) {
				case 'username':
					return regexTextValid.test(data) ? 1 : 0;
				break;
				case 'password':
					return regexPasswordValid.test(data) ? 1 : 0;
				break;
				case 'confirm':
					return data[0] === data[1] ? 1 : 0;
				break;
			}
		};

		var res = chooseValid(dataValidate, data);
		return res;
	},

	checkForm: function (e) {

		var selector = e.target.id,
			data = this.$('#' + selector).val();

		if(data) {
			if(selector === 'confirm') {
				data = [data, $('#password').val()];
			};
			if(!this.validateForm(selector, data)) {
				this.$('.' + selector + '_error').css('visibility', 'visible');
			}
		} else if (data === '') {
			this.$('.' + selector + '_error').css('visibility', 'visible').text('Field is required!');
		}

	}
	
});

module.exports = UserRegistrationView;