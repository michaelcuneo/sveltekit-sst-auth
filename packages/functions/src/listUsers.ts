import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { Table } from "sst/node/table";

const dynamoDb = new DynamoDBClient({
  region: "ap-southeast-2",
});

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const command = new ScanCommand({
    TableName: Table.Users.tableName,
  });

  await dynamoDb.send(command)
    .then(res => {
      if (res.Items) return {
        statusCode: 200,
        body: res.Items,
      }
    })
    .catch(err => {
      return {
        statusCode: 400,
        body: err,
      }
    })

  return {
    statusCode: 400,
    body: 'Something went wrong.'
  };
};
