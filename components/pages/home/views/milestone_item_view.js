'use strict';

var Backbone = require('backbone'),
    Marionette = require('backbone.marionette'),
    template = require('../templates/milestone_item_template.hbs');

var MilestonesItemView = Marionette.ItemView.extend({

    template: template,

    events: {
    	'click .milestone-container': 'showMilestoneModal',
    	'click .close': 'hideMilestoneModal',
    	'click .update-milestone': 'onClickUpdateMilestone',
        'click .delete-milestone': 'onClickDeleteMilestone'
    },

    modelEvents: {
    	'sync': 'onModelChange'
  	},

    ui: {
        modelName: 'input#milestone-name',
        modelComplete: 'input#percent-complete',
        modelStarted: 'input#data-started',
        modelDue: 'input#due-date',
        modelCost: 'input#milestone-cost'
    },

    onModelChange: function() {
    	this.render();
    },

    showMilestoneModal: function() {
    	this.$('#milestonesUpdateModal').show();
    },

    hideMilestoneModal: function(e) {
        if(e) {
            e.stopPropagation();
        }
        
    	this.$('#milestonesUpdateModal').hide();
    },

    onClickUpdateMilestone: function() {

        var self = this;

        var milestoneObject = {
            name: this.ui.modelName.val(),
            percent_complete: this.ui.modelComplete.val(),
            data_started: this.ui.modelStarted.val(), 
            due_date: this.ui.modelDue.val(), 
            cost: this.ui.modelCost.val()
        };

        this.model.save(milestoneObject, {
            wait: true,
            success:function(model, response) {

                self.hideMilestoneModal();
            },
            error: function() {
                alert('some error');
            }
        });
    },

    onClickDeleteMilestone: function(e) {
        e.stopPropagation();

        var self = this;

        this.model.destroy({
            wait: true,
            success:function(model, response) {

                self.hideMilestoneModal();
            },
            error: function() {
                alert('some error');
            }
        });
    }

});

module.exports = MilestonesItemView;