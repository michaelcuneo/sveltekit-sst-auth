import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { Config } from 'sst/node/config';
import { USERS } from '$lib/constants';
import { API_URL } from '$env/static/private';
import { stringify } from 'uuid';

export const actions = {
	default: async ({ request }) => {
		const formData: FormData = await request.formData();
		const email: string | undefined = formData.get('email')?.toString();

		// Check to see if the user exists.
		const url = API_URL + `/user/getUserByEmail/${email}`;
		const user = await fetch(url)
			.then((res) => res.body)
			.then((res) => JSON.stringify(res));

		// If the user does exist... Hit the magicLink endpoint and redirect to the magicLink page.
		// This will create and send a link to the user.

		await fetch(API_URL + `/auth/magicLink/authorize?email=${email}`, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({})
		});

		return { success: true, error: null };
	}
} satisfies Actions;
