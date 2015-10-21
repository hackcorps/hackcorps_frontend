'use strict';

var Backbone = require('backbone'),
	Marionette = require('backbone.marionette'),
	headerView = require('./layout/header/views/header_view.js'),
	HomeView = require('./pages/home/views/home_view.js'),
	userRegistrationView = require ('./auth/views/user_registration_view.js');

var Router = Marionette.AppRouter.extend({
	appRoutes: {
		'home': 'showHome'
	},
	routes: {
		'home/register': 'showRegister'
	}
});

var API = {
	showRegister: function() {
		App.regions.auth.show(userRegistrationView);
	},
	showHome: function() {
		var staticHomeView = new HomeView();
		App.regions.main.show(staticHomeView);

		App.regions.header.show(headerView);
	}
};

App.on('hack:register', function() {
	new Router({
		controller: API
	});
	App.navigate('home/register');
	API.showRegister();
});

App.on('hack:home', function() {
	new Router({
		controller: API
	});
	App.navigate('home');
	API.showHome();
});

