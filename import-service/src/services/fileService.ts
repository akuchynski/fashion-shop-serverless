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

export default class FileService {
  constructor(private readonly s3Client: S3Client) {}

  async getSignedUrl(fileName: string): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: `${process.env.UPLOADED_FOLDER_NAME}/${fileName}`,
    });
    return getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
  }

  async getFileData(fileName: string): Promise<Product[]> {
    const getObjectCommand = new GetObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: fileName,
    });

    const fileData = [];
    const getObjectOutput = await this.s3Client.send(getObjectCommand);
    const readableStream = getObjectOutput.Body as Readable;

    new Promise<Product[]>((resolve, reject) => {
      readableStream
        .pipe(csvParser())
        .on("error", () => reject("Error while parsing the stream"))
        .on("data", (item) => fileData.push(item as Product))
        .on("end", () => resolve(fileData));
    });

    await this.moveFile(fileName);
    return fileData;
  }

  private async moveFile(fileName: string) {
    console.log("Move file to parsed folder: ", fileName);
    const copyObjectParams = {
      Bucket: process.env.BUCKET_NAME,
      CopySource: `${process.env.UPLOADED_FOLDER_NAME}/${fileName}`,
      Key: `${process.env.PARSED_FOLDER_NAME}/${fileName}`,
    };

    await this.s3Client.send(new CopyObjectCommand(copyObjectParams));

    const deleteObjectParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: `${process.env.UPLOADED_FOLDER_NAME}/${fileName}`,
    };

    await this.s3Client.send(new DeleteObjectCommand(deleteObjectParams));
    console.log("File moved successfully: ", fileName);
  }
}
