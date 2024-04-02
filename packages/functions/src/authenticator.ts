import { Config } from 'sst/node/config';
import { AuthHandler, GoogleAdapter, LinkAdapter } from 'sst/node/auth';
import { create, fromEmail } from '@sveltekit-magiclinks/core/user';
import { Session } from 'sst/node/auth';
import { mailer } from '@sveltekit-magiclinks/core/nodemailer';

declare module 'sst/node/auth' {
	export interface SessionTypes {
		userId: {
			userID: string;
		};
		emailId: {
			emailId: string;
		};
	}
}

export const handler = AuthHandler({
	providers: {
		google: GoogleAdapter({
			mode: 'oidc',
			clientID: Config.GOOGLE_CLIENT_ID,
			onSuccess: async (response) => {
				const exists = await fromEmail(response.claims().email!);

				if (!exists) {
					await create(response.claims().email!);
				}

				return {
					statusCode: 200,
					body: 'Logged into Google successfully'
				};
			}
		}),
		magicLink: LinkAdapter({
			onLink: async (link, claims) => {
				// Send an email.
				await mailer({
					email: claims.email,
					authUrl: link
				});

				return {
					statusCode: 200,
					body: 'Email sent'
				};
			},
			onSuccess: async (claims) => {
				return Session.parameter({
					redirect: 'http://localhost:5173',
					type: 'emailId',
					properties: {
						emailId: claims.email
					}
				});
			},
			onError: async () => {
				return {
					statusCode: 500,
					body: 'Something went wrong'
				};
			}
		})
	}
});
