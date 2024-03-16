import { StackContext, SvelteKitSite, Config, Table, Api } from "sst/constructs";

export function API({ stack }: StackContext) {
  const JWT_SECRET = new Config.Secret(stack, "JWT_SECRET");
  const EMAIL_SERVICE = new Config.Secret(stack, "EMAIL_SERVICE");
  const EMAIL_HOST = new Config.Secret(stack, "EMAIL_HOST");
  const EMAIL_PORT = new Config.Secret(stack, "EMAIL_PORT");
  const EMAIL_USER = new Config.Secret(stack, "EMAIL_USER");
  const EMAIL_APP_PASS = new Config.Secret(stack, "EMAIL_APP_PASS");
  const VERSION = new Config.Parameter(stack, "VERSION", {
    value: "1.0.0",
  });

  const table = new Table(stack, "Users", {
    fields: {
      id: "string",
      email: "string",
    },
    primaryIndex: { partitionKey: "id" },
  });

  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        bind: [table],
      },
    },
    routes: {
      "GET /user": "packages/functions/src/listUsers.handler",
      "GET /user/getId/{id}": "packages/functions/src/getUserById.handler",
      "POST /user/add": "packages/functions/src/addUser.handler",
    },
  });

  const site = new SvelteKitSite(stack, "site", {
    bind: [
      JWT_SECRET,
      EMAIL_SERVICE,
      EMAIL_HOST,
      EMAIL_PORT,
      EMAIL_USER,
      EMAIL_APP_PASS,
      VERSION
    ],
    path: "packages/sveltekit/",
    customDomain: {
      domainName: "skml.michaelcuneo.com.au",
      hostedZone: "michaelcuneo.com.au",
    },
    environment: {
      API_URL: api.url,
    },
    edge: false,
  })

  stack.addOutputs({
    ApiUrl: api.url,
    url: site.url,
  });
}
