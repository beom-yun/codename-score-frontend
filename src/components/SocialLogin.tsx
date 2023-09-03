import { Button, Divider, HStack, Text } from '@chakra-ui/react';
import { FaComment } from 'react-icons/fa6';

export default function SocialLogin() {
  const kakaoParams = {
    client_id: '06acaa0ad678eefcbb78902fec710ad6',
    redirect_uri: 'http://127.0.0.1:3000/social/kakao/',
    response_type: 'code',
  };
  const params = new URLSearchParams(kakaoParams).toString();

  return (
    <>
      <HStack>
        <Divider />
        <Text color={'gray.500'} fontSize={'xs'} as="b">
          OR
        </Text>
        <Divider />
      </HStack>
      <Button
        as={'a'}
        href={`https://kauth.kakao.com/oauth/authorize?${params}`}
        my={4}
        w={'100%'}
        colorScheme="yellow"
        leftIcon={<FaComment />}
      >
        카카오로 로그인하기
      </Button>
    </>
  );
}
