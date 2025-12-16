import { baseUrl } from '@/config/constants';
import type {
  CreateReviewPayload,
  CreateReviewResponse,
} from '@/types/reviews';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation<CreateReviewResponse, Error, CreateReviewPayload>({
    mutationFn: async (payload) => {
      const token = localStorage.getItem('token');

      const res = await axios.post<CreateReviewResponse>(
        `${baseUrl}/api/review`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('ini review',res);
      
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['review'] });
    },
  });
}
