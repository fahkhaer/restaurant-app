import type { SampleMenu } from './restaurant';

export type AddToCartPayload = {
  restaurantId: number;
  menuId: number;
  quantity: number;
};

export type AddToCartResponse = {
  success: boolean;
  message: string;
  data: {
    cartItem: {
      id: number;
      quantity: number;
      itemTotal: number;
    };
  };
};

export type CartMenuItem = {
  id: number;
  menu: SampleMenu;
  quantity: number;
  itemTotal: number;
};

export type CartRestaurant = {
  restaurant: {
    id: number;
    name: string;
    logo: string;
  };
  items: CartMenuItem[];
  subtotal: number;
};

export type GetCartResponse = {
  success: boolean;
  message: string;
  data: {
    cart: CartRestaurant[];
  };
};

export type UpdateCartPayload = {
  cartItemId: number;
  quantity: number;
};
