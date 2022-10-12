import { S3Event } from "aws-lambda";
import { middyfy } from "@libs/lambda";
import fileService from "@services/index";
import { formatJSONResponse } from "@libs/api-gateway";

export const importFileParser = async (event: S3Event) => {
  let products = [];
  try {
    await Promise.all(
      event.Records.map(async (record) => {
        const fileKey = record.s3.object.key;
        console.log("Parsing file from S3: ", fileKey);
        products = await fileService.getFileData(fileKey);
        console.log("Parsed products data: ", JSON.stringify(products));
      })
    );
    return formatJSONResponse(200, JSON.stringify(products));
  } catch (err) {
    return formatJSONResponse(500, err);
  }
};

export const handler = middyfy(importFileParser);
