import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { Table } from "sst/node/table";
import { marshall } from "@aws-sdk/util-dynamodb";

const dynamoDb = new DynamoDBClient({
  region: "ap-southeast-2",
});

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const command = new GetItemCommand({
    TableName: Table.Users.tableName,
    Key: marshall(event),
  });

  const results = await dynamoDb.send(command);

  return results.Item
    ? {
        statusCode: 200,
        body: JSON.stringify({ message: "Successful" }),
      }
    : {
        statusCode: 404,
        body: JSON.stringify({ error: true }),
      };
};
