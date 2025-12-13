interface User {
  id: number;
  name: string;
  avatar: string;
}

export interface Review {
  id?: number;
  star?: number;
  comment?: string;
  createdAt?: string;
  user?: User;
}
