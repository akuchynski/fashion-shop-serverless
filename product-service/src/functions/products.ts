export const getProductsList = {
  handler: "src/handlers/getProductsList.handler",
  events: [
    {
      http: {
        method: "get",
        path: "product",
        cors: true,
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
      },
    },
  ],
};
