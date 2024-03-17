import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { Table } from 'sst/node/table';

const dynamoDb = new DynamoDBClient({
	region: 'ap-southeast-2'
});

export const handler: APIGatewayProxyHandlerV2 = async () => {
	try {
		const command = new ScanCommand({
			TableName: Table.Users.tableName
		});

		const response = await dynamoDb.send(command);

		return {
			statusCode: 200,
			body: response
		};
	} catch (err) {
		if (err instanceof Error) {
			return err;
		}
	}
};
