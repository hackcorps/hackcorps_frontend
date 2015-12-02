'use strict';

var Marionette = require('backbone.marionette'),
    NoMilestonesView = require('./no_milestones_view.js'),
    MilestonesItemView = require('./milestone_item_view.js');

var MilestonesCollectionView = Marionette.CollectionView.extend({
    
    tagName: 'div',
    
    className: 'milestones-container',
    
    emptyView: NoMilestonesView,
    
    childView: MilestonesItemView
    
});

module.exports = MilestonesCollectionView;