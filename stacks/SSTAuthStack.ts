import { StackContext, SvelteKitSite, Config, Table, Auth, Api } from 'sst/constructs';

/**
 * The SSTAuthStack function is the main entry point of the serverless stack.
 * It sets up the serverless stack, including the necessary resources like tables, secrets, api, and site.
 *
 * @param {StackContext} stack - The stack context object.
 */
export function SSTAuthStack({ stack, app }: StackContext) {
	// Define project parameters
	// Edit these parameters to suit your own project.
	// These will come in from the bootstrap script later.
	const projectName = new Config.Parameter(stack, 'PROJECT_NAME', {
		value: 'SvelteKit SST Auth'
	});
	const devDomainName = new Config.Parameter(stack, 'DEV_DOMAIN_NAME', {
		value: 'localhost:3000'
	});
	const prodDomainName = new Config.Parameter(stack, 'PROD_DOMAIN_NAME', {
		value: 'skitsa.michaelcuneo.com.au'
	});
	const hostedZoneName = new Config.Parameter(stack, 'HOSTED_ZONE_NAME', {
		value: 'michaelcuneo.com.au'
	});
	const apiDomainName = new Config.Parameter(stack, 'API_DOMAIN_NAME', {
		value: 'skitsapi.michaelcuneo.com.au'
	});
	const version = new Config.Parameter(stack, 'VERSION', {
		value: '1.0.0'
	});

	// Define email and authentication secrets
	const emailService = new Config.Secret(stack, 'EMAIL_SERVICE');
	const emailHost = new Config.Secret(stack, 'EMAIL_HOST');
	const emailPort = new Config.Secret(stack, 'EMAIL_PORT');
	const emailUser = new Config.Secret(stack, 'EMAIL_USER');
	const emailAppPass = new Config.Secret(stack, 'EMAIL_APP_PASS');
	const googleClientId = new Config.Secret(stack, 'GOOGLE_CLIENT_ID');
	const facebookAppId = new Config.Secret(stack, 'FACEBOOK_APP_ID');
	const facebookAppSecret = new Config.Secret(stack, 'FACEBOOK_APP_SECRET');
	const githubClientId = new Config.Secret(stack, 'GITHUB_CLIENT_ID');
	const githubClientSecret = new Config.Secret(stack, 'GITHUB_CLIENT_SECRET');
	const jwtSecret = new Config.Secret(stack, 'JWT_SECRET');

	// Define users table
	const usersTable = new Table(stack, 'Users', {
		fields: { id: 'string', email: 'string' },
		primaryIndex: { partitionKey: 'email' }
	});

	// Define api
	const api = new Api(stack, 'Api', {
		customDomain: {
			domainName: app.stage + '.' + apiDomainName.value,
			hostedZone: hostedZoneName.value
		},
		cors: {
			allowCredentials: true,
			allowHeaders: ['content-type'],
			allowMethods: ['ANY'],
			allowOrigins: [`http:// + ${devDomainName.value}`, `https:// + ${prodDomainName.value}`]
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
					githubClientId,
					githubClientSecret,
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
				githubClientId,
				githubClientSecret,
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
		customDomain: { domainName: prodDomainName.value, hostedZone: hostedZoneName.value },
		environment: {
			API_URL: api.customDomainUrl ? api.customDomainUrl : '',
			PUBLIC_API_URL: api.customDomainUrl ? api.customDomainUrl : ''
		},
		edge: false // Change this is you want the site to be deployed as an edge function.
	});

	// Add stack outputs
	stack.addOutputs({ ApiUrl: api.url, Url: site.url });
}
