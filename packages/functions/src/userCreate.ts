import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { create } from '@sveltekit-magiclinks/core/user';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
	const email = JSON.parse(event?.body || '');

	try {
		const user = await create(email);

		return {
			statusCode: 200,
			body: user ? JSON.stringify(user) : JSON.stringify('User not created')
		};
	} catch (err) {
		return {
			statusCode: 500,
			body: JSON.stringify(err)
		};
	}
};
