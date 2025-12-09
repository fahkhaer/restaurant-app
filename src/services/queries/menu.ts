import { useQuery } from '@tanstack/react-query';
import axios from '../api/axios';
import type { MenuItem } from '../../types';

export function useMenusQuery(params?: {
  q?: string;
  category?: string;
  sort?: string;
}) {
  return useQuery<MenuItem[]>({
    queryKey: ['menus', params],
    queryFn: async () => {
      const { data } = await axios.get('/menus', { params });
      return data;
    },
    staleTime: 60_000,
  });
}
