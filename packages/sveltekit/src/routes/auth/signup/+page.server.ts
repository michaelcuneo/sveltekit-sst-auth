import type { Actions } from './$types';
import { validateEmail } from '$lib/auth';
import { env } from '$env/dynamic/private';

export const actions = {
	default: async ({ request }) => {
		// Get the email from the form.
		const formData = await request.formData();
		console.log(formData);
		
		const user = {
			id: crypto.randomUUID(),
			email: formData.get('email')?.toString() as string,
		}

		const valid = validateEmail(user.email);

		if (valid.success) {
			const addUser = await fetch(`${env.API_URL}/addUser`)

			console.log(addUser);

			return { success: true };
		} else {
			return { success: false, error: { error: valid.error, message: valid.message } };
		}
	}
} satisfies Actions;
