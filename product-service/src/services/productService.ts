import { Product } from "@models/Product";
import { products } from "@mocks/data/products";

export default class ProductService {
  async getAllProducts(): Promise<Product[]> {
    return Promise.resolve(products);
  }

  async getProductsById(id: string): Promise<Product> {
    return Promise.resolve(products.find((item) => item.id === id));
  }
}
