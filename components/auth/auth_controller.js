'use strict';

var Backbone = require('backbone'),
    Marionette = require('backbone.marionette'),
    UserRegistrationView = require('./views/user_registration_view.js'),
    HeaderView = require('../layout/header/views/header_view.js'),
    UserLoginView = require('./views/user_login_view.js'),
    RecoveryPasswordView = require('./views/recovery_password_view.js'),
    RecoveryPasswordCreateView = require('./views/recovery_password_create_view.js');

var AuthController = Marionette.ItemView.extend({
    
    headerView: new HeaderView(),
    userRegistrationView: new UserRegistrationView(),
    userLoginView: new UserLoginView(),
    recoveryPasswordView: new RecoveryPasswordView(),
    recoveryPasswordCreateView: new RecoveryPasswordCreateView(),

    initialize: function() {
          App.vent.on('render:user_registration_view', this.renderUserRegistrationView, this);
          App.vent.on('render:user_login_view', this.renderUserLoginView, this); 
          App.vent.on('render:recovery_password_view', this.renderRecoveryPasswordView, this); 
          App.vent.on('render:recovery_password_create_view', this.RecoveryPasswordCreateView, this); 
    },

    renderUserRegistrationView: function(data) {
        this.userRegistrationView.model.set(data);
        App.regions.auth.show(this.userRegistrationView);
    },

    renderUserLoginView: function() {
        App.regions.auth.show(this.userLoginView, {preventDestroy: true});
    },

    renderRecoveryPasswordView: function() {
        App.regions.auth.show(this.recoveryPasswordView, {preventDestroy: true});
    },

    renderRecoveryPasswordCreateView: function() {
        App.regions.auth.show(this.recoveryPasswordCreateView, {preventDestroy: true});
    }

  });

module.exports = AuthController;