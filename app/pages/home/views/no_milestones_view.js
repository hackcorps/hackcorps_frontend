'use strict';

var Marionette = require('backbone.marionette'),
    template = require('../templates/no_milestones_template.html');

var NoMilestonesView = Marionette.ItemView.extend({

    template: template

});

module.exports = NoMilestonesView;