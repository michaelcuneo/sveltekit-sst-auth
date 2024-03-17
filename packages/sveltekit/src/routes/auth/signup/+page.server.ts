import type { Actions } from './$types';
import { validateEmail } from '$lib/auth';
// import { env } from '$env/dynamic/private';

export const actions = {
	default: async ({ request }) => {
		// Get the email from the form.
		const formData = await request.formData();

		const user = {
			id: crypto.randomUUID(),
			email: formData.get('email')?.toString() as string
		};

		const valid = validateEmail(user.email);

		if (valid.success) {
			return { success: true };
		} else {
			return { success: false, error: { error: valid.error, message: valid.message } };
		}
	}
} satisfies Actions;
