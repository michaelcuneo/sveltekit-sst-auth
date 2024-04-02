import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { create } from '../../core/src/user';
import { randomUUID } from 'crypto';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
	const { email } = JSON.parse(event?.body || '');

	try {
		const item = {
			userId: randomUUID().toString(),
			email: email
		};

		let user = await create(item);

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
