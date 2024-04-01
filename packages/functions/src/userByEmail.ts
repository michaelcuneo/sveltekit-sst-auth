import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { Table } from 'sst/node/table';

export const handler: APIGatewayProxyHandlerV2 = async event => {
	if (!event?.pathParameters?.email)
    return {};

	const email = event.pathParameters.email;

	try {
		const client = new DynamoDBClient({});

		const params = {
			TableName: Table.Users.tableName,
			KeyConditionExpression: 'email = :email',
			ExpressionAttributeValues: {
				':email': email
			},
			Key: {
				userId: { S: event.pathParameters.email },
				email: { S: email }
			}
		};

		const data = await client.send(new GetItemCommand(params));

		return {
			statusCode: 200,
			body: JSON.stringify(email)
		};
	} catch (err) {
		return {
			statusCode: 500,
			body: JSON.stringify(err)
		};
	}
};
