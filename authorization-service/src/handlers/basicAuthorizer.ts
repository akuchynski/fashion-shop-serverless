import { middyfy } from "@libs/lambda";
import { buildPolicy } from "../utils/buildPolicy";
import { formatJSONResponse } from "@libs/api-gateway";
import { APIGatewayTokenAuthorizerEvent } from "aws-lambda/trigger/api-gateway-authorizer";

const basicAuthorizer = async (event: APIGatewayTokenAuthorizerEvent) => {
  console.log("basicAuthorizer event:", event);
  try {
    const { type, authorizationToken, methodArn } = event;
    if (type !== "TOKEN" || !authorizationToken) {
      return formatJSONResponse(401, "Authorization token not provided");
    }
    const encodedCreds = authorizationToken.split(" ")[1];
    const buff = Buffer.from(encodedCreds, "base64");
    const [login, password] = buff.toString("utf-8").split(":");

    const storedPass = process.env[login];
    const effect = !storedPass || storedPass !== password ? "Deny" : "Allow";
    console.log("basicAuthorizer effect:", effect);
    return buildPolicy(encodedCreds, methodArn, effect);
  } catch (err) {
    return formatJSONResponse(403, "Unauthorized");
  }
};

export const handler = middyfy(basicAuthorizer);
