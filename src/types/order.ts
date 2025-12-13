export type Order = {
  id: number;
  transactionId: string;
  status: OrderStatus;
  paymentMethod: string;
  deliveryAddress: string;
  phone: string;
  pricing: OrderPricing;
  restaurants: OrderRestaurant[];
  createdAt: string;
  updatedAt: string;
};

export type OrderPricing = {
  subtotal: number;
  serviceFee: number;
  deliveryFee: number;
  totalPrice: number;
};

export type OrderItem = {
  menuId: number;
  menuName: string;
  price: number;
  image: string;
  quantity: number;
  itemTotal: number;
};

export type OrderRestaurant = {
  restaurant: OrderRestaurantInfo;
  items: OrderItem[];
  subtotal: number;
};

export type OrderRestaurantInfo = {
  id: number;
  name: string;
  logo: string;
};
export type OrderStatus = (typeof ORDER_STATUSES)[number];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ORDER_STATUSES = [
  'preparing',
  'on_the_way',
  'delivered',
  'done',
  'cancelled',
] as const;

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type OrderFilter = {
  status?: OrderStatus;
};

export type MyOrderResponse = {
  orders: Order[];
  pagination: Pagination;
  filter: OrderFilter;
};
