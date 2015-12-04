/*global define*/

'use strict';

module.exports = {
    show: function() {
        $('.loader').css('display', 'block');
    },

    hide: function() {
        $('.loader').css('display', 'none');
    }
};
