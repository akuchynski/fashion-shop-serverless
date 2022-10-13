import dynamoDBClient from "../database";
import ProductService from "./productService";
import NotificationService from "@services/notificationService";
import { SNSClient } from "@aws-sdk/client-sns";

const snsClient = new SNSClient({ region: process.env.AWS_FRANKFURT_REGION });

const notificationService = new NotificationService(snsClient);
const productService = new ProductService(dynamoDBClient());

export { notificationService, productService };
