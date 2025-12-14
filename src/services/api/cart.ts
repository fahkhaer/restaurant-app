import { baseUrl } from '@/config/constants';
import type { AddToCartPayload, AddToCartResponse } from '@/types/cart';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation<AddToCartResponse, Error, AddToCartPayload>({
    mutationFn: async (payload) => {
      const token = localStorage.getItem('token');

      const res = await axios.post<AddToCartResponse>(
        `${baseUrl}/api/cart`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('addcart', res.data);

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}
