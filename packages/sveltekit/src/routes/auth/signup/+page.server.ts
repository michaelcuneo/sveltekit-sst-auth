import type { Actions } from './$types';
import { API_URL } from '$env/static/private';

export const actions = {
	default: async ({ request }) => {
		// Get the email from the form.
		const formData = await request.formData();
		const email = formData.get('email')?.toString() as string;

		// Create the user.
		const url = API_URL + `/user/postCreateUser`;

		await fetch(url, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(email)
		}).then((res) => JSON.stringify(res));

		return { success: true };
	}
} satisfies Actions;
