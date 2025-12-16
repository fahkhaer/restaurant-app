export type Review = {
  id: number;
  star: number;
  comment: string;
  transactionId: string;
  createdAt: string;
  user: ReviewUser;
  restaurant: ReviewRestaurant;
  menus: ReviewMenu[];
};

export type CreateReviewPayload = {
  transactionId: string;
  restaurantId: number;
  star: number;
  comment: string;
  menuIds: number[];
};

export type ReviewUser = {
  id: number;
  name: string;
  avatar?: string;
};

export type ReviewRestaurant = {
  id: number;
  name: string;
};

export type ReviewMenu = {
  menuId: number;
  menuName: string;
  price: number;
  type: 'food' | 'drink';
  image: string;
  quantity: number;
};

export type CreateReviewResponse = {
  success: boolean;
  message: string;
  data: {
    review: Review;
  };
};


export type MyReviewsResponse = {
  success: boolean;
  message: string;
  data: {
    reviews: MyReview[];
  };
};

export type MyReview = {
  id: number;
  star: number;
  comment: string;
  transactionId: string;
  createdAt: string;
  restaurant: ReviewRestaurant;
  menus: ReviewMenu[];
};
