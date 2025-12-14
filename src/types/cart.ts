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
