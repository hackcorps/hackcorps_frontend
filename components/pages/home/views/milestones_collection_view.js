'use strict';

var Backbone = require('backbone'),
    Marionette = require('backbone.marionette'),
    MilestonesCollection = require('../entities/milestones.js'),
    NoMilestonesView = require('./no_milestones_view.js'),
    MilestonesItemView = require('./milestone_item_view.js');

var MilestonesCollectionView = Marionette.CollectionView.extend({
    
    tagName: 'div',
    
    className: 'milestones-container',
    
    emptyView: NoMilestonesView,
    
    childView: MilestonesItemView
    
});

module.exports = MilestonesCollectionView;