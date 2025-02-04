import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import dotenv from 'dotenv';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import {Configuration, DefinePlugin, ProgressPlugin} from 'webpack';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import {BuildOptions} from './types';

export function buildPlugins({
	mode,
	paths,
	analyzer,
	platform
}: BuildOptions): Configuration['plugins'] {
	const isDev = mode === 'development';
	const isProd = mode === 'production';

	const configPath = isDev
		? path.resolve(paths.config, '.env.development')
		: path.resolve(paths.config, '.env.production');

	const config = dotenv.config({path: configPath}).parsed;

	const plugins: Configuration['plugins'] = [
		new HtmlWebpackPlugin({
			template: paths.html,
			favicon: path.resolve(paths.public, 'favicon.ico')
		}),
		new DefinePlugin({
			__PLATFORM__: JSON.stringify(platform),
			__MODE__: JSON.stringify(mode),
			__APP_TITLE__: JSON.stringify(config?.APP_TITLE),
			__API_URL__: JSON.stringify(config?.API_URL)
		})
	];

	if (isDev) {
		plugins.push(new ProgressPlugin());

		/** Выносит проверку типов в отдельный процесс не нагружая сборку */
		plugins.push(new ForkTsCheckerWebpackPlugin());

		plugins.push(new ReactRefreshWebpackPlugin());
	}

	if (isProd) {
		plugins.push(
			new MiniCssExtractPlugin({
				filename: 'css/[name].[contenthash:8].css',
				chunkFilename: 'css/[name].[contenthash:8].css'
			})
		);
		plugins.push(
			new CopyPlugin({
				patterns: [
					{
						from: path.resolve(paths.public, 'locales'),
						to: path.resolve(paths.output, 'locales')
					}
				]
			})
		);
		if (analyzer) {
			plugins.push(new BundleAnalyzerPlugin());
		}
	}

	return plugins;
}
