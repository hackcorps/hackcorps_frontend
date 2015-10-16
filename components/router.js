'use strict';

var App = require('./main.js');
var Marionette = require('backbone.marionette');
var UserPasswordView = require ('./auth/views/user_password_view.js');

var Router = Marionette.AppRouter.extend({
	appRoutes: {
		'home': 'showHome'
	}
});

var API = {
	showHome: function() {
		var staticUserPasswordView = new UserPasswordView();
		App.regions.auth.show(staticUserPasswordView);
	}
};

App.on('hack:home', function() {
	new Router({
		controller: API
	});
	App.navigate('home');
	API.showHome();
});

