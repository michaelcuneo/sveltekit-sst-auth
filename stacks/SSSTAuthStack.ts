import { StackContext, SvelteKitSite, Config, Table, Auth, Api } from 'sst/constructs';

export function SvelteKitSSTAuth({ stack }: StackContext) {
	// Node Mailer Email Config
	const EMAIL_SERVICE = new Config.Secret(stack, 'EMAIL_SERVICE');
	const EMAIL_HOST = new Config.Secret(stack, 'EMAIL_HOST');
	const EMAIL_PORT = new Config.Secret(stack, 'EMAIL_PORT');
	const EMAIL_USER = new Config.Secret(stack, 'EMAIL_USER');
	const EMAIL_APP_PASS = new Config.Secret(stack, 'EMAIL_APP_PASS');
	// Google Auth
	const GOOGLE_CLIENT_ID = new Config.Secret(stack, 'GOOGLE_CLIENT_ID');
	// Facebook Auth
	const FACEBOOK_APP_ID = new Config.Secret(stack, 'FACEBOOK_APP_ID');
	const FACEBOOK_APP_SECRET = new Config.Secret(stack, 'FACEBOOK_APP_SECRET');
	// Version
	const VERSION = new Config.Parameter(stack, 'VERSION', {
		value: '1.0.0'
	});

	const table = new Table(stack, 'Users', {
		fields: {
			id: 'string',
			email: 'string',
			validated: 'string'
		},
		primaryIndex: { partitionKey: 'email' }
	});

	const api = new Api(stack, 'Api', {
		cors: {
			allowCredentials: true,
			allowHeaders: ["content-type"],
			allowMethods: ["ANY"],
			allowOrigins: ["http://localhost:3000", "https://skits.michaelcuneo.com.au"],
		},
		defaults: {
			function: {
				bind: [
					table,
					EMAIL_SERVICE,
					EMAIL_HOST,
					EMAIL_PORT,
					EMAIL_USER,
					EMAIL_APP_PASS,
					FACEBOOK_APP_ID,
					FACEBOOK_APP_SECRET,
					GOOGLE_CLIENT_ID
				],
			}
		},
		routes: {
			'GET /': 'packages/functions/src/main.handler',
			'GET /user/getUserByEmail/{email}': 'packages/functions/src/userByEmail.handler',
			'POST /user/postCreateUser': 'packages/functions/src/userCreate.handler'
		}
	});

	api.attachPermissions('*');

	const auth = new Auth(stack, 'Auth', {
		authenticator: {
			bind: [GOOGLE_CLIENT_ID],
			handler: 'packages/functions/src/authenticator.handler'
		}
	});

	auth.attach(stack, { api });

	const site = new SvelteKitSite(stack, 'site', {
		bind: [api, auth, VERSION],
		path: 'packages/sveltekit/',
		customDomain: {
			domainName: 'skits.michaelcuneo.com.au',
			hostedZone: 'michaelcuneo.com.au'
		},
		environment: {
			API_URL: api.url,
			PUBLIC_API_URL: api.url
		},
		edge: false
	});

	stack.addOutputs({
		ApiUrl: api.url,
		url: site.url
	});
}
