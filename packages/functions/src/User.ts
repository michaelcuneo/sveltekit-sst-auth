import { APIGatewayEventRequestContextV2, APIGatewayProxyEventV2, APIGatewayProxyEventV2WithRequestContext } from "aws-lambda";

type User = {
  id: string;
  email: string;
};

export { User };