# 로컬환경 세팅

## npm
```
npm init
npm i http-server --save-dev
npm i babel-cli babel-core --save-dev
npm i babel-preset-es2015 --save-dev
npm i babel-loader webpack --save-dev
npm i uglifyjs-webpack-plugin --save-dev
npm i html-webpack-plugin --save-dev
```

## webpack
`webpack.config.js`에 작성 파일 지정시 `--config` 옵션사용
```javascript
module.exports = {
};
```

### uglifyjs-webpack-plugin
```javascript
module.exports = {
	plugins: [
		new UglifyJSPlugin()
	]
};
```

### html-webpack-plugin
```javascript
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
	plugins: [
		new htmlWebpackPlugin({
			title: 'title',	// <%= htmlWebpackPlugin.options.title %>
			inject: true,	// 컴파일된 스크립트 삽입여부
			hash: true,		// 스크립트에 해쉬태그를 붙인다.
			minify: {
				collapseWhitespace: true,
				removeComments: true
			},
			template: path.resolve(__dirname, `pms/res/rgb/src/index.html`),
			filename: path.resolve(__dirname, `pms/biz/index.html`)
			contents: fs.readFileSync(`pms/res/rgb/src/index.html`, 'utf8'),	// <%= htmlWebpackPlugin.options.contents %>
		})
	]
};
```
[참고](https://github.com/jantimon/html-webpack-plugin/blob/master/README.md)
