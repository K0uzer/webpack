import { ModuleOptions } from 'webpack'

import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ReactRefreshTypeScritpt from 'react-refresh-typescript'

import { BuildOptions } from './types/types'

export function buildLoaders({ mode }: BuildOptions): ModuleOptions['rules'] {
    const isDev = mode === 'development'

    const assetLoader = {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
    }

    const svgLoader = {
        test: /\.svg$/i,
        use: [
            {
                loader: '@svgr/webpack',
                options: {
                    icon: true,
                    svgoConfig: {
                        plugins: [
                            {
                                name: 'convertColors',
                                params: {
                                    currentColor: true,
                                },
                            },
                        ],
                    },
                },
            },
        ],
    }

    const cssLoaderWithModules = {
        loader: 'css-loader',
        options: {
            modules: {
                localIdentName: isDev
                    ? '[path][name]__[local]--[hash:base64:5]'
                    : '[hash:base64:8]',
            },
        },
    }

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            cssLoaderWithModules,
            'sass-loader',
        ],
    }

    const tsLoader = {
        test: /\.tsx?$/,
        use: [
            {
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    getCustomTransformers: () => ({
                        before: [isDev && ReactRefreshTypeScritpt()].filter(
                            Boolean,
                        ),
                    }),
                },
            },
        ],
        exclude: /node_modules/,
    }

    return [svgLoader, assetLoader, scssLoader, tsLoader]
}
