import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { fromEmail } from '@sveltekit-magiclinks/core/user';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
	const email = event?.pathParameters?.email || '';

	try {
		const user = await fromEmail(email);

		return {
			statusCode: 200,
			body: user ? JSON.stringify(user) : JSON.stringify("User doesn't exist")
		};
	} catch (err) {
		return {
			statusCode: 500,
			body: JSON.stringify(err)
		};
	}
};
