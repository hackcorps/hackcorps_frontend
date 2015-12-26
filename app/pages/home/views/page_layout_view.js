'use strict';

var Marionette = require('backbone.marionette'),
    MilestoneItemView = require('./milestones/milestone_item_view.js'),
    NewMilestoneModalItemView = require('./milestones/new_milestone_modal_item_view.js'),
    MilestoneModel = require('../entities/milestone_model.js'),
    MilestonesCollection = require('../entities/milestones_collections.js'),
    MilestonesCollectionView = require('./milestones/milestones_collection_view.js'),
    StandUpItemView = require('./stand_ups/stand_up_item_view.js'),
    NewStandUpModalItemView = require('./stand_ups/new_stand_up_modal_item_view.js'),
    StandUpModel = require('../entities/stand_up_model.js'),
    StandUpsCollection = require('../entities/stand_ups_collections.js'),
    StandUpsCollectionView = require('./stand_ups/stand_ups_collection_view.js'),
    SummaryItemView = require('./summaries/summary_item_view.js'),
    NewSummaryModalItemView = require('./summaries/new_summary_modal_item_view.js'),
    SummaryModel = require('../entities/summary_model.js'),
    SummariesCollection = require('../entities/summaries_collections.js'),
    SummariesCollectionView = require('./summaries/summaries_collection_view.js'),
    template = require('../templates/page_layout_template.hbs'),
    loader = require('../../../layout/loader.js');

var PageLayoutView = Marionette.LayoutView.extend({

    template: template,

    regions: {
        updates: '#updates-region',
        dialog: '#dialog-region',
        milestones: '#milestones-region'
    },

    events: {
    	'click .new-milestone': 'showMilestoneModal',
        'click .new-stand-up': 'showStandUpModal',
        'click .new-summary': 'showSummaryModal',
        'click .show-stand-ups': 'showStandUps',
        'click .hide-stand-ups': 'hideStandUps',
    	'click .close': 'hideModal'
    },

    childEvents: {
        show: function() {
            loader.hide();
        },
        'added:milestone': 'onChildAddMilestone',
        'added:standup': 'onChildAddStandup',
        'added:summary': 'onChildAddSummary',
        'entity:action': 'hideModal',
        'trigger:milestone:id': 'onChildTriggerMilestoneId',
        'panels:rendered': 'onWindowResize'
    },

    onBeforeShow: function() {
        loader.show();
    },

    initialize: function() {
        var self = this; 

        App.vent.on('click:milestone', function(message) {
            self.onChildClickMilestone(message);
        });

        App.vent.on('click:standup', function(message) {
            self.onChildClickStandUp(message);
        });

        App.vent.on('click:summary', function(message) {
            self.onChildClickSummary(message);
        });
    },

    onRender: function() {
        var self = this,
            fetchingMilestones = App.request('milestone:entities'),
            fetchingSummaries = App.request('summary:entities');

        $.when(fetchingMilestones).done(function(milestones){
            self.milestonesCollectionView = new MilestonesCollectionView( { collection:milestones } );
            self.showChildView('milestones', self.milestonesCollectionView);
        });

        $.when(fetchingSummaries).done(function(summaries){
            self.summariesCollectionView = new SummariesCollectionView( { collection:summaries } );
            self.showChildView('updates', self.summariesCollectionView);
        });

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

    showSummaryModal: function() {
        this.showChildView('dialog', new NewSummaryModalItemView({ model: new SummaryModel() }) );
    },

    onChildAddMilestone: function (childView, message) {
        this.milestonesCollectionView.collection.add(message);
        this.onWindowResize();
        this.dialog.empty( { preventDestroy: true } );
    },

    onChildAddStandup: function (childView, message) {
        if(!this.standUpsCollectionView) {
            this.standUpsCollectionView = new StandUpsCollectionView( { collection: new StandUpsCollection() } );
        };

        this.standUpsCollectionView.collection.add(message);
        this.onWindowResize();
        this.dialog.empty( { preventDestroy: true } );
    },

    onChildAddSummary: function (childView, message) {
        this.summariesCollectionView.collection.add(message);
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

    onChildClickSummary: function (message) {
        this.showChildView('dialog', new NewSummaryModalItemView({ model: message }) );
    },

    showStandUps: function() {
        if (!this.standUpsCollectionView) {
            var self = this;

            var fetchingStandUps = App.request('standup:entities');

            $.when(fetchingStandUps).done(function(standups){

                self.standUpsCollectionView = new StandUpsCollectionView( { collection:standups } );
                self.updates.show(self.standUpsCollectionView, {preventDestroy: true});

                $('.show-stand-ups').addClass('hide-stand-ups').removeClass('show-stand-ups').text('Hide stand-ups');
            });
        }
        
        this.updates.show(this.standUpsCollectionView, {preventDestroy: true});
        $('.show-stand-ups').addClass('hide-stand-ups').removeClass('show-stand-ups').text('Hide stand-ups');
    },

    hideStandUps: function() {
        this.updates.show(this.summariesCollectionView, {preventDestroy: true});
        $('.hide-stand-ups').addClass('show-stand-ups').removeClass('hide-stand-ups').text('Show stand-ups');
    },

    hideModal: function() {
        this.onWindowResize();
        this.dialog.empty({preventDestroy: true});
    },

    onChildTriggerMilestoneId: function(childView, message) {
        var milestone = this.milestonesCollectionView.collection.findWhere( { name: message } ),
            mid = milestone.id;

        App.reqres.setHandler('get:milestone:id', function() {
            return mid;
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
    }

});

module.exports = PageLayoutView;