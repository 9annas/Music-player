const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = {
    entry: {
        app: path.join(__dirname, 'src', 'index.jsx')
    },
    resolve: {
        extensions: ['.jsx', '.js', '.json'],
        alias: {
            component: path.resolve(__dirname, 'src/component/'),
            container: path.resolve(__dirname, 'src/container/'),
            service: path.resolve(__dirname, 'src/service/')
        }
    },
    devtool: 'inline-source-map',
    devServer: {
        open: true,
        static: {
            directory: path.join(__dirname)
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.html$/,
                use: [{ loader: 'html-loader', options: { minimize: false } }]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: 'src/index.html',
            filename: './index.html'
        }),
        new NodePolyfillPlugin()
    ]

}
