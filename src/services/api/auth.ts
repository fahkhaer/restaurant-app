import { baseUrl } from '@/config/constants';
import { setToken, setUser } from '@/features/auth/authSlice';
import { useAppDispatch } from '@/features/store';
import type { User } from '@/types/auth';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

// ------------------- LOGIN -------------------
export function useLogin() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      const res = await axios.post(`${baseUrl}/api/auth/login`, payload);
      return res.data.data as { token: string; user: User };
    },

    onSuccess: (data) => {
      dispatch(setToken(data.token));
      dispatch(setUser(data.user));

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    },
  });
}

// ------------------- REGISTER -------------------
export function useRegister() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async (payload: {
      name: string;
      email: string;
      phone: string;
      password: string;
    }) => {
      const res = await axios.post(`${baseUrl}/api/auth/register`, payload);
      console.log(res);

      return res.data.data as { token: string; user: User };
    },

    onSuccess: (data) => {
      dispatch(setToken(data.token));
      dispatch(setUser(data.user));

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    },
  });
}
