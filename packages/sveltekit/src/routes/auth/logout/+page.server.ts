import { SESSION_COOKIE_NAME } from '$lib/constants.js';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	throw redirect(302, '/');
};

export const actions: Actions = {
	default: async ({ cookies }) => {
		try {
			cookies.set(SESSION_COOKIE_NAME, '', { path: '/', expires: new Date(0) });
		} catch (error) {
			if (error instanceof Error) {
				return { message: error.message };
			}
		}
		throw redirect(302, '/');
	}
};
