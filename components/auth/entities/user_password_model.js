'use strict';

var UserPasswordModel = Backbone.Model.extend({
	urlRoot: 'curl -X POST http://localhost:8880/fake/users',

	defaults: {
		email: 'vitalika',
		username: 'vit',
		password: '',
		confirm: '',
		token: ''
	}
});

module.exports = UserPasswordModel;