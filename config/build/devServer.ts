import type {Configuration} from 'webpack-dev-server';
import {BuildOptions} from './types';

export function buildDevServer({port}: BuildOptions): Configuration {
	return {
		port,
		open: true,
		// Если раздавать статику через nginx, то надо делать проксирование на index.html
		historyApiFallback: true,
		hot: true
	};
}
