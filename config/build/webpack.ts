import type {Configuration} from 'webpack';
import 'webpack-dev-server';
import {buildDevServer, buildLoaders, buildPlugins, buildResolvers} from '.';
import {BuildOptions} from './types';

export function buildWebpack(options: BuildOptions): Configuration {
	const {mode, paths} = options;
	const isDev = mode === 'development';

	return {
		mode,
		entry: paths.entry,
		output: {
			path: paths.output,
			filename: '[name].[contenthash].js',
			clean: true
		},
		devtool: isDev ? 'eval-cheap-module-source-map' : 'hidden-source-map',
		...(isDev && {devServer: buildDevServer(options)}),
		plugins: buildPlugins(options),
		module: {
			rules: buildLoaders(options)
		},
		resolve: buildResolvers(options)
	};
}
