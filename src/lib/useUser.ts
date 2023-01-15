import { useQuery } from '@tanstack/react-query';
import { getMe } from '../api';

interface IBowler {
  id: number;
  last_login: string;
  username: string;
  email: string;
  name: string;
  phone_number: string;
}

export default function useUser() {
  const { isLoading, data, isError } = useQuery<IBowler>(['me'], getMe, { retry: false });
  return {
    userLoading: isLoading,
    user: data,
    isLoggedIn: !isError,
  };
}
