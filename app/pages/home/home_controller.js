'use strict';

var Marionette = require('backbone.marionette'),
    PageLayoutView = require('./views/page_layout_view.js');

var HomeController = Marionette.ItemView.extend({
    
    pageLayoutView: new PageLayoutView(),

    initialize: function() {
        App.vent.on('render:page_layout_view', this.renderPageLayoutView, this);
    },

    renderPageLayoutView: function() {
        App.regions.main.show(this.pageLayoutView, {preventDestroy: true});
    }

  });

module.exports = HomeController;