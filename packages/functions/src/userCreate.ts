import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { Table } from 'sst/node/table';
import { User } from './User';
import { marshall } from '@aws-sdk/util-dynamodb';

const dynamoDb = new DynamoDBClient({
	region: 'ap-southeast-2'
});

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
	const email = event.body?.toString() ?? '';

	const user: User = {
		id: crypto.randomUUID(),
		email: email
	};

	const command = new PutItemCommand({
		TableName: Table.Users.tableName,
		Item: marshall(user)
	});

	try {
		const response = await dynamoDb.send(command);

		return response
			? {
					statusCode: 200,
					body: JSON.stringify({ message: 'Successful' })
				}
			: {
					statusCode: 404,
					body: JSON.stringify({ error: true })
				};
	} catch (err) {
		if (err instanceof Error) {
			return {
				statusCode: 500,
				body: err
			};
		}
	}
};
