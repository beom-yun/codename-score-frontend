import { Button, HStack, Heading, IconButton, useDisclosure } from '@chakra-ui/react';
import { FaBowlingBall, FaMoon } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';

export default function Header() {
  const { isOpen: isLoginOpen, onClose: onLoginClose, onOpen: onLoginOpen } = useDisclosure();

  return (
    <HStack px={40} py={5} borderBottomWidth={1} justifyContent={'space-between'}>
      <Link to={'/'}>
        <HStack spacing={4} color={'linkedin.900'}>
          <FaBowlingBall size={28} />
          <Heading fontSize={'2xl'}>Codename Score</Heading>
        </HStack>
      </Link>
      <HStack spacing={2}>
        <IconButton variant={'ghost'} aria-label="다크모드" icon={<FaMoon />} />
        <Button onClick={onLoginOpen}>로그인</Button>
        <Button colorScheme="linkedin">가입하기</Button>
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
    </HStack>
  );
}
