import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import productService from "../../services";

export const getProductsList = middyfy(async (): Promise<APIGatewayProxyResult> => {
  const products = await productService.getAllProducts();
  return formatJSONResponse({
    products
  });
});

export const getProductsById = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log("Event : " + event);
  const id = event.pathParameters.id;
  const product = await productService.getProductsById(id);
  return formatJSONResponse({
    product
  });
});