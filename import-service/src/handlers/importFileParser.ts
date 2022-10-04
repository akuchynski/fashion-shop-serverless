import { S3Event } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import fileService from "@services/index";

export const importFileParser = async (event: S3Event) => {
  let products = [];
  try {
    await Promise.all(
      event.Records.map(async (record) => {
        const fileName = record.s3.object.key;
        console.log("Parsing file from S3: ", fileName);
        products = await fileService.getFileData(fileName);
        console.log("Parsed products data: ", JSON.stringify(products));
      })
    );
    return formatJSONResponse(200, JSON.stringify(products));
  } catch (err) {
    return formatJSONResponse(500, err);
  }
};

export const handler = middyfy(importFileParser);
