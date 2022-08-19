import { Product } from "../models/Product";
import { products as data } from '../mocks/data';

export default class ProductService {

  async getAllProducts(): Promise<Product[]> {
    return Promise.resolve(data);
  }

  async getProductsById(id: string): Promise<Product> {
    return Promise.resolve(data.find(item => item.id === id));
  }
}