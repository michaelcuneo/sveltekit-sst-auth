import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { fromEmail } from '@sveltekit-magiclinks/core/user';

export const handler: APIGatewayProxyHandlerV2 = async event => {
	const { email } = JSON.parse(event?.pathParameters || '');

	try {
		let user = await fromEmail(email);

		return {
			statusCode: 200,
			body: JSON.stringify(user),
		};
	} catch (err) {
		return {
			statusCode: 500,
			body: JSON.stringify(err)
		};
	}
};
