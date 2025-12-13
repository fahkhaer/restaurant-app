import { baseUrl } from '@/config/constants';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function GetProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${baseUrl}/api/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('getpr', res.data.data);

      return res.data.data;
    },
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
}
