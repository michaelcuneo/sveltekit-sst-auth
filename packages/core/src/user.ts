import { ulid } from 'ulid';
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { Table } from 'sst/node/table';

const client = new DynamoDBClient({});

export const fromId = async (id: string) => {
	const response = await client.send(
		new GetCommand({
			TableName: Table.Users.tableName,
			Key: {
				userId: id
			}
		})
	);

	return JSON.stringify(response);
};

export const fromEmail = async (email: string) => {
	const params = {
		TableName: Table.Users.tableName,
		KeyConditionExpression: 'email = :email',
		ExpressionAttributeValues: {
			':email': email
		},
		Key: {
			email: { S: email }
		}
	};

	const data = await client.send(new GetItemCommand(params));

	console.log(data);

	return data;
};

export async function create(Item: any) {
	const response = await client.send(
		new PutCommand({
			TableName: Table.Users.tableName,
			Item
		})
	);

	console.log(response);

	return response;
}
