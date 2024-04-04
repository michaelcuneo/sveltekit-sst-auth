import type { PageServerLoad } from './$types';
import jwt from 'jsonwebtoken';
import { fail, redirect } from '@sveltejs/kit';
import { SESSION_COOKIE_NAME } from '$lib/utils/constants.js';
import { createSessionById }  from '$lib/utils/auth.js';

export const load: PageServerLoad = ({ cookies, url }) => {
	const token: string = url.searchParams.get('token')?.toString() ?? '';

  if (token == '') {
		redirect(303, '/');
  }

  let user: UserToken = jwt.decode(token) as UserToken;
  
  const sessionCreate = createSessionById(user.userId);
  cookies.set(SESSION_COOKIE_NAME, sessionCreate.id, { maxAge: 24 * 60 * 60, path: '/' });
  redirect(303, '/');
  /*
    if (error instanceof Error) {
      return fail(500, {
        userId: user.userId,
        message: error.message
      });
    } else {
      return fail(500, {
        userId: user.userId,
        message: 'Unknown error occured on the server.'
      });
    }
  }
  */

  return { user }
};
