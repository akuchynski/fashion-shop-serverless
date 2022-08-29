export const getProductsList = {
  handler: "src/handlers/getProductsList.handler",
  events: [
    {
      http: {
        method: "get",
        path: "product",
        cors: true,
        swaggerTags: ["Products"],
        summary: "get all products",
        description: "Get All Products",
        responses: {
          200: {
            description: "Successful API Response",
            bodyType: "Products",
          },
          500: {
            description: "Internal server error",
            bodyType: "Error",
          },
        },
      },
    },
  ],
};

export const getProductsById = {
  handler: "src/handlers/getProductsById.handler",
  events: [
    {
      http: {
        method: "get",
        path: "product/{id}",
        cors: true,
        swaggerTags: ["Products"],
        summary: "get product by id",
        description: "Get Product by id",
        responses: {
          200: {
            description: "Successful API Response",
            bodyType: "Product",
          },
          404: {
            description: "Requested resource not found",
            bodyType: "Error",
          },
          500: {
            description: "Internal server error",
            bodyType: "Error",
          },
        },
      },
    },
  ],
};
