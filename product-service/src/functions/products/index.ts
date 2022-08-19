import { handlerPath } from '@libs/handler-resolver';

export const getProductsList = {
  handler: `${handlerPath(__dirname)}/handlers.getProductsList`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/',
      },
    },
  ],
};

export const getProductsById = {
  handler: `${handlerPath(__dirname)}/handlers.getProductsById`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/{id}',
      },
    },
  ],
};
