import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { Table } from 'sst/node/table';
import { randomUUID } from 'crypto';

const client = new DynamoDBClient();
const documentClient = DynamoDBDocumentClient.from(client);

/**
 * Retrieves a user from the Users table by their id.
 *
 * @param {string} id - The id of the user to retrieve.
 * @return {Promise<object|string>} The user data if found, or undefined.
 */
export const fromId = async (id: string) => {
	// Set the parameters for the GetCommand
	const params = {
		TableName: Table.Users.tableName, // The name of the Users table
		Key: {
			id: id // The id of the user to retrieve
		}
	};

	// Execute the GetCommand and get the data
	const data = await documentClient.send(new GetCommand(params));

	// If data came back, and it contains Items, return the Items, otherwise undefined
	return data && data.Item ? data.Item : JSON.stringify(undefined);
};

/**
 * Retrieves a user from the Users table by their email.
 *
 * @param {string} email - The email of the user to retrieve.
 * @return {Promise<object|string>} The user data if found, or undefined.
 */
export const fromEmail = async (email: string) => {
	// Set the parameters for the GetCommand
	// The parameters contain the name of the Users table and the email of the user to retrieve
	const params = {
		TableName: Table.Users.tableName,
		Key: {
			email: email
		}
	};

	// Execute the GetCommand and get the data
	// The data contains the user information if found, otherwise it is undefined
	const data = await documentClient.send(new GetCommand(params));

	// If data came back, and it contains Items, return the Items, otherwise undefined
	// The Items are the user data
	// The JSON string "undefined" is returned if the data is undefined
	return data && data.Item ? data.Item : JSON.stringify(undefined);
};

/**
 * Creates a new user in the Users table.
 *
 * @param {string} email - The email of the user to create.
 * @return {Promise<object|string>} The user data if created, or undefined.
 */
export async function create(email: string) {
	// Set the parameters for the PutCommand
	// The parameters contain the name of the Users table and the user data to create
	const params = {
		TableName: Table.Users.tableName,
		Item: {
			id: randomUUID().toString(), // Generate a new id for the user
			email: email // Set the email of the user
		}
	};

	// Execute the PutCommand to create the user
	const data = await documentClient.send(new PutCommand(params));

	// If the PutCommand was successful (status code 200), get the user data
	if (data.$metadata.httpStatusCode === 200) {
		const userParams = {
			TableName: Table.Users.tableName, // The name of the Users table
			Key: {
				email: email // The email of the user to retrieve
			}
		};

		// Retrieve the user data from the Users table
		const user = await documentClient.send(new GetCommand(userParams));

		// If data came back, and it contains Items, return the Items, otherwise undefined
		// The Items are the user data
		// The JSON string "undefined" is returned if the data is undefined
		return user && user.Item ? user.Item : JSON.stringify(undefined);
	} else {
		// If the PutCommand was not successful, return undefined
		return JSON.stringify(undefined);
	}
}
