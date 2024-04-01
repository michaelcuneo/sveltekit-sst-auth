import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { create } from '../../core/src/user';
import { randomUUID } from 'crypto';

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
	const { email } = JSON.parse(event?.body || '');

	if (email) {
		const item = {
			userId: randomUUID().toString(),
			email: email
		};

		try {
			await create(item);

			return {
				statusCode: 200,
				body: 'Success'
			};
		} catch (err) {
			if (err instanceof Error) {
				return {
					statusCode: 500,
					body: 'Fail'
				};
			}
			if (typeof err === 'string') {
				return {
					statusCode: 500,
					body: 'Fail'
				};
			}
		}

		return {
			statusCode: 400,
			body: 'Something went wrong'
		};
	}
};
