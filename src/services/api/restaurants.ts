import { baseUrl } from '@/config/constants';
import type { GetRestaurantsParams } from '@/types/restaurant';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
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

type GetBestSellerParams = {
  page: number;
  limit: number;
  category?: string;
};

export function GetBestSeller({ page, limit, category }: GetBestSellerParams) {
  return useQuery({
    queryKey: ['best-seller', page, limit, category],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${baseUrl}/api/resto/best-seller`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
          limit,
          category,
        },
      });

      return res.data.data.restaurants;
    },
  });
}

export function GetRestaurants(params: GetRestaurantsParams) {
  return useQuery({
    queryKey: ['restaurants', params],
    queryFn: async () => {
      const token = localStorage.getItem('token');

      const res = await axios.get(`${baseUrl}/api/resto`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      });

      return res.data.data;
    },
    placeholderData: keepPreviousData,
  });
}
