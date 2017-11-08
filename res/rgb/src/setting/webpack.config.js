var path = require('path');
var webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: {
		test: './pms/res/rgb/src/test.js'
	},
	output: {
		path: path.resolve(__dirname, 'pms/biz'),
		filename: '[name].min.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			}
		]
	},
	plugins: [
		new UglifyJSPlugin()
	],
	stats: {
		colors: true
	},
	devtool: 'source-map'
};