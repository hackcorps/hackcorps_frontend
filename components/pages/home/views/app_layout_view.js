'use strict';

var Backbone = require('backbone'),
    Marionette = require('backbone.marionette'),
    MilestoneItemView = require('./milestone_item_view.js'),
    NewMilestoneModalItemView = require('./new_milestone_modal_item_view.js'),
    MilestoneModel = require('../entities/milestone_model.js'),
    MilestonesCollection = require('../entities/milestones_collections.js'),
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
    	'click .close': 'hideMilestoneModal'
    },

    childEvents: {
        'added:milestone': 'onChildAddMilestone',
        'deleted:milestone': 'hideMilestoneModal',
        'updated:milestone': 'hideMilestoneModal',
        'click:milestone': 'onChildClickMilestone',
    },

    initialize: function() {
        var self = this;

        App.vent.on('click:milestone', function(message) {
            self.onChildClickMilestone(message);
        });
    },

    onRender: function() {
        var self = this;
        var milestonesCollection = new MilestonesCollection();
        
        milestonesCollection.fetch({
            
            success: function(milestonesCollection, response, options) {
                self.milestonesCollectionView = new MilestonesCollectionView( { collection:milestonesCollection } );
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
        this.showChildView('dialog', new NewMilestoneModalItemView({ model: new MilestoneModel() }) );
    },

    hideMilestoneModal: function() {
        this.dialog.empty({preventDestroy: true});
    },

    onChildAddMilestone: function (childView, message) {
        this.milestonesCollectionView.collection.add(message);
        this.dialog.empty( { preventDestroy: true } );
    },

    onChildClickMilestone: function (message) {
        this.showChildView('dialog', new NewMilestoneModalItemView({ model: message }) );
    }

});

module.exports = AppLayoutView;