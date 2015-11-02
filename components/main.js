'use strict';

require('./styles/main.scss');

var Backbone = require('backbone'),
	Marionette = require('backbone.marionette');

var App = window.App = new Marionette.Application();

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

function findToken (arr) {
	return hashArr[1] ? true : false;
};

var currentHash = window.location.hash,
	hashArr = currentHash.split('='),
	strRegister = 'register',
	strRecovery = 'recovery',
	strInvite = 'invite_token';

App.on('start', function() {
	if( this.getCurrentRoute() === '' || this.getCurrentRoute() === 'home' ) {
		App.vent.trigger('hack:home');
	} else if (  findHashValue(currentHash, strRegister) /*&& findToken(hashArr)*/ ) {
		window.localStorage.setItem('invite_token', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
		window.localStorage.setItem('email', 'vitalika1988@gmail.com');
		App.vent.trigger('hack:register');
	} else if (  findHashValue(currentHash, strRecovery) && findToken(hashArr) ) {
		window.localStorage.setItem('recovery_token', 'ssssssssssssssssssssssss');
		App.vent.trigger('hack:recovery');
	} else ( App.vent.trigger('hack:home') );
});

module.exports = App;

require ('./router.js');

