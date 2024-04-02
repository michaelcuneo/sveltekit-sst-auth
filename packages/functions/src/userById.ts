import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { fromId } from '@sveltekit-magiclinks/core/user';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
	const { id } = JSON.parse(event?.pathParameters || '');

	try {
		let user = await fromId(id);

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
