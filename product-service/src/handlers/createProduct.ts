import { APIGatewayProxyResult } from "aws-lambda";
import { v4 as uuidv4 } from "uuid";
import validator from "@middy/validator";
import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { inputSchema, outputSchema } from "../schemas/productSchema";
import productService from "@services/index";

const createProductHandler: ValidatedEventAPIGatewayProxyEvent<
  typeof inputSchema
> = async (event): Promise<APIGatewayProxyResult> => {
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
    return formatJSONResponse(500, err);
  }
};

export const handler = middyfy(createProductHandler).use(
  validator({ inputSchema, outputSchema })
);
