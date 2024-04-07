import { computeCodeSnippets } from '$lib/server/shiki';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const codes = await computeCodeSnippets();

	return {
		codes
	};
}) satisfies PageServerLoad;
