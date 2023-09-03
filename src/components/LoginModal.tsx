import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  ToastId,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { FaLock, FaUser } from 'react-icons/fa6';
import { passwordLogin } from '../api';
import { IPasswordLoginVariables } from '../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import SocialLogin from './SocialLogin';

interface ILoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: ILoginModalProps) {
  const { register, handleSubmit, reset } = useForm<IPasswordLoginVariables>();
  const queryClient = useQueryClient();
  const toast = useToast();
  const toastId = useRef<ToastId>();
  const mutation = useMutation(passwordLogin, {
    onMutate: () => {
      toastId.current = toast({ title: '로그인 중...', status: 'loading', position: 'bottom-right' });
    },
    onSuccess: () => {
      if (toastId.current) {
        toast.update(toastId.current, { title: '로그인 성공', status: 'success', position: 'bottom-right' });
        onClose();
        reset();
        queryClient.refetchQueries(['me']);
      }
    },
    onError: () => {
      if (toastId.current) {
        toast.update(toastId.current, {
          title: '로그인 실패',
          status: 'error',
          description: 'ID 또는 비밀번호를 확인하세요',
          position: 'bottom-right',
        });
      }
    },
  });
  const onSubmit = ({ username, password }: IPasswordLoginVariables) => {
    mutation.mutate({ username, password });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text as="b">로그인하기</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody as={'form'} onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={'gray.500'}>
                    <FaUser />
                  </Box>
                }
              />
              <Input variant={'filled'} placeholder="ID" {...register('username', { required: true })} />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={'gray.500'}>
                    <FaLock />
                  </Box>
                }
              />
              <Input
                type="password"
                variant={'filled'}
                placeholder="PASSWORD"
                {...register('password', { required: true })}
              />
            </InputGroup>
          </VStack>

          <Button isLoading={mutation.isLoading} type="submit" my={4} w={'100%'} colorScheme="linkedin">
            로그인
          </Button>

          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
