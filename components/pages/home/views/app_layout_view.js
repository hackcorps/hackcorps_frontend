'use strict';

var Backbone = require('backbone'),
    Marionette = require('backbone.marionette'),
    template = require('../templates/app_layout_template.html');

var AppLayoutView = Marionette.LayoutView.extend({
    template: template,

    regions: {
        status: "#left-region",
        milestones: "#right-region"
    }
});

module.exports = AppLayoutView;