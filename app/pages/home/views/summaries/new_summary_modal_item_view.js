'use strict';

var Marionette = require('backbone.marionette'),
    template = require('../../templates/summaries/new_summary_modal_template.hbs'),
    moment = require('moment');

var NewSummaryModalItemView = Marionette.ItemView.extend({

    template: template,

    events: {
        'click .submit_button': 'sendStandUpToCollection',
        'click .update_button': 'onClickUpdateStandUp',
        'click .delete_button': 'onClickDeleteStandUp'
    },

    ui: {
        notedAt: 'input#status-date',
        milestone: 'select#milestone-id',
        updateText: '#status-text'
    },

    sendSummaryToCollection: function() {
        this.triggerMilestoneId();
        
        var self = this,
            milestoneId = App.reqres.request('get:milestone:id');

        var standUpObject = {
            noted_at: this.ui.notedAt.val(),
            milestone_id: milestoneId,
            update_text: this.ui.updateText.val(),
        };
        
        this.model.save(standUpObject, {
            wait: true,
            success:function(model, response) {
                self.triggerMethod('added:standup', response.stand_up );
            },
            error: function() {
                alert('some error');
            }
        });
    },

    onClickUpdateStandUp: function() {
        this.triggerMilestoneId();

        var self = this,
        milestoneId = App.reqres.request('get:milestone:id');

        var standUpObject = {
            milestone_id: milestoneId,
            update_text: this.ui.updateText.val(),
        };

        this.model.save(standUpObject, {
            wait: true,
            success:function(model, response) {

                self.triggerMethod('updated:standup');
            },
            error: function() {
                alert('some error');
            }
        });
    },

    onClickDeleteStandUp: function(e) {

        var self = this;

        this.model.destroy({
            wait: true,
            success:function(model, response) {
                self.triggerMethod('deleted:standup');
            },
            error: function() {
                alert('some error');
            }
        });
    }

});

module.exports =  NewSummaryModalItemView;