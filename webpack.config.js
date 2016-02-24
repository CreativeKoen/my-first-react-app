var path = require('path');
module.exports = {
	entry: [
		'./react/App.js'
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loader: 'babel',
			exclude: /(node_modules|bower_components)/,
			query: {
				presets: ['react', 'es2015']
      }
		}]
	},
	devServer: {
	    inline: true,
			contentBase: './public'
  }
};
