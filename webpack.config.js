var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: [
       /* 'webpack-dev-server/client?http://localhost:3000',*/
        './app.js'
    ],
	output: {
		path: './build/', 
		filename: 'bundle.js'
	},
	resolve: {
		modulesDirectories: ['node_modules'],
		extensions: ['', '.js', '.es6']
	},
	watch: true,
    keepalive: true,
	devtool: 'sourse-map',
	module: {
		/*preLoaders: [
			{
				test: /\.js$/,
				exlude: 'node_modules',
				loader: 'jshint-loader'
			}
		],*/
		loaders: [
			{
				test: /\.(png|jpg|gif|ttf|eot|woff)$/,
				loader: 'url-loader?limit=10000',
				exclude: /node_modules/
			},
			{
				test: /\.js/,
				loader: 'babel',
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader?sourceMap'),
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap'),
				exclude: /node_modules/
			},
/*			{
				test: /\.scss$/,
				loader: 'style-loader!css-loader!sass-loader?sourceMap!autoprefixer-loader', 
				include: path.join(__dirname, 'app/styles')
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader?sourceMap!autoprefixer-loader', 
				include: path.join(__dirname, 'app/styles')
			},*/
			{ 
				test: /\.html$/, 
				loader: 'html-loader',
				exclude: /node_modules/
			},
			{
				test: /\.hbs/,
				loader: 'handlebars-loader',
				exclude: /node_modules/
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('styles.css'),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
			'root.jQuery': 'jquery',
			'_': 'underscore'
		})
	],
	// test environment build
	test: function (config) {
	  return {
	    entry: './tests.webpack.js',
	    output: _.assign({}, config.output, {
	      // client assets are output to dist/test/
	      path: path.join(config.output.path, 'test'),
	      publicPath: undefined // no assets CDN
	    }),
	    devtool: 'inline-source-map', // sourcemap support
	    plugins: config.plugins.concat(
	      new webpack.DefinePlugin({
	        'typeof window': JSON.stringify("object")
	      })
	    )
	  };
	}
}