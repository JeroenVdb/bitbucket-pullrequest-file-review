import typescript from '@rollup/plugin-typescript';

export default {
	input: 'src/index.ts',
	output: {
		file: 'build/bb-pr-markfilesreviewed.js',
		format: 'iife',
		name: 'bbprmarkfilesreviewed'
	},
	treeshake: false,
	plugins: [
		typescript({target: 'ES2015', module: 'ES2015'})
	]
};
