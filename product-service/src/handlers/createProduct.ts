import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 as uuidv4 } from "uuid";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import productService from "@services/index";
import CreateProduct from "@models/dtos/CreatePostDto";

export const handler = middyfy(
  async (
    event: APIGatewayProxyEvent & CreateProduct
  ): Promise<APIGatewayProxyResult> => {
    try {
      const id = uuidv4();
      const { title, description, price, count } = event.body;
      const product = await productService.createProduct({
        id,
        title,
        description,
        price,
        count,
      });
      return formatJSONResponse(201, product);
    } catch (err) {
      return formatJSONResponse(400, err);
    }
  }
);
