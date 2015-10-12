var path = require('path');
var webpack = require('webpack');
var BowerWebpackPlugin = require("bower-webpack-plugin");
/*var ExtractTextPlugin = require('extract-text-webpack-plugin');*/

module.exports = {
	entry: './app.js',
	output: {
		path: './build/', 
		filename: 'bundle.js',
		publicPath: '/public/'
	},
	resolve: {
		modulesDirectories: ['node_modules', 'bower_components', 'web_modules'],
		extensions: ['', '.js', '.es6']
	},
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
				test: /\.(png|jpg|ttf|eot|woff)$/,
				loader: 'url-loader?limit=10000',
				exclude: /(node_modules|bower_components|web_modules)/
			},
			{
				test: /\.js/,
				loader: 'babel',
				exclude: /(node_modules|bower_components|web_modules)/
			},
/*			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'sass-loader?sourceMap')
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap')
			},*/
			{
				test: /\.scss$/,
				loader: 'style-loader!css-loader!sass-loader?sourceMap!autoprefixer-loader', 
				include: path.join(__dirname, 'components/styles')
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader?sourceMap!autoprefixer-loader', 
				include: path.join(__dirname, 'components/styles')
			},
			{ 
				test: /\.html$/, 
				loader: 'html-loader',
				include: path.join(__dirname, 'components')
			},
			{
				test: /\.hbs/,
				loader: 'handlebars-loader',
				exclude: /(node_modules|bower_components|web_modules)/
			}
		]
	},
	/*node: {
        fs: "empty"
    },*/
	plugins: [
/*		new ExtractTextPlugin(),*/
		new BowerWebpackPlugin(),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
			_: 'underscore'
		})
	],
	watch: true
}