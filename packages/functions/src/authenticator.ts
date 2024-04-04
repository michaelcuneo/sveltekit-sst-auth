import { Config } from 'sst/node/config';
import { AuthHandler, FacebookAdapter, GoogleAdapter, LinkAdapter } from 'sst/node/auth';
import { create, fromEmail } from '@sveltekit-magiclinks/core/user';
import { Session } from 'sst/node/auth';
import { mailer } from '@sveltekit-magiclinks/core/nodemailer';

declare module 'sst/node/auth' {
	export interface SessionTypes {
		user: {
			userId: string;
		};
	}
}

export type User = {
	id: string;
	email: string;
	validated: string;
};

export const handler = AuthHandler({
	providers: {
		facebook: FacebookAdapter({
			clientSecret: Config.FACEBOOK_APP_SECRET,
			clientID: Config.FACEBOOK_APP_ID,
			scope: 'openid email',
			onSuccess: async (tokenset) => {
				const claims = tokenset.claims();
				console.log(claims);

				const user: User = (await fromEmail(claims.email!)) as User;
				console.log(user);

				let newUser: User | undefined = undefined;

				if (user === undefined) {
					newUser = (await create(claims.email!)) as User;
				}

				console.log(newUser!);

				return Session.cookie({
					redirect: 'https://localhost:3000',
					type: 'user',
					properties: {
						userId: user ? user.id : (newUser?.id as string)
					}
				});
			}
		}),
		google: GoogleAdapter({
			mode: 'oidc',
			clientID: Config.GOOGLE_CLIENT_ID,
			onSuccess: async (response) => {
				const claims = response.claims();
				const exists = await fromEmail(claims.email!);

				if (!exists) {
					await create(claims.email!);
				}

				return Session.cookie({
					redirect: 'https://localhost:3000',
					type: 'user',
					properties: {
						emailId: response.claims().email!
					}
				});
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
			onSuccess: async (response) => {
				const claims = response.claims();
				const exists = await fromEmail(claims.email!);

				if (!exists) {
					await create(claims.email!);
				}

				return Session.cookie({
					redirect: 'https://localhost:3000',
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
