'use strict';

var Backbone = require('backbone'),
	Marionette = require('backbone.marionette'),
	template = require('../templates/user_password_template.html'),
	UserPasswordModel = require('../entities/user_password_model.js');

	var UserPasswordView = Marionette.ItemView.extend({

		className: 'row user_password_container',

		template: template,

		model: new UserPasswordModel(),

		ui: {
			inputUsername: '#username',
			inputPassword: '#password',
			inputConfirm:  '#confirm',
			errorUsername: '.username_error',
			errorPassword: '.password_error',
			errorConfirm: '.error_confirm'
		},

		events: {
			'focusin input': 'focusedInput',
			'focusout input': 'checkForm',
			'click #registerButton': 'registerUser'
		},

		registerUser: function(e) {
			/*debugger;*/
			e.preventDefault;

			if(this.validateForm('signup')) {
				debugger;
				console.log(this.model);
				console.log(this.model.get('username'));
				console.log(this.$('#username').val());

				var self = this;

				this.model.set({
					username: this.$('#username').val(),
					password: this.$('#password').val(),
					confirm: this.$('#confirm').val(),
				});

				console.log(this.model.get('username'));

				this.model.save({}, {
					success: function(response) {
						debugger;
						console.log(response);
						/*window.localStorage.setItem('token', response.get('token'));*/
					},
					error: function (model, xhr, options) {
						debugger;
						//fake-rest-api -c ./fake_rest_api_backup/config.json start

						/*var errors = xhr.responseJSON.message;*/
						console.log(xhr);
						//hie errors
					}
				});
			}
		},


		focusedInput: function(e) {
			var selector = '.' + e.target.id + '_error';
			$(selector).css('visibility', 'hidden');
		},

		validateForm: function(dataValidate, data) {
			/*debugger;*/
			var /*regexTextValid = /^([A-Z][a-z ,.'`-]{2,30})$)/,*/
				regexTextValid = /^.{8,}$/,
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
				/*debugger;*/

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
			/*debugger;*/
			console.log(this);
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

module.exports = UserPasswordView;