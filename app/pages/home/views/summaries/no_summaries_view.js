'use strict';

var Marionette = require('backbone.marionette'),
    template = require('../../templates/summaries/no_summaries_template.html');

var NoSummariesView = Marionette.ItemView.extend({

    template: template

});

module.exports = NoSummariesView;