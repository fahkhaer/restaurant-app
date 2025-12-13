export type MenuItem = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  categoryId: string;
  rating?: number;
  createdAt?: string;
};
export type CartItem = {
  id: string; // menu id
  name: string;
  price: number;
  qty: number;
  imageUrl?: string;
};
