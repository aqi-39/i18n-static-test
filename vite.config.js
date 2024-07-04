import { resolve } from 'path';
import { defineConfig } from 'vite';
import { createVuePlugin as vue2 } from 'vite-plugin-vue2';

export default defineConfig({
	plugins: [vue2()],
	base: './',
	build: {
		outDir: 'dist/3000',
		assetsDir: ''
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
		},
	},
});
