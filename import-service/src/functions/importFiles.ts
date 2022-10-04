export const importProductsFile = {
  handler: "src/handlers/importProductsFile.handler",
  events: [
    {
      http: {
        method: "get",
        path: "import",
        cors: true,
      },
    },
  ],
};

export const importFileParser = {
  handler: "src/handlers/importFileParser.handler",
  events: [
    {
      s3: {
        bucket: "import-service-bucket-andrei-kuchynski",
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
