import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { Table } from "sst/node/table";
import { User } from "./User";
import { marshall } from "@aws-sdk/util-dynamodb";

const dynamoDb = new DynamoDBClient({
  region: "ap-southeast-2",
});

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const user: User = {
    id: crypto.randomUUID(),
    email: event.value.email,
  }

  const command = new PutItemCommand({
    TableName: Table.Users.tableName,
    Item: marshall(user),
  });

  const results = await dynamoDb.send(command);

  console.log(results);

  return results
    ? {
        statusCode: 200,
        body: JSON.stringify({ message: "Successful" }),
      }
    : {
        statusCode: 404,
        body: JSON.stringify({ error: true }),
      };
};
