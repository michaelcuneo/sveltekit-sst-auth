import { Config } from 'sst/node/config';
import { AuthHandler, FacebookAdapter, GoogleAdapter, LinkAdapter } from 'sst/node/auth';
import { create, fromEmail } from '@sveltekit-magiclinks/core/user';
import { Session } from 'sst/node/auth';
import { mailer } from '@sveltekit-magiclinks/core/nodemailer';

declare module 'sst/node/auth' {
	export interface SessionTypes {
		user: {
			emailId: string;
		};
	}
}

export const handler = AuthHandler({
	providers: {
		facebook: FacebookAdapter({
			clientSecret: Config.FACEBOOK_APP_SECRET,
			clientID: Config.FACEBOOK_APP_ID,
			scope: 'openid email',
			onSuccess: async (tokenset) => {
				const claims = tokenset.claims();

				const exists = await fromEmail(claims.email!);

				if (!exists) {
					await create(claims.email!);
				}

				return Session.cookie({
					redirect: 'http://localhost:5173',
					type: 'user',
					properties: {
						emailId: claims.email!
					}
				})
			},		
		}),
		google: GoogleAdapter({
			mode: 'oidc',
			clientID: Config.GOOGLE_CLIENT_ID,
			onSuccess: async (response) => {
				const exists = await fromEmail(response.claims().email!);

				if (!exists) {
					await create(response.claims().email!);
				}

				return Session.cookie({
					redirect: 'http://localhost:5173',
					type: 'user',
					properties: {
						emailId: response.claims().email!
					}
				});
			},
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
				return Session.cookie({
					redirect: 'http://localhost:5173',
					type: 'user',
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
