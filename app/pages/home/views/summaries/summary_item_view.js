'use strict';

var Marionette = require('backbone.marionette'),
    template = require('../../templates/summaries/summary_item_template.hbs');

var SummaryItemView = Marionette.ItemView.extend({

    template: template,

    events: {
        'click .summary-container': 'showEditSummaryModal'
    },

    modelEvents: {
    	'sync': 'onModelChange'
  	},

    onModelChange: function() {
    	this.render();;
    },

    showEditSummaryModal: function() {
        App.vent.trigger('click:standup', this.model);
    }
});

module.exports = SummaryItemView;