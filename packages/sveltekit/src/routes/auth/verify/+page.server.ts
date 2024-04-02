import type { PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { SESSION_COOKIE_NAME } from '$lib/constants.js';
import { createSessionByEmail } from '$lib/auth';

const dummyUsers = [
	{
		id: '1',
		email: 'YjWQI@example.com'
	}
];

export const load: PageServerLoad = ({ cookies, url }) => {
	const token: string = url.searchParams.get('token')?.toString() ?? '';

	if (token == '') {
		redirect(303, '/');
	}

	const user = dummyUsers.find((user) => user.email === decodedToken.email);

	// Create a session and cookie!
	if (user != null) {
		try {
			const sessionCreate = createSessionByEmail(user.email);
			cookies.set(SESSION_COOKIE_NAME, sessionCreate.id, { maxAge: 24 * 60 * 60, path: '/' });
		} catch (error) {
			if (error instanceof Error) {
				return fail(500, {
					email: user.email,
					message: error.message
				});
			} else {
				return fail(500, {
					email: user.email,
					message: 'Unknown error occured on the server.'
				});
			}
		}
	}

	redirect(303, '/auth/success');
};
