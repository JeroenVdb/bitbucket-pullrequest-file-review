import typescript from '@rollup/plugin-typescript';

export default {
	input: 'src/index.ts',
	output: {
		file: 'build/bitbucket-pr-file-review.js',
		format: 'iife'
	},
	treeshake: false,
	plugins: [
		typescript({target: 'ES2015', module: 'ES2015'})
	]
};
