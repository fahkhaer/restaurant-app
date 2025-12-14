import { baseUrl } from '@/config/constants';
import type {
  AddToCartPayload,
  AddToCartResponse,
  UpdateCartPayload,
} from '@/types/cart';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

export function GetCart() {
  return useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${baseUrl}/api/cart`, {
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

export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ cartItemId, quantity }: UpdateCartPayload) => {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `${baseUrl}/api/cart/${cartItemId}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

export function useDeleteCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (cartItemId: number) => {
      const token = localStorage.getItem('token');
      const res = await axios.delete(`${baseUrl}/api/cart/${cartItemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error) => {
      console.error('Failed to delete cart item', error);
    },
  });
}
