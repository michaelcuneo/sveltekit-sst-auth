import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { USERS } from '$lib/constants';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.session) {
		throw redirect(303, '/');
	}

	const currentUsers = USERS;

	let userFound = currentUsers.find((user) => {
		return user.id === locals.session?.userId;
	});

	return userFound;
};
