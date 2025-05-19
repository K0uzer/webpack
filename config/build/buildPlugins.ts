import path from 'path'
import webpack, { DefinePlugin } from 'webpack'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin, { Configuration } from 'mini-css-extract-plugin'
import CopyPlugin from 'copy-webpack-plugin'

import { BuildOptions } from './types/types'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'

export function buildPlugins({
    mode,
    paths,
    analyzer,
    platform,
}: BuildOptions): Configuration['plugins'] {
    const isDev = mode === 'development'
    const isProd = mode === 'production'

    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({
            template: paths.html,
            favicon: path.resolve(paths.public, 'favicon.ico'),
        }),
        /** Выносить проверку типов в отдельный процесс */
        new ForkTsCheckerWebpackPlugin(),
    ]

    if (isProd) {
        plugins.push(
            new MiniCssExtractPlugin({
                filename: 'css/main.[contenthash].css',
                chunkFilename: 'css/[name].[contenthash].css',
            }),
        )
        plugins.push(
            new DefinePlugin({
                __PLATFORM__: JSON.stringify(platform),
            }),
        )
        plugins.push(
            new CopyPlugin({
                patterns: [
                    {
                        from: path.resolve(paths.public, 'locales'),
                        to: path.resolve(paths.output, 'locales'),
                    },
                ],
            }),
        )
    }

    if (isDev) {
        plugins.push(new webpack.ProgressPlugin())
        plugins.push(new ReactRefreshWebpackPlugin())
    }

    if (analyzer) {
        plugins.push(new BundleAnalyzerPlugin())
    }

    return plugins
}
