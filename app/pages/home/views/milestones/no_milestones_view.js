'use strict';

var Marionette = require('backbone.marionette'),
    template = require('../../templates/milestones/no_milestones_template.html');

var NoMilestonesView = Marionette.ItemView.extend({

    template: template

});

module.exports = NoMilestonesView;