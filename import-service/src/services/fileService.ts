import Product from "@models/Product";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { Readable } from "stream";
import csvParser from "csv-parser";
import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import { getAttributesFromCsvRow } from "../utils/sqsMessageConverter";

export default class FileService {
  constructor(
    private readonly s3Client: S3Client,
    private readonly sqsClient: SQSClient
  ) {}

  async getSignedUrl(fileName: string): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: `${process.env.UPLOADED_FOLDER_NAME}/${fileName}`,
    });
    return getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
  }

  async getFileData(fileKey: string): Promise<Product[]> {
    const getObjectCommand = new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: fileKey,
    });

    const fileData = [];
    const getObjectOutput = await this.s3Client.send(getObjectCommand);
    const readableStream = getObjectOutput.Body as Readable;

    const result = new Promise<Product[]>((resolve, reject) => {
      readableStream
        .pipe(csvParser())
        .on("error", () => reject("Error while parsing the stream"))
        .on("data", (rowItem) => {
          fileData.push(rowItem);
          this.sendMessageToQueue(rowItem);
        })
        .on("end", () => resolve(fileData));
    });

    console.log("Parsed fileData: ", JSON.stringify(fileData));
    await this.moveFile(fileKey);
    return result;
  }

  private async sendMessageToQueue(rowItem: any) {
    try {
      await this.sqsClient.send(
        new SendMessageCommand({
          MessageAttributes: getAttributesFromCsvRow(rowItem),
          MessageBody: "Product Item Data",
          QueueUrl: process.env.SQS_QUEUE_URL,
        })
      );
    } catch (e) {
      console.error(
        "Error during message sending to SQS. Data item :",
        JSON.stringify(rowItem)
      );
    }
  }

  private async moveFile(fileKey: string) {
    console.log("Moving file to parsed folder: ", fileKey);
    const parsedFileKey = fileKey.replace(
      process.env.UPLOADED_FOLDER_NAME,
      process.env.PARSED_FOLDER_NAME
    );
    const copyObjectParams = {
      Bucket: process.env.BUCKET_NAME,
      CopySource: `${process.env.BUCKET_NAME}/${fileKey}`,
      Key: parsedFileKey,
    };
    await this.s3Client.send(new CopyObjectCommand(copyObjectParams));

    const deleteObjectParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: fileKey,
    };
    await this.s3Client.send(new DeleteObjectCommand(deleteObjectParams));
    console.log("File moved successfully: ", parsedFileKey);
  }
}
