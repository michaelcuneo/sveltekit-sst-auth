import type { LayoutLoad } from './$types';

export const load = (async ({ fetch }) => {
	const result = await fetch('/api/validate-user');

	const parsedResult = await result.json();

	const { authenticated } = parsedResult;

	if (authenticated !== undefined && typeof authenticated === 'boolean') {
		return { authenticated };
	}

	return { authenticated: false };
}) satisfies LayoutLoad;
