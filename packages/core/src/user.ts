import { DynamoDBClient, GetItemCommand, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { Table } from 'sst/node/table';

const client = new DynamoDBClient({});

export const fromId = async (id: string) => {
	const params = {
		TableName: Table.Users.tableName,
		KeyConditionExpression: 'id = :id',
		ExpressionAttributeValues: marshall({
			':id': id
		}),
		Key: {
			id: { S: id }
		}
	};

	const data = await client.send(new GetItemCommand(params))

	return JSON.stringify(data);
};

export const fromEmail = async (email: string) => {
	const params = {
		TableName: Table.Users.tableName,
		KeyConditionExpression: 'email = :email',
		ExpressionAttributeValues: marshall({
			':email': email
		}),
		Key: {
			email: { S: email }
		}
	};

	const data = await client.send(new GetItemCommand(params));

	return data;
};

export async function create(Item: any) {
	const params = {
		TableName: Table.Users.tableName,
		Item: marshall(Item)
	}

	const data = await client.send(new PutItemCommand(params));

	return data;
}
