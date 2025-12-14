import { baseUrl } from '@/config/constants';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function GetRecomendation() {
  return useQuery({
    queryKey: ['recomended'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${baseUrl}/api/resto/recommended`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.data.recommendations;
    },
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
}

export function GetDetail(id?: string) {
  return useQuery({
    queryKey: ['detail', id],
    enabled: !!id,
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${baseUrl}/api/resto/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.data;
    },
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
}
