'use strict';

var Marionette = require('backbone.marionette'),
    template = require('../templates/milestone_item_template.hbs');

var MilestonesItemView = Marionette.ItemView.extend({

    template: template,

    events: {
    	'click .milestone-container': 'showEditMilestoneModal'
    },

    modelEvents: {
    	'sync': 'onModelChange'
  	},

    onModelChange: function() {
    	this.render();;
    },

    showEditMilestoneModal: function() {
        App.vent.trigger('click:milestone', this.model);
    }
});

module.exports = MilestonesItemView;