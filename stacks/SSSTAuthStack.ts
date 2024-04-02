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
			allowMethods: ['ANY'],
			allowHeaders: ['Authorization']
		},
		defaults: {
			function: {
				bind: [table, EMAIL_SERVICE, EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_APP_PASS]
			}
		},
		routes: {
			'GET /': 'packages/functions/src/main.handler',
			'GET /users': 'packages/functions/src/users.handler',
			'GET /user/getUserById/{id}': 'packages/functions/src/userById.handler',
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
		bind: [api, auth, EMAIL_SERVICE, EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_APP_PASS, VERSION],
		path: 'packages/sveltekit/',
		customDomain: {
			domainName: 'skits.michaelcuneo.com.au',
			hostedZone: 'michaelcuneo.com.au'
		},
		environment: {
			API_URL: api.url
		},
		edge: false
	});

	stack.addOutputs({
		ApiUrl: api.url,
		url: site.url
	});
}
