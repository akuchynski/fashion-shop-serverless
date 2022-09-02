import type { AWS } from "@serverless/typescript";

import { getProductsList, getProductsById } from "@functions/products";

const serverlessConfiguration: AWS = {
  service: "product-service-andrei-kuchynski",
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
      role: "arn:aws:iam::398158581759:role/BasicLambdaExecutionRole",
    },
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
  },
  functions: { getProductsList, getProductsById },
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
    autoswagger: {
      title: "Product Service API",
      typefiles: ["./src/models/Product.ts", "./src/models/ErrorResponse.ts"],
      generateSwaggerOnDeploy: true,
      basePath: "/dev",
      apiType: "http",
    },
  },
};

module.exports = serverlessConfiguration;
