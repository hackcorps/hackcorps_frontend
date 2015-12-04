'use strict';

var Marionette = require('backbone.marionette'),
    template = require('../../templates/stand_ups/stand_up_item_template.hbs');

var StandUpItemView = Marionette.ItemView.extend({

    template: template,

    events: {
        'click .stand-up-container': 'showEditStandUpModal'
    },

    modelEvents: {
    	'sync': 'onModelChange'
  	},

    onModelChange: function() {
    	this.render();;
    },

    showEditStandUpModal: function() {
        App.vent.trigger('click:standup', this.model);
    }
});

module.exports = StandUpItemView;