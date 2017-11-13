const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const workFile = ['product/vSearch', 'product/pOrderList'];

module.exports = {
	entry: {
		'ko-app': [
			'ko-app.js',
			'svc-cmm.js',
			'svc-navi.js'
		].map(v=>path.resolve(__dirname, 'pms/res/rgb/src',v)),
	},
	output: {
		path: path.resolve(__dirname, 'pms/biz'),
		filename: '[name].js'
	},
	module: {
	},
	plugins: [
		new UglifyJSPlugin(),
		...workFile.map(v=>new htmlWebpackPlugin({
			inject: false,
			minify: {
				collapseWhitespace: true,
				removeComments: true
			},
			template: path.resolve(__dirname, `pms/res/rgb/src/${v}.html`),
			filename: path.resolve(__dirname, `pms/biz/${v}.html`)
		}))
	]
};
