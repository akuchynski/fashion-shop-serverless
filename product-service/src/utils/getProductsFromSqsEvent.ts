import { SQSEvent } from "aws-lambda";

export const getProductsFromSqsEvent = (sqsEvent: SQSEvent) => {
  return sqsEvent.Records.map((record) => JSON.parse(record.body));
};
