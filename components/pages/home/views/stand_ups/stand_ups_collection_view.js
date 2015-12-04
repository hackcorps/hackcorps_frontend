'use strict';

var Marionette = require('backbone.marionette'),
    NoStandUpsView = require('./no_stand_ups_view.js'),
    StandUpItemView = require('./stand_up_item_view.js');

var StandUpsCollectionView = Marionette.CollectionView.extend({
    
    tagName: 'div',
    
    className: 'status-container',
    
    emptyView: NoStandUpsView,
    
    childView: StandUpItemView,

    onShow: function() {
    	this.haveRendered();
    },

    haveRendered: function() {
    	this.triggerMethod('panels:rendered');
    }
    
});

module.exports = StandUpsCollectionView;