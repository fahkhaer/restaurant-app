export type Menu = SampleMenu;

export type SampleMenu = {
  id: number;
  foodName: string;
  price: number;
  type: string;
  image: string;
};

export type RecommendationItem = {
  id: number;
  name: string;
  star: number;
  place: string;
  lat: number;
  long: number;
  logo: string;
  images: string[];
  category: string;
  reviewCount: number;
  sampleMenus: SampleMenu[];
  isFrequentlyOrdered: boolean;
};

export interface PriceRange {
  min: number;
  max: number;
}

export interface Restaurant {
  id: number;
  name: string;
  star: number;
  place: string;
  logo: string;
  images: string[];
  category: string;
  reviewCount: number;
  menuCount: number;
  priceRange: PriceRange;
}

export interface GetBestSellerResponse {
  success: boolean;
  message: string;
  data: {
    restaurants: Restaurant[];
  };
}

export type GetRestaurantsParams = {
  location?: string;
  range?: number;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  category?: string;
  page?: number;
  limit?: number;
};

export type SearchResponse = {
  restaurants: Restaurant[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  searchQuery: string;
};