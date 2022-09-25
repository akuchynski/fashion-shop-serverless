export default interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  count: number;
}

export type Products = Array<Product>;
