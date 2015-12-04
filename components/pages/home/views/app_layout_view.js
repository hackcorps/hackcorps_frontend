'use strict';

var Backbone = require('backbone'),
    Marionette = require('backbone.marionette'),
    MilestoneItemView = require('./milestone_item_view.js'),
    NewMilestoneModalItemView = require('./new_milestone_modal_item_view.js'),
    MilestoneModel = require('../entities/milestone_model.js'),
    MilestonesCollection = require('../entities/milestones_collections.js'),
    MilestonesCollectionView = require('./milestones_collection_view.js'),
    StandUpItemView = require('./stand_ups/stand_up_item_view.js'),
    NewStandUpModalItemView = require('./stand_ups/new_stand_up_modal_item_view.js'),
    StandUpModel = require('../entities/stand_up_model.js'),
    StandUpsCollection = require('../entities/stand_ups_collections.js'),
    StandUpsCollectionView = require('./stand_ups/stand_ups_collection_view.js'),
    template = require('../templates/app_layout_template.hbs'),
    loader = require('../../../layout/loader.js');

var AppLayoutView = Marionette.LayoutView.extend({

    template: template,

    regions: {
        updates: '#updates-region',
        dialog: '#dialog-region',
        milestones: '#milestones-region'
    },

    events: {
    	'click .new-milestone': 'showMilestoneModal',
        'click .new-stand-up': 'showStandUpModal',
    	'click .close': 'hideModal'
    },

    childEvents: {
        'added:milestone': 'onChildAddMilestone',
        'added:standup': 'onChildAddStandup',
        'deleted:milestone': 'hideModal',
        'updated:milestone': 'hideModal',
        'deleted:standup': 'hideModal',
        'updated:standup': 'hideModal',
        'trigger:milestone:id': 'onChildTriggerMilestoneId',
        'panels:rendered': 'onWindowResize'
    },

    onShow: function() {
        loader.hide();
    },

    initialize: function() {
        var self = this; 

        App.vent.on('click:milestone', function(message) {
            self.onChildClickMilestone(message);
        });

        App.vent.on('click:standup', function(message) {
            self.onChildClickStandUp(message);
        });
    },

    onRender: function() {
        var self = this,
            milestonesCollection = new MilestonesCollection(),
            standUpsCollection = new StandUpsCollection();
        
        milestonesCollection.fetch({
            
            success: function(milestonesCollection, response, options) {
                self.milestonesCollectionView = new MilestonesCollectionView( { collection:milestonesCollection } );
                self.showChildView('milestones', self.milestonesCollectionView);
            },
            error: function() {
                alert('some error');
            }
        });

        standUpsCollection.fetch({
            
            success: function(standUpsCollection, response, options) {
                self.standUpsCollectionView = new StandUpsCollectionView( { collection:standUpsCollection } );
                self.showChildView('updates', self.standUpsCollectionView);
            },
            error: function() {
                alert('some error');
            }
        });

    },

    onWindowResize: function() {
        var rightPanel = $('.milestones-panel-content'),
            leftPanel = $('.milestones-panel-content'),
            body = document.body,
            html = document.documentElement,
            height = Math.max( body.scrollHeight, body.offsetHeight, 
                    html.clientHeight, html.scrollHeight, html.offsetHeight ),
            windowHeight = window.innerHeight,
            navbarHeight = document.getElementsByClassName('navbar')[0].clientHeight,
            milstonesHeaderHeight = document.getElementsByClassName('milestones-panel-header')[0].clientHeight,
            needHeight = height - (navbarHeight + milstonesHeaderHeight);

            $(rightPanel).css('height', needHeight+'px');
    },

    showMilestoneModal: function() {
        this.showChildView('dialog', new NewMilestoneModalItemView({ model: new MilestoneModel() }) );
    },

    showStandUpModal: function() {
        this.showChildView('dialog', new NewStandUpModalItemView({ model: new StandUpModel() }) );
        var milestNameArr = this.milestonesCollectionView.collection.pluck('name');
        _.each(milestNameArr, function(milst){ 
            $('.milestone-select').append('<option>'+milst+'</option>');
        });
    },

    hideModal: function() {
        this.onWindowResize();
        this.dialog.empty({preventDestroy: true});
    },

    onChildAddMilestone: function (childView, message) {
        this.milestonesCollectionView.collection.add(message);
        this.onWindowResize();
        this.dialog.empty( { preventDestroy: true } );
    },

    onChildAddStandup: function (childView, message) {
        this.standUpsCollectionView.collection.add(message);
        this.onWindowResize();
        this.dialog.empty( { preventDestroy: true } );
    },

    onChildClickMilestone: function (message) {
        this.showChildView('dialog', new NewMilestoneModalItemView({ model: message }) );
    },

    onChildClickStandUp: function (message) {
        this.showChildView('dialog', new NewStandUpModalItemView({ model: message }) );
        var milestNameArr = this.milestonesCollectionView.collection.pluck('name');
        _.each(milestNameArr, function(milst){ 
            $('.milestone-select').append('<option>'+milst+'</option>');
        });
    },

    onChildTriggerMilestoneId: function(childView, message) {
        var milestone = this.milestonesCollectionView.collection.findWhere( { name: message } ),
            mid = milestone.id;

        App.reqres.setHandler('get:milestone:id', function() {
            return mid;
        });
    }

});

module.exports = AppLayoutView;