'use strict';

var	Backbone = require('backbone'),
	Marionette = require('backbone.marionette'),
	HeaderView = require('./layout/header/views/header_view.js'),
	IndexView = require('./pages/index/views/index_view.js'),
	AuthController = require ('./auth/auth_controller.js'),
	HomeController = require ('./pages/home/home_controller.js');

var Router = Marionette.AppRouter.extend({
	appRoutes: {
		'': 'showHomeView'
	},
	routes: {
		'register': 'showRegisterView'
	}
});

App.API = {

	showIndexView: function() {
		App.regions.main.show(new IndexView);
		App.regions.header.show(new HeaderView);
	},
	showHomeView: function() {
		App.regions.header.show(new HeaderView);
		var homeController = new HomeController();
		homeController.renderAppLayoutView();
	},

	showLoginView: function() {
		App.regions.header.empty( {preventDestroy: true} );
		App.regions.main.empty( {preventDestroy: true} );

		var authController = new AuthController();
		authController.renderUserLoginView();
	},

	showRegisterView: function() {
		var orgName = App.reqres.request('orgname:register');
		var authController = new AuthController();
		authController.renderUserRegistrationView(orgName);
	},

	showRecoveryPasswordView: function() {
		var authController = new AuthController();
		authController.renderRecoveryPasswordView();
	},

	showRecoveryCreateView: function() {
		var authController = new AuthController();
		authController.renderRecoveryPasswordCreateView();
	}
};

App.commands.setHandler('show:recovery:modal', function() {
	new Router({
		controller: App.API
	});
	App.API.showRecoveryPasswordView();
});


App.vent.on('hack:index', function() {
	new Router({
		controller: App.API
	});
/*	App.navigate('');*/
	App.API.showIndexView();
});

App.vent.on('hack:home', function() {
	new Router({
		controller: App.API
	});
/*	App.navigate('');*/
	App.API.showHomeView();
});

App.vent.on('hack:login', function() {
	new Router({
		controller: App.API
	});
/*	App.navigate('login');*/
	App.API.showLoginView();
});

App.vent.on('hack:register', function() {
	new Router({
		controller: App.API
	});
/*	App.navigate('register');*/
	App.API.showRegisterView();
});

App.vent.on('hack:recovery', function() {
	new Router({
		controller: App.API
	});
/*	App.navigate('recovery');*/
	App.API.showRecoveryCreateView();
});

