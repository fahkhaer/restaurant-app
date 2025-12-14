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

      return res.data.data;
    },
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
}

export async function UpdateProfile(data: {
  name: string;
  email: string;
  phone: string;
  avatar?: File;
}) {
  const token = localStorage.getItem('token');

  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('email', data.email);
  formData.append('phone', data.phone);
  if (data.avatar) {
    formData.append('avatar', data.avatar);
  }

  const res = await axios.put(`${baseUrl}/api/auth/profile`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  

  return res.data;
}
