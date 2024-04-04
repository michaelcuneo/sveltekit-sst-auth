import { SESSION_COOKIE_NAME } from '$lib/constants';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { useSession } from 'sst/node/auth';

export const GET: RequestHandler = async ({ cookies }) => {
	const sessionCookie = cookies.get(SESSION_COOKIE_NAME);

	if (sessionCookie) {
		try {
			const session = useSession();
			console.log(session);

			return json({ authenticated: true });
		} catch (error) {
			cookies.delete(SESSION_COOKIE_NAME, { path: '/' });
			return json({ authenticated: false });
		}
	} else {
		return json({ authenticated: false });
	}
};
