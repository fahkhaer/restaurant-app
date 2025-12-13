import { baseUrl } from '@/config/constants';
import type { MyOrderResponse, OrderStatus } from '@/types/order';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useMyOrders(status?: OrderStatus, page = 1) {
  return useQuery<MyOrderResponse>({
    queryKey: ['my-order', status, page],
    queryFn: async (): Promise<MyOrderResponse> => {
      const token = localStorage.getItem('token');

      const res = await axios.get<{ data: MyOrderResponse }>(
        `${baseUrl}/api/order/my-order`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { status, page, limit: 10 },
        }
      );

      return res.data.data;
    },
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
}
