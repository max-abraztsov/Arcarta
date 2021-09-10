const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const SassLoader = require('sass-loader');
const LessLoader = require('less-loader');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const filename = (ext) => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

const optimization = () => {
    const configFin = {
        splitChunks: {
            chunks:'all'
        },
        runtimeChunk: 'single'
    }

    if(isProd){
        configFin.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }

    return configFin; 
}

const cssLoaders = extra => {
    const loaders = [ 
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                //publicPath: path.resolve(__dirname, 'dist'), //эта хрень отобрала у меня 7 часов разработки(((((((  
            },
        },'css-loader'
    ]
    if(extra){
        loaders.push(extra);
    }

    return loaders;
}

const fileLoaders = folder => {
    return {
        filename: () => {
            return isDev ? `${folder}/[name][ext]` : `${folder}/[name].[hash][ext]`;
        }
    }   
}


module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main:'./js/script.js',
        //analytics: './js/analytics.js'
    },
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: filename('js'),
    },
    resolve:{
        extensions: ['.js', '.json', '.png'], // позволяет не прописывать даннные расширения в путях 
        alias:{                 //  позволяет более удобно прописывать пути
        "@models": path.resolve(__dirname, 'src/models'), 
        "@": path.resolve(__dirname, 'src'),
        }
    },
    optimization: optimization(),
    devServer:{
        port: 4200,
        hot: isDev
    },
    plugins:[
        new HTMLWebpackPlugin({
            template: './index.html',
            minify:{
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets/favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: filename('css'),
        })
    ],
    module:{
        rules:[
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.less$/,
                use: cssLoaders('less-loader')
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(?:|gif|png|jpg|svg)$/,
                type: 'asset/resource',
                generator: fileLoaders('img')
            },
            {
                test: /\.(ttf|otf|afm|woff|woff2|pfb)$/,
                use: ['file-loader'],
                type: 'asset/resource',
                generator: fileLoaders('fonts')
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
        ]
    }
}