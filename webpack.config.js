var path = require('path');
module.exports = {
	entry: [
		'./react/App.js'
	],
	output: {
		path: path.resolve(__dirname, 'public/js'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loader: 'babel',
			exclude: /(node_modules|bower_components)/,
			query: {
				presets: ['react', 'es2015', 'stage-0'],
				plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
      }
		}]
	},
	devServer: {
	    inline: true,
			contentBase: './public'
  }
};
