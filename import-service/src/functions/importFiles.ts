export const importProductsFile = {
  handler: "src/handlers/importProductsFile.handler",
  events: [
    {
      http: {
        method: "get",
        path: "import",
        cors: true,
        authorizer: {
          arn: "${self:provider.environment.AUTHORIZER_ARN}",
          resultTtlInSeconds: 0,
          identitySource: "method.request.header.Authorization",
          type: "token",
        },
      },
    },
  ],
};

export const importFileParser = {
  handler: "src/handlers/importFileParser.handler",
  events: [
    {
      s3: {
        bucket: "import-service-andrei-kuchynski",
        event: "s3:ObjectCreated:*",
        rules: [
          {
            prefix: "uploaded/",
            suffix: ".csv",
          },
        ],
        existing: true,
      },
    },
  ],
};
