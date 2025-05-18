import webpack from 'webpack'

import { buildLoaders } from './buildLoaders'
import { buildPlugins } from './buildPlugins'
import { buildResolve } from './buildResolve'
import { buildDevServer } from './buildDevServers'

import { BuildOptions } from './types/types'

export function buildWebpack(options: BuildOptions): webpack.Configuration {
    const { mode, paths } = options

    const isDev = mode === 'development'

    return {
        mode: mode ?? 'development',
        entry: paths.entry,
        target: 'web',
        output: {
            path: paths.output,
            filename: '[name].[contenthash].js',
            clean: true,
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolve(options),
        devtool: isDev && 'inline-source-map',
        devServer: isDev ? buildDevServer(options) : undefined,
    }
}
