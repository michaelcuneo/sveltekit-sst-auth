import type { Actions } from './$types';
import { mailer } from '$lib/nodemailer';
import { fail } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { Config } from "sst/node/config";
import { env } from '$env/dynamic/private';

export const actions = {
	default: async ({ request }) => {
		const formData: FormData = await request.formData();
		const email: string | undefined = formData.get('email')?.toString();
		const userList: Response = await fetch(`${env.API_URL}/user`);
		console.log(JSON.stringify(userList));
	
		/*
		if (user != null) {
			try {
				const token = jwt.sign({ userId: user.id }, Config.JWT_SECRET, {
					expiresIn: '1h'
				});
				return mailer({
					email: user.email,
					token,
					service: Config.EMAIL_SERVICE,
					host: Config.EMAIL_HOST,
					port: Number(Config.EMAIL_PORT),
					username: Config.EMAIL_USER,
					password: Config.EMAIL_APP_PASS
				});
			} catch (err: unknown) {
				if (typeof err === "string") {
					return fail(400, err);
				} else if (err instanceof Error) {
					return fail(400, err.message);
				}
			}
		}
		*/

		return { success: true, error: null };

	}
} satisfies Actions;