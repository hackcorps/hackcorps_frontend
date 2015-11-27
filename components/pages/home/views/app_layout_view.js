'use strict';

var Backbone = require('backbone'),
    Marionette = require('backbone.marionette'),
    MilestonesCollection = require('../entities/milestones.js'),
    MilestonesCollectionView = require('./milestones_collection_view.js'),
    template = require('../templates/app_layout_template.hbs');

var AppLayoutView = Marionette.LayoutView.extend({
    template: template,

    regions: {
        status: '#left-region',
        dialog: '#dialog-region',
        milestones: '#milestones-region'
    },

    events: {
    	'click .new-milestone': 'showMilestoneModal',
    	'click .close': 'hideMilestoneModal',
    	'click .add-milestone': 'addMilestoneToCollection'
    },

    childEvents: {
        'update:milestone': 'onChildUpdateMilestone'
    },

    ui: {
        modelName: 'input#milestone-name',
        modelComplete: 'input#percent-complete',
        modelStarted: 'input#data-started',
        modelDue: 'input#due-date',
        modelCost: 'input#milestone-cost'
    },

    onRender: function() {

        var self = this;
        var milestonesCollection = new MilestonesCollection();
        
        milestonesCollection.fetch({
            
            success: function(milestonesCollection, response, options) {
                self.milestonesCollectionView = new MilestonesCollectionView({collection:milestonesCollection});
                self.showChildView('milestones', self.milestonesCollectionView);
            },
            error: function() {
                alert('some error');
            }
      });

    },

    onAttach: function() {
        var selector = $('.milestones-panel-content'),
            windowHeight = window.innerHeight,
            navbarHeight = document.getElementsByClassName('navbar')[0].clientHeight,
            milstonesHeaderHeight = document.getElementsByClassName('milestones-panel-header')[0].clientHeight,
            needHeight = windowHeight - (navbarHeight + milstonesHeaderHeight);

            if ( $(selector).height() < needHeight ) {
                $(selector).css('height', needHeight+'px');
            }
    },

    showMilestoneModal: function() {
    	this.$('#milestonesModal').show();
    },

    hideMilestoneModal: function(e) {
        if (e) {
            e.stopPropagation();
        }

        this.$('#milestonesModal').hide();
    },

    addMilestoneToCollection: function() {
        var self = this;

        var milestoneObject = {
            name: this.ui.modelName.val(),
            percent_complete: this.ui.modelComplete.val(),
            data_started: this.ui.modelStarted.val(), 
            due_date: this.ui.modelDue.val(), 
            cost: this.ui.modelCost.val()
        };
    	
        this.milestonesCollectionView.collection.create(milestoneObject, {
            wait: true,
            success:function(collection, response) {
                //self.hideModal();

                self.hideMilestoneModal();
            },
            error: function() {
                alert('some error');
            }
        });
    }
});

module.exports = AppLayoutView;