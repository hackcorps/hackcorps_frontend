'use strict';

    require('jquery-ui/datepicker');

var Marionette = require('backbone.marionette'),
    template = require('../templates/new_milestone_modal_template.hbs');

var NewMilestoneModalItemView = Marionette.ItemView.extend({

    template: template,

    events: {
        'click .submit_button': 'sendMilestoneToCollection',
        'click .update_button': 'onClickUpdateMilestone',
        'click .delete_button': 'onClickDeleteMilestone'
    },

    ui: {
        modelName: 'input#new-milestone-name',
        modelComplete: 'input#new-percent-complete',
        modelStarted: 'input#new-data-started',
        modelDue: 'input#new-due-date',
        modelCost: 'input#new-milestone-cost'
    },

    onShow: function() {
        this.$('#new-data-started').datepicker();
        this.$('#new-due-date').datepicker();
    },

    sendMilestoneToCollection: function() {
    
        var self = this;

        var milestoneObject = {
            name: this.ui.modelName.val(),
            percent_complete: this.ui.modelComplete.val(),
            data_started: this.ui.modelStarted.val(), 
            due_date: new Date(this.ui.modelDue.val()), 
            cost: this.ui.modelCost.val()
        };

        console.log(milestoneObject);
        
        this.model.save(milestoneObject, {
            wait: true,
            success:function(model, response) {
                self.triggerMethod('added:milestone', response.milestone );
                self.triggerMethod('entity:action');
            },
            error: function() {
                alert('some error');
            }
        });
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

                self.triggerMethod('entity:action');
            },
            error: function() {
                alert('some error');
            }
        });
    },

    onClickDeleteMilestone: function(e) {

        var self = this;

        this.model.destroy({
            wait: true,
            success:function(model, response) {
                self.triggerMethod('entity:action');
            },
            error: function() {
                alert('some error');
            }
        });
    }

});

module.exports = NewMilestoneModalItemView;