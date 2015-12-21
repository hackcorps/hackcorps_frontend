'use strict';

var Marionette = require('backbone.marionette'),
    NoSummariesView = require('./no_summaries_view.js'),
    SummaryItemView = require('./summary_item_view.js');

var SummariesCollectionView = Marionette.CollectionView.extend({
    
    tagName: 'div',
    
    className: 'summaries-container',
    
    emptyView: NoSummariesView,
    
    childView: SummaryItemView,

    onShow: function() {
    	this.haveRendered();
    },

    haveRendered: function() {
    	this.triggerMethod('panels:rendered');
    }
    
});

module.exports = SummariesCollectionView;