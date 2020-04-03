/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('@cypress/webpack-preprocessor');

const webpackOptions = {
    mode: 'development',
    // make sure the source maps work
    devtool: 'eval-source-map',
    // webpack will transpile TS and JS files
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|mjs)$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: ['@babel/plugin-proposal-class-properties'],
                },
            },
            {
                test: /\.(ts|tsx)$/,
                loader: ['babel-loader', 'awesome-typescript-loader'],
            },
            {
                test: /\.css$/,
                exclude: [/node_modules/],
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.svg$/,
                exclude: [/node_modules/],
                use: ['svg-url-loader'],
            },
        ],
    },
};

const options = {
    webpackOptions,
    watchOptions: {},
};

module.exports = (on, config) => {
    on('file:preprocessor', webpack(options));

    return config;
};
