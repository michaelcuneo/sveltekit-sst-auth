import { Config } from 'sst/node/config';
import { AuthHandler, GoogleAdapter, LinkAdapter, Session } from 'sst/node/auth';
import { User } from './user';

declare module "sst/node/auth" {
  export interface SessionTypes {
    user: {
      userID: string;
    };
  }
}

export const handler = AuthHandler({
  providers: {
    google: GoogleAdapter({
      mode: 'oidc',
      clientID: Config.GOOGLE_CLIENT_ID,
      onSuccess: async (tokenSet) => {
        let exists = await User.fromEmail(tokenSet.claims().email!);
        
        if (!exists) {
          exists = await User.create(tokenSet.claims().email!)
        }

        return Session.parameter({
          redirect: "https://example.com",
          type: "user",
          properties: {
            userID: exists.userID,
          }
        })
      },
    }),
    magicLink: LinkAdapter({
      onLink: async (link, claims) => {
        return {
          statusCode: 200,
          body: link,
        };
      },
      onSuccess: async (claims) => {
        let exists = await User.fromEmail(claims.email!);
        if (!exists) {
          exists = await User.create(claims.email!)
        }

        return Session.parameter({
          redirect: "https://example.com",
          type: "user",
          properties: {
            userID: exists.userID,
          }
        })
      },
      onError: async () => {
        return {
          statusCode: 500,
          body: 'Something went wrong'
        };
      }
    })
  },
})
