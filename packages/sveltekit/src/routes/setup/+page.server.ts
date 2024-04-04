import { compute_codes } from "$lib/server/shiki";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  const codes = await compute_codes();

  return {
    codes,
  };
}) satisfies PageServerLoad;
