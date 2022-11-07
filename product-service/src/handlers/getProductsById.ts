import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import validator from "@middy/validator";
import { middyfy } from "@libs/lambda";
import { outputSchema } from "../schemas/productSchema";
import { productService } from "@services/index";

export const getProductHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const id = event.pathParameters.id;
    const product = await productService.getProductsById(id);
    return formatJSONResponse(200, product);
  } catch (err) {
    return formatJSONResponse(500, err);
  }
};

export const handler = middyfy(getProductHandler).use(
  validator({ outputSchema })
);
