import { baseUrl } from '@/config/constants';
import type {
  CreateReviewPayload,
  CreateReviewResponse,
  MyReviewsResponse,
} from '@/types/reviews';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['review'] });
    },
  });
}

export function useMyReviews() {
  return useQuery<MyReviewsResponse>({
    queryKey: ['my-reviews'],
    queryFn: async () => {
      const token = localStorage.getItem('token');

      const res = await axios.get<MyReviewsResponse>(
        `${baseUrl}/api/review/my-reviews`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    },
  });
}
