'use strict';

var	Backbone = require('backbone'),
	Marionette = require('backbone.marionette'),
	headerView = require('./layout/header/views/header_view.js'),
	homeView = require('./pages/home/views/home_view.js'),
	userRegistrationView = require ('./auth/views/user_registration_view.js'),
	recoveryPasswordCreateView = require ('./auth/views/recovery_password_create_view.js');

var Router = Marionette.AppRouter.extend({
	appRoutes: {
		'home': 'showHomeView'
	},
	routes: {
		'home/register': 'showRegisterView'
	}
});

App.API = {

	showHomeView: function() {
		App.regions.main.show(homeView);
		App.regions.header.show(headerView);
	},

	showRegisterView: function() {
		App.regions.auth.show(userRegistrationView);
	},

	showRecoveryCreateView: function() {
		App.regions.auth.show(recoveryPasswordCreateView);
	}
};

App.vent.on('hack:home', function() {
	new Router({
		controller: App.API
	});
	App.navigate('home');
	App.API.showHomeView();
});

App.vent.on('hack:register', function() {
	new Router({
		controller: App.API
	});
	App.navigate('home/register');
	App.API.showRegisterView();
});

App.vent.on('hack:recovery', function() {
	new Router({
		controller: App.API
	});
	App.navigate('home/recovery');
	App.API.showRecoveryCreateView();
});

