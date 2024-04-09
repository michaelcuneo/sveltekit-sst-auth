import { validateSession } from '$lib/utils/auth';
import { SESSION_COOKIE_NAME } from '$lib/utils/constants';
import type { Handle } from '@sveltejs/kit';

/**
 * A SvelteKit handle function that adds the user session to the event locals
 * and resolves the request.
 *
 * @param {object} options - The handle options.
 * @param {import('@sveltejs/kit').RequestEvent} options.event - The request event.
 * @param {import('@sveltejs/kit').ResolveOptions['resolve']} options.resolve - The resolve function.
 * @return {Promise<import('@sveltejs/kit').Response>} The response promise.
 */
export const handle: Handle = async ({ event, resolve }) => {
	// Retrieve the session cookie from the request cookies
	const sessionCookie = event.cookies.get(SESSION_COOKIE_NAME);

	// Initialize the user session with empty id and userId
	let userSession = undefined;

	// If a session cookie is present, validate the session and update the user session
	if (sessionCookie) {
		try {
			const { session } = validateSession(sessionCookie);
			userSession = session;
		} catch {
			// If the session is invalid, delete the session cookie
			event.cookies.delete(SESSION_COOKIE_NAME, { path: '/' });
		}
	}

	// Add the user session to the event locals
	event.locals.session = userSession;

	// Resolve the request and get the response promise
	const response = await resolve(event);

	// Return the response promise
	return response;
};
