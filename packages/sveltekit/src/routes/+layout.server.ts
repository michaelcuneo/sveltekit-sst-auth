import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals }) => {
  return {
    authenticated: locals.session !== undefined,
  };
}) satisfies LayoutServerLoad;
