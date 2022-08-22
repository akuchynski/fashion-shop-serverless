export const getProductsList = {
  handler: "src/handlers/getProductsList.handler",
  events: [
    {
      http: {
        method: "get",
        path: "products/",
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
      },
    },
  ],
};
