import {
  Avatar,
  Button,
  HStack,
  IconButton,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { FaBowlingBall, FaMoon, FaSun } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useUser from '../lib/useUser';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

export default function Header() {
  const { userLoading, user, isLoggedIn } = useUser();
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();
  const { isOpen: isSignupOpen, onOpen: onSignupOpen, onClose: onSignupClose } = useDisclosure();
  const { toggleColorMode } = useColorMode();
  const IconDarkMode = useColorModeValue(FaMoon, FaSun);

  return (
    <HStack w={'100%'} justifyContent={'space-between'} py={5} px={10} borderBottomWidth={1}>
      <Link to="/">
        <HStack>
          <FaBowlingBall size={32} />
          <Text as="b" fontSize={24}>
            Codename Score
          </Text>
        </HStack>
      </Link>
      <HStack spacing={2}>
        <IconButton onClick={toggleColorMode} aria-label="다크모드" icon={<IconDarkMode />} variant={'ghost'} />
        {!userLoading ? (
          !isLoggedIn ? (
            <>
              <Button onClick={onLoginOpen}>로그인</Button>
              <Button onClick={onSignupOpen} colorScheme={'teal'}>
                회원가입
              </Button>
            </>
          ) : (
            <Avatar name={user?.name} size={'sm'} />
          )
        ) : null}

        {/* <>
          <Button onClick={onLoginOpen}>로그인</Button>
          <Button onClick={onSignupOpen} colorScheme={'teal'}>
            회원가입
          </Button>
        </> */}
      </HStack>

      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignupModal isOpen={isSignupOpen} onClose={onSignupClose} />
    </HStack>
  );
}
