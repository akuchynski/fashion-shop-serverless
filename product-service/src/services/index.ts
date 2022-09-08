import dynamoDBClient from "../database";
import ProductService from "./productService";

const productService = new ProductService(dynamoDBClient());

export default productService;
