'use strict';

require('./styles/main.scss');
require('bootstrap-webpack');

var Backbone = require('backbone'),
	Marionette = require('backbone.marionette'),
	loader = require('./layout/loader.js');

var App = window.App = new Marionette.Application();

var loaderImg = document.createElement('img');
loaderImg.setAttribute('src', 'images/loader.gif');
loaderImg.setAttribute('alt', 'loading...');
loaderImg.setAttribute('class', 'loader');
document.body.appendChild(loaderImg);

App.on('before:start', function() {

	var RegionContainer = Marionette.LayoutView.extend({
		el: '#app-container',

		regions: {
			header: '#header-region',
			main: '#main-region',
			auth: '#auth-region',
		}
	});

	App.regions = new RegionContainer();

});

App.getCurrentRoute = function(){
	return Backbone.history.fragment;
};

App.navigate = function(route,  options){
	options || (options = {});
	Backbone.history.navigate(route, options);
};

function findHashValue (hash, str) {
	return hash.indexOf(str) != (-1) ? true : false;
};

var currentHash = window.location.hash,
	hashArr = currentHash.split('='),
	strRegister = 'register',
	strRecovery = 'recovery';

if(window.localStorage.getItem('auth_token')) {
	App.currentUser = {};
} else {
	App.currentUser = null;
}

App.commands.setHandler('logged_out', function() {
	App.currentUser = null;
  	App.vent.trigger('hack:index');
});

App.commands.setHandler('logged_in', function() {
	App.currentUser = {};
  	App.vent.trigger('hack:home');
});

App.on('start', function() {

	if(Backbone.history) {
		Backbone.history.start();
	}

	if(App.currentUser) {
    	App.execute('logged_in');
  	} else if (findHashValue(currentHash, strRegister)) {
		var	orgName = hashArr[2],
			inviteToken = hashArr[1].split('&')[0];
		window.localStorage.setItem('invite_token', inviteToken);
		window.localStorage.setItem('org_name', orgName);
		App.reqres.setHandler('orgname:register', function() {
			return {org_name: orgName};
		});
		App.vent.trigger('hack:register');
	} else if (findHashValue(currentHash, strRecovery)) {
		var	recoveryToken = hashArr[1];
		window.localStorage.setItem('reset_password_token', recoveryToken);
		App.vent.trigger('hack:recovery');
	} else {
    	App.execute('logged_out');
  	}
});

module.exports = App;
require ('./router.js');

