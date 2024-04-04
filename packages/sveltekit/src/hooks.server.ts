import { validateSession } from "$lib/utils/auth";
import { SESSION_COOKIE_NAME } from "$lib/utils/constants";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const sessionCookie = event.cookies.get(SESSION_COOKIE_NAME);

  if (sessionCookie) {
    try {
      const sessionValidationResult = validateSession(sessionCookie);

      event.locals.session = sessionValidationResult.sessionResult;
    } catch (error) {
      event.cookies.delete(SESSION_COOKIE_NAME, { path: '/' });
      event.locals.session = undefined;
    }
  } else {
    event.locals.session = undefined;
  }

  const response = resolve(event);

  return response;
};