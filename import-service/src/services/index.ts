import FileService from "./fileService";
import { S3 } from "@aws-sdk/client-s3";
import { SQSClient } from "@aws-sdk/client-sqs";

const s3Client = new S3({ region: process.env.AWS_FRANKFURT_REGION });
const sqsClient = new SQSClient({ region: process.env.AWS_FRANKFURT_REGION });

const fileService = new FileService(s3Client, sqsClient);

export default fileService;
