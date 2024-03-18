import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Service } from "electrodb";

const table = "Users";
const client = new DynamoDBClient({ region: "ap-southeast-2" });

export const Dynamo = new Service({
  client,
  table,
})