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

/*App.vent.on("authentication:logged_out", function() {
	App.trigger('hack:home');
});*/

App.on('start', function() {
	debugger;
	Backbone.history.start();
	if(this.getCurrentRoute() === '' || this.getCurrentRoute() === 'home') {
		App.trigger('hack:home');
	} else if (this.getCurrentRoute() === 'home/register') {
		App.trigger('hack:register');
	}
});



module.exports = App;

require ('./router.js');

