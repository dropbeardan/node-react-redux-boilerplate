const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const buildEnv = process.env.NODE_ENV;
const activePort = process.env.PORT;
const baseURL = {
    dev: `http://localhost:${activePort}`,
    test: `http://localhost:${activePort}`,
    production: ``
};

const outputDir = path.join(__dirname, '..', 'build', buildEnv, 'client');

const extractText = new ExtractTextPlugin({
    filename: buildEnv == 'production' ? '[name].css' : '[name].[contenthash].css'
});

const constructHTML = new HTMLWebpackPlugin({
    baseUrl: `"${baseURL[buildEnv]}/"`,
    favicon: './src/Assets/resources/favicon.ico',
    inject: 'body',
    title: 'Node React Redux Boilerplate',
    template: './src/index.ejs'
});

const copyAssets = new CopyWebpackPlugin([
    {
        from: path.join(__dirname, 'src', 'Assets', 'resources'),
        to: path.join(outputDir, 'resources')
    }
]);

const setEnvVars = () => {
    return new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(buildEnv),
        'process.env.NODE_ENV': JSON.stringify(buildEnv),
        'build.env.BASE_URL': JSON.stringify(baseURL[buildEnv])
    });
};

module.exports = {
    context: path.join(__dirname),
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        compress: true,
        historyApiFallback: true,
        host: 'localhost',
        open: true,
        port: activePort
    },
    devtool: buildEnv == 'production' ? false : 'source-map',
    entry: ['babel-polyfill', path.join(__dirname, 'src', 'app.js')],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'babel-loader',
                    query: {
                        presets: ['env', 'react'],
                        plugins: ['transform-decorators-legacy', 'transform-object-rest-spread']
                    }
                }]
            }, {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 100000,
                    },
                }
            }, {
                test: /\.(less)$/,
                use: extractText.extract({
                    use: [{ loader: 'css-loader' }, { loader: 'less-loader' }],
                    fallback: 'style-loader'
                })
            }, {
                test: /\.(css)$/,
                include: /node_modules/,
                use: extractText.extract({
                    fallback: "style-loader",
                    use: [{ loader: 'css-loader' }]
                })
            }
        ]
    },
    output: {
        path: path.join(outputDir, 'app'),
        filename: '[name].bundle.js'
    },
    plugins: buildEnv == 'production' ? [
        extractText,
        constructHTML,
        copyAssets,
        setEnvVars(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new UglifyJSPlugin()
    ] : [
            extractText,
            constructHTML,
            copyAssets,
            setEnvVars(),
            new webpack.optimize.OccurrenceOrderPlugin()
        ]
};
