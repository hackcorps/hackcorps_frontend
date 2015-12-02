'use strict';

var Backbone = require('backbone'),
	Marionette = require('backbone.marionette'),
	template = require('../templates/header_template.html');
	
var HeaderView = Marionette.ItemView.extend({

	template: template,

	events: {
		'click .login_link': 'showLoginModal',
		'click .logout_link': 'logoutUser'
	},

	onBeforeShow: function() {
		if(App.currentUser) {
			this.$('.login_link').css({'display': 'none'});
			this.$('.org_name').text(window.localStorage.getItem('org_name'));
			this.$('.org_name').css({'visibility': 'visible'});
		} else {
			this.$('.logout_link').css({'display': 'none'});
		}
	},

	showLoginModal: function (e) {
		e.preventDefault();

		App.regions.header.empty( {preventDestroy: true} );
		App.regions.main.empty( {preventDestroy: true} );
		App.vent.trigger('hack:login');
	},

	logoutUser: function (e) {
		e.preventDefault();

		var self = this;
		var auth_token = window.localStorage.getItem('auth_token');

		$.ajax({
			type: 'DELETE',
			url: 'http://hackdashboard.herokuapp.com/api/v1/users/sign_out',
			/*url: 'http://localhost:3000/api/v1/users/sign_out',*/
			dataType: 'json',
			crossDomain: true,
			xhrFields: {withCredentials: false},
			headers: {
				'Authorization': window.localStorage.getItem('auth_token')
			},
			success: function (data) {
				
				window.localStorage.setItem('auth_token', '');

				App.execute('logged_out');

			},
			error: function (data) {
				
				alert('Some error!');

				window.location.replace('#');
				window.location.reload();
			}
		});
	}
});

module.exports = HeaderView;