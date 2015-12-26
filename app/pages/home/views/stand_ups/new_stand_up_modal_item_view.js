'use strict';

var Marionette = require('backbone.marionette'),
    template = require('../../templates/stand_ups/new_stand_up_modal_template.hbs'),
    moment = require('moment');

var NewStandUpModalItemView = Marionette.ItemView.extend({

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

    onBeforeShow: function() {
        var notedAt = moment().format('dddd MMMM Do YYYY');
        this.ui.notedAt.val(notedAt);
    },

    triggerMilestoneId: function() {
        var self = this;
        self.triggerMethod('trigger:milestone:id', self.ui.milestone.val() );
    },

    sendStandUpToCollection: function() {
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
                self.triggerMethod('entity:action');
                alert('Stand up added successfully');

            },
            error: function(model, response) {
                alert(response.responseJSON.errors.daily_limit[0]);
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

                self.triggerMethod('entity:action');
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
                self.triggerMethod('entity:action');
            },
            error: function() {
                alert('some error');
            }
        });
    }

});

module.exports = NewStandUpModalItemView;