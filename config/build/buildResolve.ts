import path from 'path'
import { BuildOptions } from './types/types'
import { Configuration } from 'mini-css-extract-plugin'

export function buildResolve(options: BuildOptions): Configuration['resolve'] {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@': options.paths.src,
        },
    }
}
