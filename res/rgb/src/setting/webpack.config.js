const workFile = 'product/index';
const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		'ko-app': [
			'ko-app.js',
			'svc-cmm.js',
			'svc-navi.js'
		].map(v=>path.resolve(__dirname, 'pms/res/rgb/src',v)),
		resource: [
			`./pms/res/rgb/src/product/pOrderList.js`,
			`./pms/res/rgb/src/product/vSearch.js`
		],
		[workFile]: `./pms/res/rgb/src/${workFile}.js`
	},
	output: {
		path: path.resolve(__dirname, 'pms/biz'),
		filename: '[name].js'
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
		new UglifyJSPlugin(),
		new htmlWebpackPlugin({
			inject: true,
			hash: true,
			minify: {
				collapseWhitespace: true,
				removeComments: true
			},
			template: path.resolve(__dirname, `pms/res/rgb/src/${workFile}.html`),
			filename: path.resolve(__dirname, `pms/biz/${workFile}.html`)
		})
	]
};
