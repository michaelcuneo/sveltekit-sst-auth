import { signOut } from '$lib/utils/auth.js';
import { SESSION_COOKIE_NAME } from '$lib/utils/constants.js';

export const actions = {
	/**
	 * Logout action handler.
	 *
	 * This function is responsible for handling the logout action. It retrieves the session ID
	 * from the cookies, if it exists, and then attempts to sign out the user. If successful,
	 * it deletes the session cookie. If an error occurs during the sign out process, a message
	 * is returned.
	 *
	 * @param {object} params - The parameters object.
	 * @param {object} params.cookies - The cookies object.
	 * @return {object} An empty object if successful, or an object with a message if an error
	 *                  occurred.
	 */
	default: async ({ cookies }) => {
		// Retrieve the session ID from the cookies
		const sessionId = cookies.get(SESSION_COOKIE_NAME);

		// If no session ID exists, return an empty object
		if (!sessionId) return {};

		try {
			// Attempt to sign out the user using the session ID
			signOut(sessionId);

			// Delete the session cookie
			cookies.delete(SESSION_COOKIE_NAME, { path: '/' });
		} catch {
			// If an error occurs, return an object with a message
			return { message: 'Failed to sign out' };
		}

		// Return an empty object if successful
		return {};
	}
};
