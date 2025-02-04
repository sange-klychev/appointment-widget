declare module '*.svg' {
	import React from 'react';
	const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
	export default SVG;
}

declare module '*.png' {
	const value: string;
	export default value;
}

declare module '*.jpg' {
	const value: string;
	export default value;
}

declare module '*.jpeg' {
	const value: string;
	export default value;
}

declare module '*.ico' {
	const value: string;
	export default value;
}

declare module '*.sass' {
	const classes: {readonly [key: string]: string};
	export default classes;
}

declare module '*.scss' {
	const classes: {readonly [key: string]: string};
	export default classes;
}

declare module '*.json' {
	const value: string;
	export default value;
}

declare const __PLATFORM__: 'desktop' | 'mobile';

declare const __APP_TITLE__: string;

declare const __API_URL__: string;
