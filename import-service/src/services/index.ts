import FileService from "./fileService";
import { S3 } from "@aws-sdk/client-s3";

const s3Client = new S3({ region: process.env.BUCKET_REGION });

const fileService = new FileService(s3Client);

export default fileService;
