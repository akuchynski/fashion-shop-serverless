import { APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponseArr } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import productService from "@services/index";

export const handler = middyfy(async (): Promise<APIGatewayProxyResult> => {
  const products = await productService.getAllProducts();
  return formatJSONResponseArr(products);
});
