import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { fromEmail } from '../../core/src/user';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
	if (event?.pathParameters?.id) {
		let userId;

		console.error(new Error(event?.pathParameters?.id));

		try {
			userId = await fromEmail(event.pathParameters.id);

			return {
				statusCode: 200,
				body: JSON.stringify(userId)
			};
		} catch (err) {
			return {
				statusCode: 500,
				body: JSON.stringify(err)
			};
		}
	}
};
