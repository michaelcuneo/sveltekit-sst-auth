import { StackContext, SvelteKitSite, Config, Table, Auth, Api } from 'sst/constructs';

/**
 * The SSTAuthStack function is the main entry point of the serverless stack.
 * It sets up the serverless stack, including the necessary resources like tables, secrets, api, and site.
 *
 * @param {StackContext} stack - The stack context object.
 */
export function SSTAuthStack({ stack }: StackContext) {
	// Define project parameters
	const projectName = new Config.Parameter(stack, 'ProjectName', {
		value: 'SvelteKit SST Auth'
	});
	const devDomainName = new Config.Parameter(stack, 'DevDomainName', {
		value: 'localhost:3000'
	});
	const prodDomainName = new Config.Parameter(stack, 'ProdDomainName', {
		value: 'skits.michaelcuneo.com.au'
	});
	const version = new Config.Parameter(stack, 'Version', {
		value: '1.0.0'
	});

	// Define email and authentication secrets
	const emailService = new Config.Secret(stack, 'EmailService');
	const emailHost = new Config.Secret(stack, 'EmailHost');
	const emailPort = new Config.Secret(stack, 'EmailPort');
	const emailUser = new Config.Secret(stack, 'EmailUser');
	const emailAppPass = new Config.Secret(stack, 'EmailAppPass');
	const googleClientId = new Config.Secret(stack, 'GoogleClientId');
	const facebookAppId = new Config.Secret(stack, 'FacebookAppId');
	const facebookAppSecret = new Config.Secret(stack, 'FacebookAppSecret');
	const jwtSecret = new Config.Secret(stack, 'JwtSecret');

	// Define users table
	const usersTable = new Table(stack, 'Users', {
		fields: { id: 'string', email: 'string' },
		primaryIndex: { partitionKey: 'email' }
	});

	// Define api
	const api = new Api(stack, 'Api', {
		cors: {
			allowCredentials: true,
			allowHeaders: ['content-type'],
			allowMethods: ['ANY'],
			allowOrigins: ['http://localhost:3000', 'https://skits.michaelcuneo.com.au']
		},
		defaults: {
			function: {
				bind: [
					usersTable,
					projectName,
					emailService,
					emailHost,
					emailPort,
					emailUser,
					emailAppPass,
					facebookAppId,
					facebookAppSecret,
					googleClientId
				]
			}
		},
		routes: {
			'GET /': 'packages/functions/src/main.handler',
			'GET /user/getUserByEmail/{email}': 'packages/functions/src/userByEmail.handler',
			'POST /user/postCreateUser': 'packages/functions/src/userCreate.handler'
		}
	});

	// Define authenticator
	const auth = new Auth(stack, 'Auth', {
		authenticator: {
			bind: [
				jwtSecret,
				facebookAppId,
				facebookAppSecret,
				googleClientId,
				devDomainName,
				prodDomainName
			],
			handler: 'packages/functions/src/authenticator.handler'
		}
	});

	// Attach the authenticator to the stack
	auth.attach(stack, { api });

	// Define site
	const site = new SvelteKitSite(stack, 'Site', {
		bind: [api, auth, version],
		path: 'packages/sveltekit/',
		customDomain: { domainName: 'skits.michaelcuneo.com.au', hostedZone: 'michaelcuneo.com.au' },
		environment: { API_URL: api.url, PUBLIC_API_URL: api.url },
		edge: false // Change this is you want the site to be deployed as an edge function.
	});

	// Add stack outputs
	stack.addOutputs({ ApiUrl: api.url, Url: site.url });
}
