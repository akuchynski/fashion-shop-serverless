import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import productService from "@services/index";

export const handler = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const id = event.pathParameters.id;
      const product = await productService.getProductsById(id);
      return formatJSONResponse(200, product);
    } catch (err) {
      return formatJSONResponse(400, err);
    }
  }
);
