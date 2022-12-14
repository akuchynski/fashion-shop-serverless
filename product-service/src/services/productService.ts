import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { v4 as uuidv4 } from "uuid";
import Product from "@models/Product";

export default class ProductService {
  private TableName: string = "Products";

  constructor(private readonly docClient: DocumentClient) {}

  async getAllProducts(): Promise<Product[]> {
    const result = await this.docClient
      .scan({
        TableName: this.TableName,
      })
      .promise();
    return result.Items as Product[];
  }

  async getProductsById(id: string): Promise<Product> {
    const result = await this.docClient
      .get({
        TableName: this.TableName,
        Key: { id },
      })
      .promise();
    return result.Item as Product;
  }

  async createProduct(product: Product): Promise<Product> {
    const id = uuidv4();
    await this.docClient
      .put({
        TableName: this.TableName,
        Item: { ...product, id },
      })
      .promise();
    return product;
  }

  async createProducts(products: Product[]): Promise<Product[]> {
    return Promise.all(products.map((product) => this.createProduct(product)));
  }
}
