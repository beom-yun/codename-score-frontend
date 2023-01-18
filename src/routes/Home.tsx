import { Text, VStack } from '@chakra-ui/react';
import MainCards from '../components/MainCards';
import useUser from '../lib/useUser';

export default function Home() {
  const { userLoading, user, isLoggedIn } = useUser();

  return (
    <VStack h={'100vh'} pt={20}>
      {userLoading ? null : isLoggedIn ? <MainCards /> : <Text>로그인 해주세요</Text>}
    </VStack>
  );
}
