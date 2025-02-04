import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshTypeScript from 'react-refresh-typescript';
import {ModuleOptions} from 'webpack';
import {BuildOptions} from './types';
import {buildBabelLoader} from './babel/buildBabelLoader';

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
	const {mode} = options;
	const isProd = mode === 'production';
	const isDev = mode === 'development';

	const cssLoaderWithModule = {
		loader: 'css-loader',
		options: {
			modules: {
				auto: (resPath: string) => Boolean(resPath.includes('.module.')),
				namedExport: false,
				exportLocalsConvention: 'as-is',
				localIdentName: isProd
					? '[hash:base64:8]'
					: '[path][name]__[local]--[hash:base64:8]'
			}
		}
	};

	const scssLoader = {
		test: /\.s[ac]ss$/i,
		use: [
			isProd ? MiniCssExtractPlugin.loader : 'style-loader',
			cssLoaderWithModule,
			'postcss-loader',
			// Compiles Sass to CSS
			'sass-loader'
		]
	};

	const tsLoader = {
		exclude: /node_modules/,
		test: /\.tsx?$/,
		use: [
			{
				loader: 'ts-loader',
				options: {
					transpileOnly: true,
					getCustomTransformers: () => ({
						before: [isDev && ReactRefreshTypeScript()].filter(Boolean)
					})
				}
			}
		]
	};

	// const babelLoader = buildBabelLoader(options);

	const assetLoader = {
		test: /\.(png|jpg|gif)$/i,
		type: 'asset/resource'
	};

	const svgLoader = {
		test: /\.svg$/i,
		issuer: /\.[jt]sx?$/,
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
									currentColor: true
								}
							}
						]
					}
				}
			}
		]
	};

	return [scssLoader, tsLoader, assetLoader, svgLoader];
}
