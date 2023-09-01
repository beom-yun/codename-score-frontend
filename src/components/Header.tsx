import {
  Avatar,
  Button,
  HStack,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  ToastId,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { FaBowlingBall, FaMoon, FaSun } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import useUser from '../lib/useUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logOut } from '../api';
import { useRef } from 'react';

export default function Header() {
  const { isOpen: isLoginOpen, onClose: onLoginClose, onOpen: onLoginOpen } = useDisclosure();
  const { isOpen: isSignupOpen, onClose: onSignupClose, onOpen: onSignupOpen } = useDisclosure();
  const { toggleColorMode } = useColorMode();
  const darkModeColor = useColorModeValue('linkedin.900', 'linkedin.200');
  const DarkModeIcon = useColorModeValue(FaMoon, FaSun);
  const { user, userLoading, isLoggedIn } = useUser();
  const queryClient = useQueryClient();
  const toast = useToast();
  const toastId = useRef<ToastId>();
  const mutation = useMutation(logOut, {
    onMutate: () => {
      toastId.current = toast({ title: '로그아웃 중...', status: 'loading', position: 'bottom-right' });
    },
    onSuccess: () => {
      if (toastId.current) {
        queryClient.refetchQueries(['me']);
        toast.update(toastId.current, { title: '로그아웃 성공', status: 'success', position: 'bottom-right' });
      }
    },
    onError: () => {
      if (toastId.current) {
        toast.update(toastId.current, { title: '로그아웃 실패', status: 'error', position: 'bottom-right' });
      }
    },
  });
  const onLogOut = async () => {
    mutation.mutate();
  };

  return (
    <Stack
      px={{ sm: 0, md: 40 }}
      py={5}
      borderBottomWidth={1}
      justifyContent={'space-between'}
      alignItems={'center'}
      direction={{ sm: 'column', md: 'row' }}
      spacing={{ sm: 5, md: 0 }}
    >
      <Link to={'/'}>
        <HStack py={2} spacing={4} color={darkModeColor}>
          <FaBowlingBall size={32} />
          <Heading fontSize={'2xl'}>Codename Score</Heading>
        </HStack>
      </Link>
      <HStack spacing={2}>
        <IconButton variant={'ghost'} aria-label="다크모드" icon={<DarkModeIcon />} onClick={toggleColorMode} />
        {!userLoading ? (
          !isLoggedIn ? (
            <>
              <Button onClick={onLoginOpen}>로그인</Button>
              <Button onClick={onSignupOpen} colorScheme="linkedin">
                가입하기
              </Button>
            </>
          ) : (
            <Menu>
              <MenuButton>
                <Avatar size={'md'} name={user?.name} src={user?.avatar} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={onLogOut}>로그아웃</MenuItem>
              </MenuList>
            </Menu>
          )
        ) : null}
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignupModal isOpen={isSignupOpen} onClose={onSignupClose} />
    </Stack>
  );
}
