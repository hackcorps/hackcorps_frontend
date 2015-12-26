'use strict';

var Marionette = require('backbone.marionette'),
    template = require('../../templates/milestones/milestone_item_template.hbs');

var MilestonesItemView = Marionette.ItemView.extend({

    template: template,

    events: {
    	'click .milestone-container': 'showEditMilestoneModal',
        'click .ok-button': 'completeMilestone'
    },

    modelEvents: {
    	'sync': 'onModelChange'
  	},

    onModelChange: function() {
    	this.render();
    },

    showEditMilestoneModal: function() {
        App.vent.trigger('click:milestone', this.model);
    },

    completeMilestone: function(e) {
        e.stopPropagation();

        if( this.model.get('percent_complete') >= 100) {
            return;
        }

        this.model.set( {'percent_complete': '100'} );
        this.model.save( {}, {
            wait: true,
            success:function(model, response) {
            },
            error: function() {
                alert('some error');
            }
        });
    }
});

module.exports = MilestonesItemView;