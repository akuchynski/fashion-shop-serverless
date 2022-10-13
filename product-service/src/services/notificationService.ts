import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";

export default class NotificationService {
  constructor(private readonly snsClient: SNSClient) {}

  async publishDataToSns(message: string) {
    const publishCommand: PublishCommand = new PublishCommand({
      Subject: "Products created",
      Message: message,
      TopicArn: process.env.SNS_TOPIC_ARN,
    });
    const result = await this.snsClient.send(publishCommand);
    console.log("Message sent to SNS:", JSON.stringify(result));
  }
}
