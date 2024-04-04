import { signOut } from "$lib/utils/auth.js";
import { SESSION_COOKIE_NAME } from "$lib/utils/constants.js";

export const actions = {
  default: async ({ cookies }) => {
    const sessionId = cookies.get(SESSION_COOKIE_NAME);

    if (!sessionId) {
      return {};
    }

    try {
      signOut(sessionId);
      cookies.delete(SESSION_COOKIE_NAME, { path: '/' });
    } catch (error) {
      if (error instanceof Error) {
        return { message: error.message };
      }
    }

    return {};
  },
};