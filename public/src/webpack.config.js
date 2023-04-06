const webpack = require("webpack")
const path = require("path")
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const config = {
    entry: {
        main: ["./ts/index.ts", "./scss/styles.scss"],
    },
    output: {
        path: path.resolve(__dirname, "../assets"),
        filename: "[name].min.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.ts(x)?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                type: "asset/resource",
                generator: {
                    filename: "./imgs/[name][ext]",
                },
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [new LodashModuleReplacementPlugin(), new MiniCssExtractPlugin()],
    devtool: "source-map",
}

module.exports = config
