export const getProductsList = {
  handler: "src/handlers/getProductsList.handler",
  events: [
    {
      http: {
        method: "get",
        path: "products",
        cors: true,
        swaggerTags: ["Products"],
        summary: "get all products",
        description: "Get All Products",
        responseData: {
          200: {
            description: "Successful API Response",
            bodyType: "Products",
          },
          400: {
            description: "Bad Request",
            bodyType: "ErrorResponse",
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
        path: "products/{id}",
        cors: true,
        swaggerTags: ["Products"],
        summary: "get product by id",
        description: "Get Product by id",
        responseData: {
          200: {
            description: "Successful API Response",
            bodyType: "Product",
          },
          400: {
            description: "Bad Request",
            bodyType: "ErrorResponse",
          },
        },
      },
    },
  ],
};

export const createProduct = {
  handler: "src/handlers/createProduct.handler",
  events: [
    {
      http: {
        method: "post",
        path: "products",
        cors: true,
        swaggerTags: ["Products"],
        summary: "create product",
        description: "Create Product",
        responseData: {
          201: {
            description: "Successful API Response",
            bodyType: "Product",
          },
          400: {
            description: "Bad Request",
            bodyType: "ErrorResponse",
          },
        },
      },
    },
  ],
};
