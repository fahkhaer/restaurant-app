import { baseUrl } from '@/config/constants';
import type { CheckoutApiResponse, CheckoutPayload } from '@/types/checkout';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export function useCheckout() {
  const queryClient = useQueryClient();

  return useMutation<CheckoutApiResponse, Error, CheckoutPayload>({
    mutationFn: async (payload) => {
      const token = localStorage.getItem('token');

      const res = await axios.post<CheckoutApiResponse>(
        `${baseUrl}/api/order/checkout`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checkout'] });
    },
  });
}
