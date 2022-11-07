import type { AWS } from "@serverless/typescript";

import {
  getProductsList,
  getProductsById,
  createProduct,
  catalogBatchProcess,
} from "@functions/products";

const serverlessConfiguration: AWS = {
  service: "product-service-andrei-kuchynski",
  frameworkVersion: "3",
  plugins: [
    "serverless-auto-swagger",
    "serverless-esbuild",
    "serverless-offline",
    "serverless-dynamodb-local",
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
            Action: "s3:*",
            Resource: "*",
          },
          {
            Effect: "Allow",
            Action: [
              "dynamodb:DescribeTable",
              "dynamodb:Query",
              "dynamodb:Scan",
              "dynamodb:GetItem",
              "dynamodb:PutItem",
              "dynamodb:UpdateItem",
              "dynamodb:DeleteItem",
            ],
            Resource: {
              "Fn::GetAtt": ["ProductsTable", "Arn"],
            },
          },
          {
            Effect: "Allow",
            Action: ["sns:*"],
            Resource: "${self:provider.environment.SNS_TOPIC_ARN}",
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
      AWS_FRANKFURT_REGION: "eu-central-1",
      SQS_QUEUE_ARN:
        "arn:aws:sqs:eu-central-1:398158581759:catalogItemsQueueAkuchynski",
      SNS_TOPIC_ARN:
        "arn:aws:sns:eu-central-1:398158581759:createProductTopicAkuchynski",
    },
  },
  functions: {
    getProductsList,
    getProductsById,
    createProduct,
    catalogBatchProcess,
  },
  package: { individually: true },
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
    dynamodb: {
      start: {
        port: 5000,
        inMemory: true,
        migrate: true,
      },
      stages: "dev",
    },
    autoswagger: {
      title: "Product Service API",
      typefiles: ["./src/models/Product.ts", "./src/models/ErrorResponse.ts"],
      generateSwaggerOnDeploy: true,
      basePath: "/dev",
      apiType: "http",
    },
  },
  resources: {
    Resources: {
      ProductsTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "Products",
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH",
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
