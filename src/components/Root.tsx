import { Text, VStack } from '@chakra-ui/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Outlet } from 'react-router-dom';
import useUser from '../lib/useUser';
import Header from './Header';

export default function Root() {
  const { userLoading, user, isLoggedIn } = useUser();
  return (
    <VStack>
      <Header />
      <VStack h={'100vh'} pt={20}>
        {userLoading ? null : isLoggedIn ? (
          <Outlet />
        ) : (
          <Text>로그인 해주세요</Text>
        )}
      </VStack>
      <ReactQueryDevtools />
    </VStack>
  );
}
