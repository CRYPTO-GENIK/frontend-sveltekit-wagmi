/**
 * Vite 4 configuration file. See:
 * https://kit.svelte.dev/docs/project-structure#project-files-vite-config-js
 * https://vitejs.dev/config/
 */
import { sveltekit } from '@sveltejs/kit/vite';
import { createLogger } from 'vite';
import { defineConfig } from 'vitest/config';
import jsonServer from 'vite-plugin-simple-json-server';
import GithubActionsReporter from 'vitest-github-actions-reporter';

const logger = createLogger();
const loggerInfo = logger.info;

// suppress svg build output during CI (spammy due to cryptocurrency-icons)
logger.info = (msg, options) => {
	if (!!process.env.CI && /immutable\/assets\/.*\.svg/.test(msg)) return;
	loggerInfo(msg, options);
};

export default defineConfig({
	plugins: [
		sveltekit(),

		// vite plugin to create a mock JSON api for integration tests
		// only available when using `npm run dev` or `npm run preview`
		// https://github.com/alextim/vite-plugin-simple-json-server/
		jsonServer({
			logLevel: 'silent',
			mockDir: 'tests/fixtures'
		})
	],

	server: {
		fs: {
			allow: [process.cwd()]
		}
	},

	// suppress svg build output during CI (spammy due to cryptocurrency-icons)
	customLogger: logger,

	// suppress plotly build warnings (remove once ploty.js is gone)
	build: {
		chunkSizeWarningLimit: 1200
	},

	// vitest configuration for unit tests (`npm run test:unit`)
	// https://vitest.dev/config/
	test: {
		environment: 'jsdom',
		globals: true,
		include: ['src/**/*.{test,spec}.{js,ts}'],
		reporters: process.env.GITHUB_ACTIONS ? ['dot', new GithubActionsReporter()] : 'default',
		restoreMocks: true,
		setupFiles: ['test.config.ts']
	}
});
