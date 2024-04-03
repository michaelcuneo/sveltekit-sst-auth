import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const dummyUsers = [
	{
		id: '1',
		email: 'YjWQI@example.com'
	}
];

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.session) {
		throw redirect(303, '/');
	}

	const currentUsers = dummyUsers;

	const userFound = currentUsers.find((user) => {
		return user.id === locals.session?.userId;
	});

	return userFound;
};
