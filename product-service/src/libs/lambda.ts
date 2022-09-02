import middy from "@middy/core";
import inputOutputLogger from "@middy/input-output-logger";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import errorLogger from "@middy/error-logger";

export const middyfy = (handler) => {
  return middy(handler)
    .use(inputOutputLogger())
    .use(errorLogger())
    .use(middyJsonBodyParser());
};
