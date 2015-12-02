var path = require('path');
var webpack = require('webpack');
/*var ExtractTextPlugin = require('extract-text-webpack-plugin');*/

module.exports = {
	entry: './app.js',
	output: {
		path: './build/', 
		filename: 'bundle.js',
		publicPath: '/public/assets'
	},
	resolve: {
		modulesDirectories: ['node_modules'],
		extensions: ['', '.js', '.es6']
	},
	watch: true,
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
				test: /\.(png|jpg|ttf|eot|woff)$/,
				loader: 'url-loader?limit=10000',
				exclude: /node_modules/
			},
			{
				test: /\.js/,
				loader: 'babel',
				exclude: /node_modules/
			},
	/*		{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader?sourceMap'),
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap'),
				exclude: /node_modules/
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
    /*amd: { 
    	jQuery: true 
    },*/
	plugins: [
		/*new ExtractTextPlugin('styles.css'),*/
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
			'root.jQuery': 'jquery',
			'_': 'underscore'
		})
	]
}