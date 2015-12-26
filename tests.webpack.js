// *Some* environments (phantomjs) don't have es5 (Function.prototype.bind)
require('babel-core/polyfill');

// this regex matches any js files in tests directories

var context = require.context('./app/tests', true, /.+\.spec\.js?$/);

context.keys().forEach(context);
module.exports = context;