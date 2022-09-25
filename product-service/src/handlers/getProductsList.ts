import { APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import validator from "@middy/validator";
import { middyfy } from "@libs/lambda";
import { outputSchema } from "../schemas/productSchema";
import productService from "@services/index";

export const getProductsHandler = async (): Promise<APIGatewayProxyResult> => {
  try {
    const products = await productService.getAllProducts();
    return formatJSONResponse(200, products);
  } catch (err) {
    return formatJSONResponse(500, err);
  }
};

export const handler = middyfy(getProductsHandler).use(
  validator({ outputSchema })
);
