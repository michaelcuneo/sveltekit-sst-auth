import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	server: {
		https: {
			key: './private.key',
			cert: './certificate.crt',
		}
	},
	plugins: [sveltekit()]
});
