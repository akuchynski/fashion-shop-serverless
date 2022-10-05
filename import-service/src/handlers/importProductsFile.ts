import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { middyfy } from "@libs/lambda";
import fileService from "@services/index";
import { formatJSONResponse } from "@libs/api-gateway";

export const importProductsFile = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const fileName = event.queryStringParameters.name;
    if (!fileName) {
      return formatJSONResponse(500, "File name is empty");
    }
    const signedUrl = await fileService.getSignedUrl(fileName);
    return formatJSONResponse(200, signedUrl);
  } catch (err) {
    return formatJSONResponse(500, err);
  }
};

export const handler = middyfy(importProductsFile);
