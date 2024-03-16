import type { PageServerLoad } from './$types';
import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import { fail, redirect } from '@sveltejs/kit';
import { SESSION_COOKIE_NAME } from '$lib/constants.js';
import { createSessionByEmail } from '$lib/auth';
import { Config } from "sst/node/config";

export const load: PageServerLoad = ({ cookies, url }) => {
	const token: string = url.searchParams.get('token')?.toString() ?? '';
  const secret: string = Config.JWT_SECRET;

	if (token == '') {
		redirect(303, '/');
	}

	const decodedToken = jwt.verify(token, secret) as JwtPayload;
  const getUser = fetch('/api/getUser/decodedToken?.userId');

	// Create a session and cookie!
	if (user != null) {
    try {
      const sessionCreate = createSessionByEmail(user.email);
      cookies.set(SESSION_COOKIE_NAME, sessionCreate.id, { maxAge: 24 * 60 * 60, path: '/' });
    } catch(error) {
      if (error instanceof Error) {
        return fail(500, {
          email: user.email,
          message: error.message,
        })
      } else {
        return fail(500, {
          email: user.email,
          message: 'Unknown error occured on the server.'
        })
      }
    }
	}

  redirect(303, '/auth/success');
};
