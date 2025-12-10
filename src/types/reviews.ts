interface User {
  id: number;
  name: string;
}

export interface Review {
  id?: number;
  star?: number;
  comment?: string;
  createdAt?: string;
  user?: User;
}
