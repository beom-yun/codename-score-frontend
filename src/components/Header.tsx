import { Button, HStack, Text } from '@chakra-ui/react';
import { FaBowlingBall } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <HStack
      w={'100%'}
      justifyContent={'space-between'}
      py={5}
      px={10}
      borderBottomWidth={1}
    >
      <Link to="/">
        <HStack>
          <FaBowlingBall size={32} />
          <Text as="b" fontSize={24}>
            Codename Score
          </Text>
        </HStack>
      </Link>
      <HStack spacing={2}>
        <Button>로그인</Button>
        <Button>회원가입</Button>
      </HStack>
    </HStack>
  );
}
