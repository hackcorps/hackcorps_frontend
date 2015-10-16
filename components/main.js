'use strict';

require('./styles/main.scss');

var Backbone = require('backbone');
var Marionette = require('backbone.marionette');

var App = window.App = new Marionette.Application();

App.on('before:start', function() {
	var RegionContainer = Marionette.LayoutView.extend({
		el: '#app-container',

		regions: {
			header: '#header-region',
			main: '#main-region',
			auth: '#auth-region'
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

App.on('start', function() {
	Backbone.history.start();
	console.log(this.getCurrentRoute());
	if(this.getCurrentRoute() === '') {
		App.trigger('hack:home');
		console.log(this.getCurrentRoute());
	};
	App.trigger('hack:home');
});

module.exports = App;

require ('./router.js');