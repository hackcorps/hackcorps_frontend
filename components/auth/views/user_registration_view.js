'use strict';

var Backbone = require('backbone'),
	Marionette = require('backbone.marionette'),
	template = require('../templates/user_registration_template.html'),
	headerView = require ('../../layout/header/views/header_view.js'),
	UserRegistrationModel = require('../entities/user_registration_model.js');

	var UserRegistrationView = Marionette.ItemView.extend({

		className: 'row user_registration_container',

		template: template,

		model: new UserRegistrationModel(),

		events: {
			'focusin input': 'focusedInput',
			'focusout input': 'checkForm',
			'click #registerButton': 'registerUser'
		},

		registerUser: function(e) {
			e.preventDefault;

			var self = this;

			if(this.validateForm('signup')) {

				this.model.set({
					full_name: this.$('#username').val(),
					password: this.$('#password').val(),
					password_confirmation: this.$('#confirm').val(),
				});

			window.localStorage.setItem('auth_token', self.model.get('invite_token'));
			window.localStorage.setItem('email', self.model.get('email'));

				this.model.save({}, {
					success: function(model, response, options) {

						console.log(response);

					/*App.vent.trigger("authentication:logged_out");*/

					},
					error: function (model, xhr, options) {
						console.log(xhr);
					}
				});
			}
		},

		focusedInput: function(e) {
			var selector = '.' + e.target.id + '_error';
			$(selector).css('visibility', 'hidden');
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

			var data,
				selector;

			selector = e.target.id;
			data = this.$('#' + selector).val();

			if(data) {
				if(selector === 'confirm') {
					data = [data, this.$('#password').val()];
				};
				if(!this.validateForm(selector, data)) {
					this.$('.' + selector + '_error').css('visibility', 'visible');
				}
			} else if (data === '') {
				this.$('.' + selector + '_error').css('visibility', 'visible').text('Field is required!');
			}

		}
		
	});

var userRegistrationView = new UserRegistrationView();
module.exports = userRegistrationView;