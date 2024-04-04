import { Config } from 'sst/node/config';
import { AuthHandler, FacebookAdapter, GithubAdapter, GoogleAdapter, LinkAdapter } from 'sst/node/auth';
import { create, fromEmail } from '@sveltekit-magiclinks/core/user';
import { mailer } from '@sveltekit-magiclinks/core/nodemailer';
import { Session } from 'sst/node/auth';
import jwt from 'jsonwebtoken';

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
};

export const handler = AuthHandler({
	providers: {
		facebook: FacebookAdapter({
			clientSecret: Config.FACEBOOK_APP_SECRET,
			clientID: Config.FACEBOOK_APP_ID,
			scope: 'openid email',
			onSuccess: async (tokenset) => {
				const claims = tokenset.claims();
				const user: User = (await fromEmail(claims.email!)) as User;
				let newUser: User | undefined = undefined;

				if (user === undefined) {
					newUser = (await create(claims.email!)) as User;
				}
				const token = jwt.sign({ userId: user ? user.id : (newUser?.id as string) }, Config.JWT_SECRET, { expiresIn: '1m' });

				return {
					statusCode: 302,
					headers: {
						Location:
							process.env.IS_LOCAL
								? 'https://' + Config.DEV_DOMAIN_NAME + `/auth/success?token=${token}`
								: 'https://' + Config.PROD_DOMAIN_NAME + `/auth/success?token=${token}`
					},
					body: JSON.stringify({
						type: 'user',
						properties: {
							userId: user ? user.id : (newUser?.id as string)
						}
					})
				};
			}
		}),
		github: GithubAdapter({
			clientID: "Iv1.b4ef56eb0aebc1e2",
			clientSecret: "5aaca85bdf323813493cf56d95c7ffbc0dc18319",
			scope: 'openid email',
			
			onSuccess: async (tokenset) => {
				const claims = tokenset.claims();
				const user: User = (await fromEmail(claims.email!)) as User;
				let newUser: User | undefined = undefined;

				if (user === undefined) {
					newUser = (await create(claims.email!)) as User;
				}
				const token = jwt.sign({ userId: user ? user.id : (newUser?.id as string) }, Config.JWT_SECRET, { expiresIn: '1m' });

				return {
					statusCode: 302,
					headers: {
						Location:
							process.env.IS_LOCAL
								? 'https://' + Config.DEV_DOMAIN_NAME + `/auth/success?token=${token}`
								: 'https://' + Config.PROD_DOMAIN_NAME + `/auth/success?token=${token}`
					},
					body: JSON.stringify({
						type: 'user',
						properties: {
							userId: user ? user.id : (newUser?.id as string)
						}
					})
				};
			}
		}),
		google: GoogleAdapter({
			mode: 'oidc',
			clientID: Config.GOOGLE_CLIENT_ID,
			onSuccess: async (response) => {
				const claims = response.claims();
				const user: User = (await fromEmail(claims.email!)) as User;
				let newUser: User | undefined = undefined;

				if (user === undefined) {
					newUser = (await create(claims.email!)) as User;
				}

				const token = jwt.sign({ userId: user ? user.id : (newUser?.id as string) }, Config.JWT_SECRET, { expiresIn: '1m' });

				return {
					statusCode: 302,
					headers: {
						Location:
							process.env.IS_LOCAL
								? 'https://' + Config.DEV_DOMAIN_NAME + `/auth/success?token=${token}`
								: 'https://' + Config.PROD_DOMAIN_NAME + `/auth/success?token=${token}`
					},
					body: JSON.stringify({
						type: 'user',
						properties: {
							userId: user ? user.id : (newUser?.id as string)
						}
					})
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
			onSuccess: async (response) => {
				const user: User = await fromEmail(response.email!) as User;
				let newUser: User | undefined = undefined;

				if (user === undefined) {
					newUser = (await create(response.email!)) as User;
				}

				const token = jwt.sign({ userId: user ? user.id : (newUser?.id as string) }, Config.JWT_SECRET, { expiresIn: '1m' });

				return {
					statusCode: 302,
					headers: {
						Location:
							process.env.IS_LOCAL
								? 'https://' + Config.DEV_DOMAIN_NAME + `/auth/success?token=${token}`
								: 'https://' + Config.PROD_DOMAIN_NAME + `/auth/success?token=${token}`
					},
					body: JSON.stringify({
						type: 'user',
						properties: {
							userId: user ? user.id : (newUser?.id as string)
						}
					})
				};
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
