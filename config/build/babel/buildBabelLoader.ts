import {BuildOptions} from '../types';
import {removeDataTestIdPlugin} from './removeDataTestIdPlugin';

export function buildBabelLoader({mode}: BuildOptions) {
	const isProd = mode === 'production';

	const plugins = [];

	if (isProd) {
		plugins.push([removeDataTestIdPlugin, {props: ['data-testid']}]);
	}

	return {
		test: /\.tsx?$/,
		exclude: /(node_modules|bower_components)/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: [
					'@babel/preset-env',
					'@babel/preset-typescript',
					['@babel/preset-react', {runtime: 'automatic'}]
				],
				plugins
			}
		}
	};
}
