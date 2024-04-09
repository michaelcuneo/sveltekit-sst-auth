import type { LayoutServerLoad } from './$types';
import { Config } from 'sst/node/config';

export const load = (async ({ locals }) => {
	return {
		version: Config.VERSION,
		authenticated: locals.session !== undefined
	};
}) satisfies LayoutServerLoad;
