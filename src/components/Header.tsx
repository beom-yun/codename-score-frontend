import {
  Avatar,
  Button,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  ToastId,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { FaBowlingBall, FaMoon, FaSun } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { logout } from '../api';
import useUser from '../lib/useUser';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

export default function Header() {
  const queryClient = useQueryClient();
  const { userLoading, user, isLoggedIn } = useUser();
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();
  const {
    isOpen: isSignupOpen,
    onOpen: onSignupOpen,
    onClose: onSignupClose,
  } = useDisclosure();
  const { toggleColorMode } = useColorMode();
  const IconDarkMode = useColorModeValue(FaMoon, FaSun);
  const toast = useToast();
  const toastId = useRef<ToastId>();
  const mutation = useMutation(logout, {
    onMutate: () => {
      toastId.current = toast({
        title: '로그아웃 중...',
        status: 'loading',
        position: 'bottom-right',
      });
    },
    onSuccess: () => {
      if (toastId.current) {
        queryClient.refetchQueries(['me']);
        toast.update(toastId.current, {
          status: 'success',
          title: '로그아웃 성공',
        });
      }
    },
  });
  const onLogout = async () => {
    // const toastId = toast({
    //   title: '로그아웃 중...',
    //   status: 'loading',
    //   position: 'bottom-right',
    // });
    // await logout();
    // queryClient.refetchQueries(['me']);
    // toast.update(toastId, {
    //   status: 'success',
    //   title: '로그아웃 성공',
    // });
    mutation.mutate();
  };

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
        <IconButton
          onClick={toggleColorMode}
          aria-label="다크모드"
          icon={<IconDarkMode />}
          variant={'ghost'}
        />
        {!userLoading ? (
          !isLoggedIn ? (
            <>
              <Button onClick={onLoginOpen}>로그인</Button>
              <Button onClick={onSignupOpen} colorScheme={'teal'}>
                회원가입
              </Button>
            </>
          ) : (
            <Menu>
              <MenuButton>
                <Avatar name={user?.name} size={'sm'} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={onLogout}>로그아웃</MenuItem>
              </MenuList>
            </Menu>
          )
        ) : null}
      </HStack>

      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignupModal isOpen={isSignupOpen} onClose={onSignupClose} />
    </HStack>
  );
}
