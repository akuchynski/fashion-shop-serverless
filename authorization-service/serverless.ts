import type { AWS } from "@serverless/typescript";

import { basicAuthorizer } from "@functions/authorization";

const serverlessConfiguration: AWS = {
  service: "authorization-service-akuchynski",
  frameworkVersion: "3",
  plugins: [
    "serverless-dotenv-plugin",
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
      },
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
  functions: { basicAuthorizer },
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
  },
};

module.exports = serverlessConfiguration;
