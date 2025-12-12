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
