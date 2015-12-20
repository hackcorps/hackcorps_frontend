'use strict';
require('backbone-rails-sync');

var RecoveryPasswordCreateModel = Backbone.Model.extend({
	paramRoot: 'user',

	defaults: {
		password: '',
		password_confirmation: '',
		recovery_token: ''
	}
});

module.exports = RecoveryPasswordCreateModel;