'use strict';

var Marionette = require('backbone.marionette'),
	template = require('../templates/recovery_password_template.html'),
	RecoveryPasswordModel = require('../entities/recovery_password_model.js'),
	loader = require('../../layout/loader.js');

var RecoveryPasswordView = Marionette.ItemView.extend({

	className: 'row recovery_password_container',

	template: template,

	model: new RecoveryPasswordModel(),

	events: {
		'focusin input': 'focusedInput',
		'focusout input': 'validateRecovery',
		'click .close_modal': 'hideRecoveryModal',
		'click .send_recovery': 'recoveryPassword',
	},

	onDomRefresh: function() {
        $('.recovery_password_container').css('height', window.innerHeight);
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
				this.$('.email_recovery_error').css('visibility', 'visible');
				return false; 
			} else {
				return true;
			}
	},

	recoveryPassword: function () {		
		if(this.validateRecovery()) {
			loader.show();

			this.model.set({
				email: this.$('.email_recovery').val(),
			});

			this.model.save({}, {
				success: function(model, response, options) {

					window.location.replace('/#');
					window.location.reload();
					loader.hide();
				},
				error: function (model, xhr, options) {
					
					alert('Some error!');

					window.location.replace('/#');
					window.location.reload();
					loader.hide();
				}
			});
		}
	},

	hideRecoveryModal: function(e) {
		e.preventDefault();
		App.vent.trigger('hack:login');
	}
	
});

module.exports = RecoveryPasswordView;