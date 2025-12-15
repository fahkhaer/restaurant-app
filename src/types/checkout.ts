import type {
  OrderItemBase,
  OrderPricing,
  OrderRestaurantInfo,
  OrderStatus,
} from './order';

export type CheckoutApiResponse = {
  success: boolean;
  message: string;
  data: {
    transaction: Transaction;
  };
};

export type Transaction = {
  id: number;
  transactionId: string;
  paymentMethod: string;
  status: OrderStatus;
  deliveryAddress: string;
  phone: string;
  pricing: OrderPricing;
  restaurants: TransactionRestaurant[];
  createdAt: string;
};

export type TransactionRestaurant = {
  restaurant: OrderRestaurantInfo;
  items: TransactionItem[];
  subtotal: number;
};

export type TransactionItem = OrderItemBase;

export type CheckoutPayload = {
  restaurants: CheckoutRestaurant[];
  deliveryAddress: string;
  phone: string;
  paymentMethod: string;
  notes: string;
};

export type CheckoutRestaurant = {
  restaurantId: number;
  items: CheckoutItem[];
};

export type CheckoutItem = {
  menuId: number;
  quantity: number;
};
