import { signOut } from "$lib/auth.js";
import { SESSION_COOKIE_NAME } from "$lib/constants.js";
import type { Actions } from "@sveltejs/kit";

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
} satisfies Actions;