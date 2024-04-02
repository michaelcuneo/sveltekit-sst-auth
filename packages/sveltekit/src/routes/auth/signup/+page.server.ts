import type { Actions } from './$types';
import { API_URL } from '$env/static/private';

export const actions = {
	default: async ({ request }) => {
		// Get the email from the form.
		const formData = await request.formData();
		const email = formData.get('email')?.toString() as string;

		// Check to see if the email already exists as a user in the database.
		const url = API_URL + `/user/getUserByEmail/${email}`;
		const user = await fetch(url)
			.then((res) => res)
			.then((res) => res.json());

		// If the user exists, return an error and tell them to go login.
		if (user && user.email !== undefined) {
			return { success: false, error: { message: 'User already exists.' } };
		} else {
			// If the user does not exist in the database, create the user and send them a magic link to verify their email.
			const url = API_URL + `/user/postCreateUser`;

			await fetch(url, {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				method: 'POST',
				body: JSON.stringify(email)
			}).then((res) => res.json());

			return { success: true, error: null };
		}
	}
} satisfies Actions;
