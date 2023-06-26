const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    output:{
        path:path.join(__dirname,'/dist'),
        filename:'bundle.js'
    },
	module:{
	    rules:[
	        {
	            test:/\.(js|jsx)$/,
	            exclude:/node_modules/,
                use:'babel-loader'
            },
			{
			    test: /\.css$/,
			    use: ["style-loader", "css-loader"],
			},
	    ]
	},
	plugins:[
	    new HtmlWebpackPlugin({
	        template:'./src/index.html'
	    }),
	],
	optimization: {
        minimize:true,
        minimizer:[new CssMinimizerPlugin()],
   },
};