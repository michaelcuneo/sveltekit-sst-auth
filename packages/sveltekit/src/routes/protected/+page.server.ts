import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// Redirect to home page if there is no session
	if (!locals.session) {
		throw redirect(303, '/');
	}
};
