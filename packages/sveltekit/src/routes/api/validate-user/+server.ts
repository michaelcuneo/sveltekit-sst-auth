import { validateSession } from "$lib/utils/auth";
import { SESSION_COOKIE_NAME } from "$lib/utils/constants";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ cookies }) => {
  const sessionCookie = cookies.get(SESSION_COOKIE_NAME);

  if (sessionCookie) {
    try {
      const sessionValidationResult = validateSession(sessionCookie);

      return json({ authenticated: true });
    } catch (error) {
      cookies.delete(SESSION_COOKIE_NAME, { path: '/' });
      return json({ authenticated: false });
    }
  } else {
    return json({ authenticated: false });
  }
};