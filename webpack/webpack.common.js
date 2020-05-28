const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = {
    entry: path.resolve(__dirname, `../src/Index.tsx`),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'bundle.js',
    },
    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks: 'initial',
        },
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: '0.0.0.0',
        port: 8080,
        open: true,
        useLocalIp: true,
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|ts|tsx)?$/,
                use: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.ttf$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            fallback: 'file-loader',
                            name: 'static/fonts/[name].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            publicPath: 'dist',
            filename: 'index.html',
            template: 'static/html/index.html',
        }),
        new WebpackPwaManifest({
            name: 'Flexbox Cheat Site',
            short_name: 'Flexbox Cheat Site',
            description: 'CSS Flexbox | エンジニア&デザイナーのためのWebチートシート',
            background_color: '#63b3ed',
            crossorigin: 'use-credentials',
            icons: [
                {
                    src: path.resolve('static/image/flexbox-cheat-site-icon.png'),
                    sizes: [96, 128, 192, 256, 384, 512, 1024],
                },
                {
                    src: path.resolve('static/image/ogp.png'),
                    size: '1024x1024',
                    purpose: 'maskable',
                },
            ],
        })
    ],
};
