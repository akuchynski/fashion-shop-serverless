import { SQSEvent } from "aws-lambda";
import { middyfy } from "@libs/lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { notificationService, productService } from "@services/index";
import Product from "@models/Product";
import { getProductsFromSqsEvent } from "../utils/getProductsFromSqsEvent";

export const importFileParser = async (event: SQSEvent) => {
  try {
    console.log("SQS event:", JSON.stringify(event));
    const products: Product[] = getProductsFromSqsEvent(event);

    console.log("Products extracted from SQS:", JSON.stringify(products));
    await productService.createProducts(products);

    await notificationService.publishDataToSns(JSON.stringify(products));
    console.log("Notification sent to SNS topic");
    return formatJSONResponse(200, {});
  } catch (err) {
    return formatJSONResponse(500, err);
  }
};

export const handler = middyfy(importFileParser);
