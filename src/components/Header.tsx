import { Button, HStack, Heading, IconButton, useColorMode, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import { FaBowlingBall, FaMoon, FaSun } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

export default function Header() {
  const { isOpen: isLoginOpen, onClose: onLoginClose, onOpen: onLoginOpen } = useDisclosure();
  const { isOpen: isSignupOpen, onClose: onSignupClose, onOpen: onSignupOpen } = useDisclosure();
  const { toggleColorMode } = useColorMode();
  const darkModeColor = useColorModeValue('linkedin.900', 'linkedin.200');
  const DarkModeIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <HStack px={40} py={5} borderBottomWidth={1} justifyContent={'space-between'}>
      <Link to={'/'}>
        <HStack spacing={4} color={darkModeColor}>
          <FaBowlingBall size={28} />
          <Heading fontSize={'2xl'}>Codename Score</Heading>
        </HStack>
      </Link>
      <HStack spacing={2}>
        <IconButton variant={'ghost'} aria-label="다크모드" icon={<DarkModeIcon />} onClick={toggleColorMode} />
        <Button onClick={onLoginOpen}>로그인</Button>
        <Button onClick={onSignupOpen} colorScheme="linkedin">
          가입하기
        </Button>
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignupModal isOpen={isSignupOpen} onClose={onSignupClose} />
    </HStack>
  );
}
