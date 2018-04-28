const HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    webpack = require('webpack'),
    path = require('path'),
    PATHS = {
        source: path.join(__dirname, 'source'),
        dist: path.join(__dirname, 'dist')
    },

    config = {
        mode: "development",
        devtool: 'inline-source-map',
        devServer: {
            contentBase: './' + PATHS.dist,
            // compress: true,
            port: 3000,
            // inline:true
        },
        entry: [PATHS.source + '/lib/index.js'],
        output: {
            path: PATHS.dist,
            filename: '[name].js',
            // publicPath: /${PATHS.dist}/
            publicPath: '/'
        },
        module: {
            rules: [
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {name: 'img/[hash:hex:10].[ext]'}
                        }
                    ]
                },
                {
                    test: /\.js$/, exclude: /node_modules/,
                    use:
                        {
                            loader: "babel-loader",
                            options: {
                                presets: ['env', 'stage-2', 'react']
                            }
                        }
                },
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader?sourceMap!sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true'],
                    })
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader']
                    })
                },
                {
                    test: /\.pug$/,
                    loader: 'pug-loader',
                    options: {
                        pretty: true
                    }
                }

            ]
        },

        // optimization: {
        //     splitChunks: {
        //         chunks: "async",
        //         minSize: 30000,
        //         minChunks: 1,
        //         maxAsyncRequests: 5,
        //         maxInitialRequests: 3,
        //         automaticNameDelimiter: '~',
        //         name: true,
        //         cacheGroups: {
        //             vendors: {
        //                 test: /[\\/]node_modules[\\/]/,
        //                 priority: -10
        //             },
        //             default: {
        //                 minChunks: 2,
        //                 priority: -20,
        //                 reuseExistingChunk: true
        //             }
        //         }
        //     }
        // },

        plugins: [
            new ExtractTextPlugin({filename: 'app.bundle.css'}),
            // new webpack.optimize.UglifyJsPlugin(),
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new HtmlWebpackPlugin({
                template: PATHS.source + '/index.pug'
            })
        ]
    }
;

module.exports = config;