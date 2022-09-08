import { APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import productService from "@services/index";

export const handler = middyfy(async (): Promise<APIGatewayProxyResult> => {
  try {
    const products = await productService.getAllProducts();
    return formatJSONResponse(200, products);
  } catch (err) {
    return formatJSONResponse(400, err);
  }
});
