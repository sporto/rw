var path = require("path");

module.exports = {
	context: __dirname,
	entry: {
		main:       "./client/main.js"
	},
	output: {
		path: path.join(__dirname, 'app', 'assets', 'javascripts'),
		filename: "[name].js",
		publicPath: "/js/"
	},
	module: {
		loaders: [
			{ test: /\.less$/,   loader: "style-loader!css-loader!less-loader"},
			{ test: /\.css/,     loader: "style-loader!css-loader" },
			{ test: /\.less$/,   loader: "less" },
			{ test: /\.jsx$/,    loader: "jsx-loader?stripTypes" },
			{ test: /\.woff$/,   loader: "url-loader?prefix=font/&limit=5000" },
			{ test: /\.eot$/,    loader: "file-loader?prefix=font/" },
			{ test: /\.ttf$/,    loader: "file-loader?prefix=font/" },
			{ test: /\.svg$/,    loader: "file-loader?prefix=font/" },
		]
	},
	resolve: {
		alias: {
		
		}
	},
	plugins: []
};