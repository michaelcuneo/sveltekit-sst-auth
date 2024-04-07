import type { PageServerLoad } from './$types';
import jwt from 'jsonwebtoken';
import { redirect } from '@sveltejs/kit';
import { SESSION_COOKIE_NAME } from '$lib/utils/constants.js';
import { createSessionForUser } from '$lib/utils/auth.js';

/**
 * Page load function for the callback authentication route.
 *
 * This function is executed on the server side and handles the logic for
 * successful authentication. It extracts the authentication token from the URL
 * query parameters, decodes it, creates a session for the user, and sets a
 * session cookie in the client's browser. Finally, it redirects the user to the
 * home page.
 *
 * @param {Object} context - The context object containing cookies and url
 * @param {Object} context.cookies - The cookies object for setting session cookie
 * @param {Object} context.url - The URL object for accessing query parameters
 * @return {void} This function does not return anything
 */
export const load: PageServerLoad = ({ cookies, url }) => {
	// Extract authentication token from URL query parameters
	const token = url.searchParams.get('token') ?? '';

	// If token is missing, redirect to home page
	if (!token) {
		redirect(303, '/');
		return;
	}

	// Decode the authentication token
	const decodedUser = jwt.decode(token) as UserToken;

	// Create a session for the user
	const session = createSessionForUser(decodedUser.userId);

	// Set session cookie in browser with user id and expiration time
	cookies.set(SESSION_COOKIE_NAME, session.id, {
		maxAge: 24 * 60 * 60, // 24 hours
		path: '/' // set cookie for all routes
	});

	// Redirect user to home page
	redirect(303, '/');
};
