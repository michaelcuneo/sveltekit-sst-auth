import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { Table } from 'sst/node/table';
import { randomUUID } from 'crypto';

const client = new DynamoDBClient();
const documentClient = DynamoDBDocumentClient.from(client);

export const fromEmail = async (email: string) => {
	const params = {
		TableName: Table.Users.tableName,
		Key: {
			email: email
		}
	};

	const data = await documentClient.send(new GetCommand(params));

	// If data came back, and it contains Items, return the Items, otherwise NULL
	return data && data.Item ? data.Item : JSON.stringify(undefined);
};

export async function create(email: string) {
	const params = {
		TableName: Table.Users.tableName,
		Item: {
			id: randomUUID().toString(),
			email: email,
		}
	};

	const data = await documentClient.send(new PutCommand(params));

	if (data.$metadata.httpStatusCode === 200) {
		const params = {
			TableName: Table.Users.tableName,
			Key: {
				email: email
			}
		}

		const user = await documentClient.send(new GetCommand(params));

		return user && user.Item ? user.Item : JSON.stringify(undefined);
	} else {
		return JSON.stringify(undefined);
	}
}
