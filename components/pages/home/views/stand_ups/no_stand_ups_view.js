'use strict';

var Marionette = require('backbone.marionette'),
    template = require('../../templates/stand_ups/no_stand_ups_template.html');

var NoStandUpsView = Marionette.ItemView.extend({

    template: template

});

module.exports = NoStandUpsView;