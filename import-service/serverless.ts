import type { AWS } from "@serverless/typescript";

import { importProductsFile, importFileParser } from "@functions/importFiles";

const serverlessConfiguration: AWS = {
  service: "import-service-andrei-kuchynski",
  frameworkVersion: "3",
  plugins: [
    "serverless-auto-swagger",
    "serverless-esbuild",
    "serverless-offline",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: "eu-central-1",
    profile: "js-cc4",
    stage: "dev",
    iam: {
      role: {
        permissionsBoundary:
          "arn:aws:iam::${aws:accountId}:policy/eo_role_boundary",
        statements: [
          {
            Effect: "Allow",
            Action: ["s3:ListBucket"],
            Resource: "arn:aws:s3:::${self:provider.environment.BUCKET_NAME}",
          },
          {
            Effect: "Allow",
            Action: ["s3:*"],
            Resource: "arn:aws:s3:::${self:provider.environment.BUCKET_NAME}/*",
          },
          {
            Effect: "Allow",
            Action: ["sqs:*"],
            Resource: "${self:provider.environment.SQS_QUEUE_ARN}",
          },
        ],
      },
    },
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      BUCKET_NAME: "import-service-andrei-kuchynski",
      UPLOADED_FOLDER_NAME: "uploaded",
      PARSED_FOLDER_NAME: "parsed",
      AWS_FRANKFURT_REGION: "eu-central-1",
      SQS_NAME: "catalogItemsQueueAkuchynski",
      SQS_QUEUE_ARN:
        "arn:aws:sqs:eu-central-1:398158581759:catalogItemsQueueAkuchynski",
      SQS_QUEUE_URL:
        "https://sqs.eu-central-1.amazonaws.com/398158581759/catalogItemsQueueAkuchynski",
    },
  },
  functions: { importProductsFile, importFileParser },
  package: { individually: true },
  resources: {
    extensions: {
      IamRoleCustomResourcesLambdaExecution: {
        Properties: {
          PermissionsBoundary:
            "arn:aws:iam::${aws:accountId}:policy/eo_role_boundary",
        },
      },
    },
  },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    autoswagger: {
      title: "Import Service API",
      typefiles: ["./src/models/Product.ts", "./src/models/ErrorResponse.ts"],
      generateSwaggerOnDeploy: true,
      basePath: "/dev",
      apiType: "http",
    },
  },
};

module.exports = serverlessConfiguration;
