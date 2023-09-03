import { Heading, Spinner, Text, VStack, useToast } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { kakaoLogin } from '../api';

export default function KakaoConfirm() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();
  const confirmLogin = async () => {
    const params = new URLSearchParams(search);
    const code = params.get('code');
    if (code) {
      const status = await kakaoLogin(code);
      if (status === 200) {
        toast({ title: '로그인 성공', status: 'success', position: 'bottom-right' });
        queryClient.refetchQueries(['me']);
        navigate('/');
      }
    }
  };
  useEffect(() => {
    confirmLogin();
  }, []);

  return (
    <VStack justifyContent={'center'} minH="100vh">
      <Heading>Processing log in...</Heading>
      <Text>Don't go anywhere.</Text>
      <Spinner size={'lg'} />
    </VStack>
  );
}
