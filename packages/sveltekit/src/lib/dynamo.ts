import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Service } from "electrodb";

const table = "Users";
const client = new DynamoDBClient({ region: "ap-southeast-2" });

const service = new Service({
  client,
  models: {
    User: {
      entity: table,
      attributes: {
        userID: {
          type: "string",
          required: true,
          readOnly: true
        },
        email: {
          type: "string",
          required: true
        }
      }
    }
  }
})