'use strict';

var Marionette = require('backbone.marionette'),
    template = require('../../templates/summaries/new_summary_modal_template.hbs'),
    moment = require('moment');

var NewSummaryModalItemView = Marionette.ItemView.extend({

    template: template,

    events: {
        'click .submit_button': 'sendSummaryToCollection',
        'click .update_button': 'onClickUpdateSummary',
        'click .delete_button': 'onClickDeleteSummary'
    },

    ui: {
        updateText: '#status-text'
    },

    sendSummaryToCollection: function() {

        var self = this;

        var summaryObject = {
            noted_date: moment().format('dddd MMMM Do YYYY'),
            text: this.ui.updateText.val()
        };
        
        this.model.save(summaryObject, {
            wait: true,
            success:function(model, response) {
                self.triggerMethod('added:summary', response.stand_up_summary );
                self.triggerMethod('entity:action');

            },
            error: function(model, response) {
                alert('some error');

                console.log(response);
            }
        });
    },

    onClickUpdateSummary: function() {

        var self = this;

        var summaryObject = {
            noted_date: moment().format('dddd MMMM Do YYYY'),
            text: this.ui.updateText.val()
        };

        this.model.save(summaryObject, {
            wait: true,
            success:function(model, response) {

                self.triggerMethod('entity:action');
            },
            error: function() {
                alert('some error');
            }
        });
    },

    onClickDeleteSummary: function(e) {

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

module.exports =  NewSummaryModalItemView;