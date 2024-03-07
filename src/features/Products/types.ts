export type ProductType = {
  id: number;
  name: string;
  rating?: number;
  featured: boolean;
  itemsInStock?: number;
  receiptDate?: string | null;
  brand?: string;
  categories: number[];
  expirationDate?: string | null;
  createdAt: string;
};
